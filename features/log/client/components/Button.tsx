import React from "react";
import useStore from "@/app/store";
import {useRouter} from "next/navigation";
import useHandleDownloadBackup from "@/features/shared/client/hooks/useHandleDownloadBackup";

const Button  = () => {

    const loading = useStore(state => state.loading);
    const serial = useStore(state => state.serial);
    const classNameButton = loading ? "btn btn-info btn-disabled" : "btn btn-info";
    const router = useRouter();
    const downloadBackup = useHandleDownloadBackup(router);

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

export default Button;