"use client";

import { useSession } from "next-auth/react";

export default function ProfilePage() {
    const { data: session, status } :{ data: any; status: string } = useSession();
    return (
        <p>Hello {session?.user?.name}</p>
    )
}