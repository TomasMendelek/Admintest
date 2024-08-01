import prismadb from "@/lib/prismadb";
import { TypeForm } from "./components/TypeForm";

const TypePage = async ({
    params
}: {
    params: { typeId: string, storeId: string }
}) => {
    const type = await prismadb.type.findUnique({
        where: {
            id: params.typeId
        }
    });

    const categories = await prismadb.category.findMany({
        where: {
            storeId: params.storeId
        }
    });

    return ( 
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <TypeForm categories={categories} initialData={type} />
            </div>
        </div>
    );
}

export default TypePage;
