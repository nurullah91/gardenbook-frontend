"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
interface IPostData {
  data: { postCount: number; month: string }[];
}
const PostActivityCart = ({ data }: IPostData) => {
  return (
    <div>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="postCount" fill="#1167b1" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PostActivityCart;
