import Link from "next/link";
import styles from "./navbar.module.css";

const Navbar = (props: { title: string; link: string }) => {
    const { title, link } = props;
    return (
        <div className={styles.navbar}>
            <h1>
                <Link href={link}>{title}</Link>
            </h1>
        </div>
    );
};
export default Navbar;