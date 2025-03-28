'use server';

import { AuthError } from 'next-auth';
import { signIn, signOut } from "@/app/lib/auth"
// ...

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);

    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                case 'CallbackRouteError': {
                    const err = String( error.cause?.err)
                    if (err.includes('invalid user'))
                        return 'invalid user';
                    if (err.includes('invalid password'))
                        return 'invalid password';

                    return 'Something went wrong.';
                }
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}

export const logout = async () => {
 await signOut();
}
