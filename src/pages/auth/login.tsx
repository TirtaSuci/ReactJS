import Link from "next/link";
import { useRouter } from "next/router";

const LoginPage = () => {
    const { push } = useRouter();

    const HandlerLogin = () => {
        push("/product");
    };
    return (
        <div>
            <h1>Login Page</h1>
            <button onClick={() => HandlerLogin()}>Login</button>
            <p>Belum punya akun? Registrasi  <Link href="/auth/register">disini</Link></p>
        </div>
    );
};
export default LoginPage;
