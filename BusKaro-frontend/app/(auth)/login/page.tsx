"use client";

import Image from "next/image";
import Link from "next/link";

import busImg from "@/public/bus-bg.jpg";
import { Button } from "@/components/ui/button";
import LoginForm from "@/components/Forms/loginForm";
import BG from "@/public/bg.svg";
import TL from "@/public/traveller.svg";

const LoginPage = () => {
  return (
    <>
      <div className="container h-[600px] md:h-screen p-8 flex md:p-0 flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="lg:p-8 relative h-full flex items-center justify-center">
          <Link
            href="/signup"
            className={"absolute right-4 top-4 md:right-8 md:top-8"}
          >
            <Button variant="ghost" className="font-semibold">
              SignUp
            </Button>
          </Link>
          <LoginForm />
        </div>
        <div className="relative hidden h-full flex-col p-10 text-white border-l lg:flex -z-10">
          <Image src={BG} alt="bg" className="absolute top-0 left-0" />
          <Image
            src={TL}
            alt="bg"
            fill
            className="absolute -bottom-15 left-0"
          />
          {/* <div className="absolute inset-0 -z-20 bg-zinc-50" /> */}
          <div className="relative z-20 flex items-center text-lg font-medium text-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            BusKaro
          </div>
          {/* <div className="relative z-20 mt-auto text-zinc-800 backdrop-blur-md rounded-md border p-4 shadow-xl shadow-slate-200">
            <blockquote className="space-y-2 text-center">
              <p className="text-lg">
                &ldquo;Utilizing the latest advancements in technology, Ashutosh
                has engineered a bus booking system that not only simplifies the
                booking process but also efficiently manages it. This innovative
                approach is set to transform the traditional methods of bus
                ticketing.&rdquo;
              </p>
              <footer className="text-sm">~ AK</footer>
            </blockquote>
          </div> */}
          
        </div>
      </div>
    </>
  );
};

export default LoginPage;
