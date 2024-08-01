import { auth } from "@clerk/nextjs/server";
import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";
import ClientComponent from "./clientComponent";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = async ({ children }: LayoutProps) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await prismadb.user.findUnique({
    where: { id: userId },
    include: { store: true },
  });

  if (!user || !user.store) {
    redirect("/create-store");
  }

  return (
    <div>
      <ClientComponent user={user}>{children}</ClientComponent>
    </div>
  );
};

export default Layout;
