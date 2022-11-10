const TokenStats = ({ talents, ethereum, nfts }) => {
  return (
    <div className="bg-white text-lg rounded-lg p-4 divide-y divide-bordergrey">
      <div className="font-bold font-mont pb-4">Tokens</div>
      <div className="text-textgrey space-y-4 pt-4">
        {talents ? (
          <div className="flex flex-row justify-between">
            <span>TALENTS</span>
            <span>{talents}</span>
          </div>
        ) : null}
        {ethereum ? (
          <div className="flex flex-row justify-between">
            <span>Ethereum</span>
            <span>{ethereum}</span>
          </div>
        ) : null}
        {nfts ? (
          <div className="flex flex-row justify-between">
            <span>NFTs</span>
            <span>{nfts}</span>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default TokenStats;
