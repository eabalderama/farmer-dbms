"use client";

import { useForm, useFormState } from "react-hook-form";
import { z } from "zod";
import { CreateUserSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { createUser } from "@/actions/user";
import { toast } from "sonner";

export default function CreateUserForm() {
  const form = useForm<z.infer<typeof CreateUserSchema>>({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: {
      name: "",
      email: "",
      contact_number: "",
      password: "",
    },
  });

  const formState = useFormState({ control: form.control });

  const onSubmit = async (values: z.infer<typeof CreateUserSchema>) => {
    const user = await createUser(values);
    if (!user.success) {
      toast.error(user.message);
      return;
    }
    toast.success(user.message);
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
          name="contact_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Number</FormLabel>
              <FormControl>
                <Input placeholder="+639XXXXXXX00" {...field} />
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
              <FormLabel>Default Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="StrongPassword@101"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Strong password must have at least 8 characters, atleast one
                uppercase and lowercase, one number, and one special character
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="bg-primary text-black font-bold hover:bg-accent"
          type="submit"
          disabled={!formState.isValid || formState.isSubmitting}
        >
          {formState.isSubmitting ? "Saving..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
