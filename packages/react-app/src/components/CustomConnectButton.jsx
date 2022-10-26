import { ConnectButton } from "@rainbow-me/rainbowkit";

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
                    className="w-full rounded-full bg-primary text-white text-md px-8 py-3 cursor-pointer whitespace-nowrap font-mont font-medium"
                    onClick={openConnectModal}
                    type="button"
                  >
                    Connect Wallet
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button
                    className="w-full rounded-full bg-primary text-white text-md px-8 py-3 cursor-pointer whitespace-nowrap font-mont font-medium"
                    onClick={openChainModal}
                    type="button"
                  >
                    Wrong Network
                  </button>
                );
              }

              return (
                <div style={{ display: "flex", gap: 12 }}>
                  <button
                    className="w-full rounded-full bg-primary text-white text-md px-8 py-2 cursor-pointer whitespace-nowrap"
                    onClick={openAccountModal}
                    type="button"
                  >
                    {account.displayName}
                    {account.displayBalance ? ` (${account.displayBalance})` : ""}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

// {/* Profile dropdown */}
// <Menu as="div" className="relative ml-3">
// <div>
//   <Menu.Button className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
//     <span className="sr-only">Open user menu</span>
//     <img
//       className="h-8 w-8 rounded-full"
//       src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
//       alt=""
//     />
//   </Menu.Button>
// </div>
// <Transition
//   as={Fragment}
//   enter="transition ease-out duration-100"
//   enterFrom="transform opacity-0 scale-95"
//   enterTo="transform opacity-100 scale-100"
//   leave="transition ease-in duration-75"
//   leaveFrom="transform opacity-100 scale-100"
//   leaveTo="transform opacity-0 scale-95"
// >
//   <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
//     {userNavigation.map(item => (
//       <Menu.Item key={item.name}>
//         {({ active }) => (
//           <a
//             href={item.href}
//             className={classNames(
//               active ? "bg-gray-100" : "",
//               "block px-4 py-2 text-sm text-gray-700",
//             )}
//           >
//             {item.name}
//           </a>
//         )}
//       </Menu.Item>
//     ))}
//   </Menu.Items>
// </Transition>
// </Menu>

export default CustomConnectButton;