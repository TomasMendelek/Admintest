import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";

export async function GET(req: Request, { params }: { params: { storeId: string } }) {
  const { userId } = auth();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  const employees = await prisma.user.findMany({
    where: { storeId: params.storeId },
    include: { role: true },
  });

  return NextResponse.json(employees);
}

export async function POST(req: Request, { params }: { params: { storeId: string } }) {
  const { userId } = auth();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  const { email, password, roleId } = await req.json();

  // Crear el empleado en Clerk
  const user = await clerkClient.users.createUser({
    emailAddress: [email],
    password,
  });

  // Asociar el empleado con el rol y la tienda en la base de datos
  const newUser = await prisma.user.create({
    data: {
      id: user.id,
      email,
      password,
      roleId,
      storeId: params.storeId,
    },
  });

  return NextResponse.json(newUser);
}
