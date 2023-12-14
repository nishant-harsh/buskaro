"use client";

import SearchBusForm from "@/components/Forms/searchBusForm";
import { getCookie } from "@/components/auth-provider";
import BusCards from "@/components/busCards";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import SeatSelect from "@/components/seat-select";

const Page = () => {
  const searchParams = useSearchParams();
  const source = searchParams.get("source");
  const destination = searchParams.get("destination");
  const date = searchParams.get("date");

  const [open, setOpen] = useState(false);
  const [searchedBus, setSearchedBus] = useState<any | null>(null);
  const [selectedBus, setSelectedBus] = useState<any | null>(null);

  const handleBusSelect = (selectedBus: any) => {
    setSelectedBus(selectedBus);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const token = getCookie("token");
    const getBusData = async () => {
      try {
        setSearchedBus(null);
        const response = await axios.get(
          `http://localhost:3001/bus/search/?source=${source}&destination=${destination}&date=${date}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setSearchedBus(response.data);
        if (response.data.availableBuses.length === 0) {
          toast.error("No buses on this date. Select another date.", {
            duration: 6000,
            position: "bottom-center",
          });
        }
      } catch (error) {
        console.log(error);
        toast.error("Buses not found.");
      }
    };
    getBusData();
  }, [source, destination, date]);


  return (
    <div className="flex flex-col space-y-16">
      <SearchBusForm />
      {!searchedBus && (
        <div className="h-[500px] w-full flex items-center justify-center text-red-700">
          <p className="text-2xl border p-8 rounded-md shadow-2xl shadow-slate-200 bg-red-50">
            No buses found!
          </p>
        </div>
      )}
      {searchedBus && console.log(searchedBus)}
      {searchedBus && (
        <BusCards data={searchedBus} handleSelect={handleBusSelect} />
      )}
      {open && (
        <SeatSelect open={open} handleClose={handleClose} bus={selectedBus} />
      )}
    </div>
  );
};

export default Page;
