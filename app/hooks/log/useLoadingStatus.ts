import { useEffect } from "react";

const useLoadingStatus = (
    isLoadingEventsByDate: boolean,
    isLoadingSelectedEvents: boolean,
    isLoadingBackupList: boolean,
    isDownloading: boolean,
    setLoading: (loading: boolean) => void
) => {
    useEffect(() => {
        if (isLoadingEventsByDate || isLoadingSelectedEvents || isLoadingBackupList || isDownloading) {
            setLoading(true);
        } else {
            setLoading(false);
        }
    }, [isLoadingEventsByDate, isLoadingSelectedEvents, isLoadingBackupList, isDownloading, setLoading]);
};

export default useLoadingStatus;