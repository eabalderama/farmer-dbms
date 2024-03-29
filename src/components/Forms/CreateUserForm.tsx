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
import { Expertise } from "@/types/expertise";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { cn } from "@/lib/utils";

interface CreateUserFormProps {
  expertise: Expertise;
}

export default function CreateUserForm({ expertise }: CreateUserFormProps) {
  const form = useForm<z.infer<typeof CreateUserSchema>>({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: {
      name: "",
      email: "",
      contact_number: "",
      password: "",
      expertise: [],
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
        <FormField
          control={form.control}
          name="expertise"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Expertise</FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between flex !ring-0 !outline-none",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <span className="flex-1 overflow-x-auto scrollbar-hide">
                          {field.value.length
                            ? form
                                .getValues("expertise")
                                .map(
                                  (value) =>
                                    expertise.find(
                                      (item) => item.expertise_id === value
                                    )?.expertise_name + ", "
                                )
                            : "Select Expertise"}
                        </span>
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search language..." />
                      <CommandEmpty>No expertise found.</CommandEmpty>
                      <CommandList>
                        <CommandGroup>
                          {expertise.map((item) => (
                            <CommandItem
                              value={item.expertise_name}
                              key={item.expertise_id}
                              onSelect={() => {
                                form.setValue("expertise", [
                                  ...form.getValues("expertise"),
                                  item.expertise_id,
                                ]);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  form
                                    .getValues("expertise")
                                    .includes(item.expertise_id)
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {item.expertise_name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
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
          {formState.isSubmitting ? "Saving..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
