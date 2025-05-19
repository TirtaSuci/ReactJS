export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <nav className="fixed right-0 top-10 z-10 w-60 h-screen bg-slate-900 text-white">
                <ul className="p-4">
                    <li className="pt-2 cursor-pointer">Home</li>
                    <li className="pt-2 cursor-pointer">About</li>
                    <li className="pt-2 cursor-pointer">Profile</li>
                </ul>
            </nav>
            <div>{children}</div>
        </>
    )
}