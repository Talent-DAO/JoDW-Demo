import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import cancelImage from "../assets/cancel.png";
import verifiedImage from "../assets/verified.png";
import clsx from "clsx";
import _ from "lodash";

const MessageModal = ({ open, withTitle = false, onSubmit, onClose }) => {
  const [data, setData] = useState({
    title: "",
    message: "",
  });
  const canSubmit = !_.isEmpty(data.message) && !(withTitle && _.isEmpty(data.title));

  const handleChange = e => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    onSubmit(data);
  };

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
          <div className="flex min-h-full items-end justify-center text-center sm:items-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <Dialog.Title className="flex items-center text-lg font-medium leading-6 text-gray-900 p-4 border-b-2 border-lavender">
                  <div className="flex items-center justify-center mx-auto">
                    <img
                      className="inline-block h-6 w-6 mr-2 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                    <span className="mr-2 text-sm">James Andrew</span>
                    <img className="w-4 h-4" src={verifiedImage} />
                  </div>
                  <button type="button" onClick={onClose}>
                    <img src={cancelImage} />
                  </button>
                </Dialog.Title>

                <div className="flex flex-col items-center p-8">
                  <h2 className="text-xl font-bold mb-4">Message</h2>
                  <p className="text-center mb-6 px-6 text-base text-darkgrey">
                    Sharing a link to your article and why it sould be reviewed or published, will increase the chances
                  </p>
                  {withTitle && (
                    <input
                      type="text"
                      value={data.title}
                      name="title"
                      className="block w-full rounded-md shadow-sm mb-4 p-4 border-2 border-lavender outline-none resize-none bg-guyabano sm:text-sm"
                      placeholder="Title"
                      onChange={handleChange}
                    />
                  )}
                  <textarea
                    name="message"
                    className="block w-full rounded-md shadow-sm mb-4 p-4 h-40 border-2 border-lavender outline-none resize-none bg-guyabano sm:text-sm"
                    placeholder="Your Message"
                    onChange={handleChange}
                    value={data.message}
                  />
                  <button
                    type="button"
                    className={clsx(
                      !canSubmit ? "bg-gray91" : "",
                      "inline-flex items-center justify-center rounded-full border border-transparent bg-primary w-full py-3 text-base font-medium text-white shadow-sm",
                    )}
                    disabled={!canSubmit}
                    onClick={handleSubmit}
                  >
                    Send Message
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default MessageModal;
