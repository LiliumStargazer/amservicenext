import { useEffect } from "react";
import { getLatestBackup } from "@/app/utils/utils";

const useBackupList = (
    rawBackupList: string[],
    setBackup: (backup: string) => void,
    isFetchedBackupList: boolean,
    setIsGetBackupListEnabled: (value: boolean) => void,
    setIsDownloadBackupEnabled: (value: boolean) => void,
    setBackupList: (backupList: string[]) => void
) => {
    useEffect(() => {
        if (isFetchedBackupList) {
            if (Array.isArray(rawBackupList)){
                const latestDataBackup = getLatestBackup(rawBackupList);
                setBackup(latestDataBackup);
                setBackupList(rawBackupList);
                setIsDownloadBackupEnabled(true);
            }
            setIsGetBackupListEnabled(false);
        }
    }, [isFetchedBackupList, rawBackupList, setBackup, setBackupList, setIsDownloadBackupEnabled, setIsGetBackupListEnabled]);
};

export default useBackupList;