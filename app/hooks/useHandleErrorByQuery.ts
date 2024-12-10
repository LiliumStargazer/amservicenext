import { useEffect } from "react";
import { ErrorResponse } from "@/app/types/types";

interface UseHandleErrorsProps {
    isErrorEventsByDate: boolean;
    errorEventsByDate: ErrorResponse | null;
    isErrorAliveEvent: boolean;
    errorAliveEvent: ErrorResponse | null;
    isErrorSelectedEvents: boolean;
    errorSelectedEvents: ErrorResponse | null;
    isErrorBackupList: boolean;
    errorBackupList: ErrorResponse | null;
    isErrorDownloading: boolean;
    errorDownloading: ErrorResponse | null;
    isErrorFridge: boolean;
    errorFridge: ErrorResponse | null;
    setMessage: (message: string) => void;
    resetQueries: () => Promise<void>;
    setLoading: (loading: boolean) => void;
}

const useHandleErrors = ({
    isErrorEventsByDate,
    errorEventsByDate,
    isErrorAliveEvent,
    errorAliveEvent,
    isErrorSelectedEvents,
    errorSelectedEvents,
    isErrorBackupList,
    errorBackupList,
    isErrorDownloading,
    errorDownloading,
    isErrorFridge,
    errorFridge,
    setMessage,
    resetQueries,
    setLoading
}: UseHandleErrorsProps) => {
    useEffect(() => {
        if (isErrorEventsByDate && errorEventsByDate) {
            setMessage(
                errorEventsByDate.error.includes('No such file')
                    ? "Serial invalid."
                    : "Error: " + errorEventsByDate.error
            );
            resetQueries().catch((error) => { console.log(error); });
            setLoading(false);
        }
        if (isErrorAliveEvent && errorAliveEvent) {
            setMessage("Error on fetching alive events: " + errorAliveEvent.error);
            resetQueries().catch((error) => { console.log(error); });
            setLoading(false);
        }
        if (isErrorSelectedEvents && errorSelectedEvents) {
            setMessage("Error on fetching filtered events: " + errorSelectedEvents.error);
            resetQueries().catch((error) => { console.log(error); });
            setLoading(false);
        }
        if (isErrorBackupList && errorBackupList) {
            setMessage("Error on fetching backup list: " + errorBackupList.error);
            resetQueries().catch((error) => { console.log(error); });
            setLoading(false);
        }
        if (isErrorDownloading && errorDownloading) {
            setMessage("Error on downloading backup: " + errorDownloading.error);
            resetQueries().catch((error) => { console.log(error); });
            setLoading(false);
        }
        if (isErrorFridge && errorFridge) {
            setMessage("Error on fetching fridge data: " + errorFridge.error);
            setLoading(false);
        }
    }, [
        isErrorEventsByDate, errorEventsByDate,
        isErrorAliveEvent, errorAliveEvent,
        isErrorSelectedEvents, errorSelectedEvents,
        isErrorBackupList, errorBackupList,
        isErrorDownloading, errorDownloading,
        isErrorFridge, errorFridge,
        resetQueries, setMessage, setLoading
    ]);
};

export default useHandleErrors;