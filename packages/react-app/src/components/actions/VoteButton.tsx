import { HandThumbDownIcon, HandThumbUpIcon } from "@heroicons/react/24/outline";
import { Button, Tooltip } from "antd";
import React from "react";

export enum VoteDirection {
  UPVOTE = "UPVOTE",
  DOWNVOTE = "DOWNVOTE",
}

type VoteButtonProps = {
  direction: VoteDirection;
  isCasted: () => boolean;
  onVote: (direction: VoteDirection) => void;
};

const VoteButton = ({ direction, isCasted, onVote }: VoteButtonProps) => {

  const voteDisplayName = direction === VoteDirection.UPVOTE ? "Upvote" : "Downvote";
  const voteUI = direction === VoteDirection.UPVOTE ? <HandThumbUpIcon className="h-6 w-6 text-blue-500" /> : <HandThumbDownIcon className="h-6 w-6 text-blue-500" />;
  return (
    <Tooltip title={`${voteDisplayName} Article`}>
      <Button
        className={(isCasted() ? "bg-primary text-white" : "") +" px-8 py-2 text-sm rounded-full cursor-pointer"}
        onClick={e => {
          if (isCasted()) {
            console.log(voteDisplayName + " already cast.");
          } else {
            console.log(voteDisplayName + " clicked", e);
            onVote(direction);
          }
        }}
      >
        {voteUI}
      </Button>
    </Tooltip>
  );
};

export default VoteButton;