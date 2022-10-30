import { convertToHttpUrl } from "../../utils/utils";

const MiniLensProfile = ({profile, onProfileSelected}) => {
  const handle = profile?.handle;
  const profilePictureUrl = convertToHttpUrl(profile?.picture?.original?.url || "");

  const handleClick = async () => {
    onProfileSelected && onProfileSelected(profile);
  };

  return (
    <>
      <a key={handle} onClick={handleClick} className="flex-col p-6 cursor-pointer group/item hover:bg-slate-100 justify-center">
        <img className="rounded-full w-24 mb-4 mx-auto" src={profilePictureUrl} />
        <h5 className="text-xl font-medium leading-tight mb-2">
          {handle}
        </h5>
      </a>
    </>
  );
};

export default MiniLensProfile;