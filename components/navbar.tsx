'use client'

import React from "react";
import {DropdownItem, DropdownTrigger, Dropdown, DropdownMenu} from "@nextui-org/dropdown";
import {  Navbar, NavbarContent} from "@nextui-org/navbar";
import {Avatar} from "@nextui-org/avatar";
import { usePathname, useRouter } from "next/navigation";
import { hideRoutes } from "./sideNavbar";
import { logout, pb } from "@/app/lib/utils";
import { User } from "@/types";

type Props = {}

export default function Nav({}:Props) {
  const pathname = usePathname()
  const router = useRouter()

  const userModel = pb.authStore.model as User

  const handleLogout = async () => {
    try {
      const {success} = await logout();
      router.push('/login');
    } catch (error) {
      console.error('Error logging out:', error);
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
                isBordered
                as="button"
                className="transition-transform bg-cultured"
                name="Jason Hughes"
                size="sm"
                src={userModel.avatar ? userModel.avatar : '/circle-user-round.svg' }
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2" textValue="sign in as">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{userModel?.email}</p>
              </DropdownItem>
              <DropdownItem key="profile-nav" textValue="profile">Profile</DropdownItem>
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
