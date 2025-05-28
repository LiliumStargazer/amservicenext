'use client'

import React, { ChangeEvent } from "react";

interface InputSerialProps {
    setSerial: (serial: string) => void;
    disabled: boolean;
}

const InputSerial: React.FC<InputSerialProps> = ({ setSerial, disabled }) => {
    return (
        <input
            disabled={!disabled}
            type="text"
            className="input input-md input-bordered input-info join-item max-w-32"
            onChange={(event: ChangeEvent<HTMLInputElement>) => setSerial(event.target.value)}
            placeholder="Type Serial"
            data-np-intersection-state="visible"
        />
    );
};

export default InputSerial
;