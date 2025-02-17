// app/admin/page.tsx
    import { getUsers } from "@/app/utils/get-users";
    import UserRegistrationForm from "@/app/components/auth/UserRegistrationForm";

interface User {
    id: string;
    name: string | null;
    email: string | null;
    role: string;
}

    export default async function AdminPage() {
        const users = await getUsers();

        console.log('sono user', users);

        const usersMapped = users.map((user: User) => (
            <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
            </tr>
        ))

        return(
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="flex flex-grow max-h-96">
                        <div className="overflow-x-auto overflow-y-auto">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>email</th>
                                    <th>role</th>
                                </tr>
                                </thead>
                                <tbody>
                                {usersMapped}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <UserRegistrationForm />
               </div>
            </div>
        );
    }