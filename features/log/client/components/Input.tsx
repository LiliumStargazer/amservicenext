import React, { ChangeEvent, KeyboardEvent } from "react";
import useStore from "@/app/store";
import useValidateSerialAndNavigate from "@/features/shared/client/hooks/useValidateSerialAndNagivate";

const Input = () => {
    const setSerialTemp = useStore(state => state.setSerialTemp);
    const serialTemp = useStore(state => state.serialTemp);
    const validateSerialAndNavigate = useValidateSerialAndNavigate();

    const handleKeyDownOnLog = async (event: KeyboardEvent) => {
        if (event.key === "Enter") {
            await validateSerialAndNavigate(serialTemp);
        }
    };

    return (
        <input
            type="text"
            className="input input-md input-bordered join-item max-w-36"
            onChange={(event: ChangeEvent<HTMLInputElement>) => setSerialTemp(event.target.value)}
            onKeyDown={handleKeyDownOnLog}
            placeholder="Type Serial"
        />
    );
};

export default Input;