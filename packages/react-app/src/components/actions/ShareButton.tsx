import { useCreateMirrorTypedDataMutation } from "@jodw/lens";
import { Button, Input, notification } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { UserRootState } from "../../features/user/userSlice";
import { broadcastTypedData } from "../../lib/lens/publications/post";
import onError from "../../lib/shared/onError";

type ShareButtonProps = {
  id: string;
};

const ShareButton = ({ id }: ShareButtonProps) => {

  const lensProfile = useSelector((state: { user: UserRootState }) => {
    return state.user.user.lensProfile;
  });

  const [hasShared, setHasShared] = useState(false);

  const [createMirrorTypedDataMutation, { data: createMirrorResponse, loading: createMirrorIsLoading, error: createMirrorError }] = useCreateMirrorTypedDataMutation({
    variables: {
      request: {
        profileId: lensProfile?.id,
        publicationId: id,
        referenceModule: {
          followerOnlyReferenceModule: false
        },
      },
    },
  });

  const onShareHandler = () => {
    console.log("Sharing " + id + " via mirror...");
    createMirrorTypedDataMutation();
  };

  useEffect(() => {
    if (createMirrorError) {
      onError({ message: "Unable to share!", details: "Please try again in some time. Error: " + createMirrorError.message });
    }
  }, [createMirrorError]);

  useEffect(() => {
    if (createMirrorResponse && !hasShared) {
      broadcastTypedData(createMirrorResponse?.createMirrorTypedData, () => {
        console.log("Share via mirror successful!");
        notification.open({
          message: "Shared successfully!",
          description: "Thanks for the share! 😍",
          icon: "🚀",
        });
        setHasShared(true);
      });
    }
  }, [createMirrorResponse]);

  return (
    <Input.Group compact>
      <Button onClick={onShareHandler} disabled={createMirrorIsLoading}>
        Share!
      </Button>
    </Input.Group>
  );
};

export default ShareButton;