import { Fragment, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  FolderIcon,
  HomeIcon,
  AdjustmentsVerticalIcon,
  XCircleIcon,
  PowerIcon,
} from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { CustomConnectButton } from "../components";
import { NavNotification } from "../components";
import logoImage from "../assets/talent-logo.png";
import discordImage from "../assets/discord-icon.png";
import SidebarItem from "../components/dashboard/SidebarItem";

const navigation = [
  { name: "Dashboard", href: "#", icon: HomeIcon, current: true },
  { name: "My Publification", href: "#", icon: FolderIcon, current: false },
  { name: "Settings"  , href: "#", icon: AdjustmentsVerticalIcon, current: false },
  { name: "Log Out", href: "#", icon: PowerIcon, current: false },
];

const DiscordImage = () => {
  return <img src={discordImage} className="mx-2 w-4 h-3" />;
};

const AuthorDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 md:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-textgrey bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white pt-5 pb-4 items-center rounded-r-3xl mt-12">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 pt-4 mr-4">
                      <button
                        type="button"
                        className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XCircleIcon className="h-10 w-10 text-black" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="mt-24 h-0 flex-1 overflow-y-auto w-56">
                    <nav className="flex-1 px-2">
                      <div className="space-y-1">
                        {navigation.map(item => (
                          <SidebarItem item={item} />
                        ))}
                      </div>
                      <div className="mt-48">
                        <SidebarItem item={{ name: "Community", href: "#", icon: DiscordImage, current: true }} />
                      </div>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className="w-14 flex-shrink-0" aria-hidden="true">
                {/* Dummy element to force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-grow flex-col overflow-y-auto border-r border-bordergrey bg-white pt-5 items-center">
            <div className="flex flex-shrink-0 items-center px-4">
              <img className="h-10 w-auto" src={logoImage} alt="TalentDAO" />
            </div>
            <div className="mt-24 flex flex-grow flex-col">
              <nav className="flex-1 px-2 pb-4">
                <div className="space-y-1">
                  {navigation.map(item => (
                    <SidebarItem item={item} />
                  ))}
                </div>
                <div className="mt-48">
                  <SidebarItem item={{ name: "Community", href: "#", icon: DiscordImage, current: true }} />
                </div>
              </nav>
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col md:pl-64">
          <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
            <div className="flex flex-shrink-0 items-center px-4 md:hidden">
              <img className="h-10 w-auto" src={logoImage} alt="TalentDAO" />
            </div>
            <div className="flex flex-1 justify-end px-4">
              <div className="ml-4 items-center md:ml-6 space-x-4 hidden md:flex">
                {/* Notification dropdown */}
                <NavNotification />
                <CustomConnectButton />
              </div>
              <button
                type="button"
                className="px-4 text-darkgrey focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>

          <main className="flex-1">
            <div className="py-6">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                <h1 className="text-2xl font-semibold text-darkgray">Dashboard</h1>
              </div>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                {/* Replace with your content */}
                <div className="py-4">
                  <div className="h-96 rounded-lg border-4 border-dashed border-gray-200" />
                </div>
                {/* /End replace */}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default AuthorDashboard;