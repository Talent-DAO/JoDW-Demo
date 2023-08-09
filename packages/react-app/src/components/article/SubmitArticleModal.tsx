// todo: swap out antd for chakra components
import { Profile } from "@jaxcoder/lens";
import { Modal } from "antd";
import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ArticlePreview } from "..";
import { fetchLensUserSuccess, LensUser, Status, UserRootState } from "../../features/user/userSlice";
import { useLensProfiles } from "../../hooks";
import { NewArticleFormData } from "../../lib/shared/interfaces";
import MiniLensProfile from "../lens/MiniLensProfile";
import { Dialog, Transition } from "@headlessui/react";

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
  const lensProfiles: { profiles: Array<Profile> | null } = useLensProfiles();
  const props = useSelector((state: { user: UserRootState }) => {
    return {
      currentLensProfile: state.user.user.lensProfile,
    };
  });

  const handleLensProfileSelected = (profile: Profile) => {
    dispatch(fetchLensUserSuccess({
      id: profile?.id,
      handle: profile?.handle,
      image: profile?.picture?.original,
      walletId: profile?.ownedBy,
      status: Status.Success,
      name: profile?.name || undefined,
      coverImage: profile?.coverPicture?.original || undefined,
      bio: profile?.bio || undefined,
      aboutMe: undefined,
      twitter: undefined,
      linkedin: undefined,
      tipAddress: undefined,
      categories: undefined
    }));
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        title="Submit Article"
        open={isOpen}
        onClose={e => console.log("Article submitted!")}
        // wrapClassName="rounded-modal"
        className="relative z-50"
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
          {/* The backdrop, rendered as a fixed sibling to the panel container */}
          <div className="fixed inset-0" style={{backgroundColor: "rgba(0,0,0,0.7)"}} aria-hidden="true" />
        </Transition.Child>

        {/* Full-screen container to center the panel */}
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Submit Article
                </Dialog.Title>
                <Dialog.Description>
                  <div className="mt-2">
                    <div className="grid grid-cols-2 grid-flow-row auto-rows-max justify-center w-full">
                      <div>
                        <ArticlePreview article={article} />
                      </div>
                      <div className="pl-4 content-center justify-center">
                        {props.currentLensProfile?.id !== 0 &&
                        <>
                          <div className="p-3">
                            <h2 className="text-l font-bold">Submitting as</h2>
                            <div className="text-center">
                              <MiniLensProfile profile={props.currentLensProfile} />
                            </div>
                          </div>
                        </>}
                        {/** TODO: Provide an option to change the current lens profile */}
                        {props.currentLensProfile?.id === 0 &&
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
                        <div>
                          <button
                            className="ml-4 px-4 py-1 text-sm text-red font-semibold rounded-full border"
                            style={{borderColor: "#991b1b", color: "#991b1b"}}
                            onClick={() => onSuccess({ article: article, lensProfile: props.currentLensProfile })}
                          >
                          Confirm &amp; Publish!
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Description>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default SubmitArticleModal;
