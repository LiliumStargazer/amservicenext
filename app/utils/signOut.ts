import { signOut } from "next-auth/react";

// Function to handle user sign-out
export const handleSignOut = async () => {
    try {
        await signOut({ callbackUrl: '/login' }); // Redirect to login page after sign-out
    } catch (error) {
        console.error("Error signing out:", error);
    }
};