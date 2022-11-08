import react, { useState, useEffect } from "react";
import clsx from "clsx";

const NavNotificationItem = ({ notification }) => {
  return (
    <div className="bg-white py-2">
      <div className="flex flex-row items-center space-x-4">
        <span
          className={clsx(
            notification.state == "Comment"
              ? "bg-bgblue text-blue"
              : ( notification.state == "Published" ? "bg-bggreen text-green" : "bg-bgred text-primary" ),
            "rounded-lg py-1 px-2 font-medium",
          )}
        >
          {notification.state}
        </span>
        <span className="text-textgrey">{notification.date}</span>
      </div>
      <a className="text-md text-darkblack font-semibold">{notification.title}</a>
      <div className="text-sm text-textgrey">{notification.content}</div>
    </div>
  );
};

export default NavNotificationItem;
