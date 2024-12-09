import { useEffect, useRef } from "react";

const useLoadingStatus = (
    isLoadingEventsByDate: boolean,
    isLoadingSelectedEvents: boolean,
    isLoadingBackupList: boolean,
    isDownloading: boolean,
    setLoading: (loading: boolean) => void,
    delay: number = 300 // delay in milliseconds
) => {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (isLoadingEventsByDate || isLoadingSelectedEvents || isLoadingBackupList || isDownloading) {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
            setLoading(true);
        } else {
            timeoutRef.current = setTimeout(() => {
                setLoading(false);
            }, delay);
        }

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [isLoadingEventsByDate, isLoadingSelectedEvents, isLoadingBackupList, isDownloading, setLoading, delay]);
};

export default useLoadingStatus;