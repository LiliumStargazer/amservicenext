import React from "react";
import useStore from "@/app/store";
import {useRouter} from "next/navigation";
import useHandleDownloadBackup from "@/features/shared/client/hooks/useHandleDownloadBackup";
import {getSerialValidationMessage, trimAndFormatSerial} from "@/features/shared/client/utils/utils";
import {getSerialValidationServer} from "@/features/shared/client/api";
import useReset from "@/features/log/client/hooks/useReset";

const GetButton  = () => {

    const loading = useStore(state => state.loading);
    const serial = useStore(state => state.serial);
    const setSerial = useStore(state => state.setSerial);
    const setMessage = useStore(state => state.setMessage);
    const setStoredSerial = useStore(state => state.setStoredSerial);
    const setTable = useStore(state => state.setTable);
    const classNameButton = loading ? "btn btn-info btn-disabled" : "btn btn-info";
    const router = useRouter();
    const downloadBackup = useHandleDownloadBackup(router);
    const reset = useReset();


    const handleClick = async () =>{
        const formattedSerial = trimAndFormatSerial(serial);
        setSerial(formattedSerial);
        const message = getSerialValidationMessage(formattedSerial);
        if (message !== "valid") {
            setMessage(message);
            return;
        }
        try {
            reset(formattedSerial);
            const serialValidated = await getSerialValidationServer(formattedSerial);
            if (serialValidated.error) {
                setMessage(serialValidated.error);
                return;
            }
            setStoredSerial(formattedSerial);
            setTable("master");
            router.push("/log");
        }catch (error) {
            console.error('Error while checking serial: ', error);
            setMessage(`Error while checking serial`);
        }
    }

    const handleDownloadBackupClick = async () => {
        await downloadBackup(serial);
    };

    return (
        <button
            className={classNameButton}
            disabled={loading}
            onClick={handleDownloadBackupClick}
        >
            Go!
        </button>
    )

};

export default GetButton;