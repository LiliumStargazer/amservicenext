import Alert from "@/components/Alert";
import React from "react";
import ButtonNav from "@/components/navbar/Button";

interface HeaderProps {
    windowHeight: number;
    text: string;
}

const Header: React.FC<HeaderProps> = ({ windowHeight, text }) => {
    return (
        <div id="header" className="navbar bg-neutral text-neutral-content"
             style={{ height: windowHeight * 0.06 + "px" }}>
            <ButtonNav />
            <div className="ml-10">
                <Alert />
            </div>
            <p>{text}</p>
        </div>
    );
}

export default Header;