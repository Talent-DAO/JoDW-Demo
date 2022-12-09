import { FolderIcon, HomeIcon, AdjustmentsVerticalIcon, NewspaperIcon, GiftIcon } from "@heroicons/react/24/outline";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { Route, Routes } from "react-router-dom";

import HomeView from "./reviewer/HomeView";
import ReviewView from "./reviewer/ReviewView";
import RewardsView from "./reviewer/RewardsView";
import PublificationView from "./reviewer/PublificationView";
import SettingsView from "./reviewer/SettingsView";

import AuthorsView from "./common/AuthorsView";
import SubmitView from "./common/SubmitView";

const navigation = [
  { name: "Dashboard", href: "/dashboard/reviewer/home", icon: HomeIcon },
  { name: "Review", href: "/dashboard/reviewer/review", icon: NewspaperIcon },
  { name: "My Publification", href: "/dashboard/reviewer/publification", icon: FolderIcon },
  { name: "Rewards", href: "/dashboard/reviewer/rewards", icon: GiftIcon },
  { name: "Settings", href: "/dashboard/reviewer/settings", icon: AdjustmentsVerticalIcon },
  // { name: "Log Out", href: "#", icon: PowerIcon},
];

const ReviewerDashboard = () => {
  return (
    <DashboardLayout navigation={navigation}>
      <Routes>
        <Route index element={<HomeView />} />
        <Route path="/home/*" element={<HomeView />} />
        <Route path="/review" element={<ReviewView />} />
        <Route path="/publification/*" element={<PublificationView />} />
        <Route path="/rewards" element={<RewardsView />} />
        <Route path="/settings/*" element={<SettingsView />} />
        <Route path="/authors" element={<AuthorsView />} />
        <Route path="/submit" element={<SubmitView />} />
      </Routes>
    </DashboardLayout>
  );
};

export default ReviewerDashboard;
