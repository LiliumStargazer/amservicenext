import { useEffect } from "react";

const useBackupStatus = (
    isFetchedDownloadBackup: boolean,
    isSuccessDownloadBackup: boolean,
    setIsDownloadBackupEnabled: (enable: boolean) => void,
    setIsBackupReady: (isReady: boolean) => void,
    setIsGetEventsByDateEnabled: (enable: boolean) => void,
    setIsGetSoftwareEnabled: (enable: boolean) => void
) => {
    useEffect(() => {
        if (isFetchedDownloadBackup){
            setIsDownloadBackupEnabled(false);
            if ( isSuccessDownloadBackup){
                setIsBackupReady(true);
                setIsGetEventsByDateEnabled(true);
                setIsGetSoftwareEnabled(true);
            }
        }
    }, [isFetchedDownloadBackup, isSuccessDownloadBackup, setIsDownloadBackupEnabled, setIsGetEventsByDateEnabled, setIsBackupReady]);
};

export default useBackupStatus;