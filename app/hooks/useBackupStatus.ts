import { useEffect } from "react";

const useBackupStatus = (
    isDownloading: boolean,
    isDownloaded: boolean,
    dataDownloaded: boolean,
    setIsBackupReady: (isReady: boolean) => void
) => {
    useEffect(() => {
        if (isDownloading) setIsBackupReady(false);
        if (isDownloaded && dataDownloaded) setIsBackupReady(true);
    }, [isDownloading, isDownloaded, dataDownloaded, setIsBackupReady]);
};

export default useBackupStatus;