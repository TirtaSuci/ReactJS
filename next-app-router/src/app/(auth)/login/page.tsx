"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";


export default function LoginPage() {
    const searchParams = useSearchParams();
    const { push } = useRouter();
    const [loading, setLoading] = useState(false);
    const [isError, setError] = useState(``);
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        const form = e.currentTarget;
        const callbackUrl = searchParams.get("callbackUrl") || "/";
        try {
            const res = await signIn("credentials", {
                redirect: false,
                email: (e.target as any).email.value,
                password: (e.target as any).password.value,
                callbackUrl,
            })
            if (!res?.error) {
                form.reset();
                setLoading(false);
                push(callbackUrl);
            } else {
                setLoading(false);
                if (res.status === 401) {
                    setError("Invalid Email or Password");
                }
            }
        } catch (error) {
            console.log(`error2 =`, error);
        }
    };
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            {isError !== '' && (<div className="text-red-500 font-bold mb-4">{isError}</div>)}
            <div className="bg-white shadow-md border border-gray-200 rounded-lg w-sm p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
                <form className="space-y-6" onSubmit={(e) => handleLogin(e)}>
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                        Sign in to our platform
                    </h3>
                    <div>
                        <label
                            htmlFor="email"
                            className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
                        >
                            Your email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            placeholder="name@company.com"
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
                        >
                            Your password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="••••••"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            required
                        />
                    </div>
                    {/* <div className="flex items-start">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input
                                    id="remember"
                                    type="checkbox"
                                    className="bg-gray-50 border border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                                />
                            </div>
                            <div className="text-sm ml-3">
                                <label
                                    htmlFor="remember"
                                    className="font-medium text-gray-900 dark:text-gray-300"
                                >
                                    Remember me
                                </label>
                            </div>
                        </div>
                        <a
                            href="#"
                            className="text-sm text-blue-700 hover:underline ml-auto dark:text-blue-500"
                        >
                            Lost Password?
                        </a>
                    </div> */}

                    <button
                        disabled={loading}
                        type="submit"
                        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        {loading ? 'Loading...' : 'Login'}
                    </button>
                    <hr />
                    <button
                        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={() => signIn("google", { callbackUrl : "/" ,redirect: false })}
                    >
                        Sign in with Google
                    </button>
                    <div className=" text-center w-full text-sm font-medium text-gray-500 dark:text-gray-300">
                        Not registered?{" "}
                        <Link
                            href="/register"
                            className="text-blue-700 hover:underline dark:text-blue-500"
                        >
                            Create account
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}