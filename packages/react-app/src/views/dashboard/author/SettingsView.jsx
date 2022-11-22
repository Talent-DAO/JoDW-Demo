import { Route, Routes } from "react-router-dom";
import Tab from "../../../components/dashboard/Tab";
import { UserCircleIcon, BellIcon } from "@heroicons/react/20/solid";
import ProfileSettingsView from "./ProfileSettingsView";
import NotificationSettingsView from "./NotificationSettingsView";

const defaultTabs = [
  { name: "Profile Page Settings", href: "/dashboard/author/settings/profile", Icon: UserCircleIcon },
  { name: "Notification Settings", href: "/dashboard/author/settings/notification", Icon: BellIcon },
];

const SettingsView = () => {
  return (
    <div className="bg-white p-6 divide-y divide-bordergrey m-6 rounded-lg">      
      <Tab tabs={defaultTabs} centered={true} />
      <div className="py-4">
        <Routes>
          <Route index element={<ProfileSettingsView />} />
          <Route path="/profile" element={<ProfileSettingsView />} />
          <Route path="/notification" element={<NotificationSettingsView />} />
        </Routes>
      </div>
    </div>
  );
};

export default SettingsView;