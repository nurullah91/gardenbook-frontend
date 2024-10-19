"use client";

import { IActiveUser } from "@/src/app/(withCommonLayout)/admin/dashboard/analytics/page";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const UserActivityChart = ({ data }: { data: IActiveUser[] }) => {
  return (
    <div>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <XAxis dataKey="user" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="postCount" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserActivityChart;
