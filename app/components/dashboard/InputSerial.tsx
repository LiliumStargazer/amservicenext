'use client'

import React, { ChangeEvent } from "react";

interface InputSerialProps {
    setSerial: (serial: string) => void;
}

const InputSerial: React.FC<InputSerialProps> = ({ setSerial}) => {

    return (
        <input
            type="text"
            className="input input-md input-bordered join-item min-w-32 max-w-36"
            onChange={(event: ChangeEvent<HTMLInputElement>) => setSerial(event.target.value)}
            placeholder="Type Serial"
            data-np-intersection-state="visible"
        />
    );
};

export default InputSerial
;