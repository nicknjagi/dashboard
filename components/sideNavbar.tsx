"use client";

import { Button } from "@nextui-org/button";
import clsx from "clsx";
import {
  LayoutDashboard,
  Library,
  LucideIcon,
  PanelLeft,
  SquareKanban,
  UserCog,
  UsersRound,
  WalletCards,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tooltip } from "@nextui-org/tooltip";
import { useEffect, useState } from "react";
import { useWindowWidth } from "@react-hook/window-size";
import MenuMobile from "./menuMobile";
import { pb } from "@/app/lib/utils";
import { User } from "@/types";

type Props = {};

type LinkNav = {
  title: string;
  href: string;
  icon: LucideIcon;
  roles: string[];
};

export const links: LinkNav[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
    roles: ["ADMIN", "FACILITATOR"],
  },
  {
    title: "Workspaces",
    href: "/workspaces",
    icon: SquareKanban,
    roles: ["ADMIN", "FACILITATOR"],
  },
  {
    title: "Users",
    href: "/users",
    icon: UsersRound,
    roles: ["ADMIN"],
  },
  {
    title: "Facilitators",
    href: "/facilitators",
    icon: UserCog,
    roles: ["ADMIN"],
  },
  {
    title: "Accounts",
    href: "/accounts",
    icon: WalletCards,
    roles: ["ADMIN"],
  },
  {
    title: "Library",
    href: "/library",
    icon: Library,
    roles: ["ADMIN", "FACILITATOR"],
  }
];

export const hideRoutes: string[] = ["/create-account", "/login"];

export default function SideNavbar({}: Props) {
  const [isCollapsed, setIsCollapsed] = useState(false);  
  const [userModel, setUserModel] = useState<User | null>(null);
  const pathname = usePathname();
  const width = useWindowWidth();
  const mobileWidth = width < 768;

  useEffect(() => {
    const user = pb.authStore.model as User;
    setUserModel(user);    
  }, [pathname]);

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }

  if (hideRoutes.includes(pathname)) {
    return null;
  }

  return (
    <nav
      className={clsx(
        `flex md:flex-col justify-between md:justify-normal p-4 w-full transition-all duration-300 origin-left bg-forrestGreen md:h-screen overflow-y-auto ${
          isCollapsed ? "md:w-fit" : " md:px-6 md:w-full"
        } md:max-w-[280px] border-b md:border-r border-gold/50 relative`
      )}
    >
      <div className="flex items-center gap-2 md:mt-4 md:mb-8 relative">
        <Image
          src="/logo.png"
          width={35}
          height={35}
          className={clsx({ "mx-auto": isCollapsed })}
          alt="logo"
        />
        {!isCollapsed && (
          <h2 className="uppercase leading-4 ">
            my mind{" "}
            <span className="block font-semibold text-gold">capsule</span>
          </h2>
        )}
      </div>
      <ul
        className={clsx(
          "flex flex-row items-center md:flex-col gap-1 md:gap-2",
          {
            "md:items-center": isCollapsed,
            "md:items-stretch": !isCollapsed,
          }
        )}
      >
        {links
          .filter((link) => userModel && link.roles.includes(userModel.AccountType))
          .map((link, i) => {
            return (
              <li className={"hidden md:block"} key={i}>
                <Tooltip
                  content={link.title}
                  classNames={{
                    base: [
                      // arrow color
                      "before:bg-neutral-400 dark:before:bg-white",
                      `${isCollapsed ? "" : mobileWidth ? "" : "hidden"}`,
                    ],
                    content: [
                      "shadow-xl",
                      "text-black bg-cultured",
                      `${isCollapsed ? "" : mobileWidth ? "" : "hidden"}`,
                    ],
                  }}
                  color="foreground"
                  placement={mobileWidth ? "bottom" : "right"}
                >
                  <Button
                    as={Link}
                    href={link.href}
                    variant="light"
                    className={clsx(
                      "flex md:justify-start gap-3 min-w-6 rounded-lg",
                      {
                        "bg-cultured data-[hover=true]:bg-cultured text-forrestGreen cursor-default":
                          pathname === link.href || (pathname.includes('/session') && link.title === 'Workspaces'),
                        "max-w-fit": isCollapsed,
                      }
                    )}
                  >
                    <link.icon aria-label={link.title} />
                    <span
                      className={clsx("transition-all duration-300 ease-linear origin-left", {
                        "md:hidden": isCollapsed,
                        "md:inline": !isCollapsed,
                      })}
                    >
                      {link.title}
                    </span>
                  </Button>
                </Tooltip>
              </li>
            );
          })}
        <li className="hidden md:block absolute bottom-6 left-1/2 -translate-x-1/2 w-[80%] mx-auto mt-10">
          <Tooltip
            content={"Show Sidebar"}
            classNames={{
              base: [
                // arrow color
                "before:bg-neutral-400 dark:before:bg-white",
                `${isCollapsed ? "" : mobileWidth ? "" : "hidden"}`,
              ],
              content: [
                "shadow-xl",
                "text-black bg-cultured",
                `${isCollapsed ? "" : mobileWidth ? "" : "hidden"}`,
              ],
            }}
            placement="right"
          >
            <Button
              variant="light"
              onClick={toggleSidebar}
              className={clsx(
                "flex md:justify-start gap-3 rounded-lg hover:bg-cultured/60 text-neutral-400 hover:text-cultured w-full min-w-6",
                { "md:justify-center": isCollapsed }
              )}
            >
              <PanelLeft />
              {
                <span className={`${isCollapsed ? "hidden" : "inline"}`}>
                  Hide sidebar
                </span>
              }
            </Button>
          </Tooltip>
        </li>
        <li className="ml-2 md:hidden">
          <MenuMobile />
        </li>
      </ul>
    </nav>
  );
}
