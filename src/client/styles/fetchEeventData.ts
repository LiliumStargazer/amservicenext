// utils/fetchEventData.ts
import { apiGetAliveEventsCorsHandling } from "@/src/client/api/api";

export const fetchEventData = async (
    event: any,
    setIsDialogOpen: (value: boolean) => void,
    setDialogContent: (value: any[]) => void
) => {
    if (event.colDef.field === 'EventString') {
        try {
            const rowEvent = event.data.EventString;
            const data = await apiGetAliveEventsCorsHandling();
            const matchedEvent =  data.find((event) => event.EventString === rowEvent);
            if (matchedEvent) {
                setDialogContent(matchedEvent);
                setIsDialogOpen(true);
            } else {
                console.error('matchedEvent is undefined or null');
            }
        } catch (error) {
            console.error(error);
        }
    }
};