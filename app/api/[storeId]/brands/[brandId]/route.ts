import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

// Obtener una marca específica
export async function GET(
    req: Request,
    { params }: { params: { brandId: string } }
) {
    try {
        if (!params.brandId) {
            return new NextResponse("El ID de la marca es requerido", { status: 400 });
        }

        const brand = await prismadb.brand.findUnique({
            where: {
                id: params.brandId,
            },
        });

        return NextResponse.json(brand);

    } catch (error) {
        console.log('[BRAND_GET]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};

// Actualizar una marca específica
export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string, brandId: string } }
) {
    try {
        const { userId } = auth();
        const body = await req.json();

        const { name } = body;

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        if (!name) {
            return new NextResponse("El nombre es requerido", { status: 400 });
        }

        if (!params.brandId) {
            return new NextResponse("El ID de la marca es requerido", { status: 400 });
        }

        const store = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        });

        if (!store) {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        const brand = await prismadb.brand.update({
            where: {
                id: params.brandId,
            },
            data: {
                name
            }
        });

        return NextResponse.json(brand);

    } catch (error) {
        console.log('[BRAND_PATCH]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};

// Eliminar una marca específica
export async function DELETE(
    req: Request,
    { params }: { params: { storeId: string, brandId: string } }
) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        if (!params.brandId) {
            return new NextResponse("El ID de la marca es requerido", { status: 400 });
        }

        const store = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        });

        if (!store) {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        const brand = await prismadb.brand.delete({
            where: {
                id: params.brandId,
            }
        });

        return NextResponse.json(brand);

    } catch (error) {
        console.log('[BRAND_DELETE]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};
