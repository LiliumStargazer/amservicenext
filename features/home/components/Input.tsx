import React, { ChangeEvent, KeyboardEvent } from "react";
import useStore from "@/app/store";
import { getSerialValidationMessage, onClickOpenWindow, trimAndFormatSerial } from "@/features/shared/client/utils/utils";
import useValidateSerialAndNavigate from "@/features/shared/client/hooks/useValidateSerialAndNagivate";

const Input = ({ isInput, id }: { isInput: boolean, id: string }) => {
    const setSerialTemp = useStore(state => state.setSerialTemp);
    const serialTemp = useStore(state => state.serialTemp);
    const aliveSerial = useStore(state => state.aliveSerial);
    const setAliveSerial = useStore(state => state.setAliveSerial);
    const setPassword = useStore(state => state.setPassword);
    const setSerial = useStore(state => state.setSerial);
    const setMessage = useStore(state => state.setMessage);
    const validateSerialAndNavigate = useValidateSerialAndNavigate();

    const handleKeyDownOnAlive = (event: KeyboardEvent) => {
        if (event.key === "Enter") {
            const formattedSerial = trimAndFormatSerial(aliveSerial);
            setSerial(formattedSerial);
            const message = getSerialValidationMessage(formattedSerial);
            if (message !== "valid") {
                setMessage(message);
            } else {
                onClickOpenWindow("https://alive2.amdistributori.it:8443/dettaglio-distributore/?serialnumber={input}", aliveSerial);
            }
        }
    };

    const handleKeyDownOnLog = async (event: KeyboardEvent) => {
        if (event.key === "Enter") {
            await validateSerialAndNavigate(serialTemp);
        }
    };

    const inputProps = {
        ...(id === "amlog" && { placeholder: "Type Serial", onChange: (event: ChangeEvent<HTMLInputElement>) => setSerialTemp(event.target.value), onKeyDown: handleKeyDownOnLog }),
        ...(id === "alive" && { placeholder: "Type Serial", onChange: (event: ChangeEvent<HTMLInputElement>) => setAliveSerial(event.target.value), onKeyDown: handleKeyDownOnAlive }),
        ...(id === "ampassword" && { placeholder: "Insert Password", onChange: (event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value) })
    };

    return isInput ? (
        <input
            type="text"
            placeholder="Type here"
            className="input input-sm input-bordered w-full max-w-xs mr-2"
            {...inputProps}
        />
    ) : null;
};

export default Input;