"use client";

import { getCookie } from "@/components/auth-provider";
import TicketCard from "@/components/ticketCard";
import { Separator } from "@/components/ui/separator";
import useAuth from "@/hooks/useAuth";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Page = () => {
  const [ticketData, setTicketData] = useState([]);
  const { state } = useAuth();

  async function getTicketData() {
    try {
      const token = getCookie("token");

      const response = await axios.get(
        `http://localhost:3001/ticket/user/${state.user._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTicketData(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Error in fetching tickets. Try again after sometime.", {
        duration: 6000,
        position: "bottom-center",
      });
    }
  }

  useEffect(() => {
    getTicketData();
  }, []);

  console.log(ticketData);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Your Bookings & Tickets</h3>
        <p className="text-sm text-muted-foreground">
          You can see and cancel your bookings here.
        </p>
      </div>
      <Separator />
      {ticketData &&
        ticketData.map((ticket, idx) => (
          <TicketCard ticket={ticket} key={idx} />
        ))}
    </div>
  );
};

export default Page;
