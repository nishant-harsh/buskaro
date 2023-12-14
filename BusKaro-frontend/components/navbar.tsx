"use client";

import { Ticket, LogOut, BusFront } from "lucide-react";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";

const Navbar = () => {
  const { state, handleLogout } = useAuth();
  const { user } = state;

  return (
    <div className="w-full py-4 px-8 sm:py-6 sm:px-20 flex items-center justify-between bg-[#fafbfc] text-blue-400 border-b z-30">
      <h3 className="font-semibold text-2xl tracking-wide flex items-center gap-2">
        <BusFront className="h-6 w-6" /> BusKaro
      </h3>
      <div className="flex items-center gap-10">
        {user && user.role !== "admin" && (
          <>
            <Link href={"/"}>
              <Button variant={"link"} className="text-blue-400">
                Home
              </Button>
            </Link>
            <Link href={`dashboard/${user._id}/profile`}>
              <Button variant={"link"} className="text-blue-400">
                Dashboard
              </Button>
            </Link>
          </>
        )}
        <Button
          variant="outline"
          size={"icon"}
          className="border-blue-300/40 bg-blue-50"
          onClick={() => handleLogout()}
        >
          <LogOut className="text-blue-400 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
