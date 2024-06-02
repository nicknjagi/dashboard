import { Button } from "@nextui-org/button";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { Menu } from "lucide-react";
import { links } from "./sideNavbar";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import Link from "next/link";
import { logout, pb } from "@/app/lib/utils";
import { User } from "@/types";

type Props = {}

export default function MenuMobile({}: Props) {
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
  
  return (
    <Dropdown
            classNames={{
              base: "before:bg-default-200 md:hidden", // change arrow background
              content: "p-0 border-divider bg-background md:hidden rounded-lg",
            }}
            placement="bottom-end"
          >
            <DropdownTrigger>
              <Menu />
            </DropdownTrigger>
            <DropdownMenu
              itemClasses={{
                base: ["data-[hover=true]:bg-transparent"],
              }}
              aria-label="Profile Actions"
              variant="flat"
            >
              <DropdownItem textValue='user info' key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{userModel.email}</p>
              </DropdownItem>
              <DropdownItem textValue='nav links' key={'links'}>
                <div className="flex flex-col items-start md:hidden">
                  {links.map((link, i) => {
                    return (
                      <div className="w-full " key={i}>
                        <Button
                          as={Link}
                          href={link.href}
                          variant="light"
                          className={clsx("flex justify-start gap-3 rounded-lg px-1 min-w-6", {
                            "bg-cultured text-forrestGreen focus:text-forrestGreen hover:text-cultured":
                              pathname === link.href
                          })}
                        >
                          {/* <link.icon aria-label={link.title} /> */}
                          <span>{link.title}</span>
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </DropdownItem>

              <DropdownItem textValue='profile' key="profile-mobile">Profile</DropdownItem>
              <DropdownItem textValue='logout' key="logout" color="danger">
                <button onClick={handleLogout}>Log Out</button>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
  )
}