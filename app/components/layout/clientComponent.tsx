'use client';

import Header from "@/app/components/common/Header";
import { ReactNode } from "react";

interface ClientComponentProps {
  user: any;
  children: ReactNode;
}

const ClientComponent = ({ user, children }: ClientComponentProps) => {
  return (
    <div>
      <Header store={user.store} />
      <main>{children}</main>
    </div>
  );
};

export default ClientComponent;
