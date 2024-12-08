import { LuHome } from "react-icons/lu";
import { LuContact2 } from "react-icons/lu";
import { BsInfoCircle } from "react-icons/bs";
import { RiGalleryLine } from "react-icons/ri";
import { VscGitPullRequestCreate } from "react-icons/vsc";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Gardenbook",
  description: "Share and explore your thoughts about gardening",
  navItems: [
    {
      label: "Feed",
      icon: <LuHome className="text-3xl" />,
      href: "/",
    },

    {
      label: "Gallery",
      icon: <RiGalleryLine className="text-3xl" />,
      href: "/latest-photos",
    },
    {
      label: "Garden Plan",
      icon: <VscGitPullRequestCreate className="text-3xl" />,
      href: "/garden-plan",
    },
    {
      label: "Contact",
      icon: <LuContact2 className="text-3xl" />,
      href: "/contact",
    },
    {
      label: "About",
      icon: <BsInfoCircle className="text-3xl" />,
      href: "/about",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Sign up",
      href: "/signup",
    },
    {
      label: "Login",
      href: "/login",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
};
