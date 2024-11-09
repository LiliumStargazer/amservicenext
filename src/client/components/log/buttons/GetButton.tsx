import React from "react";
import useStore from "@/app/store";
import useSetNewData from "@/src/client/hooks/useSetNewData";
import {useQueryClient} from "@tanstack/react-query";

const GetButton = () => {
    const loadingGlobal = useStore(state => state.loadingGlobal);
    const classNameButton = loadingGlobal ? "btn btn-info btn-disabled" : "btn btn-info";
    const serialTemp = useStore(state => state.serialTemp);
    const setIsLatestBackupQueryActive = useStore(state => state.setIsLatestBackupQueryActive);
    const serial = useStore(state => state.serial);
    const setNewData = useSetNewData();
    const queryClient = useQueryClient();

    const handleClickLog = async () => {
        if (serialTemp === serial) {
            await queryClient.resetQueries({
                queryKey: ['eventsFromLatestBackup'],
                exact: true, // Ensure it matches the exact query key
            }).catch((error) => {console.log(error)});
            setIsLatestBackupQueryActive(true);
        } else {
            await setNewData(serialTemp).catch(console.error);
        }
    }

    return (
        <button
            className={classNameButton}
            disabled={loadingGlobal}
            onClick={handleClickLog}
        >
            Go!
        </button>
    );
};

export default GetButton;