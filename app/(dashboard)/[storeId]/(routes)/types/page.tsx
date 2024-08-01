import prismadb from "@/lib/prismadb";
import { format } from "date-fns";
import { es } from 'date-fns/locale';
import { TypeClient } from "./components/TypeClient";
import { TypeColumn } from "./components/columns";

const TypesPage = async ({
    params
}: {
    params: { storeId: string }
}) => {
    const types = await prismadb.type.findMany({
        where: {
            storeId: params.storeId
        },
        include: {
            category: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    const formattedTypes: TypeColumn[] = types.map((item) => ({
        id: item.id,
        name: item.name,
        categoryLabel: item.category ? item.category.name : 'Sin Categoría',
        createdAt: format(new Date(item.createdAt), "dd 'de' MMMM 'de' yyyy", { locale: es })
    }));

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <TypeClient data={formattedTypes} />
            </div>
        </div>
    );
};

export default TypesPage;
