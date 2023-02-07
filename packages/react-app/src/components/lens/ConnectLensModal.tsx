
import { Profile, useProfilesQuery } from "@jaxcoder/lens";
import { Col, Modal, Row, Space, Spin } from "antd";
import React from "react";
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
    <Modal
      title="Connect your Lens profile 🌱"
      centered
      open={isOpen}
      onCancel={onConnectCancel}
      onConnectError={onConnectError}
      visible={isOpen}
      footer={null}
    >
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
        ) : availableLensProfiles?.length === 0 ? <Col>You don't have any Lens profiles yet!</Col> : miniLensProfileDisplayRow
        }
      </Row>
    </Modal>
  );
};

export default ConnectLensModal;
