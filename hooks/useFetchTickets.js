import { useState, useEffect } from 'react';
import {getTicketHistoryViaSrv, getTicketLatestViaSrv} from "@/lib/api";

const useFetchTickets = () => {
    const [ticketHistory, setTicketHistory] = useState(null);
    const [ticketLatest, setTicketLatest] = useState(null);

    useEffect(() => {
        const ticketHistoryViaSrv = getTicketHistoryViaSrv();
        ticketHistoryViaSrv.then((result) => {
            setTicketHistory(result);
        });

        const ticketLatestViaSrv = getTicketLatestViaSrv();
        ticketLatestViaSrv.then((result) => {
            setTicketLatest(result);
        });

    }, []);

    return {ticketHistory, ticketLatest};
};

export default useFetchTickets;