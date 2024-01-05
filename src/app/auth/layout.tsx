import { ReactNode } from "react";
import { isLogin } from "@/libs/isLogin";
export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  await isLogin();

  return (
    <div className="flex w-screen h-screen flex-col md:items-center md:justify-center">
      {children}
    </div>
  );
}
