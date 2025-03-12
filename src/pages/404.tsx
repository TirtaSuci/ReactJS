import styles from "@/styles/404.module.scss";
const Costume404 = () => {
    return (
        <div className={styles.error}>
            <img src="404.jpg" alt="" className={styles.error__image} />
            <p className={styles.error__font}>404</p>
            <p>Halaman Tidak Ditemukan</p>
        </div>
    );
};

export default Costume404;