import Alert from "@/components/Alert";
import React from "react";
import HomeButton from "@/components/HomeButton";

function Header({windowHeight}) {
    return (
        <div id="header" className="navbar bg-neutral text-neutral-content"
             style={{height: windowHeight * 0.06 + "px"}}>
            <HomeButton/>
            <div className="ml-10">
                <Alert/>
            </div>
        </div>
    );
}

export default Header;