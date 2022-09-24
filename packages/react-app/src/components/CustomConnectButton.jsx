import { ConnectButton } from '@rainbow-me/rainbowkit';

export const CustomConnectButton = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus ||
            authenticationStatus === 'authenticated');

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              'style': {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button className="w-full rounded-full bg-primary text-white text-md px-8 py-2 cursor-pointer whitespace-nowrap" onClick={openConnectModal} type="button">
                    CONNECT
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button className="w-full rounded-full bg-primary text-white text-md px-8 py-2 cursor-pointer whitespace-nowrap" onClick={openChainModal} type="button">
                    WRONG NETWORK
                  </button>
                );
              }

              return (
                <div style={{ display: 'flex', gap: 12 }}>
                  {/* <button
                    // className="w-full rounded-full bg-primary text-white text-md px-8 py-2 cursor-pointer whitespace-nowrap"
                    onClick={openChainModal}
                    style={{ display: 'flex', alignItems: 'center' }}
                    type="button"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 12,
                          height: 12,
                          borderRadius: 999,
                          overflow: 'hidden',
                          marginRight: 4,
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            style={{ width: 12, height: 12 }}
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </button> */}

                  <button 
                    className="w-full rounded-full bg-primary text-white text-md px-8 py-2 cursor-pointer whitespace-nowrap"
                    onClick={openAccountModal} type="button">
                    {account.displayName}
                    {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ''}
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