import Alert from "@/components/alert";
import React from "react";
import ButtonHome from "@/components/button-home";

function Header({windowHeight, text}) {
    return (
        <div id="header" className="navbar bg-neutral text-neutral-content"
             style={{height: windowHeight * 0.06 + "px"}}>
            <ButtonHome/>
            <div className="ml-10">
                <Alert/>
            </div>
            <p >{text}</p>
        </div>
    );
}

export default Header;