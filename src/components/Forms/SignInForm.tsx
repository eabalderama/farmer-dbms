"use client";

import { CredentialSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormState } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SignInForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof CredentialSchema>>({
    resolver: zodResolver(CredentialSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const formState = useFormState({ control: form.control });

  const onSubmit = async (values: z.infer<typeof CredentialSchema>) => {
    const response = await signIn("credentials", {
      ...values,
      redirect: false,
    });
    if (response && !response.ok) {
      toast.error("Email or password does not match");
      return;
    }
    router.push("/");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 mt-5"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="john.doe@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="bg-primary text-black font-bold hover:bg-secondary"
          type="submit"
          disabled={!formState.isValid || formState.isSubmitting}
        >
          {formState.isSubmitting ? "Logging in..." : "Sign in"}
        </Button>
      </form>
    </Form>
  );
}
