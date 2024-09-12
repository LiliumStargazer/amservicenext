import React, {ChangeEvent, KeyboardEvent} from "react";
import useStore from "@/app/store";

import {useRouter} from "next/navigation";
import useHandleDownloadBackup from "@/features/shared/client/hooks/useHandleDownloadBackup";


const Input= () => {
    const setSerial = useStore(state => state.setSerial);
    const serial = useStore(state => state.serial);
    const router = useRouter();
    const downloadBackup = useHandleDownloadBackup(router);

    const handleKeyDownOnLog = async (event: KeyboardEvent) => {
        if (event.key === "Enter" ) {
            await downloadBackup(serial);
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