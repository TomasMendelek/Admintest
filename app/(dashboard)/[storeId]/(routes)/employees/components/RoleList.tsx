
"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

const RoleList = () => {
  const router = useRouter();
  const params = useParams();
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchRoles = async () => {
      const response = await axios.get(`/api/${params.storeId}/roles`);
      setRoles(response.data);
    };

    fetchRoles();
  }, [params.storeId]);

  const columns = [
    { accessorKey: 'name', header: 'Role Name' },
    {
      id: 'actions',
      cell: ({ row }) => (
        <div>
          <Button onClick={() => router.push(`/${params.storeId}/roles/${row.original.id}`)}>Edit</Button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading title="Roles" description="Manage roles for your store" />
        <Separator />
        <Button onClick={() => router.push(`/${params.storeId}/roles/new`)}>Create New Role</Button>
        <Separator />
        <DataTable columns={columns} data={roles} />
      </div>
    </div>
  );
};

export default RoleList;
