import React, {useContext} from "react";
import {Context} from "@/app/Context";

function Kdb() {
    const {storedSerial} = useContext(Context);

    return (
        <kbd className="kbd kbd-lg">{storedSerial}</kbd>
    );
}

export default Kdb;