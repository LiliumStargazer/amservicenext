import Log from "@/app/components/Log";
import getSession from "@/app/lib/auth/session";
import { Session } from '@prisma/client';

const DashBoard = async () => {

    const session = await getSession() as Session | null;

    if (!session)
        return null;

    return (
        <Log
            session={session}
        />
    );
}

export default DashBoard;