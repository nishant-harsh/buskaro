"use client";

import { useState, useEffect } from "react";
import { BusFront } from "lucide-react";
import { Card } from "./ui/card";
import WeekDays from "./weekDays";
import { format } from "date-fns";

const BusCardItem = ({ data, route, handleSelect }: any) => {
  const [selectedData, setSelectedData] = useState(null);

  const handleClick = () => {
    const newData = {
      data,
      route,
    };
    handleSelect(newData);
  };

  useEffect(() => {
    setSelectedData(data);
  }, [data]);

  return (
    <Card
      className="grid grid-cols-3 w-[700px] max-w-2xl p-8 gap-6 rounded-xl shadow-lg shadow-slate-300 border cursor-pointer"
      onClick={handleClick}
    >
      <p className="text-muted-foreground w-fit bg-orange-50 p-2 rounded-md h-full">
        {format(new Date(data?.departure), "HH:mm")} -{" "}
        {format(new Date(data?.arrival), "HH:mm")}
      </p>
      <div className="flex items-center justify-center">
        <WeekDays highlightDays={data?.availableDays} />
      </div>
      <p className="font-medium justify-self-end bg-green-50 p-2 rounded-md">
        ETA: {route?.eta} hours
      </p>
      <h3 className="capitalize text-2xl font-semibold">
        <span className="flex items-center gap-2">
          <BusFront className="text-blue-500" />
          {data?.busName}
        </span>
      </h3>
      <p className="text-sm flex items-center justify-center capitalize tracking-wide text-gray-500">{`${route?.source} to ${route?.destination}`}</p>

      <p className="text-muted-foreground justify-self-end bg-sky-50 rounded-md p-2">
        Total seats {data?.totalSeats}
      </p>
    </Card>
  );
};

export default BusCardItem;
