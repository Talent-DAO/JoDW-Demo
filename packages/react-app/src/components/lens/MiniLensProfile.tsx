import { Profile } from "@jaxcoder/lens";
import React from "react";
import { convertToHttpUrl } from "../../utils/utils";

const MiniLensProfile = ({profile, onProfileSelected = () => {}}: { profile: Profile; onProfileSelected: any; }) => {
  const handle = profile?.handle;
  const profilePictureUrl = convertToHttpUrl((profile?.picture?.original?.url || profile.image) || "");

  const handleClick = async () => {
    onProfileSelected && onProfileSelected(profile);
  };

  if (!profile) {
    return (
      <div className="mx-auto text-center">
        No eligible lens profile to display.
      </div>
    );
  }

  return (
    <>
      <a
        key={handle}
        onClick={handleClick}
        className="flex-col p-6 cursor-pointer group/item hover:bg-slate-100 justify-center"
      >
        <img className="rounded-full w-24 mb-4 mx-auto" src={profilePictureUrl} />
        <h5 className="text-md font-medium leading-tight mb-2">
          {handle}
        </h5>
      </a>
    </>
  );
};

export default MiniLensProfile;