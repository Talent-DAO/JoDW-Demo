import React from "react";
import { Area, AreaChart, CartesianGrid } from "recharts";
const RewardsChart = ({ data, width }) => {
  //   const node = document.getElementById('reward-card')
  //   const width = node ? node.clientWidth : 0

  return (
    <AreaChart width={width} height={300} data={data} margin={{ top: 37, right: 0, left: 0, bottom: 0 }}>
      <defs>
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#AFAFAF" stopOpacity={0.8} />
          <stop offset="100%" stopColor="#AFAFAF" stopOpacity={0} />
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="1 1" />
      <Area type="linear" dataKey="Product A" stroke="#AFAFAF" fillOpacity={1} fill="url(#colorUv)" />
    </AreaChart>
  );
};
export default RewardsChart;
