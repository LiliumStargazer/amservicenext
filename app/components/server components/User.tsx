import getSession from "@/app/lib/auth/session";

const User = async () => {
    const session = await getSession();

    if (!session?.user)
        return null;

    return (
        <p className="text-neutral-content font-bold mr-8">
            Ciao {session.user.name || session.user.email}!
        </p>
    );
}

export default User;