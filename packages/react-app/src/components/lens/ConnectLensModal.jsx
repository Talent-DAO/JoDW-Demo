
import { Modal } from "antd";
import { useApolloClient } from "@apollo/client";
import { useAccount } from "wagmi";
import { GET_PROFILES_BY_OWNER, CreateProfileDocument } from "../../graphql/queries/lens";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MiniLensProfile from "./MiniLensProfile";
import { fetchLensUserStart, fetchLensUserSuccess, Status } from "../../features/user/userSlice";
import { useLensAuth } from "../../hooks/useLensAuth";

const ConnectLensModal = ({ isOpen, onConnectSuccess, onConnectError, onConnectCancel }) => {
  const dispatch = useDispatch();
  const { address, isConnected } = useAccount();
  const [availableLensProfiles, setAvailableLensProfiles] = useState(null);
  const apolloClient = useApolloClient();

  // TODO: add support to create lens profile from here.
  const createLensProfileRequest = async (request) => {
    const result = await apolloClient.mutate({
      mutation: CreateProfileDocument,
      variables: {
        request,
      },
    });

    return result.data?.createProfile;
  };

  useLensAuth(address, () => !isOpen);

  const lensAuthData = useSelector(state =>
    state.user.lensAuth
  );

  const findExistingLensProfiles = async () => {
    dispatch(fetchLensUserStart());
    const results = await apolloClient.query({
      query: GET_PROFILES_BY_OWNER,
      variables: { id: address }, // testing with: "0x3A5bd1E37b099aE3386D13947b6a90d97675e5e3"
      context: {
        headers: {
          "x-access-token": lensAuthData?.accessToken ? `Bearer ${lensAuthData?.accessToken}` : "",
        },
      }
    });
    setAvailableLensProfiles(results?.data.profiles?.items); // not paginating
  };

  const onProfileSelected = async (profile) => {
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
    findExistingLensProfiles();
  }, [lensAuthData]);

  return (
    <Modal
      title="Connect to Lens"
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
        {availableLensProfiles && availableLensProfiles.map(profile => <MiniLensProfile profile={profile} onProfileSelected={onProfileSelected} />)}
      </div>
    </Modal>
  );
};

export default ConnectLensModal;