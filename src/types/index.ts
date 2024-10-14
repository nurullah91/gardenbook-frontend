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
  user: TUser | string;
  post: TPost | string;
  comment: string;
  upVoters?: TUser[];
  downVoters?: TUser[];
};
export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};
