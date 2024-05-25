'use client'

import { Button } from '@nextui-org/button'
import clsx from 'clsx'
import {LayoutDashboard, LucideIcon, Menu, PanelLeft, Settings, SquareKanban, UsersRound} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {Tooltip} from "@nextui-org/tooltip";
import { useState } from 'react'
import { useWindowWidth } from '@react-hook/window-size'
import {DropdownItem, DropdownTrigger, Dropdown, DropdownMenu} from "@nextui-org/dropdown";
import {Avatar} from "@nextui-org/avatar";
import MenuMobile from './menuMobile'

type Props = {}

type LinkNav = {
  title:string;
  href:string;
  icon:LucideIcon;
}

export const links:LinkNav[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard
  },
  {
    title: "Users",
    href: "/users",
    icon: UsersRound
  },
  {
    title: "Workspaces",
    href: "/workspaces",
    icon: SquareKanban 
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings
  }
]

export default function SideNavbar({}: Props) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()
  const width = useWindowWidth()
  const mobileWidth = width < 768

  function toggleSidebar(){
    setIsCollapsed(!isCollapsed)
  }

  return (
    <nav
      className={clsx(
        `flex md:flex-col justify-between md:justify-normal p-4 w-full transition-all duration-200 ease-out origin-left ${
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
        {links.map((link, i) => {
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
                    "text-black bg-gradient-to-br from-white to-neutral-400",
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
                  className={clsx("flex md:justify-start gap-3 min-w-6", {
                    "bg-cWhite text-forrestGreen focus:text-forrestGreen hover:text-cWhite":
                      pathname === link.href,
                    "max-w-fit": isCollapsed,
                  })}
                >
                  <link.icon aria-label={link.title} />
                  <span
                    className={clsx("", {
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
        <li className="hidden md:block mt-10">
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
                "text-black bg-gradient-to-br from-white to-neutral-400",
                `${isCollapsed ? "" : mobileWidth ? "" : "hidden"}`,
              ],
            }}
            placement="right"
          >
            <Button
              variant="light"
              onClick={toggleSidebar}
              className={clsx(
                "flex md:justify-start gap-3 hover:bg-cWhite/60 text-neutral-400 hover:text-cWhite w-full min-w-6",
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