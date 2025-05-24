"use client"

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname()
    const router = useRouter()
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
                    </ul>
                </div>
                <div>
                    <button className="text-white rounded px-4 py-2 cursor-pointer pr-8"
                        onClick={() => router.push("/login")}
                    >Login</button>
                </div>
            </nav>
            {/* <div>{children}</div> */}
        </>

    )
}