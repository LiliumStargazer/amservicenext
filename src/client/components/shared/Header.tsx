import React from "react";
import useWindowSize from "@/src/client/hooks/useWindowSize";
import ButtonNav from "@/src/client/components/shared/ButtonNav";
import Alert from "@/src/client/components/log/Alert";

interface HeaderProps {
    text?: string;
}



const Header: React.FC<HeaderProps> = ({ text ='' }) => {
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
