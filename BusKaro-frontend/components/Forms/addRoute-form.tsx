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
import { useEffect, useState } from "react";
import axios from "axios";
import { getCookie } from "@/components/auth-provider";

const addBusFormSchema = z.object({
  source: z
    .string()
    .min(2, {
      message: "Source must be at least 2 characters.",
    })
    .max(30, {
      message: "Source must not be longer than 30 characters.",
    }),
  destination: z.coerce
    .string()
    .min(2, {
      message: "Destination must be at least 2 characters.",
    })
    .max(30, {
      message: "Destination must not be longer than 30 characters.",
    }),
  distance: z.coerce.number().min(1),
  eta: z.coerce.number().min(1),
});

type addBusFormValues = z.infer<typeof addBusFormSchema>;

interface ISelectProps {
  values: {
    key: string;
    value: string;
  }[];
}

export function AddRouteForm() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [busData, setbusData] = useState([]);

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
    source: "",
    destination: "",
    distance: 0,
    eta: 0,
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
        busIds: selectedItems,
      };
      const token = getCookie("token");
      const respone = await axios.post(
        "http://localhost:3001/route/create",
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
      toast.error("Unable to add route. Try again after some time.", {
        duration: 6000,
        position: "bottom-center",
      });
    }
  }

  useEffect(() => {
    async function getBusData() {
      try {
        const response = await axios.get("http://localhost:3001/bus/buses");
        setbusData(
          response.data.map(
            ({ busName, _id }: { busName: string; _id: string }) => ({
              key: busName,
              value: _id,
            })
          )
        );
      } catch (error) {
        console.log(error);
        toast.error("Unable to fetch bus data.", {
          duration: 6000,
          position: "bottom-center",
        });
      }
    }

    getBusData();
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="source"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Source</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter source"
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
          name="destination"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Destination</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter destination"
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
          name="distance"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Distance</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter distance"
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
          name="eta"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estimated Time</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter estimated time of arrival"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col space-y-3">
          <FormLabel>Buses</FormLabel>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex gap-2 font-bold w-fit">
                <span>Select Bus(es)</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-fit"
              onCloseAutoFocus={(e) => e.preventDefault()}
            >
              <DropdownMenuLabel>Available Buses</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {busData.map((value: ISelectProps["values"][0], index: number) => {
                return (
                  <DropdownMenuCheckboxItem
                    onSelect={(e) => e.preventDefault()}
                    key={index}
                    checked={isOptionSelected(value.value)}
                    onCheckedChange={() => handleSelectChange(value.value)}
                  >
                    {value.key}
                  </DropdownMenuCheckboxItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
          <FormDescription>
            Select buses for this route.
          </FormDescription>
        </div>

        <Button type="submit" className="mt-2" disabled={isLoading}>
          Add Route
        </Button>
      </form>
    </Form>
  );
}
