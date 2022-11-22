import { FolderIcon, HomeIcon, AdjustmentsVerticalIcon, PowerIcon } from "@heroicons/react/24/outline";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { Route, Routes } from "react-router-dom";
import HomeView from "./author/HomeView";
import PublificationView from "./author/PublificationView";
import SettingsView from "./author/SettingsView";
import AuthorsView from "./author/AuthorsView";
import SubmitView from "./author/SubmitView";

const navigation = [
  { name: "Dashboard", href: "/dashboard/author/home", icon: HomeIcon },
  { name: "My Publification", href: "/dashboard/author/publification", icon: FolderIcon },
  { name: "Settings", href: "/dashboard/author/settings", icon: AdjustmentsVerticalIcon },
  // { name: "Log Out", href: "#", icon: PowerIcon},
];

const AuthorDashboard = () => {
  return (
    <DashboardLayout navigation={navigation}>
      <Routes>
        <Route index element={<HomeView />} />
        <Route path="/home/*" element={<HomeView />} />
        <Route path="/publification/*" element={<PublificationView />} />
        <Route path="/settings/*" element={<SettingsView />} />
        <Route path="/authors" element={<AuthorsView />} />
        <Route path="/submit" element={<SubmitView />} />
      </Routes>
    </DashboardLayout>
  );
};

export default AuthorDashboard;
