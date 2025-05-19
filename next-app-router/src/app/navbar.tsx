import Link from "next/link";

export default function Navbar() {
    return (
        <>
            <nav>
                <ul className="flex bg-slate-900 text-white px-4 py-2">
                    <Link href="/">
                        <li className="mr-4 cursor-pointer">Home</li>
                    </Link>
                    <Link href="/about">
                        <li className="mr-4 cursor-pointer">About</li>
                    </Link>
                    <Link href="/about/profile">
                        <li className="mr-4 cursor-pointer">Profile</li>
                    </Link>
                </ul>
            </nav>
            {/* <div>{children}</div> */}
        </>

    )
}