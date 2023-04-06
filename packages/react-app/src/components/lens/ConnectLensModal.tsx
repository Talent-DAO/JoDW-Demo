
import { Dialog, Transition } from "@headlessui/react";
import { Profile, useProfilesQuery } from "@jaxcoder/lens";
import { Col, Row, Space, Spin } from "antd";
import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { useAccount } from "wagmi";
import { fetchLensUserSuccess, Status } from "../../features/user/userSlice";
import { getProfilePicture } from "../../lib/lens/publications/getPostAsArticle";
// import { ipfsGetByPath } from "../../utils/ipfs";
import { convertToHttpUrl } from "../../utils/utils";
import MiniLensProfile from "./MiniLensProfile";

type ConnectLensModalParams = {
  isOpen: boolean;
  onConnectSuccess?: (profile: Profile) => void;
  onConnectError?: (error: Error) => void;
  onConnectCancel?: () => void;
};

const ConnectLensModal = ({ isOpen, onConnectSuccess = (_) => { }, onConnectError = () => { }, onConnectCancel = () => { } }: ConnectLensModalParams) => {
  const dispatch = useDispatch();
  const { address } = useAccount();
  const { data: lensProfilesData, loading: lensProfilesIsLoading, error: lensProfileLoadError } = useProfilesQuery({
    variables: {
      request: { ownedBy: [address || ""] }
    },
  });
  const [showModal, setShowModal] = useState(isOpen);

  function closeModal() {
    setShowModal(false);
  }

  console.log("JER lensProfileLoadError", lensProfilesData);

  const onProfileSelected = async (profile: Profile) => {
    onConnectSuccess(profile);
    const attrs = profile?.attributes || [];
    dispatch(fetchLensUserSuccess({
      id: profile?.id,
      handle: profile?.handle,
      name: profile?.name ?? "",
      image: convertToHttpUrl(getProfilePicture(profile?.picture)) || attrs.find((a: any) => a?.key === "authorImage")?.value,
      walletId: profile?.ownedBy,
      coverImage: attrs.find((a: any) => a?.key === "coverImage")?.value || undefined,
      bio: profile?.bio || undefined,
      aboutMe: attrs.find((a: any) => a?.key === "aboutMe")?.value || undefined,
      twitter: attrs.find((a: any) => a?.key === "twitter")?.value || undefined,
      linkedin: attrs.find((a: any) => a?.key === "linkedin")?.value || undefined,
      tipAddress: attrs.find((a: any) => a?.key === "tipAddress")?.value || undefined,
      categories: attrs.find((a: any) => a?.key === "popularCategories")?.value?.split(",") || undefined,
      status: Status.Success,
    }));
  };

  const availableLensProfiles = lensProfilesData?.profiles?.items;

  const miniLensProfileDisplayRow =
    availableLensProfiles && availableLensProfiles.map((profile) =>
      <Col><MiniLensProfile profile={profile} onProfileSelected={onProfileSelected} /></Col>);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        open={showModal}
        onClose={onConnectCancel}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel>
                <Dialog.Title className="flex justify-center items-center mt-10">Connect your LENS profile</Dialog.Title>
                <Row justify="center" gutter={16}>
                  {lensProfilesIsLoading ? (
                    <Col>
                      <Space direction="vertical">
                        <Space direction="horizontal" style={{ width: "100%", justifyContent: "center" }}>
                          <Space>
                            <Spin />
                          </Space>
                        </Space>
                        <Space>
                          Loading connected Lens profiles...
                        </Space>
                      </Space>
                    </Col>
                  ) : availableLensProfiles?.length === 0
                    ? <Col>You don't have any Lens profiles yet!</Col>
                    : miniLensProfileDisplayRow
                  }
                </Row>
                <div className="mt-2 flex flex-col items-center justify-center">
                  <p className="flex text-sm text-gray-500">
                    Please select a Lens profile to contunie to the Journal
                  </p>
                </div>

                <div className="mt-4 flex flex-col items-center justify-center mb-4">
                  <button
                    type="button"
                    className="flex justify-center rounded-md border border-primary bg-primary text-white px-4 py-2 text-sm font-medium hover:bg-red focus:outline-none focus-visible:ring-2"
                    onClick={() => closeModal()}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ConnectLensModal;
