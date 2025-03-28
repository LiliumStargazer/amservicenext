import { useEffect } from "react";
import { ErrorResponse } from "@/app/types/types";

interface UseErrorHandlingProps {
    eventsByDate: ErrorResponse;
    selectedEvents: ErrorResponse;
    aliveEvent: ErrorResponse;
    rawBackupList: ErrorResponse;
    fridgeRawData: ErrorResponse;
    dataFingerTransaction: ErrorResponse;
    section: string;
    setMessage: (message: string) => void;
    setSection: (section: string) => void;
    setLoading: (loading: boolean) => void;
    setIsBackupReady: (isReady: boolean) => void;
    setIsGetSelectedEventsEnabled: (enable: boolean) => void;
}

const useErrorHandling = ({
    eventsByDate,
    selectedEvents,
    aliveEvent,
    rawBackupList,
    fridgeRawData,
    dataFingerTransaction,
    section,
    setMessage,
    setSection,
    setLoading,
    setIsBackupReady,
    setIsGetSelectedEventsEnabled
}: UseErrorHandlingProps) => {
    useEffect(() => {

        if (rawBackupList && rawBackupList.error) {

            if ( rawBackupList.error.includes('No such file'))
                setMessage("No backup files found, check serial number");
            else
                setMessage("error on opening backup List: " + rawBackupList.error);
            setLoading(false);
        }
        if (eventsByDate && eventsByDate.error) {
            if ( eventsByDate.error.includes('No backup file found'))
                setMessage ("backup corrupted, change backup or fix it. error details: " + eventsByDate.error);
            else
                setMessage("error on opening data in data by date: " + eventsByDate.error);
            setIsBackupReady(false);
            setLoading(false);
        }
        if (selectedEvents && selectedEvents.error) {
            setMessage("error on opening data in filtered events: " + selectedEvents.error);
            setLoading(false);
            setIsGetSelectedEventsEnabled(false);
        }
        if (aliveEvent && aliveEvent.error) {
            setMessage("error on opening data in alive events: " + aliveEvent.error);
            setLoading(false);
        }
        if (fridgeRawData && fridgeRawData.error && (section === 'fridge' || section === 'chart')) {
            setSection('master');
            setLoading(false);
        }
        if (dataFingerTransaction && dataFingerTransaction.error && section === 'fingersTransaction') {
            setSection('master');
            setLoading(false);
        }
    }, [eventsByDate,
        selectedEvents,
        aliveEvent,
        rawBackupList,
        fridgeRawData,
        section,
        setMessage,
        setSection,
        setLoading,
        setIsBackupReady,
        setIsGetSelectedEventsEnabled,
        dataFingerTransaction]);
};

export default useErrorHandling;