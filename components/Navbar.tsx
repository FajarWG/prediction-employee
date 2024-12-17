"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useCallback } from "react";

export default function Navbar() {
  const pathname = usePathname();

  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = useCallback(() => {
    logout();
    router.push("/");
  }, [logout, router]);

  return (
    <nav
      className={`bg-primary text-white p-4
      ${pathname === "/" ? "hidden" : "block"}
    `}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Employee Promotion Prediction
        </Link>
        <div>
          {pathname === "/dashboard" ? (
            <Button variant="destructive" onClick={() => handleLogout()}>
              Logout
            </Button>
          ) : (
            <Button variant="ghost" asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
