import { useCreateCommentTypedDataMutation } from "@jodw/lens";
import {
  Avatar,
  Button,
  Comment as AntdComment,
  Form,
  Input,
  List,
  notification
} from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { UserRootState } from "../../features/user/userSlice";
import { PublicationMainFocus } from "../../lib";
import { uploadIpfs } from "../../utils/ipfs";
import { v4 as uuidv4 } from "uuid";
import onError from "../../lib/shared/onError";
import { broadcastTypedData } from "../../lib/lens/publications/post";
import * as dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const { TextArea } = Input;

export interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  datetime: string;
  children?: Comment[];
}

type NewCommentProps = {
  parentId: string;
  onSuccess?: (comment: Comment) => void;
};

const NewComment = ({ parentId, onSuccess = (c) => {} }: NewCommentProps) => {
  const lensProfile = useSelector((state: { user: UserRootState }) => {
    return state.user.user.lensProfile;
  });
  const [submitting, setSubmitting] = useState(false);
  const [newComment, setNewComment] = useState("");

  const [createCommentTypedDataMutation, { data: createCommentTypedData, loading: createCommentIsLoading, error: createCommentError }] = useCreateCommentTypedDataMutation();

  const onSubmitNewComment = async () => {
    setSubmitting(true);
    const ipfsResult = await uploadIpfs({
      version: "2.0.0",
      mainContentFocus: PublicationMainFocus.TEXT_ONLY,
      metadata_id: uuidv4(),
      description: newComment,
      content: newComment,
      locale: "en-US",
      external_url: null,
      image: null,
      imageMimeType: null,
      name: "Comment by " + lensProfile?.handle,
      tags: ["talentdao", "jodw", "comment"],
      appId: "JoDW",
    });

    const request = {
      variables: {
        request: {
          profileId: lensProfile?.id,
          publicationId: parentId,
          contentURI: "ipfs://" + ipfsResult?.path,
          collectModule: {
            revertCollectModule: true
          },
          referenceModule: {
            followerOnlyReferenceModule: false
          },
        },
      },
    };
    const result = await createCommentTypedDataMutation(request);
    if (result?.errors) {
      onError({ message: "Failed to add comment!", details: "Please try again." });
      setSubmitting(false);
    } else {
      broadcastTypedData(result?.data?.createCommentTypedData, () => {
        notification.open({
          message: "Added comment!",
          description: "Your comment was added successfully!",
          icon: "🚀",
        });
        onSuccess({
          id: "pendingid",
          author: lensProfile?.handle??"unknown",
          avatar: lensProfile?.image??"none",
          content: newComment,
          datetime: new Date().toString(),
        });
        setNewComment("");
        setSubmitting(false);
      }, false);
    }
  };

  const onSubmitNewCommentError = (err: any) => {

  };

  return (
    <Form
      layout="vertical"
      onFinish={onSubmitNewComment}
      onFinishFailed={onSubmitNewCommentError}
      autoComplete="off"
    >
      <Form.Item name="comment">
        <TextArea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Post your response..."
          autoSize={{ minRows: 3, maxRows: 8 }}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={submitting}>
          Add Comment
        </Button>
      </Form.Item>
    </Form>
  );
};

export const CommentList: React.FC<{ comments: Comment[] }> = ({ comments }) => (
  <List
    dataSource={comments}
    itemLayout="horizontal"
    renderItem={props => <CommentUI {...props} />}
  />
);

export const CommentUI: React.FC<Comment> = ({
  id,
  author,
  avatar,
  content,
  datetime,
  children,
}) => {
  const [showNewComment, setShowNewComment] = useState(false);
  const [replies, setReplies] = useState(children);
  const handleCommentAdded = (comment: Comment) => {
    setReplies([comment, ...replies??[]]);
  };
  return (
    <AntdComment
      actions={[<span onClick={() => setShowNewComment(!showNewComment)}>Reply to</span>]}
      author={author}
      avatar={<Avatar src={avatar} />}
      content={content}
      datetime={dayjs.default(datetime).from(new Date().toString())}
    >
      {showNewComment && <NewComment parentId={id} onSuccess={handleCommentAdded} />}
      {replies}
    </AntdComment>
  );
};

type CommentFeatureProps = {
  id: string;
  initialComments: Comment[];
};

export const CommentFeature = ({ id, initialComments }: CommentFeatureProps) => {
  const [comments, setComments] = useState(initialComments);
  const handleCommentAdded = (comment: Comment) => {
    setComments([comment, ...comments??[]]);
  };

  return (
    <div>
      <NewComment parentId={id} onSuccess={handleCommentAdded} />

      <CommentList comments={comments} />
    </div>
  );
};
