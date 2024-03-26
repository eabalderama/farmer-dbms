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
import { CreateFarmerSchema } from "@/lib/schema";
import { Separator } from "../ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Users } from "@/types/user";
import { createFarmer } from "@/actions/farmer";

const languages = [
  { label: "English", value: 1 },
  { label: "French", value: 2 },
  { label: "German", value: 3 },
  { label: "Spanish", value: 4 },
  { label: "Portuguese", value: 5 },
  { label: "Russian", value: 6 },
  { label: "Japanese", value: 7 },
  { label: "Korean", value: 8 },
  { label: "Chinese", value: 9 },
];

interface CreateFarmerForm {
  users: Users;
}

export default function CreateFarmerForm({ users }: CreateFarmerForm) {
  const form = useForm<z.infer<typeof CreateFarmerSchema>>({
    resolver: zodResolver(CreateFarmerSchema),
    defaultValues: {
      name: "",
      contact_number: "",
      email: "",
      address: "",
      farm_name: "",
      assigned_workers: [],
    },
  });

  const formState = useFormState({ control: form.control });

  const onSubmit = async (values: z.infer<typeof CreateFarmerSchema>) => {
    console.log("values", values);
    const response = await createFarmer(values);
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
        className="flex flex-col gap-2 overflow-scroll !ring-0"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  className="!ring-0"
                  placeholder="John Dela Cruz"
                  {...field}
                />
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
                <Input
                  className="!ring-0"
                  placeholder="john.doe@example.com"
                  {...field}
                />
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
                <Input
                  className="!ring-0"
                  placeholder="+639XXXXXXX00"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input className="!ring-0" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="farm_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Farm Name</FormLabel>
              <FormControl>
                <Input
                  className="!ring-0"
                  placeholder="Hacienda Dela Cruz"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator />
        <h2>Assign Worker</h2>
        <FormField
          control={form.control}
          name="assigned_workers"
          render={({ field }) => (
            <FormItem>
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
                                .getValues("assigned_workers")
                                .map(
                                  (value) =>
                                    users.find((user) => user.user_id === value)
                                      ?.name + ", "
                                )
                            : "Select Worker"}
                        </span>
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search language..." />
                      <CommandEmpty>No language found.</CommandEmpty>
                      <CommandList>
                        <CommandGroup>
                          {users.map((user) => (
                            <CommandItem
                              value={user.name}
                              key={user.user_id}
                              onSelect={() => {
                                form.setValue("assigned_workers", [
                                  ...form.getValues("assigned_workers"),
                                  user.user_id,
                                ]);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  form
                                    .getValues("assigned_workers")
                                    .includes(user.user_id)
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {user.name}
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
        <Separator />
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
