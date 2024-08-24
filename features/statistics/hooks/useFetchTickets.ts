import { useState, useEffect } from 'react';
import { getTicketHistoryViaSrv, getTicketLatestViaSrv } from "@/features/shared/client/api";


const useFetchTickets = () => {
    const [ticketHistory, setTicketHistory] = useState<any[]>([]);
    const [ticketLatest, setTicketLatest] = useState<any[]>([]);

    useEffect(() => {
        const fetchTicketHistory = async () => {
            const result = await getTicketHistoryViaSrv();
            setTicketHistory(result);
        };

        const fetchTicketLatest = async () => {
            const result = await getTicketLatestViaSrv();
            setTicketLatest(result);
        };

        fetchTicketHistory();
        fetchTicketLatest();
    }, []);

    return { ticketHistory, ticketLatest };
};

export default useFetchTickets;