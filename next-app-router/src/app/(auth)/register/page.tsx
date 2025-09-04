"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        const form = e.currentTarget;
        const formData = new FormData(form);
        const name = String(formData.get("name") ?? "");
        const email = String(formData.get("email") ?? "");
        const password = String(formData.get("password") ?? "");
        const verifyPassword = String(formData.get("verifypassword") ?? "");

        if (password !== verifyPassword) {
            setError("Passwords do not match");
            return;
        }

        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                email,
                password,
            }),
        });

        const data = await res.json();
        console.log("register response:", data);

        if (!res.ok) {
            setError((data && (data.error || data.message)) || "Registration failed");
            setLoading(false);
            return;
        } else if (data.statusCode === 200) {
            form.reset();
            setLoading(false);
            setError('');
            alert("Registration successful, please login.");
            window.location.href = "/login";
        }


    };

    return (
        <div className="flex justify-center items-center h-screen flex-col">
            {error !== '' && (<div className="text-red-500">{error}</div>)}
            <div className="bg-white shadow-md border border-gray-200 rounded-lg mt-4 w-sm p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
                <form className="space-y-6" onSubmit={(e) => handleSubmit(e)}>
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">Create an account</h3>
                    <div>
                        <label htmlFor="name" className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">
                            Your Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Your name"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">
                            Your Email
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
                        <label htmlFor="password" className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">
                            Your Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="••••••••"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="verifypassword" className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">
                            Verify password
                        </label>
                        <input
                            type="password"
                            name="verifypassword"
                            id="verifypassword"
                            placeholder="••••••••"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            required
                        />
                    </div>
                    <button
                    disabled={isLoading}
                        type="submit"
                        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        {isLoading ? 'Loading...' : 'Register'}
                    </button>

                    <div className="text-sm font-medium text-gray-500 dark:text-gray-300 text-center">
                        Already Registered?{" "}
                        <Link href="/login" className="text-blue-700 hover:underline dark:text-blue-500">
                            Login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}