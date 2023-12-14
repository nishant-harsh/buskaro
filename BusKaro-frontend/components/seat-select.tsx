"use client";

import { useState, useEffect } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { format } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import { getCookie } from "./auth-provider";
import { AvailableSeats } from "@/lib/utils";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import useAuth from "@/hooks/useAuth";
import toast from "react-hot-toast";

const SeatSelect = ({
  open,
  handleClose,
  bus,
}: {
  open: boolean;
  handleClose: () => void;
  bus: any;
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { state } = useAuth();
  const [busDetails, setBusDetails] = useState<any>({});

  const date = searchParams.get("date");
  const seatsData = bus.data.occupiedSeats;
  const OccupiedSeats = AvailableSeats({ date, seatsData });


  const formSchema = z.object({
    seat_number: z.enum(
      [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28",
        "29",
        "30",
        "31",
        "32",
        "33",
        "34",
        "35",
        "36",
        "37",
        "38",
        "39",
        "40",
        "41",
        "42",
        "43",
        "44",
        "45",
        "46",
        "47",
        "48",
        "49",
        "50",
      ],
      {
        required_error: "You need to select a seat number.",
      }
    ),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      seat_number: "1",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: any) => {
    try {
      const token = getCookie("token");
      const formData = {
        ...values,
        userId: state.user._id,
        busId: bus.data._id,
        journeyDate: new Date(date!),
        seatNumber: parseInt(values.seat_number),
      };

      const response = await axios.post(
        "http://localhost:3001/ticket/book",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message);
      handleClose();
      form.reset();
      router.refresh();

      try {
        const updateBusDetails = await axios.get(
          `http://localhost:3001/bus/buses/${busDetails.data._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setBusDetails((prevState: any) => ({
          ...prevState,
          data: updateBusDetails.data,
        }));
      } catch (error: any) {
        console.error(error);
        toast.error(error.response.data.message);
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    setBusDetails(bus);
  }, [bus]);

  return (
    <Sheet open={open}>
      <SheetContent side={"bottom"}>
        <div className="max-w-5xl flex items-start justify-around mx-auto space-x-4 h-[600px]">
          <SheetHeader>
            <SheetTitle className="capitalize text-2xl">Book Ticket</SheetTitle>
            <SheetDescription className="capitalize">
              for {busDetails?.data?.busName} bus
            </SheetDescription>
            <div className="grid grid-cols-2 gap-2">
              <SheetDescription className="py-2 px-4 bg-green-50 text-green-800 rounded-full">
                Seats Available (
                {busDetails?.data?.totalSeats - OccupiedSeats?.length})
              </SheetDescription>
              <SheetDescription className="py-2 px-4 bg-gray-50 text-gray-800 rounded-full">
                Total Seats ({busDetails?.data?.totalSeats})
              </SheetDescription>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <SheetDescription className="py-2 px-4 bg-purple-50 text-purple-800 rounded-full">
                ETA: {busDetails?.route?.eta} hours
              </SheetDescription>
              <SheetDescription className="py-2 px-4 bg-yellow-50 text-yellow-800 rounded-full">
                Distance {busDetails?.route?.distance} KM
              </SheetDescription>
            </div>
            <div className="w-full bg-sky-50 text-sky-700 px-4 py-2 rounded-md capitalize text-sm text-center">
              {`${busDetails?.route?.source} to ${busDetails?.route?.destination}`}
            </div>
            <div className="w-full bg-rose-50 text-rose-700 px-4 py-2 rounded-md capitalize text-sm text-center">
              {date && new Date(date).toLocaleDateString()}
            </div>
          </SheetHeader>
          <ScrollArea >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="seat_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sr-only uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                        Seat Number
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="grid grid-cols-4 border mt-6 p-4 gap-4 rounded-lg shadow-sm"
                        >
                          {[...Array(busDetails?.data?.totalSeats)].map(
                            (_, idx) => (
                              <FormItem key={idx + 1}>
                                <FormControl>
                                  <RadioGroupItem
                                    value={(idx + 1)?.toString()}
                                    id={`seat-num-${idx + 1}`}
                                    className="peer sr-only"
                                    disabled={
                                      OccupiedSeats.includes(idx + 1) ||
                                      isLoading
                                    }
                                  />
                                </FormControl>
                                <FormLabel
                                  htmlFor={`seat-num-${idx + 1}`}
                                  className="text-center leading-3 flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                >
                                  Seat {idx + 1}
                                </FormLabel>
                              </FormItem>
                            )
                          )}
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Button className="w-full mt-4" disabled={isLoading}>
                  Book
                </Button>
              </form>
            </Form>
          </ScrollArea>
        </div>
      </SheetContent>
      <SheetFooter>
        <SheetClose onClick={handleClose}>Close</SheetClose>
      </SheetFooter>
    </Sheet>
  );
};

export default SeatSelect;
