"use client";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils/utils";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Icons } from "../Icons";
import { Skeleton } from "../ui/skeleton";
import { AvatarMenu } from "./avatar-menu";
import SignInButton from "./sign-in-button";

export function Navbar() {
  const { data: session, status } = useSession();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-200 py-2 px-4",
        scrolled
          ? "backdrop-blur-sm border-b border-border/40"
          : "bg-transparent"
      )}
    >
      <nav className="container flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center space-x-2 hover:opacity-80 transition-opacity ml-2"
        >
          <Icons.logo className="h-6 w-6 text-primary" />
          <span className="tracking-wide text-2xl font-medium">
            {siteConfig.name}
          </span>
        </Link>

        <div className="flex items-center space-x-4">
          {status === "loading" ? (
            <Skeleton className="h-10 w-10 rounded-full  border-primary border-2" />
          ) : session?.user ? (
            <AvatarMenu />
          ) : (
            <SignInButton />
          )}
        </div>
      </nav>
    </header>
  );
}
