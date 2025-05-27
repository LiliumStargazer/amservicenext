// app/admin/page.tsx

import { usersGet } from "@/app/lib/users-get";
import FormRegistration from "@/app/components/auth/FormRegistration";

export const dynamic = 'force-dynamic';

export default async function AdminPage() {

    let users;
    try {
        users = await usersGet();
    } catch (error) {
        console.error("Error fetching users:", error);

        return <div>Errore nel recupero degli utenti: {(error as Error).message}</div>;
    }

    const usersMapped = users.map((user) => (
        <tr key={user.id}>
            <td>{user.name || "N/A"}</td>
            <td>{user.email || "N/A"}</td>
            <td>{user.role || "user"}</td>
        </tr>
    ));

    return(
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="flex flex-grow max-h-96">
                    <div className="overflow-x-auto overflow-y-auto">
                        <table className="table">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                            </tr>
                            </thead>
                            <tbody>
                            {usersMapped}
                            </tbody>
                        </table>
                    </div>
                </div>
                <FormRegistration />
            </div>
        </div>
    );
}