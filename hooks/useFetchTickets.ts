import { useState, useEffect } from 'react';
import { getTicketHistoryViaSrv, getTicketLatestViaSrv } from "@/lib/api";

interface Ticket {
    // Definire le proprietà del ticket in base alla struttura dei dati restituiti
}

const useFetchTickets = () => {
    const [ticketHistory, setTicketHistory] = useState<Ticket[] | null>(null);
    const [ticketLatest, setTicketLatest] = useState<Ticket | null>(null);

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