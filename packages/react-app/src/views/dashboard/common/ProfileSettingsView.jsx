import authorBackImage from "../../../assets/author_back.png";
import authorImage from "../../../assets/author_pro.png";
import nftImage from "../../../assets/article_back.png";
import twitterImage from "../../../assets/twitter.png";
import linkedinImage from "../../../assets/linkedin.png";
import { ArrowUpTrayIcon } from "@heroicons/react/20/solid";
import PrimaryButton from "../../../components/dashboard/PrimaryButton";

const UploadButton = () => {
  return (
    <div className="flex bg-bgred w-12 h-12 rounded-full items-center justify-center cursor-pointer">
      <ArrowUpTrayIcon className="w-6 h-6 text-primary" />
    </div>
  );
};

const ProfileSettingsView = ({ hasTips = false}) => {
  return (
    <div className="p-4 md:p-24 flex flex-col">
      <img className="w-full h-48 rounded-t-xl" src={authorBackImage} />
      <div className="flex flex-col md:flex-row py-8 items-center md:items-start -mt-24 md:mt-0 space-y-2 md:space-x-24">
        <img className="w-48 h-48 rounded-full border-2 border-white" src={authorImage} />
        <div className="flex flex-col w-full items-center md:items-start">
          <div className="font-bold text-2xl py-4 border-b border-bordergrey w-full text-center md:text-left">
            Profile Picture
          </div>
          <div className="flex flex-col md:flex-row md:space-x-36">
            <div className="flex flex-row md:flex-col mt-4 sm:mt-2">
              <div className="py-2 px-2 sm:px-0 sm:py-2 font-bold text-lg">Upload an image</div>
              <UploadButton />
            </div>
            <div className="">
              <div className="py-2 mt-4">Pick among NFTs in your wallet</div>
              <div className="flex flex-row space-x-4 justify-center sm:justify-start">
                <img className="rounded-full w-12 h-12 cursor-pointer" src={nftImage} />
                <img className="rounded-full w-12 h-12 cursor-pointer" src={nftImage} />
                <img className="rounded-full w-12 h-12 cursor-pointer" src={nftImage} />
              </div> 
            </div>
          </div>
        </div>
      </div>
      <div className="p-8 border-2 border-bordergrey rounded-xl space-y-10 pb-24">
        <div className="space-y-8">
          <div className="font-bold text-2xl mb-8">Profile</div>
          <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
            <div className="col-span-1 font-bold text-lg">Name</div>
            <div className="col-span-2">
              <input
                type="text"
                name="name"
                id="name"
                class="block w-full rounded-md border-bordergrey border-2 sm:text-sm"              
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 items-start gap-4">
            <div className="col-span-1 font-bold text-lg">
              Bio
              <div className="text-base font-normal">
                Provide a brief description for your profile.
              </div>
            </div>
            <div className="col-span-2">
              <textarea
                rows={4}
                className="block w-full bg-transparent text-lg rounded-md focus:outline-none border-2 border-bordergrey"
              />
            </div>
          </div>
        </div>
        <div className="space-y-8">
          <div className="font-bold text-2xl mb-8">Social Media</div>
          <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
            <div className="col-span-1 font-bold text-lg flex items-center">
              <img className="w-8 h-8 mr-4" src={twitterImage} />
              Twitter
            </div>
            <div className="col-span-2">
              <input
                type="text"
                name="twitter"
                id="twitter"
                class="block w-full rounded-md border-bordergrey border-2 sm:text-sm"              
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
            <div className="col-span-1 font-bold text-lg flex items-center">
              <img className="w-8 h-8 mr-4" src={linkedinImage} />
              Linkedin
            </div>
            <div className="col-span-2">
              <input
                type="text"
                name="linkedin"
                id="linkedin"
                class="block w-full rounded-md border-bordergrey border-2 sm:text-sm"              
              />
            </div>
          </div>
        </div>
        <div className="space-y-8">
          <div className="font-bold text-2xl mb-8">Tips</div>
          <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
            <div className="col-span-1 font-bold text-lg">
              Tips address
            </div>
            <div className="col-span-2">
              <input
                type="text"
                name="tipAddress"
                id="tipAddress"
                class="block w-full rounded-md border-bordergrey border-2 sm:text-sm"              
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="mx-auto hidden md:block" />
          <PrimaryButton text="Save Changes" />
        </div>
      </div>
    </div>
  );
};

export default ProfileSettingsView;
