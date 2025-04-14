import styles from "@/styles/404.module.scss";
import Image from "next/image";
const Costume404 = () => {
    return (
        <div className={styles.error}>
            {/* <img src="404.jpg" alt="" className={styles.error__image} /> */}
            <Image src="/404.jpg" alt="404" width={400} height={400} className={styles.error__image}/>
            <p className={styles.error__font}>404</p>
            <p>Halaman Tidak Ditemukan</p>
        </div>
    );
};

export default Costume404;