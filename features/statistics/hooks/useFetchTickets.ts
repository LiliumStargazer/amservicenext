import { useState, useEffect } from 'react';
import { getTicketHistoryViaSrv, getTicketLatestViaSrv } from "@/features/shared/client/api";

const useFetchTickets = () => {
    const [ticketHistory, setTicketHistory] = useState<any[]>([]);
    const [ticketLatest, setTicketLatest] = useState<any[]>([]);

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const [historyResult, latestResult] = await Promise.all([
                    getTicketHistoryViaSrv(),
                    getTicketLatestViaSrv()
                ]);
                setTicketHistory(historyResult);
                setTicketLatest(latestResult);
            } catch (error) {
                console.error("Error fetching tickets:", error);
            }
        };

        fetchTickets().catch(error => console.error("Error in fetchTickets:", error));
    }, []);

    return { ticketHistory, ticketLatest };
};

export default useFetchTickets;