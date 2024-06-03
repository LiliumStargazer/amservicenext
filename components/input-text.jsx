import React, {useContext, useState} from "react";
import {Context} from "@/app/Context";

function InputText({className, type, placeholder, setPassword, password}) {
    const {serial, setSerial} = useContext(Context);
    const classes = className || "input input-bordered input-md input-bordered join-item max-w-36";
    const defaultPlaceholder = placeholder || "Type Serial";
    const [aliveSerial, setAliveSerial] = useState("");

    const handleChange = (event) => {
        const value = event.target.value;
        switch (type) {
            case 'ampassword':
                setPassword(value);
                break;
            case 'amlog':
                setSerial(value);
                break;
            case 'alive':
                setAliveSerial(value);
                break;
            default:
                break;
        }
    };

    const handleValue = (type) => {
        switch (type) {
            case 'ampassword':
                return password;
            case 'amlog':
                return serial;
            case 'alive':
                return aliveSerial;
            default:
                return 'amlog';
        }
    };


    return (
        <input
            type={type}
            placeholder={defaultPlaceholder}
            className={classes}
            value={handleValue(type)}
            onChange={handleChange}
        />
    );
}

export default InputText;
