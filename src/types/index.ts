import { SVGProps } from "react";

export type TUser = {
  _id: string;
  name: {
    firstName: string;
    middleName?: string;
    lastName: string;
  };
  email: string;
  bio: string;
  role: "admin" | "user";
  phone: string;
  address: string;
  plan: "basic" | "premium";
  planValidity: string;
  profilePhoto: string;
  coverPhoto: string;
  totalDownvoteGained: number;
  totalUpvoteGained: number;
  totalFollowers: number;
  totalFollowing: number;
  status: "active" | "blocked";
  isOnline: boolean;
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
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
};

export type TVote = {
  post: string;
  user: string;
  type?: string;
};

export type TComment = {
  _id: string;
  user: TUser;
  post: TPost;
  comment: string;
  upVoters: TUser[];
  downVoters: TUser[];
  createdAt: string;
  updatedAt?: string;
};
export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type TQueryParam = {
  name: string;
  value: number | string | React.Key;
};
