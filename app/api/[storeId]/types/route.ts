import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

// Crear un nuevo tipo
export async function POST(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {
        const { userId } = auth();
        const body = await req.json();

        const { name, categoryId } = body;

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        if (!name) {
            return new NextResponse("El nombre es requerido", { status: 400 });
        }

        if (!categoryId) {
            return new NextResponse("La categoría es requerida", { status: 400 });
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        });

        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        const type = await prismadb.type.create({
            data: {
                name,
                categoryId,
                storeId: params.storeId
            }
        });

        return NextResponse.json(type);

    } catch (error) {
        console.log('[TYPES_POST]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
};

// Obtener todos los tipos de una tienda
export async function GET(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {
        if (!params.storeId) {
            return new NextResponse("Store ID es requerido", { status: 400 });
        }

        const types = await prismadb.type.findMany({
            where: {
                storeId: params.storeId,
            },
            include: {
                category: true
            }
        });

        return NextResponse.json(types);

    } catch (error) {
        console.log('[TYPES_GET]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
};
