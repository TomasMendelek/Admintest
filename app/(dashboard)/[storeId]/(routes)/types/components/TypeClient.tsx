"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

import { TypeColumn, columns } from "./columns";

interface TypeClientProps {
    data: TypeColumn[]
}

export const TypeClient: React.FC<TypeClientProps> = ({
    data
}) => {
    const router = useRouter();
    const params = useParams();

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Tipos (${data.length})`}
                    description="Administra los tipos de productos para tu tienda"
                />
                <Button onClick={() => router.push(`/${params.storeId}/types/new`)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Agregar nuevo
                </Button>
            </div>
            <Separator />
            <DataTable searchKey="name" columns={columns} data={data} />
            <Heading title="API" description="Llamadas API de tipos" />
            <Separator />
            <ApiList entityName="types" entityIdName="typeId" />
        </>
    )
}
