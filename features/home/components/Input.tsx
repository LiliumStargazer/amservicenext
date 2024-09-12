import React, {ChangeEvent, KeyboardEvent} from "react";
import {useRouter} from "next/navigation";
import useStore from "@/app/store";
import { getSerialValidationMessage, onClickOpenWindow, trimAndFormatSerial } from "@/features/shared/client/utils/utils";
import useHandleDownloadBackup from "@/features/shared/client/hooks/useHandleDownloadBackup";

const Input = ({ isInput, id }: { isInput: boolean , id: string}) => {
    const serial = useStore(state => state.serial);
    const setSerial = useStore(state => state.setSerial);
    const aliveSerial = useStore(state => state.aliveSerial);
    const setAliveSerial = useStore(state => state.setAliveSerial);
    const setPassword = useStore(state => state.setPassword);
    const setMessage = useStore(state => state.setMessage);
    const router = useRouter();
    const downloadBackup = useHandleDownloadBackup(router);

    const handleKeyDownOnLog = async (event: KeyboardEvent) => {
        if (event.key === "Enter" ) {
            await downloadBackup(serial);
        }
    }

    const handleKeyDownOnAlive  = (event: KeyboardEvent) => {
        if (event.key === "Enter") {
            const formattedSerial = trimAndFormatSerial(aliveSerial);
            setSerial(formattedSerial);
            const message = getSerialValidationMessage(formattedSerial);
            if (message !== "valid" )
                setMessage(message);
            else {
                onClickOpenWindow("https://alive2.amdistributori.it:8443/dettaglio-distributore/?serialnumber={input}", aliveSerial);
            }
        }
    }

    const inputProps = {
        ...(id === "amlog" && { placeholder: "Type Serial" ,onChange: (event: ChangeEvent<HTMLInputElement>) => setSerial(event.target.value), onKeyDown: handleKeyDownOnLog}),
        ...(id === "alive" && { placeholder: "Type Serial" ,onChange: (event: ChangeEvent<HTMLInputElement>) => setAliveSerial(event.target.value) , onKeyDown: handleKeyDownOnAlive}),
        ...(id === "ampassword" && { placeholder: "Insert Password" ,onChange: (event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)})
    }

    return isInput ?
        <input
            type="text"
            placeholder="Type here"
            className="input input-sm input-bordered w-full max-w-xs mr-2"
            {...inputProps}
        /> :
        null;
}

export default Input;