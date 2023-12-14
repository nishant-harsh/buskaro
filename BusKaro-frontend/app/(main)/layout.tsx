"use client";

import Navbar from "@/components/navbar";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

import BG from "@/public/bg.svg";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { state } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (!state.isLoggedIn) {
    router.push("/login");
    return null;
  }
  // TODO: CREATE a new route for dashboard/userId where two tabs for profile and bookings

  return (
    <div className="w-full min-h-screen">
      <Navbar />
      {children}

      <Image
        src={BG}
        alt="bg"
        className="absolute -z-30  object-coverleft-0 bottom-48 w-full h-full"
      />
    </div>
  );
};

export default MainLayout;
