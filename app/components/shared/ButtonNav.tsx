'use client'

import React from "react";
import {usePathname, useRouter} from "next/navigation";

interface ButtonNavProps {
    setMessage: (message: string) => void;
}

const ButtonNav: React.FC <ButtonNavProps>= ({setMessage}) => {
    const router = useRouter();
    const pathname = usePathname();

    function handleClick() {
        if (pathname !== '/') {
            router.push('/');
        } else {
            setMessage("You are already at Home");
        }
    }

    return (
        <button className="btn btn-ghost text-xl text-neutral-content ml-2 font-bold" onClick={handleClick}>
            Am Service
        </button>
    );
}

export default ButtonNav;
