import React, {useContext} from "react";
import {Context} from "@/app/Context";


function TextInput({className}) {
    const {serialTyped, setSerialTyped} = useContext(Context);

    const classes = className || "input input-bordered w-min join-item w-44";

    return (
        <input
            placeholder="Type Serial"
            key="serialTyped"
            className={classes}
            value={serialTyped}
            onChange={(event) => setSerialTyped(event.target.value)}
        />
    )
}
export default TextInput;
