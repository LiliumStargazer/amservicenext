'use client';

import {useActionState, useEffect, useState} from 'react';
import {registerUser, updateUser, deleteUser} from "@/app/lib/db-crud";
import {LogoutButton} from "@/app/components/LogoutButton";

export default function UserRegistrationForm() {
    const [registrationResponse, registerAction, responseIsPending] = useActionState(registerUser, undefined);
    const [updateResponse, updateAction, updateIsPending] = useActionState(updateUser, undefined);
    const [deleteResponse, deleteAction, deleteIsPending] = useActionState(deleteUser, undefined);
    const [formAction, setFormAction] = useState(() => registerAction);
    const [response, setResponse] = useState<string | null>(null);

    const handleRegisterClick = () => {
        setFormAction(() => registerAction);
    };

    const handleUpdateClick = () => {
        setFormAction(() => updateAction);
    };

    const handleDeleteClick = () => {
        setFormAction(() => deleteAction);
    };

    useEffect(() => {
        if (registrationResponse) {
            setResponse(() => registrationResponse);
        }
        if(updateResponse) {
            setResponse(() => updateResponse);
        }
        if(deleteResponse) {
            setResponse(() => deleteResponse);
        }

    }, [registrationResponse, updateResponse, deleteResponse]);

    return(


        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">

            <form className="card-body" action={formAction} >
                <h1 className="text-4xl font-bold">Admin Console</h1>
                <fieldset className="fieldset" >
                    <label className="fieldset-label" >Name</label>
                    <input type="text" className="input" name="name" placeholder="Name" />
                    <label className="fieldset-label">Role</label>
                    <select name="role" defaultValue="user" className="select">
                        <option disabled={true}>select value</option>
                        <option>admin</option>
                        <option>user</option>
                        <option>Velvet</option>
                    </select>
                    <label className="fieldset-label">Email</label>
                    <input type="email" className="input" name="email" placeholder="Email" />
                    <label className="fieldset-label">Password</label>
                    <input type="password" className="input" name="password" placeholder="Password" />
                    <>
                        <button className="btn btn-neutral mt-2" onClick={handleRegisterClick} disabled={responseIsPending || updateIsPending || deleteIsPending} >Register</button>
                        <button className="btn btn-neutral mt-2" onClick={handleUpdateClick} disabled={responseIsPending || updateIsPending || deleteIsPending} >Update</button>
                        <button className="btn btn-neutral mt-2" onClick={handleDeleteClick} disabled={responseIsPending || updateIsPending || deleteIsPending} >Delete</button>
                        <LogoutButton />
                    </>
                    <p className="text-sm text-red-500">{response}</p>
                </fieldset>
            </form>
        </div>
    );
}