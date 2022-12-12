
import { Modal } from "antd";
import { useApolloClient } from "@apollo/client";
import { useAccount } from "wagmi";
import { ProfilesDocument, ProfileQueryRequest } from "@jodw/lens";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MiniLensProfile from "./MiniLensProfile";
import { fetchLensUserStart, fetchLensUserSuccess, Status } from "../../features/user/userSlice";
import React from "react";

const ConnectLensModal = ({ isOpen, onConnectSuccess, onConnectError, onConnectCancel }: any) => {
  const dispatch = useDispatch();
  const { address } = useAccount();
  const [availableLensProfiles, setAvailableLensProfiles]: any = useState(null);
  const apolloClient = useApolloClient();

  // TODO: add support to create lens profile from here.
  // const createLensProfileRequest = async (request) => {
  //   const result = await apolloClient.mutate({
  //     mutation: CreateProfileDocument,
  //     variables: {
  //       request,
  //     },
  //   });

  //   return result.data?.createProfile;
  // };

  const findExistingLensProfiles = async () => {
    dispatch(fetchLensUserStart());
    const results = await apolloClient.query({
      query: ProfilesDocument,
      variables: { request: { ownedBy: [address] } },
    });
    setAvailableLensProfiles(results?.data.profiles?.items); // not paginating
    // default to the first profile
    // todo: allow user to select profile
    dispatch(fetchLensUserSuccess(results?.data.profiles?.items[0]));
  };

  const onProfileSelected = async (profile: any) => {
    onConnectSuccess(profile);
    dispatch(fetchLensUserSuccess({
      id: profile?.id,
      handle: profile?.handle,
      image: profile?.picture?.original?.url,
      walletId: profile?.ownedBy,
      status: Status.Success
    }));
  };

  useEffect(() => {
    if (isOpen) {
      findExistingLensProfiles();
    }
  });

  return (
    <Modal
      title="Connect your Lens profile 🌱"
      centered
      open={isOpen}
      onCancel={onConnectCancel}
      onConnectError={onConnectError}
      visible={isOpen}
      footer={null}
    >
      <ol>
        <li key={"1"}>List available profiles corresponding to this wallet ID</li>
        <li key={"2"}>If any one of them is selected, return by invoking callback</li>
        <li key={"3"}>TODO: Else, display handle name field & create button.</li>
        <li key={"4"}>TODO: On create clicked, createProfile and return ID</li>
      </ol>
      <div className="flex">
        {availableLensProfiles && availableLensProfiles.map((profile: any) => <MiniLensProfile profile={profile} onProfileSelected={onProfileSelected} />)}
      </div>
    </Modal>
  );
};

export default ConnectLensModal;
