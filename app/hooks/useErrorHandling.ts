import { useEffect } from "react";
import { ErrorResponse } from "@/app/types/types";

interface UseErrorHandlingProps {
    eventsByDate: ErrorResponse;
    selectedEvents: ErrorResponse;
    aliveEvent: ErrorResponse;
    backupList: ErrorResponse;
    fridgeRawData: ErrorResponse;
    section: string;
    setMessage: (message: string) => void;
    setSection: (section: string) => void;
    setLoading: (loading: boolean) => void;
}

const useErrorHandling = ({
    eventsByDate,
    selectedEvents,
    aliveEvent,
    backupList,
    fridgeRawData,
    section,
    setMessage,
    setSection,
    setLoading
}: UseErrorHandlingProps) => {
    useEffect(() => {
        if (backupList && backupList.error) {
            if ( backupList.error.includes('No such file'))
                setMessage("No backup files found, check serial number");
            else
                setMessage("error on opening backup List: " + backupList.error);
            setLoading(false);
        }
        if (eventsByDate && eventsByDate.error) {
            if ( eventsByDate.error.includes('No backup file found'))
                setMessage ("backup corrupted, change backup or fix it. error details: " + eventsByDate.error);
            else
                setMessage("error on opening data in data by date: " + eventsByDate.error);
            setLoading(false);
        }
        if (selectedEvents && selectedEvents.error) {
            setMessage("error on opening data in filtered events: " + selectedEvents.error);
            setLoading(false);
        }
        if (aliveEvent && aliveEvent.error) {
            setMessage("error on opening data in alive events: " + aliveEvent.error);
            setLoading(false);
        }
        if (fridgeRawData && fridgeRawData.error && (section === 'fridge' || section === 'chart')) {
            setSection('master');
            setLoading(false);
        }
    }, [eventsByDate, selectedEvents, aliveEvent, backupList, fridgeRawData, section, setMessage, setSection, setLoading]);
};

export default useErrorHandling;