"use client";

import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Input } from "@nextui-org/react";
import type { Database } from "@/types/supabase";

interface ILoginForm {
  email: string;
  password: string;
}

const LoginForm = () => {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>();

  const onSubmit: SubmitHandler<ILoginForm> = async (data) => {
    const email = data.email;
    const password = data.password;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    router.refresh();

    if (error) {
      alert(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
        // queryParams: {
        //   access_type: "offline",
        //   prompt: "consent",
        // },
      },
    });

    router.refresh();
  };

  return (
    <>
      <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Email</label>
          <Input {...register("email")} type="email" />
        </div>
        <div>
          <label>密碼</label>
          <Input {...register("password")} type="password" />
        </div>
        <Button type="submit">登入</Button>
      </form>
      <Button onClick={handleGoogleLogin}>Google登入</Button>
    </>
  );
};

export default LoginForm;
