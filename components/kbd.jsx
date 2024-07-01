import React, {useContext} from "react";
import {Context} from "@/app/Context";

function Kdb() {
    const {storedSerial} = useContext(Context);

    return (
        <kbd className="kbd">{storedSerial}</kbd>
    );
}

export default Kdb;