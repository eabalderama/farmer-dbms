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
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { CreateCropSchema } from "@/lib/schema";
import { createCrop } from "@/actions/crop";

export default function CreateCropForm() {
  const form = useForm<z.infer<typeof CreateCropSchema>>({
    resolver: zodResolver(CreateCropSchema),
    defaultValues: {
      crop_name: "",
    },
  });

  const formState = useFormState({ control: form.control });

  const onSubmit = async (values: z.infer<typeof CreateCropSchema>) => {
    const response = await createCrop(values);
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
          name="crop_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
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
