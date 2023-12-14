"use client";

import { UpdateBusForm } from "@/components/Forms/updatebus-form";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface ISelectProps {
  values: {
    key: string;
    value: string;
    data: object;
  }[];
}

const Page = () => {
  const [busData, setBusData] = useState([]);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const handleSelectChange = (value: object) => {
    if (!selectedItem || selectedItem && selectedItem._id !== value) {
      setSelectedItem(value);
    }
     else {
      setSelectedItem(null);
    }
  };

  const isOptionSelected = (value: string): boolean => {
    return selectedItem?._id === value ? true : false;
  };

  useEffect(() => {
    async function getBusData() {
      try {
        const response = await axios.get("http://localhost:3001/bus/buses");
        setBusData(
          response.data.map((bus: any) => ({
            key: bus.busName,
            value: bus._id,
            data: bus,
          }))
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
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Update Bus</h3>
        <p className="text-sm text-muted-foreground">
          You can update bus here.
        </p>
      </div>
      <Separator />
      <div className="flex flex-col space-y-3">
        <Label>Buses</Label>
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
                  onCheckedChange={() => handleSelectChange(value.data)}
                >
                  {value.key}
                </DropdownMenuCheckboxItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {selectedItem && <UpdateBusForm bus={selectedItem} />}
    </div>
  );
};

export default Page;
