"use client";

import { useForm, useFormState } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { z } from "zod";
import { CreateExpertiseSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { createExpertise } from "@/actions/expertise";
import { toast } from "sonner";

export default function CreateExpertiseForm() {
  const form = useForm<z.infer<typeof CreateExpertiseSchema>>({
    resolver: zodResolver(CreateExpertiseSchema),
    defaultValues: {
      name: "",
    },
  });

  const formState = useFormState({ control: form.control });

  const onSubmit = async (values: z.infer<typeof CreateExpertiseSchema>) => {
    console.log("values", values);
    const response = await createExpertise(values);
    console.log("response", response);
    if (!response.success) {
      toast.error(response.message);
      return;
    }
    toast.success(response.message);
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
              <FormLabel>Expertise</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="bg-primary text-black font-bold hover:bg-accent"
          type="submit"
          disabled={!formState.isValid || formState.isSubmitting}
        >
          {formState.isSubmitting ? "Saving..." : "Save"}
        </Button>
      </form>
    </Form>
  );
}
