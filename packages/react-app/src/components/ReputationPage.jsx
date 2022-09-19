import React from "react";
import { ReputationCard } from "../components";

const ReputationPage = () => {
  const reputation = [
    { data: { "Reputation Score (%)": "7%", Followers: 50, "Papers Reviewed": 234 }, showTitle: false },
    {
      data: { "Reviewed the same paper": "231", "Approved the same paper": 124, "Rejected the same paper": 24 },
      showTitle: true,
    },
  ];

  return (
    <div className="flex flex-col p-8 bg-white space-y-4 h-screen">
      <div className="ml-1 -mt-1 font-bold cursor-pointer text-xl text-left">Reputation</div>
      {reputation.map((item, index) => {
        return <ReputationCard key={index} data={item.data} showTitle={item.showTitle}></ReputationCard>;
      })}
    </div>
  );
};

export default ReputationPage;
