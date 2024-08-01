"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

import { ProductColumn, columns } from "./columns";

interface ProductClientProps {
    data: ProductColumn[];
    storeType: string;
}

export const ProductClient: React.FC<ProductClientProps> = ({
    data,
    storeType
}) => {
    const router = useRouter();
    const params = useParams();

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Productos (${data.length})`}
                    description="Administra los productos para tu tienda"
                />
                <Button onClick={() => router.push(`/${params.storeId}/products/new`)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Agregar nuevo
                </Button>
            </div>
            <Separator />
            <DataTable searchKey="name" columns={columns(storeType)} data={data} />
            <Heading title="API" description="Llamadas API de productos" />
            <Separator />
            <ApiList entityName="products" entityIdName="productId" />
        </>
    );
}
