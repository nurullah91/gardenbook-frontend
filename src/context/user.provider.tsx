import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

import { TPost, TUser } from "../types";
import { getCurrentUser } from "../services/Auth";
import { getAllPosts } from "../services/Post";
import { toast } from "sonner";

export interface IMeta {
  total: number;
  totalPage: number;
  limit: number;
  page: number;
}

interface IUserProviderValues {
  user: TUser | null;
  isLoading: boolean;
  setUser: (user: TUser | null) => void;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  posts: TPost[];
  postMeta: IMeta;
  setPosts: Dispatch<SetStateAction<TPost[]>>;
  setPostMeta: Dispatch<SetStateAction<IMeta>>;
  handleLoginExpiry: () => void;
}

const UserContext = createContext<IUserProviderValues | undefined>(undefined);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<TUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<TPost[]>([]);
  const [postMeta, setPostMeta] = useState<IMeta>({
    total: 0,
    totalPage: 0,
    limit: 0,
    page: 0,
  });

  const handleInitialPosts = async () => {
    const postQuery = [
      { name: "contentType", value: "free" },
      { name: "page", value: 1 },
      { name: "limit", value: 2 },
      { name: "sort", value: "-createdAt" },
    ];
    const data = await getAllPosts(postQuery);

    setPosts(data.data);
    setPostMeta(data.meta);
  };

  const handleUser = async () => {
    const user = await getCurrentUser();

    setUser(user);
    setIsLoading(false);
  };

  useEffect(() => {
    handleInitialPosts();
  }, []);

  useEffect(() => {
    handleUser();
  }, [isLoading]);

  const handleLoginExpiry = () => {
    setUser(null);
    setIsLoading(false);
    toast("Your session has expired. Please log in again.");
  };

  const providerValues = {
    user,
    setUser,
    isLoading,
    setIsLoading,
    posts,
    setPosts,
    postMeta,
    setPostMeta,
    handleLoginExpiry,
  };

  return (
    <UserContext.Provider value={providerValues}>
      {children}
    </UserContext.Provider>
  );
};

// Hook
export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used within the UserProvider context");
  }

  return context;
};

export default UserProvider;
