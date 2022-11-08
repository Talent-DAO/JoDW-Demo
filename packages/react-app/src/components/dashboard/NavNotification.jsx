import { Fragment, useState } from "react";
import notificationImage from "../../assets/notification.png";
import { Menu, Transition } from "@headlessui/react";
import NavNotificationItem from "./NavNotificationItem";
import { BellIcon } from "@heroicons/react/24/outline";

const notifications = [
  { 
    title: "on Metaverse, NFT & DEFI, the new wave",
    state: "Comment",
    date: "18 MAR, 2022. 10:43",
    content: "Lorem ipsum dolor sit amet, consectetur adipis elit, sed do eiusmod tempor incidid"
  },{ 
    title: "on Metaverse, NFT & DEFI, the new wave",
    state: "Published",
    date: "18 MAR, 2022. 10:43",
    content: "Lorem ipsum dolor sit amet, consectetur adipis elit, sed do eiusmod tempor incidid"
  },{ 
    title: "on Metaverse, NFT & DEFI, the new wave",
    state: "Revised",
    date: "18 MAR, 2022. 10:43",
    content: "Lorem ipsum dolor sit amet, consectetur adipis elit, sed do eiusmod tempor incidid"
  },{ 
    title: "on Metaverse, NFT & DEFI, the new wave",
    state: "Comment",
    date: "18 MAR, 2022. 10:43",
    content: "Lorem ipsum dolor sit amet, consectetur adipis elit, sed do eiusmod tempor incidid"
  },{ 
    title: "on Metaverse, NFT & DEFI, the new wave",
    state: "Comment",
    date: "18 MAR, 2022. 10:43",
    content: "Lorem ipsum dolor sit amet, consectetur adipis elit, sed do eiusmod tempor incidid"
  }
];

const NavNotification = () => {

  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          <span className="sr-only">View notifications</span>
          <BellIcon className="h-8 w-8 rounded-full text-primary bg-bgred p-1"/>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-80 origin-top-right rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none bg-guyabano overflow-hidden">
          <div className="flex flex-row justify-between items-center p-2">
            <span className="text-darkblack font-bold text-lg">Notifications</span>
            <a className="text-sm cursor-pointer text-textgrey">Mark all as read</a>
          </div>
          <div className="divide-y bg-white p-2 divide-bordergrey">
            {notifications.map((notification, index) => (
              <Menu.Item key={index} className="">
                <NavNotificationItem notification={notification} />
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default NavNotification;
