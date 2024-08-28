import React, {ChangeEvent, KeyboardEvent} from "react";
import useStore from "@/app/store";
import {validateSerialAndSetAlert} from "@/features/shared/client/utils/backup-handler";
import {useRouter} from "next/navigation";
import useDownloadBackup from "@/features/shared/client/hooks/useDownloadBackup";

const Input= () => {
    const setSerial = useStore(state => state.setSerial);
    const serial = useStore(state => state.serial);
    const router = useRouter();
    const downloadBackup = useDownloadBackup(router);

    const handleKeyDownOnLog = async (event: KeyboardEvent) => {
        if (event.key === "Enter" ) {
            if ( validateSerialAndSetAlert(serial))
                await downloadBackup();
        }
    }

    return <input type="text"
                  className="input input-md input-bordered join-item max-w-36"
                  onChange={(event: ChangeEvent<HTMLInputElement>) => setSerial(event.target.value)}
                  placeholder = "Type Serial"
                    onKeyDown={handleKeyDownOnLog}
    />;
}

export default Input;