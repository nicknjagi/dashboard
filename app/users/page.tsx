'use client'
import React, { useEffect, useState } from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from "@nextui-org/table";
import { User } from "@/types";

const rows = [
  {
    key: "1",
    name: "Tony Reichert",
    role: "CEO",
    status: "Active",
  },
  {
    key: "2",
    name: "Zoey Lang",
    role: "Technical Lead",
    status: "Paused",
  },
  {
    key: "3",
    name: "Jane Fisher",
    role: "Senior Developer",
    status: "Active",
  },
  {
    key: "4",
    name: "William Howard",
    role: "Community Manager",
    status: "Vacation",
  },
];

const columns = [
  {
    key: "name",
    label: "NAME",
  },
  {
    key: "role",
    label: "ROLE",
  },
  {
    key: "status",
    label: "STATUS",
  },
];


export default function Users() {
  const [users, setUsers] = useState<User[]>([])

  useEffect(()=>{

  }, [])
  
  return (
    <div className="mt-6 overflow-x-auto rounded-2xl shadow-md w-fit">
      <Table
        // isStriped
        classNames={{
          wrapper: ["bg-background border border-cultured/5 w-full min-w-[640px] max-w-fit"],
          th:['bg-cultured/5 ']
        }}
        aria-label="Example dynamic collection table"
      >
        <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={rows}>
        {(item) => (
          <TableRow key={item.key}>
            {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
      </Table>
    </div>
  );
}
