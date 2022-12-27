/* eslint-disable no-undef */
import { ReactionTypes, useAddReactionMutation } from "@jodw/lens";
import { Input } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { UserRootState } from "../../features/user/userSlice";
import onError from "../../lib/shared/onError";
import VoteButton, { VoteDirection } from "../actions/VoteButton";

type ArticleVoterProps = {
  articleId: String;
  totalUpvotes: number;
  reaction: ReactionTypes | null | undefined;
};

const ArticleVoter = ({ articleId, totalUpvotes, reaction }: ArticleVoterProps) => {

  const lensProfile = useSelector((state: { user: UserRootState }) => {
    return state.user.user.lensProfile;
  });
  const [currentReaction, setCurrentReaction] = useState(reaction);

  const [addReactionMutation, { data: addReactionResult, loading: addReactionIsLoading, error: addReactionError }] = useAddReactionMutation({
    variables: {
      request: {
        profileId: lensProfile?.id,
        reaction: currentReaction??ReactionTypes.Upvote,
        publicationId: articleId,
      }
    },
  });

  const onVoteHandler = (direction: VoteDirection) => {
    if (addReactionIsLoading) {
      console.log("Voting in progress, ignoring");
      return;
    }
    console.log("Voted: " + direction);
    switch (direction) {
    case VoteDirection.UPVOTE:
      setCurrentReaction(ReactionTypes.Upvote);
      addReactionMutation({
        variables: {
          request: {
            profileId: lensProfile?.id,
            reaction: ReactionTypes.Upvote,
            publicationId: articleId,
          }
        }
      });
      break;
    case VoteDirection.DOWNVOTE:
      setCurrentReaction(ReactionTypes.Downvote);
      addReactionMutation({
        variables: {
          request: {
            profileId: lensProfile?.id,
            reaction: ReactionTypes.Downvote,
            publicationId: articleId,
          }
        }
      });
      break;
    default:
      console.error("Unknown vote mode: " + direction);
    }
  };

  useEffect(() => {
    if (addReactionError) {
      onError({ message: "Could not vote on article!", details: addReactionError.message });
    }
  }, [addReactionError]);

  return (
    <Input.Group compact>
      <VoteButton direction={VoteDirection.UPVOTE} isCasted={() => currentReaction === ReactionTypes.Upvote} onVote={onVoteHandler} />
      <VoteButton direction={VoteDirection.DOWNVOTE} isCasted={() => currentReaction === ReactionTypes.Downvote} onVote={onVoteHandler} />
    </Input.Group>
  );
};

export default ArticleVoter;