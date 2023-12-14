"use client";

import { useRouter } from "next/navigation";

import SearchBusForm from "@/components/Forms/searchBusForm";
import useAuth from "@/hooks/useAuth";

export default function Home() {
  const { state } = useAuth();
  const router = useRouter();

  const { user } = state;

  if (user && user.role === "admin") {
    router.push(`/dashboard/${user._id}/profile`);
    return null;
  }

  return (
    <>
      <div className="p-4 sm:p-6 md:py-14 space-y-8 h-[calc(100vh-92px)]">
        <SearchBusForm />
      </div>
    </>
  );
}
