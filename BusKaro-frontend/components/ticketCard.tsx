"use client";

import { Star } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

const TicketCard = ({ ticket, handleCancel }: any) => {
  const [ticketData, setTicketData] = useState<any>(null);

  useEffect(() => {
    setTicketData(ticket);
  }, [ticket]);

  return (
    <div className="min-w-lg rounded-lg border bg-white space-y-1">
      <div className="grid grid-cols-4 p-4">
        <h3 className="text-lg font-semibold p-2">{ticketData?.busName}</h3>
        <p className="text-center p-2">
          {new Date(ticketData?.departure).toLocaleString()}
        </p>
        <p className="flex items-center justify-center">
          <span className="rounded-full bg-slate-50 p-1 px-4">
            {ticketData?.eta} hours
          </span>
        </p>
        <p className="text-right p-2">
          {new Date(ticketData?.arrival).toLocaleString()}
        </p>
        <p className="flex items-center justify-start">
          <span
            className={cn(
              "p-1 px-4 w-fit rounded-full border uppercase text-sm tracking-wider",
              ticketData?.status === "confirmed"
                ? "bg-green-50 border-green-500"
                : "bg-rose-50 border-rose-500"
            )}
          >
            {ticketData?.status}
          </span>
        </p>
        <p className="text-center p-2">{ticketData?.distance} KM</p>
        <p className="text-center text-blue-600 p-2 font-medium text-sm">
          Seat No. {ticketData?.seatNumber}
        </p>
        <p className="text-orange-600 p-2 font-medium text-right">
          {ticketData?.journeyDate}
        </p>
      </div>
      <div className="bg-[#f1f2f3] px-6 py-2 grid grid-cols-3">
        <p className="flex items-center">
          {[...Array(5)].map((star) => (
            <Star
              className="fill-yellow-500 hover:fill-yellow-400 stroke-none"
              key={star}
            />
          ))}
        </p>
        <p className=" p-2">{`${ticketData?.source} To ${ticketData?.destination}`}</p>
        <Button
          variant={"destructive"}
          className="w-fit justify-self-end"
          onClick={() =>
            toast.loading("This feature is under devlopment.", {
              duration: 6000,
              position: "bottom-center",
            })
          }
        >
          Cancel Ticket
        </Button>
      </div>
    </div>
  );
};

export default TicketCard;
