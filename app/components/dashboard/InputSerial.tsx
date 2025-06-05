'use client'

import React, { ChangeEvent } from "react";

interface InputSerialProps {
    setSerial: (serial: string) => void;
    disabled: boolean;
}

const InputSerial: React.FC<InputSerialProps> = ({ setSerial, disabled }) => {
    return (
        <label className="input input-sm max-w-36 min-w-36 ">
            <span className="label text-info">Serial:</span>
            <input
                disabled={!disabled}
                type="text"
                className="max-w-1/2"
                onChange={(event: ChangeEvent<HTMLInputElement>) => setSerial(event.target.value)}
                //placeholder="Type Serial"
                data-np-intersection-state="visible"
            />
        </label>
    );
};

export default InputSerial;