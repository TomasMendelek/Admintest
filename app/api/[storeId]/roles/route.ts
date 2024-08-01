import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";

export async function GET(req: Request, { params }: { params: { storeId: string } }) {
  const { userId } = auth();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  const roles = await prisma.role.findMany({
    where: { storeId: params.storeId },
  });

  return NextResponse.json(roles);
}

export async function POST(req: Request, { params }: { params: { storeId: string } }) {
  const { userId } = auth();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  const { name } = await req.json();

  const newRole = await prisma.role.create({
    data: {
      name,
      storeId: params.storeId,
    },
  });

  return NextResponse.json(newRole);
}
