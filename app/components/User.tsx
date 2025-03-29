'use client';

import { useSession } from "next-auth/react";
import { useEffect } from "react";

const User = () => {
    const { data: session, status, update } = useSession();

    useEffect(() => {
        const checkSession = async () => {
            if (status === "unauthenticated") {
                await update();
            }
        };
        checkSession().catch(error => console.log("Session check failed:", error));
    }, [status, update]);

    if (status === "loading") {
        return <div className="skeleton h-8 w-40 mr-8"></div>;
    }

    if (!session?.user) return null;

    return (
        <p className="text-neutral-content font-bold mr-8">
            Ciao {session.user.name || session.user.email}!
        </p>
    );
}

export default User;