export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Gardenbook",
  description: "Share and explore your thoughts about gardening",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Blog",
      href: "/blog",
    },
    {
      label: "About",
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
      label: "Settings",
      href: "/settings",
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
