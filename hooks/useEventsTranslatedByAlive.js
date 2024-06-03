import {useMemo, useContext} from 'react';
import {Context} from "@/app/Context";

function useEventsTranslatedByAlive() {
    const {eventsTranslatedByAlive } = useContext(Context);
    const events = useMemo(() =>
        eventsTranslatedByAlive,
        [eventsTranslatedByAlive]
    );
    return {events};
}

export default useEventsTranslatedByAlive;