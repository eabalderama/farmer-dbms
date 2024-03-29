"use client";

import { useForm, useFormState } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
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
import { CreatePlantedCropSchema } from "@/lib/schema";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { cn } from "@/lib/utils";
import { Crops } from "@/types/crop";
import { Farmers } from "@/types/farmer";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import { createPlanted } from "@/actions/planted";

interface CreatePlantedCropFormProps {
  crops: Crops;
  farmers: Farmers;
}

export default function CreatePlantedCropForm({
  crops,
  farmers,
}: CreatePlantedCropFormProps) {
  const form = useForm<z.infer<typeof CreatePlantedCropSchema>>({
    resolver: zodResolver(CreatePlantedCropSchema),
    defaultValues: {
      crop_id: undefined,
      farmer_id: undefined,
      harvest_date: undefined,
      planting_date: undefined,
      area: 0,
    },
    mode: "all",
  });

  const formState = useFormState({ control: form.control });

  const onSubmit = async (values: z.infer<typeof CreatePlantedCropSchema>) => {
    console.log(values);
    const response = await createPlanted(values);
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
          name="crop_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Crop</FormLabel>
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
                        <span className="flex-1 overflow-x-auto scrollbar-hide text-start">
                          {field.value
                            ? crops.find((crop) => crop.crop_id === field.value)
                                ?.crop_name
                            : "Select a crop"}
                        </span>
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search crop..." />
                      <CommandEmpty>No crop found.</CommandEmpty>
                      <CommandList>
                        <CommandGroup>
                          {crops.map((crop) => (
                            <CommandItem
                              value={crop.crop_name}
                              key={crop.crop_id}
                              onSelect={() => {
                                form.setValue("crop_id", crop.crop_id);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  form.getValues("crop_id") === crop.crop_id
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {crop.crop_name}
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
        <FormField
          control={form.control}
          name="farmer_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Farmer</FormLabel>
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
                        <span className="flex-1 overflow-x-auto scrollbar-hide text-start">
                          {field.value
                            ? farmers.find(
                                (farmer) => farmer.farmer_id === field.value
                              )?.name
                            : "Select a farmer"}
                        </span>
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search a farmer..." />
                      <CommandEmpty>No farmer found.</CommandEmpty>
                      <CommandList>
                        <CommandGroup>
                          {farmers.map((farmer) => (
                            <CommandItem
                              value={farmer.name}
                              key={farmer.farmer_id}
                              onSelect={() => {
                                form.setValue("farmer_id", farmer.farmer_id);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  form.getValues("farmer_id") ===
                                    farmer.farmer_id
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {farmer.name}
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
        <FormField
          control={form.control}
          name="planting_date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Planting Date</FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        type="button"
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="harvest_date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Harvest Date</FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        type="button"
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="area"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Area in hectares</FormLabel>
              <FormControl>
                <Input className="!ring-0 bg-transparent" {...field} />
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
