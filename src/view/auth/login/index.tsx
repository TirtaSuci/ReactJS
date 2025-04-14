import Link from "next/link";
import style from "./login.module.scss";
import { use, useState } from "react";
import { useRouter } from "next/router";
import { sign } from "crypto";
import { signIn } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";

const LoginView = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const { push, query } = useRouter();
    const [showPassword, setShowPassword] = useState(false);

    const callbackUrl: any = query.callbackUrl || "/";

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setIsLoading(true);
        setError("");
        setSuccessMessage("");

        try {
            const res = await signIn("credentials", {
                redirect: false,
                email: event.target.email.value,
                password: event.target.password.value,
                callbackUrl,
            });
            if (!res?.error) {
                setIsLoading(false);
                push(callbackUrl);
            } else {
                setIsLoading(false);
                setError("Email or Password is incorrect.");
            }
        } catch (error: any) {
            setIsLoading(false);
            setError("Email or Password is incorrect.");
        }
    };

    return (
        <div className={style.login}>
            <p className={style.login__title}>Login Page</p>
            <div className={style.login__form}>
                {error && <p className={style.login__form__error}>{error}</p>}
                {successMessage && (
                    <p className={style.login__form__success}>{successMessage}</p>
                )}
                <div className={style.login__form__background}>
                    <form onSubmit={handleSubmit} className={style.login__form__content}>
                        <label htmlFor="email">Email</label>
                        <input
                            className={style.login__form__content__input}
                            type="email"
                            name="email"
                            id="email"
                            required
                        />
                        <label htmlFor="password">Password</label>
                        <div className={style.passwordWrapper}>
                            <input
                                className={style.inputWithToggle}
                                type={showPassword ? "text" : "password"}
                                name="password"
                                id="password"
                                required
                            />
                            <button
                                type="button"
                                className={style.togglePassword}
                                onClick={() => setShowPassword((prev) => !prev)}
                            >
                                {showPassword ? "🙈" : "👁️"}
                            </button>
                        </div>
                        <button
                            className={style.login__form__content__button}
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? "Logining..." : "Login"}
                        </button>
                    </form>
                    <button
                        className={style.login__form__content__button}
                        onClick={() => signIn("google", { callbackUrl, redirect: false })}
                    >
                        Login with Google
                    </button>
                </div>
                <p className={style.login__form__login}>
                    Belum punya akun?{" "}
                    <Link
                        href="/auth/register"
                        className={style.login__form__login__link}
                    >
                        Register disini
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginView;
