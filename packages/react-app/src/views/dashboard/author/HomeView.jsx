import { useState } from "react";
import ActionBar from "../../../components/dashboard/ActionBar";
import imageSubmit from "../../../assets/submit.png";
import imageBrowse from "../../../assets/browse.png";
import PublificationView from "./PublificationView";
import Summary from "../../../components/dashboard/Summary";
import TokenStats from "../../../components/dashboard/TokenStats";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

const publificationsTabs = [
  { name: "Recent Submissions", href: "/dashboard/author/home/submissions" },
  { name: "Recently published", href: "/dashboard/author/home/published" },
  { name: "Under review", href: "/dashboard/author/home/underreview" },
];

const HomeView = () => {
  const [showAlert, setShowAlert] = useState(true);
  return (
    <div className="p-6 flex flex-col space-y-6">
      {showAlert ? (
        <div className="flex flex-row bg-bgred p-3 text-primary items-center space-x-2">
          <ExclamationCircleIcon className="w-5 h-5" />
          <span>{"Epoch is live. (a 20 days period when papers are been reviewed)"}</span>
        </div>
      ) : null}
      <div className="flex-row space-x-4 hidden md:flex">
        <ActionBar
          title="Submit"
          desc="Make a Submission"
          image={imageSubmit}
          onClick={() => {
            console.log("TIGER");
          }}
        />
        <ActionBar
          title="Browse Publification"
          desc="View publifications"
          image={imageBrowse}
          onClick={() => {
            console.log("TIGER");
          }}
        />
        <ActionBar
          title="View Authors"
          desc="Authors"
          image={[imageBrowse, imageBrowse, imageBrowse]}
          onClick={() => {
            console.log("TIGER");
          }}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="col-span-1 md:col-span-4 -m-6">
          <PublificationView tabs={publificationsTabs} />
        </div>
        <div className="flex flex-col space-y-4 md:hidden">
          <ActionBar
            title="Submit"
            desc="Make a Submission"
            image={imageSubmit}
            onClick={() => {
              console.log("TIGER");
            }}
          />
          <ActionBar
            title="Browse Publification"
            desc="View publifications"
            image={imageBrowse}
            onClick={() => {
              console.log("TIGER");
            }}
          />
          <ActionBar
            title="View Authors"
            desc="Authors"
            image={[imageBrowse, imageBrowse, imageBrowse]}
            onClick={() => {
              console.log("TIGER");
            }}
          />
        </div>
        <div className="col-span-1 space-y-8">
          <Summary subscribers={10} publifications={45} timesCited={47} noOfComments={69} tipped={6568} />
          <TokenStats talents={43} ethereum={150} nfts={40} />
        </div>
      </div>
    </div>
  );
};

export default HomeView;
