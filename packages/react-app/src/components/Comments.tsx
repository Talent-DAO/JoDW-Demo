import { List, Comment as AntdComment, Avatar } from "antd";
import React, { ReactFragment } from "react";

export interface Comment extends ReactFragment {
  author: string;
  avatar: string;
  content: string;
  datetime: string;
  children?: Comment[];
}

export const CommentList: React.FC<{ comments: Comment[] }> = ({ comments }) => (
  <List
    dataSource={comments}
    itemLayout="horizontal"
    renderItem={props => <CommentUI {...props} />}
  />
);

export const CommentUI: React.FC<Comment> = ({
  author,
  avatar,
  content,
  datetime,
  children,
}) => (
  <AntdComment
    actions={[<span>Reply to</span>]}
    author={author}
    avatar={<Avatar src={avatar} />}
    content={content}
    datetime={datetime}
  >
    {children}
  </AntdComment>
);
