import { useEffect } from "react";
import { AliveEvent } from "@/app/types/types";

const useAliveEvent = (
    isSuccessAliveEvent: boolean,
    aliveEvent: AliveEvent[],
    eventString: string | null,
    setDialogContent: (content: string | AliveEvent | null) => void,
    setIsDialogOpen: (isOpen: boolean) => void,
    setIsAliveEvent: (isAlive: boolean) => void
) => {
    useEffect(() => {
        if (isSuccessAliveEvent && Array.isArray(aliveEvent)) {
            let matchedEvent = aliveEvent.find((event: AliveEvent) => event.EventString === eventString);

            if (!matchedEvent) {
                matchedEvent = {
                    EventString: "No event found",
                    EventCode: "",
                    EventTrad: "",
                    Tag1Trad: "",
                    Tag2Trad: "",
                    Tag3Trad: "",
                    Tag4Trad: "",
                    TagDataTrad: ""

                }
            }
            setDialogContent(matchedEvent);
            setIsDialogOpen(true);
            setIsAliveEvent(false);
        }
    }, [isSuccessAliveEvent, aliveEvent, eventString, setDialogContent, setIsDialogOpen, setIsAliveEvent]);
};

export default useAliveEvent;