"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Dashboard() {
    const { data: session, status }: {data: any, status: string} = useSession();
    const router = useRouter();
    useEffect(() => {
        if (status === "unauthenticated" && session?.user?.role !== "admin") {
            router.push("/auth/login");
        }
    }, [router, session?.user?.role, status]);
    return (
        <div className="flex flex-col rounded-lg items-center justify-center w-full h-100 bg-gray-300">
            <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
            <p className="text-lg">Welcome to the admin dashboard!</p>
        </div>
    );
}