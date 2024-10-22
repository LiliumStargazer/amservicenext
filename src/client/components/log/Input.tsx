import React, { ChangeEvent, KeyboardEvent } from "react";
import useStore from "@/app/store";
import useResetAndNavigate from "@/src/client/hooks/useResetAndNavigate";

const Input = () => {
    const setSerialTemp = useStore(state => state.setSerialTemp);
    const serialTemp = useStore(state => state.serialTemp);
    const loadingGlobal = useStore(state => state.loadingGlobal);
    const validateSerialAndNavigate = useResetAndNavigate();

    const handleKeyDownOnLog = (event: KeyboardEvent) => {
        if (event.key === "Enter") {
            validateSerialAndNavigate(serialTemp);
        }
    };

    return (
        <input
            type="text"
            className="input input-md input-bordered join-item max-w-36"
            onChange={(event: ChangeEvent<HTMLInputElement>) => setSerialTemp(event.target.value)}
            onKeyDown={handleKeyDownOnLog}
            placeholder="Type Serial"
            disabled={loadingGlobal}
        />
    );
};

export default Input;