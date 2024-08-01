import { format } from "date-fns";
import { es } from 'date-fns/locale';

import prismadb from "@/lib/prismadb";
import { formatter } from "@/lib/utils";

import { ProductClient } from "./components/ProductClient";
import { ProductColumn } from "./components/columns";

const ProductsPage = async ({
    params
}: {
    params: { storeId: string }
}) => {
    const store = await prismadb.store.findUnique({
        where: { id: params.storeId },
    });

    const products = await prismadb.product.findMany({
        where: {
            storeId: params.storeId
        },
        include: {
            category: true,
            size: true,
            color: true,
            brand: true,
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    const formattedProducts: ProductColumn[] = products.map((item) => ({
        id: item.id,
        name: item.name,
        isFeatured: item.isFeatured,
        isArchived: item.isArchived,
        price: formatter.format(item.price.toNumber()),
        category: item.category.name,
        size: item.size.name,
        color: item.color.value,
        brand: item.brand?.name,
        createdAt: format(new Date(item.createdAt), "dd 'de' MMMM 'de' yyyy", { locale: es })
    }));

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ProductClient data={formattedProducts} storeType={store?.type || ""} />
            </div>
        </div>
    );
};

export default ProductsPage;
