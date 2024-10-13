import { SVGProps } from "react";

export type TUser = {
  _id: string;
  name: {
    firstName: string;
    middleName?: string;
    lastName: string;
  };
  email: string;
  role: "admin" | "user";
  phone: string;
  address: string;
  plan: "basic" | "premium";
  planValidity: string;
  profilePhoto: string;
  coverPhoto: string;
  status: "active" | "blocked";
  createdAt: Date;
  updatedAt: Date;
};

export type TPost = {
  _id: string;
  post: string;
  postPhotos?: string[];
  user: TUser;
  category: string;
  contentType: "free" | "premium";
  upvoteCount: number;
  downvoteCount: number;
  commentCount: number;
  isDeleted: boolean;
};
export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};
