import Link from "next/link";
import styles from "./navbar.module.css";
import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = (props: { title: string; link: string }) => {
    const { title, link } = props;
    const { data: session } = useSession();

    console.log("session2 =", session);

    return (
        <div className={styles.navbar}>
            <Link href={link}>{title}</Link>
            {session ? (
                <button onClick={() => signOut()}>Logout</button>
            ) : (
                <button onClick={() => signIn()}>Login</button>
            )}
        </div>
    );
};

export default Navbar;
