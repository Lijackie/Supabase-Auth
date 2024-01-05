import Image from "next/image";

import { getSession, isLogin } from "@/libs/isLogin";
import Tiptap from "@/components/Tiptap";

export default async function Home() {
  const session = await getSession();

  return (
    <main className="flex flex-col justify-center items-center bg bg-red-500">
      <div>
        <h1>安安 {session?.user.email}</h1>
        <Tiptap />
      </div>
    </main>
  );
}
