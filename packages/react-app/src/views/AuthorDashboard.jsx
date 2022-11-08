import { FolderIcon, HomeIcon, AdjustmentsVerticalIcon, PowerIcon } from "@heroicons/react/24/outline";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import { Route, Routes } from "react-router-dom";

const navigation = [
  { name: "Dashboard", href: "/dashboard/author/home", icon: HomeIcon },
  { name: "My Publification", href: "/dashboard/author/publification", icon: FolderIcon },
  { name: "Settings", href: "/dashboard/author/settings", icon: AdjustmentsVerticalIcon },
  // { name: "Log Out", href: "#", icon: PowerIcon},
];

const HomeView = () => {
  return <div>HomeView</div>;
};

const MyPub = () => {
  return <div>MyPub</div>;
};

const AuthorDashboard = () => {
  return (
    <DashboardLayout navigation={navigation}>
      <Routes>
        <Route index element={<HomeView />} />
        <Route path="/home" element={<HomeView />} />
        <Route path="/publification" element={<MyPub />} />
      </Routes>
    </DashboardLayout>
  );
};

export default AuthorDashboard;
