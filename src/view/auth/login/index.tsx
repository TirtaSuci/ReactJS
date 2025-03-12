import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./login.module.css";

const LoginView = () => {
    const { push } = useRouter();

    const HandlerLogin = () => {
        push("/product");
    };
    return (
        <div className={styles.login}>
            <h1>Login Page</h1>
            <button onClick={() => HandlerLogin()}>Login</button>
            <p>Belum punya akun? Registrasi  <Link href="/auth/register" className="text-blue-500">disini</Link></p>
        </div>
    );
};
export default LoginView;
