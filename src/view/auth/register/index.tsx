import Link from "next/link";
import style from "./register.module.scss";
import { use, useState } from "react";
import { useRouter } from "next/router";

const RegisterView = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const { push } = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setIsLoading(true);
        setError("");
        setSuccessMessage("");

        const data = {
            username: event.target.username.value,
            email: event.target.email.value,
            password: event.target.password.value,
        };

        if (event.target.password.value !== event.target.confirmPassword.value) {
            setError("Passwords do not match.");
            event.target.password.value = "";
            event.target.confirmPassword.value = "";
            setIsLoading(false);
            return;
        }

        const result = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const responseData = await result.json();

        if (result.status === 200) {
            event.target.reset();
            setSuccessMessage("Registration successful! Redirecting to login...");
            setIsLoading(false);

            // Delay sedikit biar user sempat baca
            setTimeout(() => {
                push("/auth/login");
            }, 2000);
        } else {
            setIsLoading(false);
            if (result.status === 400) {
                event.target.reset();
                if (responseData.message === "Email already in use") {
                    setError("Email already in use.");
                } else if (responseData.message === "Username already in use") {
                    setError("Username already in use.");
                } else {
                    setError(responseData.message || "Invalid input.");
                }
            }
        }
    };

    return (
        <div className={style.register}>
            <p className={style.register__title}>Register Page</p>
            <div className={style.register__form}>
                {error && <p className={style.register__form__error}>{error}</p>}
                {successMessage && (
                    <p className={style.register__form__success}>{successMessage}</p>
                )}
                <form onSubmit={handleSubmit} className={style.register__form__content}>
                    <label htmlFor="username">Username</label>
                    <input
                        className={style.register__form__content__input}
                        type="text"
                        name="username"
                        id="username"
                        required
                    />
                    <label htmlFor="email">Email</label>
                    <input
                        className={style.register__form__content__input}
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

                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <div className={style.passwordWrapper}>
                        <input
                            className={style.inputWithToggle}
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            id="confirmPassword"
                            required
                        />
                        <button
                            type="button"
                            className={style.togglePassword}
                            onClick={() => setShowConfirmPassword((prev) => !prev)}
                        >
                            {showConfirmPassword ? "🙈" : "👁️"}
                        </button>
                    </div>
                    <button
                        className={style.register__form__content__button}
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? "Registering..." : "Register"}
                    </button>
                </form>
                <p className={style.register__form__login}>
                    Sudah punya akun?{" "}
                    <Link
                        href="/auth/login"
                        className={style.register__form__login__link}
                    >
                        Login disini
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterView;
