"use client";

import { Button } from "@nextui-org/button";
import NextLink from "next/link";
import { clsx } from "clsx";
import { link as linkStyles } from "@nextui-org/theme";

import { logout } from "../services/Auth";
import { useUser } from "../context/user.provider";

export interface INavbarButtonsProps {}
export default function NavbarButtons({}: INavbarButtonsProps) {
  const { user, setIsLoading: userLoading } = useUser();

  const handleLogout = () => {
    logout();
    userLoading(true);
    // if (protectedRoutes.some((route) => pathname.match(route))) {
    //   router.push("/");
    // }
  };

  // const handleNavigation = (pathname: string) => {
  //   // router.push(pathname);
  // };

  return (
    <div>
      {user?.role ? (
        <Button color="danger" radius="sm" onClick={handleLogout}>
          Logout
        </Button>
      ) : (
        <NextLink
          className={clsx(
            linkStyles({ color: "foreground" }),
            "data-[active=true]:text-primary data-[active=true]:font-medium"
          )}
          color="foreground"
          href={"/login"}
        >
          Login
        </NextLink>
      )}
    </div>
  );
}
