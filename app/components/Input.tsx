'use client'

import React, { ChangeEvent, KeyboardEvent } from "react";

interface InputProps {
    loading: boolean;

    setSerialTemp: (serial: string) => void;
    setIsFetchRequest: (isFetchRequest: boolean) => void;
}

const Input: React.FC<InputProps> = ({loading, setSerialTemp, setIsFetchRequest}) => {

    const handleKeyDownOnLog = async (event: KeyboardEvent) => {
        if (event.key === "Enter") {
            setIsFetchRequest(true);
        }
    };

    return (
        <input
            type="text"
            className="input input-md input-bordered join-item max-w-36"
            onChange={(event: ChangeEvent<HTMLInputElement>) => setSerialTemp(event.target.value)}
            disabled={loading}
            onKeyDown={handleKeyDownOnLog}
            placeholder="Type Serial"
        />
    );
};

export default Input;