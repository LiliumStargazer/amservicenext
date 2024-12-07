'use client'

import React, { ChangeEvent, KeyboardEvent } from "react";
import useStore from "@/app/store";

interface InputProps {
    loading: boolean;
    reset: () => Promise<void>;
}

const Input: React.FC<InputProps> = ({loading, reset}) => {
    const setSerialTemp = useStore(state => state.setSerialTemp);
    const handleKeyDownOnLog = async (event: KeyboardEvent) => {
        if (event.key === "Enter") {
            await reset();
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
            // disabled={loadingGlobal}
        />
    );
};

export default Input;