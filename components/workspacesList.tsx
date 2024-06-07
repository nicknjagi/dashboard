"use client";

import { getWorkspaces } from "@/app/lib/workspaces";
import { Workspace } from "@/types";
import { useQuery } from "@tanstack/react-query";
import Loading from "./loading";
import { Tooltip } from "@nextui-org/tooltip";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/table";
import { Button } from "@nextui-org/button";
import {Chip} from "@nextui-org/chip";

const columns = [
  {
    key: "name",
    label: "NAME",
  },
  {
    key: "status",
    label: "STATUS",
  },
  {
    key: "users",
    label: "USERS",
  },
  {
    key: "actions",
    label: "ACTIONS",
  },
  // {
  //   key: "created",
  //   label: "CREATED",
  // },
];

type Props = {};

export default function WorkspacesList({}: Props) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["workspaces"],
    queryFn: getWorkspaces,
  });

  if (isLoading) return <Loading />;
  if (error) return <p className="mt-10">Error loading workspaces</p>;

  return (
    <div className="mt-6 overflow-x-auto rounded-2xl shadow-md max-w-fit">
      <Table
        // isStriped
        classNames={{
          wrapper: [
            "bg-background border border-cultured/10 w-full min-w-[640px] max-w-fit",
          ],
          th: ["bg-cultured/10 "],
        }}
        aria-label="Facilitators list"
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        {data.items?.length > 0 ? (
          <TableBody items={data.items}>
            {(workspace: Workspace) => (
              <TableRow key={workspace.id}>
                {(columnKey) => (
                  <TableCell>
                    {columnKey === "actions" ? (
                      <Button size="sm" variant="light" className="">
                        update
                      </Button>
                    ) : columnKey === "status" ? (
                      workspace.active ? (
                        <Chip color="success" size="sm">Active</Chip>
                      ) : (
                        <Chip size="sm">Inactive</Chip>
                      )
                    ) : columnKey === "users"? (
                      <span>{workspace.users.length}</span>
                    ): (
                      getKeyValue(workspace, columnKey)
                    )}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        ) : (
          <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
        )}
      </Table>
    </div>
  );
}
