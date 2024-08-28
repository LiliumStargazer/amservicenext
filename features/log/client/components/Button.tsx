import React from "react";
import useStore from "@/app/store";
import useDownloadBackup from "@/features/shared/client/hooks/useDownloadBackup";
import {useRouter} from "next/navigation";

const Button  = () => {

    const loading = useStore(state => state.loading);
    const classNameButton = loading ? "btn btn-info btn-disabled" : "btn btn-info";
    const router = useRouter();

    return (
        <button
            className={classNameButton}
            disabled={loading}
            onClick={useDownloadBackup(router)}
        >
            Go!
        </button>
    )

};

export default Button;