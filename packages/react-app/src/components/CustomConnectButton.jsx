import { ConnectButton } from "@rainbow-me/rainbowkit";

export const CustomConnectButton = () => {
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
