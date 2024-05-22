import React, {useContext} from "react";
import {usePathname, useRouter} from "next/navigation";
import {Context} from "@/app/Context";

function HomeButton() {
    const { setPage , setMessage} = useContext(Context);
    const router = useRouter();
    const pathname = usePathname()

    function handleClick() {

        if (pathname !== '/'){
            router.push('/');
            setPage('Home');
        }
        else
            setMessage("You are already on the Home page");
    }

    return (
        <button className="btn btn-ghost text-xl text-neutral-content ml-2 font-bold" onClick={()=>handleClick()}>Am Service</button>
    );
}

export default HomeButton;