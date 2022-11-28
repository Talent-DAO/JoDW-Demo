import { Route, Routes } from "react-router-dom";
import Tab from "../../../components/dashboard/Tab";
import Publifications from "../../../components/dashboard/Publifications";
import { ChevronUpIcon } from "@heroicons/react/20/solid";

const defaultTabs = [
  { name: "Recent Submissions", href: "/dashboard/author/publification/submissions" },
  { name: "Recently published", href: "/dashboard/author/publification/published" },
  { name: "Under review", href: "/dashboard/author/publification/underreview" },
];

const PublificationView = ({ tabs }) => {
  const handleSubmit = () => {};

  const noPubsInfo = {
    text: "Make a Submission",
    desc: "Upload your next publification",
    onClick: handleSubmit,
  };

  return (
    <div className="bg-white p-6 divide-y divide-bordergrey m-6 rounded-lg">
      <Tab tabs={tabs ? tabs : defaultTabs} />
      <div className="py-4">
        <Routes>
          <Route index element={<Publifications noPubsInfo={noPubsInfo} />} />
          <Route path="/submissions" element={<Publifications pubs={[]} noPubsInfo={noPubsInfo} />} />
          <Route path="/published" element={<Publifications pubs={[]} noPubsInfo={noPubsInfo} />} />
          <Route path="/underreview" element={<Publifications pubs={[]} noPubsInfo={noPubsInfo} />} />
        </Routes>
      </div>
      <div className="sm:hidden text-center text-primary flex flex-row p-3 items-center justify-center">
        <span>Load More</span>
        <ChevronUpIcon className="rotate-180 transform h-5 w-5 focus:outline-none" />
      </div>
    </div>
  );
};

export default PublificationView;
