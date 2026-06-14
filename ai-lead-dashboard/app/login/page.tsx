"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            await api.post("/auth/login", {
                email,
                password
            });

            router.push("/dashboard");
        } catch (err) {
            alert("Login Başarısız");
        }
    };

    return (
        <div className="flex h-screen items-center justify-center">
            <div className="p-6 border rounded-xl w-80">
                <h2 className="text-xl mb-4">Giriş Yap</h2>
                <input
                    className="border w-full mb-2 p-2"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                className="border w-full mb-2 p-2"
                type="password"
                placeholder="Şifre"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                />
                <button
                onClick={handleLogin}
                className="bg-black text-white w-full p-2 rounded"
                >
                    Giriş Yap
                </button>
            </div>
        </div>
    )
}