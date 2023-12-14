"use client";

import React, { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import BusCardItem from "./busCardItem";

const BusCards = ({ data, handleSelect }: any) => {
  const [busData, setBusData] = useState<any>(null);

  useEffect(() => {
    setBusData(data);
  }, []);

  console.log(data?.availableBuses.length);
  return (
    <ScrollArea className="h-[calc(100vh-18rem)] w-11/12 mx-auto flex items-center gap-3">
      <div className="flex flex-col justify-start items-center space-y-4">
        {busData &&
          busData.availableBuses.map((bus: any) => {
            return (
              <BusCardItem
                data={bus}
                route={data}
                key={data.id}
                handleSelect={handleSelect}
              />
            );
          })}
      </div>
    </ScrollArea>
  );
};

export default BusCards;
