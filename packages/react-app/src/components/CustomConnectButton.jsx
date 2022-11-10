import { Fragment } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import walletImage from "../assets/wallet.png";
import visitImage from "../assets/icon_visit.png";
import editImage from "../assets/icon_edit.png";
import copyImage from "../assets/icon_copy.png";
import logoutImage from "../assets/icon_logout.png";
import { Menu, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

const CustomItem = ({Icon, image, text, func, hasChild}) => {
  return (
    <div className="flex flex-row space-x-2 p-2 rounded-lg border border-bordergrey items-center cursor-pointer hover:bg-bordergrey" onClick={func}>
      { image ? <img src={image} className="w-5 h-5" /> : <Icon className="w-5 h-5 text-primary"/>}
      <span className="font-semibold font-mont" onClick={func}>{text}</span>
      {
        hasChild ? <ChevronUpIcon className="rotate-90 transform h-5 w-5 text-primary focus:outline-none" /> : null
      }
    </div>
  );
};

const CustomConnectButton = () => {
  return (
    <ConnectButton.Custom>
      {({ account, chain, openAccountModal, openChainModal, openConnectModal, authenticationStatus, mounted }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready && account && chain && (!authenticationStatus || authenticationStatus === "authenticated");

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    className="w-full flex flex-row items-center space-x-2 rounded-full bg-bgred text-primary border border-primary text-md px-2 py-2 cursor-pointer whitespace-nowrap font-mont font-medium justify-center"
                    onClick={openConnectModal}
                    type="button"
                  >
                    <img className="w-6 h-6 rounded-full" src={walletImage} />
                    <span className="font-bold">Connect Wallet</span>
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button
                    className="w-full flex flex-row items-center space-x-2 rounded-full bg-bgred text-primary border border-primary text-md px-2 py-2 cursor-pointer whitespace-nowrap font-mont font-medium justify-center"
                    onClick={openChainModal}
                    type="button"
                  >
                    <img className="w-6 h-6 rounded-full" src={walletImage} />
                    <span className="font-bold">Wrong Network</span>
                  </button>
                );
              }

              return (
                <div style={{ display: "flex", gap: 12 }}>
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex max-w-xs items-center rounded-full bg-white text-sm">
                        <span className="sr-only">Open login menu</span>
                        <button
                          className="w-full flex flex-row items-center space-x-2 rounded-full bg-bgred text-primary border border-primary text-md px-2 py-2 cursor-pointer whitespace-nowrap font-mont font-medium"
                          // onClick={openAccountModal}
                          type="button"
                        >
                          <img className="w-6 h-6 rounded-full" src={walletImage} />
                          <span className="font-bold">
                            {account.displayName}
                            {/* {account.displayBalance ? ` (${account.displayBalance})` : ""} */}
                          </span>
                          <ChevronUpIcon className="rotate-180 transform h-5 w-5 text-primary bg-bgred focus:outline-none" />
                        </button>
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-52 origin-top-right rounded-xl bg-white p-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none space-y-2">
                        <CustomItem image={walletImage} text="View Dashboard" hasChild />
                        <CustomItem image={visitImage} text="Visit Public Profile" />
                        <CustomItem image={editImage} text="Edit Profile" />
                        <CustomItem image={copyImage} text={account.displayName} />
                        <CustomItem image={logoutImage} text="Log Out" func={openAccountModal} />
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default CustomConnectButton;