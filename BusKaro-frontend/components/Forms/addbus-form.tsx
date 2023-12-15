"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import useAuth from "@/hooks/useAuth";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import axios from "axios";
import { getCookie } from "@/components/auth-provider";

const addBusFormSchema = z.object({
  busName: z
    .string()
    .min(2, {
      message: "Bus name must be at least 2 characters.",
    })
    .max(30, {
      message: "Bus name must not be longer than 30 characters.",
    }),
  totalSeats: z.coerce
    .number()
    .min(2, {
      message: "Total seats must be at least 2 characters.",
    })
    .max(30, {
      message: "Total seats must not be longer than 30 characters.",
    }),
  arrival: z.string(),
  departure: z.string(),
});

type addBusFormValues = z.infer<typeof addBusFormSchema>;

interface ISelectProps {
  values: {
    key: string;
    value: string;
  }[];
}

const values = [
  { key: "Sunday", value: "sunday" },
  { key: "Monday", value: "monday" },
  { key: "Tuesday", value: "tuesday" },
  { key: "Wednesday", value: "wednesday" },
  { key: "Thursday", value: "thursday" },
  { key: "Friday", value: "friday" },
  { key: "Saturday", value: "saturday" },
];
export function AddBusForm() {
  const { state } = useAuth();
  const { user } = state;
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const handleSelectChange = (value: string) => {
    if (!selectedItems.includes(value)) {
      setSelectedItems((prev) => [...prev, value]);
    } else {
      const referencedArray = [...selectedItems];
      const indexOfItemToBeRemoved = referencedArray.indexOf(value);
      referencedArray.splice(indexOfItemToBeRemoved, 1);
      setSelectedItems(referencedArray);
    }
  };

  const isOptionSelected = (value: string): boolean => {
    return selectedItems.includes(value) ? true : false;
  };

  const defaultValues: Partial<addBusFormValues> = {
    busName: "",
    totalSeats: 0,
    arrival: "",
    departure: "",
  };

  const form = useForm<addBusFormValues>({
    resolver: zodResolver(addBusFormSchema),
    defaultValues,
  });

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(data: addBusFormValues) {
    try {
      const formData = {
        ...data,
        availableDays: selectedItems,
      };
      const token = getCookie("token");
      const respone = await axios.post(
        "http://localhost:3001/bus/buses",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(respone.data.message, {
        duration: 6000,
        position: "bottom-center",
      });

      form.reset();
    } catch (error) {
      console.log(error);
      toast.error("Unable to add bus. Try again after some time.", {
        duration: 6000,
        position: "bottom-center",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="busName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bus Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter bus name"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="totalSeats"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total Seats</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter total seats"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col space-y-3">
          <FormLabel>Available days</FormLabel>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex gap-2 font-bold w-fit">
                <span>Select Day(s)</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-56"
              onCloseAutoFocus={(e) => e.preventDefault()}
            >
              <DropdownMenuLabel>Weekdays</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {values.map((value: ISelectProps["values"][0], index: number) => {
                return (
                  <DropdownMenuCheckboxItem
                    onSelect={(e) => e.preventDefault()}
                    key={index}
                    checked={isOptionSelected(value.key)}
                    onCheckedChange={() => handleSelectChange(value.key)}
                  >
                    {value.value}
                  </DropdownMenuCheckboxItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
          <FormDescription>
            Select weekdays to make your bus available on those days.
          </FormDescription>
        </div>

        <FormField
          control={form.control}
          name="arrival"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bus Arrival</FormLabel>
              <Input type="datetime-local" disabled={isLoading} {...field} />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="departure"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bus Departure</FormLabel>
              <Input type="datetime-local" disabled={isLoading} {...field} />
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="mt-2" disabled={isLoading}>
          Add Bus
        </Button>
      </form>
    </Form>
  );
}
