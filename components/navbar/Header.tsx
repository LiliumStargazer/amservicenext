import Alert from "@/components/Alert";
import React from "react";
import ButtonNav from "@/components/navbar/Button";
import useWindowSize from "@/hooks/useWindowSize";

interface HeaderProps {
    text?: string;
}

const Header: React.FC<HeaderProps> = ({ text ='AM Service' }) => {
    const windowSize  = useWindowSize();
    let windowHeight = windowSize.height;

    if (windowHeight === undefined) {
        windowHeight = 0;
    }

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
