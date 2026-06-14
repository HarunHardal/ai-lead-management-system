"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { checkAuth } from "@/lib/auth";

export default function DashboardPage() {
    const router = useRouter();

    useEffect(() => {
        checkAuth().then((user) => {
            if (!user) {
                router.push("/login");
            }
        });
    }, []);

    return <div>Dashboard</div>;
}