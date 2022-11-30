import React, { useEffect, useState } from "react";
import authorImage from "../../assets/featured_author.png";
import { FolderIcon, UserCircleIcon, EllipsisVerticalIcon } from "@heroicons/react/24/outline";

export const AuthorCard = () => {
  
  return (
    <div className="bg-white border border-bordergrey">
      <div className="w-full h-48 relative">
        <div className="absolute top-3 right-3 bg-white rounded-full cursor-pointer border border-bordergrey">
          <EllipsisVerticalIcon className="w-6 h-6 text-black" />
        </div>
        <img className="w-full h-full" src={authorImage} alt="" />
      </div>
      <div className="p-4 flex flex-col space-y-4">
        <div className="flex flex-row space-x-2">
          <div className="rounded-3xl px-2 bg-bgred text-red">DeSci</div>
          <div className="rounded-3xl px-2 bg-bgblue text-blue">History</div>
          <div className="rounded-3xl px-2 bg-bgpurple text-purple">Art</div>
        </div>
        <div>
          <div className="text-xl font-bold text-black">Michael Tomie</div>
          <div className="text-md text-black">The new way of tech is hitting...</div>
        </div>
        <div className="border-t border-bordergrey py-2 flex flex-row space-x-2">
          <div className="flex flex-row space-x-1 text-textgrey items-center">
            <FolderIcon className="w-4 h-4" />&nbsp;20 articles
          </div>
          <div className="flex flex-row space-x-1 text-textgrey items-center">
            <UserCircleIcon className="w-4 h-4" />&nbsp;Functional writer
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorCard;
