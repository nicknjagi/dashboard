"use client";

import React, { useEffect, useState } from "react";
import {
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
} from "@nextui-org/dropdown";
import { Navbar, NavbarContent } from "@nextui-org/navbar";
import { Avatar } from "@nextui-org/avatar";
import { usePathname, useRouter } from "next/navigation";
import { hideRoutes } from "./sideNavbar";
import { logout } from "@/app/lib/auth";
import { User } from "@/types";

type Props = {};

export default function Nav({}: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const [userModel, setUserModel] = useState<User | null>(null);

  useEffect(() => {
    const storedAuthData = localStorage.getItem("pocketbase_auth");
    if (storedAuthData) {
      const { model } = JSON.parse(storedAuthData);
      setUserModel(model as User);
    }
  }, [router, pathname]);

  const handleLogout = async () => {
    try {
      const { success } = await logout();
      router.push("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  if (hideRoutes.includes(pathname)) {
    return null;
  }

  return (
    <div className="border-b border-gold/50 hidden md:block">
      <Navbar>
        <NavbarContent as="div" justify="end">
          <Dropdown
            classNames={{
              base: "before:bg-default-200 ", // change arrow background
              content: "p-0 border-divider bg-background rounded-lg",
            }}
            placement="bottom-end"
          >
            <DropdownTrigger>
              <Avatar
                as="button"
                className="transition-transform "
                name={userModel?.name}
                size="md"
                src={
                  userModel?.avatar
                    ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/files/users/${userModel.id}/${userModel?.avatar}`
                    : ""
                }
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem
                key="profile"
                className="h-14 gap-2 focus:hover:bg-default/0 cursor-default"
                textValue="sign in as"
              >
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{userModel?.email}</p>
              </DropdownItem>
              <DropdownItem key="profile-nav" textValue="profile">
                Profile
              </DropdownItem>
              <DropdownItem key="logout" color="danger" textValue="log out">
                <button onClick={handleLogout}>Log Out</button>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </Navbar>
    </div>
  );
}
