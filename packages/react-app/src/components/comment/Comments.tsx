/* eslint-disable no-undef */
import {
  Comment,
  useCommentFeedQuery,
  useCreateCommentTypedDataMutation
} from "@jaxcoder/lens";
import {
  Avatar,
  Button,
  Comment as AntdComment,
  Form,
  Input,
  List,
  notification
} from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { UserRootState } from "../../features/user/userSlice";
import { PublicationMainFocus } from "../../lib";
import { uploadIpfs } from "../../utils/ipfs";
import { v4 as uuidv4 } from "uuid";
import onError from "../../lib/shared/onError";
import { broadcastTypedData } from "../../lib/lens/publications/post";
import * as dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { getProfilePicture } from "../../lib/lens/publications/getPostAsArticle";

dayjs.extend(relativeTime);

const { TextArea } = Input;

type CommentViewData = {
  id: string;
  author: string;
  avatar: string;
  content: string;
  createdAt: string;
}

type NewCommentProps = {
  parentId: string;
  onSuccess?: (comment: CommentViewData) => void;
};

const convertToCommentViewData = (c: Comment): CommentViewData => {
  return {
    id: c?.id,
    author: c?.profile?.handle,
    avatar: getProfilePicture(c?.profile?.picture),
    content: c?.metadata?.content??"no body",
    createdAt: c?.createdAt,
  };
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
      attributes: [],
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
          id: lensProfile?.id + "-0xfe9d19",
          author: lensProfile?.handle??"unknown",
          avatar: lensProfile?.image??"none",
          content: newComment,
          createdAt: new Date().toString(),
        });
        setNewComment("");
        setSubmitting(false);
      }, false); // waiting for it here takes a lot of time
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

export const CommentList: React.FC<{ comments: CommentViewData[] }> = ({ comments }) => (
  <List
    dataSource={comments}
    itemLayout="horizontal"
    renderItem={props => <CommentUI {...props} />}
  />
);

export const CommentUI: React.FC<CommentViewData> = ({
  id,
  author,
  avatar,
  content,
  createdAt,
}) => {
  const [showNewComment, setShowNewComment] = useState(false);
  const [replies, setReplies] = useState<JSX.Element[]>([]);
  const lensProfile = useSelector((state: { user: UserRootState }) => {
    return state.user.user.lensProfile;
  });
  const { data: commentsData, loading: commentsAreLoadin, error: commentsError } = useCommentFeedQuery({
    variables: {
      request: {
        commentsOf: id,
      },
      reactionRequest: {
        profileId: lensProfile?.id,
      },
    },
  });

  useEffect(() => {
    if (commentsData) {
      setReplies(commentsData?.publications?.items
        .map(c => convertToCommentViewData(c))
        .map(reply => <CommentUI {...reply} />));
    }
  }, [commentsData]);

  const handleCommentAdded = (comment: CommentViewData) => {
    setReplies([<CommentUI {...comment} />, ...replies??[]]);
  };

  const handleReplyToClicked = () => {
    if (id.endsWith("0xfe9d19")) {
      onError({ message: "Your comment is still pending.", details: "Please try again in some time." });
    } else {
      setShowNewComment(!showNewComment);
    }
  };

  return (
    <AntdComment
      actions={[<span onClick={handleReplyToClicked}>Reply to</span>]}
      author={author}
      avatar={<Avatar src={avatar} />}
      content={content}
      datetime={dayjs.default(createdAt).from(new Date().toString())}
    >
      {showNewComment && <NewComment parentId={id} onSuccess={handleCommentAdded} />}
      {replies}
    </AntdComment>
  );
};

type CommentFeatureProps = {
  id: string;
};

export const CommentFeature = ({ id }: CommentFeatureProps) => {
  const lensProfile = useSelector((state: { user: UserRootState }) => {
    return state.user.user.lensProfile;
  });
  const [comments, setComments] = useState<CommentViewData[]>([]);
  const { data: commentsData, loading: commentsAreLoadin, error: commentsError } = useCommentFeedQuery({
    variables: {
      request: {
        commentsOf: id,
      },
      reactionRequest: {
        profileId: lensProfile?.id,
      },
    },
  });

  useEffect(() => {
    if (commentsData) {
      setComments(commentsData?.publications?.items?.map(c => convertToCommentViewData(c))??[]);
    }
  }, [commentsData]);

  const handleCommentAdded = (c: CommentViewData) => {
    setComments([c, ...comments]);
  };

  return (
    <div>
      <NewComment parentId={id} onSuccess={handleCommentAdded} />

      <CommentList comments={comments} />
    </div>
  );
};
