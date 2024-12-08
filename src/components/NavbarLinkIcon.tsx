"use client";

import { Tooltip } from "@nextui-org/tooltip";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export interface INavbarLinkIconProps {
  navItem: {
    label: string;
    icon: ReactNode;
    href: string;
  };
}
export default function NavbarLinkIcon({ navItem }: INavbarLinkIconProps) {
  const pathName = usePathname();
  const activeRoute = pathName === navItem.href;

  return (
    <>
      <Tooltip content={navItem.label}>
        <button
          className={`py-3 px-8 hover:bg-default-300 hover:rounded-lg ${activeRoute ? "border-b-3 text-blue-500 border-blue-500" : "text-default-600"}`}
        >
          {navItem.icon}
        </button>
      </Tooltip>
    </>
  );
}
