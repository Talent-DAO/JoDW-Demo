import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ActionBar from "../../../components/dashboard/ActionBar";
import imageBrowse from "../../../assets/browse.png";
import imageRewards from "../../../assets/rewards.png";
import imageSubmit from "../../../assets/submit.png";
import PublificationView from "./PublificationView";
import Summary from "../../../components/dashboard/Summary";
import TokenStats from "../../../components/dashboard/TokenStats";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import Connections from "../../../components/dashboard/Connections";

const publificationsTabs = [
  { name: "Reviewed Publification", href: "/dashboard/reviewer/home/mine" },
];

const HomeView = () => {
  const [showAlert, setShowAlert] = useState(true);
  const navigate = useNavigate();

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
          title="Review publification"
          desc="Browse Publifications"
          image={imageBrowse}
          onClick={() => {
            navigate("/dashboard/reviewer/review");
          }}
        />
        <ActionBar
          title="Submit"
          desc="Make a Submission"
          image={imageSubmit}
          onClick={() => {
            navigate("/dashboard/reviewer/submit");
          }}
        />
        <ActionBar
          title="View Rewards"
          desc="Earning"
          image={imageRewards}
          onClick={() => {
            navigate("/dashboard/reviewer/rewards");
          }}
        />
        <ActionBar
          title="View Authors"
          desc="Authors"
          image={[imageBrowse, imageBrowse, imageBrowse]}
          onClick={() => {
            navigate("/dashboard/reviewer/authors");
          }}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="col-span-1 md:col-span-4 -m-6">
          <PublificationView tabs={publificationsTabs} />
        </div>
        <div className="flex flex-col space-y-4 md:hidden">
          <ActionBar
            title="Review publification"
            desc="Browse Publifications"
            image={imageBrowse}
            onClick={() => {
              navigate("/dashboard/reviewer/review");
            }}
          />
          <ActionBar
            title="Submit"
            desc="Make a Submission"
            image={imageSubmit}
            onClick={() => {
              navigate("/dashboard/reviewer/submit");
            }}
          />
          <ActionBar
            title="View Rewards"
            desc="Earning"
            image={imageRewards}
            onClick={() => {
              navigate("/dashboard/reviewer/rewards");
            }}
          />
          <ActionBar
            title="View Authors"
            desc="Authors"
            image={[imageBrowse, imageBrowse, imageBrowse]}
            onClick={() => {
              navigate("/dashboard/reviewer/authors");
            }}
          />
        </div>
        <div className="col-span-1 space-y-8">
          <Summary subscribers={10} publifications={45} timesCited={47} noOfComments={69} tipped={6568} />
          <Connections reviewed={231} approved={124} rejected={24} />
          <TokenStats talents={43} ethereum={150} nfts={40} />
        </div>
      </div>
    </div>
  );
};

export default HomeView;