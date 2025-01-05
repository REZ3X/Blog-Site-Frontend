"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isClient, setIsClient] = useState(false);
    const [isRouterReady, setIsRouterReady] = useState(false);  // Track if router is ready
    const router = useRouter();

    // Only enable router when client-side rendering
    useEffect(() => {
        setIsClient(true);
        setIsRouterReady(true); // Ensure router is ready in the client environment
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
            // Store JWT token in localStorage
            localStorage.setItem("token", data.token);
            router.push("/admin"); // Redirect to the admin page
        } else {
            setError(data.error); // Show the error message
        }
    };

    if (!isClient || !isRouterReady) {
        return null; // Render nothing on the server or if router is not ready
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-semibold">Login</h1>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleLogin} className="space-y-4">
                <div>
                    <label htmlFor="username" className="block">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="border p-2 rounded-md w-full"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="border p-2 rounded-md w-full"
                    />
                </div>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">
                    Login
                </button>
            </form>
        </div>
    );
}
