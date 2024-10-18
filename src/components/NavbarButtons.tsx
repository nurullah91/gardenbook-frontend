"use client";
import NextLink from "next/link";
import { clsx } from "clsx";
import { link as linkStyles } from "@nextui-org/theme";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";

import { logout } from "../services/Auth";
import { useUser } from "../context/user.provider";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { useDisclosure } from "@nextui-org/modal";
import { protectedRoutes } from "../constants";
import { usePathname, useRouter } from "next/navigation";
import CreatePostModal from "./posts/CreatePost";
import Link from "next/link";
import { FiPlus } from "react-icons/fi";

export interface INavbarButtonsProps {}

export default function NavbarButtons({}: INavbarButtonsProps) {
  const { user, setIsLoading: userLoading } = useUser();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    userLoading(true);
    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/login");
    }
  };

  const handleOpen = () => {
    onOpen();
  };

  return (
    <div className="flex items-center gap-3">
      {user?.role && (
        <Button onPress={handleOpen} variant="flat">
          <FiPlus className="text-xl" /> Post
        </Button>
      )}
      <CreatePostModal isOpen={isOpen} onClose={onClose} />
      {user?.role ? (
        <div className="ml-4">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                src={user?.profilePhoto}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{user?.email}</p>
              </DropdownItem>
              <DropdownItem key="settings">
                <Link href={`/${user.role}/dashboard`}>Dashboard</Link>
              </DropdownItem>
              <DropdownItem key="team_settings">
                <Link href={`/profile/${user._id}`}>Profile</Link>
              </DropdownItem>
              <DropdownItem key="logout" color="danger" onClick={handleLogout}>
                Logout
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
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
