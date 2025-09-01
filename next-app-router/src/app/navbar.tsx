"use client"

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname()
    const router = useRouter()
    const { data: session, status } :{ data: any; status: string } = useSession();
    return (
        <>
            <nav className="flex justify-between bg-slate-900">
                <div>
                    <ul className="flex text-white px-4 py-2">
                        <Link href="/">
                            <li className={`${pathname === "/" ? "text-red-500" : ""} mr-4 cursor-pointer`}>Home</li>
                        </Link>
                        <Link href="/about">
                            <li className={`${pathname === "/about" ? "text-red-500" : ""} mr-4 cursor-pointer`}>About</li>
                        </Link>
                        <Link href="/about/profile">
                            <li className={`${pathname === "/about/profile" ? "text-red-500" : ""} mr-4 cursor-pointer`}>Profile</li>
                        </Link>
                        <Link href="/product">
                            <li className={`${pathname === "/product" ? "text-red-500" : ""} mr-4 cursor-pointer`}>Product</li>
                        </Link>
                        <Link href="/dashboard">
                            <li className={`${pathname === "/dashboard" ? "text-red-500" : ""} mr-4 cursor-pointer`}>Dashboard</li>
                        </Link>
                    </ul>
                </div>
                <div>
                    {status === "authenticated" ? (
                        <div className="flex items-center">
                        <h4 className="text-white mr-2">{session?.user?.name}</h4>
                        <button className="text-white rounded px-4 py-2 cursor-pointer pr-8"
                            onClick={() => {
                                signOut();
                                router.push("/");
                            }}
                        >Logout</button>
                        </div>
                        
                    ) : (
                        <button className="text-white rounded px-4 py-2 cursor-pointer pr-8"
                            onClick={() => signIn()}
                        >Login</button>
                    )
                    }
                </div>
            </nav>
            {/* <div>{children}</div> */}
        </>

    )
}