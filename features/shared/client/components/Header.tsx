import React from "react";
import useWindowSize from "@/features/shared/client/hooks/useWindowSize";
import ButtonNav from "@/features/shared/client/components/ButtonNav";
import Alert from "@/features/log/client/components/Alert";

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
