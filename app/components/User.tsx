'use client'; // Aggiungi questa direttiva in cima

import { useSession } from "next-auth/react";

const User = () => {
    const { data: session, status } = useSession();

    if (status === "loading")
        return <div className="skeleton h-8 w-40 mr-8"></div>;

    if (!session?.user) return null;

    return (
        <p className="text-neutral-content font-bold mr-8">
            Ciao {session.user.name || session.user.email}!
        </p>
    );
}

export default User;