'use client'

import React from "react";
import {DropdownItem, DropdownTrigger, Dropdown, DropdownMenu} from "@nextui-org/dropdown";
import {  Navbar, NavbarContent} from "@nextui-org/navbar";
import {Avatar} from "@nextui-org/avatar";
import Link from "next/link";

type Props = {}

export default function Nav({}:Props) {
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
                className="transition-transform"
                color="secondary"
                name="Jason Hughes"
                size="sm"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2" textValue="sign in as">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">zoey@example.com</p>
              </DropdownItem>
              <DropdownItem key="profile-nav" textValue="profile">Profile</DropdownItem>
              <DropdownItem key="logout" color="danger" textValue="log out">
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </Navbar>
    </div>
  );
}
