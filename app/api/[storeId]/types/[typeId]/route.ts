import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

// Obtener un tipo específico
export async function GET(
    req: Request,
    { params }: { params: { typeId: string } }
) {
    try {
        if (!params.typeId) {
            return new NextResponse("El ID del tipo es requerido", { status: 400 });
        }

        const type = await prismadb.type.findUnique({
            where: {
                id: params.typeId,
            },
            include: {
                category: true
            }
        });

        return NextResponse.json(type);

    } catch (error) {
        console.log('[TYPE_GET]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};

// Actualizar un tipo específico
export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string, typeId: string } }
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

        if (!params.typeId) {
            return new NextResponse("El ID del tipo es requerido", { status: 400 });
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

        const type = await prismadb.type.updateMany({
            where: {
                id: params.typeId,
            },
            data: {
                name,
                categoryId
            }
        });

        return NextResponse.json(type);

    } catch (error) {
        console.log('[TYPE_PATCH]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};

// Eliminar un tipo específico
export async function DELETE(
    req: Request,
    { params }: { params: { storeId: string, typeId: string } }
) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        if (!params.typeId) {
            return new NextResponse("El ID del tipo es requerido", { status: 400 });
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

        const type = await prismadb.type.deleteMany({
            where: {
                id: params.typeId,
            }
        });

        return NextResponse.json(type);

    } catch (error) {
        console.log('[TYPE_DELETE]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};
