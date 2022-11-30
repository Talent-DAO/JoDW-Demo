import imageIllustration from "../../assets/illustration.png";
import PrimaryButton from "./PrimaryButton";

const NoPublification = ({ noPubsInfo }) => {
  return (
    <div className="flex flex-col w-full space-y-6 items-center py-36">
      <img src={imageIllustration} />
      <div className="flex flex-col items-center">
        <div className="font-bold text-2xl">Nothing to see here</div>
        <span>{noPubsInfo.desc}</span>      
      </div>
      <PrimaryButton text={noPubsInfo.text} onClick={noPubsInfo.onClick} />
    </div>
  );
};

export default NoPublification;
