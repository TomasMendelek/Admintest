import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function POST(
    req: Request,
) {
    try {
        const { userId } = auth();
        const body = await req.json();

        const { name, type } = body;  

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!name) {
            return new NextResponse("El nombre es requerido", { status: 400 });
        }

        if (!type) {
            return new NextResponse("El tipo es requerido", { status: 400 });
        }

        const store = await prismadb.store.create({
            data: {
                name,
                type, 
                userId
            }
        });

        return NextResponse.json(store);

    } catch (error) {
        console.log('[STORES_POST]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
