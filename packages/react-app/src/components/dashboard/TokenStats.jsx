import ImageButton from "./ImageButton";
import { PhotoIcon } from "@heroicons/react/20/solid";

const TokenStats = ({ talents, ethereum, nfts }) => {
  return (
    <div className="bg-white text-lg rounded-lg p-4 divide-y divide-bordergrey">
      <div className="font-bold font-mont pb-4">Tokens</div>
      <div className="text-textgrey space-y-4 pt-4">
        {talents ? (
          <div className="flex flex-row justify-between items-center">
            <span>TALENTS</span>
            <span>{talents}</span>
          </div>
        ) : null}
        {ethereum ? (
          <div className="flex flex-row justify-between items-center">
            <span>Ethereum</span>
            <span>{ethereum}</span>
          </div>
        ) : null}
        {nfts ? (
          <div className="flex flex-row justify-between items-center">
            <span>NFTs</span>
            <span>{nfts}</span>
          </div>
        ) : null}
        <ImageButton text="View Talents NFTs" Icon={PhotoIcon}/>
      </div>
    </div>
  );
};

export default TokenStats;
