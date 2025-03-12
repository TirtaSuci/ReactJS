import Link from "next/link";

const RegisterPage = () => {

    return (
        <div>
            <h1>Login Page</h1>
            <p>Sudah punya akun? Registrasi  <Link href="/auth/login">disini</Link></p>
        </div>
    );
};
export default RegisterPage;
