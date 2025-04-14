import { useSession } from "next-auth/react";

const ProfilePage = () => {
    const {data: session} = useSession();
    console.log("session1 =", session);
    return (
        <div>
            <div>Profile Page</div>
            <div>{session && (session.user as any).username}</div>
        </div>

    )
};

export default ProfilePage