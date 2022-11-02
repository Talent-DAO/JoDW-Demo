import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "antd";
import { Profile } from "../graphql/queries/lens";
import { NewArticleFormData } from "../lib/shared/interfaces";
import { ArticlePreview } from "./";
import { useLensAuth, useLensProfiles } from "../hooks";
import { useAccount } from "wagmi";
import MiniLensProfile from "./lens/MiniLensProfile";
import { Status, UserRootState, fetchLensUserSuccess, LensUser } from "../features/user/userSlice";

type SubmitArticleModalSuccessResult = {
  article: NewArticleFormData;
  lensProfile: LensUser;
};

type SubmitArticleParams = {
  article: NewArticleFormData;
  isOpen: boolean;
  onSuccess: (result: SubmitArticleModalSuccessResult) => void;
  onError: (error: Error) => void;
};

const SubmitArticleModal = ({ article, isOpen, onError, onSuccess }: SubmitArticleParams) => {

  const dispatch = useDispatch();
  const { address } = useAccount();
  const lensAuth = useLensAuth(address, () => !isOpen);
  const lensProfiles: { profiles: Array<Profile> | null } = useLensProfiles();
  const currentLensProfile = useSelector((state: { user: UserRootState }) =>
    state.user.user.lensProfile
  );

  const handleLensProfileSelected = (profile: Profile) => {
    dispatch(fetchLensUserSuccess({
      id: profile?.id,
      handle: profile?.handle,
      image: profile?.picture?.original?.url,
      walletId: profile?.ownedBy,
      status: Status.Success
    }));
  };

  return (
    <Modal
      title="Submit Article"
      centered
      visible={isOpen}
      footer={null}
      wrapClassName="rounded-modal"
    >
      <div className="grid grid-cols-2 gap-4">
        <div>
          <ArticlePreview article={article} />
        </div>
        <div>
          {currentLensProfile?.status === Status.Success &&
          <>
            <div className="p-3">
              <h2 className="text-l font-bold">Submitting as</h2>
              <div className="text-center">
                <MiniLensProfile profile={currentLensProfile} />
              </div>
            </div>
          </>}
          {/** TODO: Provide an option to change the current lens profile */}
          {currentLensProfile?.handle === "" &&
          <>
            <div className="p-3">
              <h2 className="text-l font-bold">Select Lens Profile</h2>
              {lensProfiles?.profiles?.length === 0 ?
                <MiniLensProfile profile={undefined} /> :
                <div className="grid grid-cols-2 gap-4">
                  {lensProfiles?.profiles?.map(profile => <MiniLensProfile profile={profile} onProfileSelected={handleLensProfileSelected} />)}
                </div>
              }
            </div>
          </>}
          <div className="p-3 text-centered">
            <button
              className="bg-primary text-white py-2 px-6 rounded-full text-lg"
              onClick={() => onSuccess({ article: article, lensProfile: currentLensProfile })}
            >
              Confirm &amp; Publish!
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SubmitArticleModal;
