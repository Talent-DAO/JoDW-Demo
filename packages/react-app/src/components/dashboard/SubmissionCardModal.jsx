import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import pubImage from "../../assets/technology-data.png";
import { ArrowsPointingOutIcon, XMarkIcon, ClipboardDocumentCheckIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";

const SubmissionCardModal = ({ open, article, onClose }) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-darkgray bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto font-mont">
          <div className="flex min-h-full items-center justify-center text-center sm:items-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-5xl pb-12">
                <Dialog.Title className="flex items-center text-lg font-medium leading-6 text-gray-900 p-4">
                  <div className="flex items-center justify-center mx-auto" />
                  <button type="button" onClick={onClose} className="mr-3">
                    <ArrowsPointingOutIcon className="w-5 h-5" />
                  </button>
                  <button type="button" onClick={onClose}>
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </Dialog.Title>

                <div className="flex flex-col px-8 sm:px-24 py-4 space-y-4">
                  <img src={pubImage} className="w-full h-32 rounded-xl" />
                  <div className="text-2xl font-bold mb-4">Metaverse, NFT & DEFI, the new wave</div>
                  <p className="text-textgrey text-base">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In vitae turpis massa sed elementum tempus egestas sed sed. egestas sed sed. Laoreet...
                  </p>
                  <a className="text-primary underline font-bold">Read More</a>
                  <div className="p-2 border-b border-t border-bordergrey flex flex-row justify-between items-center">
                    <div className="flex flex-row">
                      <StarIcon className="text-primary w-5 h-5 mr-3"/>
                      Star
                    </div>
                    <div className="flex flex-row space-x-2">
                      <SecondaryButton text="Revise" Icon={XCircleIcon} />
                      <PrimaryButton text="Approve" Icon={ClipboardDocumentCheckIcon} />
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <div className="text-lg font-bold mb-4">Article Details</div>
                    <div className="flex flex-row justify-between">
                      <div className="text-textgrey">Reviews</div>
                      <div className="text-primary underline font-bold">View</div>
                    </div>
                    <div className="flex flex-row justify-between">
                      <div className="text-textgrey">Comments</div>
                      <div className="text-primary underline font-bold">View</div>
                    </div>
                    <div className="flex flex-row justify-between">
                      <div className="text-textgrey">Approved</div>
                      <div className="text-textgrey">Yes</div>
                    </div>
                    <div className="flex flex-row justify-between">
                      <div className="text-textgrey">No of approvals</div>
                      <div className="text-textgrey">5</div>
                    </div>
                    <div className="flex flex-row justify-between">
                      <div className="text-textgrey">Revised</div>
                      <div className="text-textgrey">0</div>
                    </div>
                    <div className="flex flex-row justify-between">
                      <div className="text-textgrey">Likes</div>
                      <div className="text-textgrey">22</div>
                    </div>
                    <div className="flex flex-row justify-between">
                      <div className="text-textgrey">Dislikes</div>
                      <div className="text-textgrey">2</div>
                    </div>
                    <div className="flex flex-row justify-between">
                      <div className="text-textgrey">Published</div>
                      <div className="text-green flex flex-row">
                        Yes
                        <ClipboardDocumentCheckIcon className="ml-1 w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default SubmissionCardModal;
