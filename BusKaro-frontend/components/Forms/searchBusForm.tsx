"use client";

import { useState, useEffect, Dispatch, SetStateAction } from "react";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SearchBusForm = () => {
  const router = useRouter();
  const formSchema = z.object({
    src: z.string().min(2),
    destination: z.string().min(2),
    date: z.coerce.date(),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      src: "",
      destination: "",
      date: new Date(),
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      router.replace(
        `search/?source=${values.src}&destination=${values.destination}&date=${new Date(values.date).toISOString()}`
      );

      form.reset();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="w-11/12 max-w-4xl mx-auto mt-20 bg-gray-50 rounded-full shadow-2xl shadow-slate-300 flex items-center justify-center p-2">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-4"
        >
          <FormField
            control={form.control}
            name="src"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel className="sr-only uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                  Source
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    className="rounded-l-full border-none p-10 outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    placeholder="Source"
                    {...field}
                  />
                </FormControl>
                {/* <FormMessage /> */}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="destination"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel className="sr-only uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                  Destination
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    className="border-0 border-r border-l rounded-none p-10 outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    placeholder="Destination"
                    {...field}
                  />
                </FormControl>
                {/* <FormMessage /> */}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel className="sr-only uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                  Date
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full border-none h-full text-muted-foreground",
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
                      disabled={(date) =>
                        date < new Date() || date > new Date("2024-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />
          <Button className="w-full h-full rounded-r-full bg-blue-500 text-lg hover:bg-blue-500/90">
            Search
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SearchBusForm;
