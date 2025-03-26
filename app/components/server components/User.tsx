import getSession from "@/app/lib/auth/session";
export const dynamic = 'force-dynamic';

const User = async () => {
    try {
        const session = await getSession();

        if (!session?.user) return null;

        return (
            <p className="text-neutral-content font-bold mr-8">
                Ciao {session.user.name || session.user.email}!
            </p>
        );
    } catch (error) {
        console.error("Errore nel recupero della sessione:", error);
        return null;
    }
}

export default User;