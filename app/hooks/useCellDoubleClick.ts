import { useCallback } from "react";
import { CellDoubleClickedEvent } from "ag-grid-community";

const useCellDoubleClick = (
    searchValue: string,
    setEventString: (value: string) => void,
    setIsAliveEvent: (value: boolean) => void,
    setDialogContent: (value: string) => void,
    setIsDialogOpen: (value: boolean) => void,
    setMessage: (message: string) => void,
    serial: string,
    backup: string
) => {
    return useCallback((event: CellDoubleClickedEvent) => {
        
        if (event.colDef.field === 'EventString') {

            setEventString(event.data.EventString);
            setIsAliveEvent(true);
            
        }
        if (event.colDef.field === 'TagData') {
            setDialogContent(event.data.TagData);
            setIsDialogOpen(true);
        }

        if (searchValue.length === 0 && event && event.colDef.field === 'DataOraR') {
            setMessage('Please enter a search value');
            return;
        }

        if (event && event.colDef.field === 'DataOraR') {
            const [day, month, year] = event.data.DataOraR.split('/');
            const newDate = new Date(Date.UTC(year, month - 1, day, 12, 0, 0)).toISOString();
            const id = event.data.ID;

            const queryParams = new URLSearchParams({
                date: newDate,
                id: id.toString(),
                serial: serial.toString(),
                backup: backup.toString(),
            }).toString();

            const newWindow = window.open(`/extracted-days-events?${queryParams}`, '_blank');
            if (!newWindow) {
                setMessage('Please allow popups for this website');
            }
        }
    }, [searchValue, setEventString, setIsAliveEvent, setDialogContent, setIsDialogOpen, setMessage, serial, backup]);
};

export default useCellDoubleClick;