import React, { ChangeEvent, KeyboardEvent } from "react";
import useStore from "@/app/store";
import useSetNewData from "@/src/client/hooks/useSetNewData";
import {useQueryClient} from "@tanstack/react-query";

const Input = () => {
    const setSerialTemp = useStore(state => state.setSerialTemp);
    const serialTemp = useStore(state => state.serialTemp);
    const loadingGlobal = useStore(state => state.loadingGlobal);
    const setNewData = useSetNewData();
    const serial = useStore(state => state.serial);
    const setIsLatestBackupQueryActive = useStore(state => state.setIsLatestBackupQueryActive);
    const queryClient = useQueryClient();

    const handleKeyDownOnLog = async (event: KeyboardEvent) => {
        if (event.key === "Enter") {
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