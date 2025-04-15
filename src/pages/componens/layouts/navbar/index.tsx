import Link from "next/link";
import styles from "./navbar.module.scss";
import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
    const { data }: any = useSession();

    return (
        <div className={styles.navbar}>
            <p>Home</p>
            <div className={styles.navbar__profile}>
                {data && (<img className={styles.navbar__image} src={data.user.image} alt={data.user.username} />)}
                {data && data.user.username}
                {data ? (
                    <button className={styles.navbar__pointer} onClick={() => signOut()}>Logout</button>
                ) : (
                    <button className={styles.navbar__pointer} onClick={() => signIn()}>Login</button>
                )}
            </div>
        </div>
    );
};

export default Navbar;
