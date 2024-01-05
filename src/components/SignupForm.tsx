"use client";

import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Input } from "@nextui-org/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "@/types/supabase";

interface ISignupForm {
  email: string;
  password: string;
}

const SignupForm = () => {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignupForm>();

  const onSubmit: SubmitHandler<ISignupForm> = async (data) => {
    const email = data.email;
    const password = data.password;

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    router.refresh();

    if (error) {
      alert(error.message);
    }
  };

  return (
    <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Email</label>
        <Input {...register("email")} type="email" />
      </div>
      <div>
        <label>密碼</label>
        <Input {...register("password")} type="password" />
      </div>
      <Button type="submit">註冊</Button>
    </form>
  );
};

export default SignupForm;
