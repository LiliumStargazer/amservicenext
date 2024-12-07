'use client'

import React, { ChangeEvent, KeyboardEvent } from "react";

interface InputProps {
    isInput: boolean;
    id: string;
    handleKeyDownOnAlive?: (event: KeyboardEvent) => void;
    setAliveSerial?: (serial: string) => void;
    handleKeyDownOnLog?: (event: KeyboardEvent) => void;
    setSerialTemp?: (serial: string) => void;
    setPassword?: (password: string) => void;
    loading?: boolean;
}

const Input: React.FC<InputProps> = ({ isInput, id, handleKeyDownOnAlive, setAliveSerial, handleKeyDownOnLog, setSerialTemp , setPassword, loading}) => {

    const inputProps = {
        ...(id === "amlog" && {
            placeholder: "Type Serial",
            onChange: (event: ChangeEvent<HTMLInputElement>) => setSerialTemp && setSerialTemp(event.target.value),
            onKeyDown: handleKeyDownOnLog
        }),
        ...(id === "alive" && {
            placeholder: "Type Serial",
            onChange: (event: ChangeEvent<HTMLInputElement>) => setAliveSerial && setAliveSerial(event.target.value),
            onKeyDown: handleKeyDownOnAlive
        }),
        ...(id === "ampassword" && {
            placeholder: "Insert Password",
            onChange: (event: ChangeEvent<HTMLInputElement>) => setPassword && setPassword(event.target.value)
        })
    };

    return isInput ? (
        <input
            disabled={loading}
            type="text"
            placeholder="Type here"
            className="input input-sm input-bordered w-full max-w-xs mr-2"
            {...inputProps}
        />
    ) : null;
};

export default Input;