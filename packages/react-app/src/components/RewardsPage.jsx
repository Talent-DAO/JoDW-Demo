/* eslint-disable no-undef */
import React from "react";
import { RewardsCard, RewardsChart } from "../components";

const RewardsPage = ({ address }) => {
  const rewards = [
    [{ title: "$TALENT Earnings", amount: "40,000", width: "w-1/2 md:w-1/4" }],
    [{ title: "Estimated Rewards", amount: "40,000", width: "w-1/2 md:w-1/4" }],
    [
      { title: "Staking Rewards", amount: "40,000", width: "w-full md:w-1/2" },
      { title: "Delegate Rewards", amount: "40,000" },
    ],
  ];

  const data = [
    {
      name: "0",
      "Product A": 0,
    },
    {
      name: "1",
      "Product A": 260,
    },
    {
      name: "2",
      "Product A": 124,
    },
    {
      name: "3",
      "Product A": 196,
    },
    {
      name: "4",
      "Product A": 53,
    },
    {
      name: "5",
      "Product A": 260,
    },
    {
      name: "6",
      "Product A": 124,
    },
  ];
  const [width, setWidth] = React.useState(0);

  const handleResize = () => {
    const node = document.getElementById("reward-card");
    setWidth(node ? node.clientWidth : 0);
  };

  React.useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col p-8 bg-white space-y-4 h-screen">
      <div className="ml-1 -mt-1 font-bold cursor-pointer text-xl text-left flex">Rewards</div>
      <div id="reward-card" className="flex flex-col md:flex-row me:w-full md:space-x-5">
        <div className="flex flex-row md:w-1/2  space-x-5">
          <RewardsCard data={rewards[0]}></RewardsCard>
          <RewardsCard data={rewards[1]}></RewardsCard>
        </div>
        <div className="flex flex-row md:w-1/2 ">
          <RewardsCard data={rewards[2]}></RewardsCard>
        </div>
      </div>
      <RewardsChart data={data} width={width} />
    </div>
  );
};

export default RewardsPage;
