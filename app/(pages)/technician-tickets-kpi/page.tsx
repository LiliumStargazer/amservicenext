'use client'

import React, {useEffect, useMemo, useState} from "react";

import {
    createStatistics,
    filterOnlyActiveTechnicians,
    filterTechnicianFromTickets,
    filterTicketsAndAddTTR,
    storedTechnicians
} from "@/app/utils/ticketStatistics";
import {useQueryExternalTicketHistory} from "@/app/hooks/technician-tickets/useQueryExternalTicketHistory";
import {useQueryExternalLatestTicket} from "@/app/hooks/technician-tickets/useQueryExternalLatestTicket";
import AlertLoading from "@/app/components/shared/AlertLoading";
import {AgGridReact} from "ag-grid-react";
import LoadingOverlayAgGrid from "@/app/components/log/tables/LoadingOverlayAgGrid";
import parseCSV from "@/app/utils/parseCSV";
import { TechnicianStatistics, Ticket} from "@/app/types/types";
import {ColDef} from "ag-grid-community";
import ButtonNav from "@/app/components/shared/ButtonNav";
import Alert from "@/app/components/shared/Alert";

const colDefs: ColDef<TechnicianStatistics>[] = [
    { headerName: 'Technician', field: 'Manutentore' as keyof TechnicianStatistics, flex: 2, cellStyle: { whiteSpace: 'nowrap' }, filter: false, sortable: true },
    { headerName: 'Total Tickets', field: 'totalTickets' as keyof TechnicianStatistics, flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: false, sortable: true },
    { headerName: 'MTTR days', field: 'MTTR' as keyof TechnicianStatistics, flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: false, sortable: true, aggFunc: 'avg' },
    { headerName: '% Tickets with TTR 0-3 days', field: 'percentageOfTicketsWithTimeToRestoreLessOrEqualThree' as keyof TechnicianStatistics, flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: false, sortable: true },
    { headerName: '% Tickets with TTR 4-5 days', field: 'percentageOfTicketsWithTimeToRestoreBetweenFourAndFive' as keyof TechnicianStatistics, flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: false, sortable: true },
    { headerName: '% Tickets with TTR over 5 days', field: 'percentageOfTicketsWithTimeToRestoreGreaterThanFive' as keyof TechnicianStatistics, flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: false, sortable: true },
];

const Statistics: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [loading, setLoading] =useState(true);
    const [parsedTicketHistory, setParsedTicketHistory] = useState<Ticket[]>([]);
    const [parsedTicketLatest, setParsedTicketLatest] = useState<Ticket[]>([]);
    const [mergedTickets, setMergedTickets] = useState<Ticket[]>([]);
    const [message, setMessage] = useState<string>('');

    const {
        isLoading: isLoadingTicketHistory ,
        isError: isErrorTicketHistory,
        data: rawTicketHistory,
        error: errorTicketHistory,
        isSuccess: isSuccessTicketHistory
    } = useQueryExternalTicketHistory();

    const {
        isLoading: isLoadingLatestTicket ,
        isError: isErrorLatestTicket,
        data: rawLatestTicket,
        error: errorLatestTicket,
        isSuccess: isSuccessLatestTicket
    } = useQueryExternalLatestTicket();

    useEffect(() => {
        const fetchAndParseTicketHistory = async () => {
            try {
                if (isLoadingTicketHistory)
                    setLoading(true);
                if (isErrorTicketHistory)
                    throw new Error("Error fetching tickets: " + errorTicketHistory);

                if (isSuccessTicketHistory && rawTicketHistory) {
                    const ticketHistoryParsed = await parseCSV(rawTicketHistory.toString());

                    if ( Array.isArray(ticketHistoryParsed) )
                        setParsedTicketHistory(ticketHistoryParsed);

                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchAndParseTicketHistory().catch(console.error);
    }, [isLoadingTicketHistory, isErrorTicketHistory, rawTicketHistory, errorTicketHistory, isSuccessTicketHistory]);

    useEffect(() => {
        const fetchAndParseLatestTicket = async () => {
            try {
                if (isLoadingLatestTicket)
                    setLoading(true);
                if (isErrorLatestTicket)
                    throw new Error("Error fetching tickets: " + errorLatestTicket);

                if (isSuccessLatestTicket && rawLatestTicket) {
                    const ticketLatestParsed = await parseCSV(rawLatestTicket.toString());
                    setParsedTicketLatest(ticketLatestParsed);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchAndParseLatestTicket().catch(console.error);

    }, [isLoadingLatestTicket, isErrorLatestTicket, rawLatestTicket, errorLatestTicket, isSuccessLatestTicket]);


    useEffect(() => {
        if (parsedTicketHistory.length > 0 && parsedTicketLatest.length > 0) {
            setMergedTickets([...parsedTicketHistory, ...parsedTicketLatest]);
            setLoading(false);
        }
    }, [parsedTicketHistory, parsedTicketLatest]);

    const technicians = useMemo(() => {
        if (!mergedTickets || mergedTickets.length === 0) {
            return [];
        }
        return filterTechnicianFromTickets(mergedTickets);
    }, [mergedTickets]);

    const activeTechnicians = useMemo(() => filterOnlyActiveTechnicians(technicians, storedTechnicians), [technicians]);

    const ticketFiltered = useMemo(() => {
        if (!mergedTickets || mergedTickets.length === 0) {
            return [];
        }
        return filterTicketsAndAddTTR(mergedTickets, activeTechnicians, isOpen);
    }, [mergedTickets, activeTechnicians, isOpen]);

    const techniciansStatistic = useMemo(() => createStatistics(ticketFiltered, activeTechnicians), [ticketFiltered, activeTechnicians]);

    const handleClick = (status: string) => {
        if (status === 'all') {
            setIsOpen(false);
        } else {
            setIsOpen(true);
        }
    }

    const getButtonClass = (buttonName: string) => {
        if (buttonName === 'open') {
            return `btn ${isOpen ? 'btn-info' : 'btn-neutral'} tn-xs sm:btn-sm md:btn-md lg:btn-md mr-2`;
        }
        else
            return `btn ${!isOpen ? 'btn-info' : 'btn-neutral'} tn-xs sm:btn-sm md:btn-md lg:btn-md mr-2`;
    };

    if (loading) {
        return ( <AlertLoading /> );
    }

    return (
        <div className="flex flex-col h-screen">
            <div>
                <div id="header" className="navbar bg-neutral text-neutral-content h-16">
                    <ButtonNav setMessage={setMessage}/>
                    <div className="ml-10">
                        <Alert message={message} setMessage={setMessage}/>
                    </div>
                    <p>{"MTT: Medium Time To Restore - TTR: Time To Restore"}</p>
                </div>
            </div>
            <div></div>
            <div className="p-2">
                <button onClick={() => handleClick('all')} className={getButtonClass('all')}>
                    All
                </button>
                <button onClick={() => handleClick('open')} className={getButtonClass('open')}>
                    In Progress Tickets
                </button>
            </div>
            <div className="flex-grow">
                <div className="ag-theme-quartz-dark compact w-full h-full overflow-hidden">
                    <AgGridReact<TechnicianStatistics>
                        loading={loading}
                        rowData={techniciansStatistic}
                        columnDefs={colDefs}
                        loadingOverlayComponent={LoadingOverlayAgGrid}
                        loadingOverlayComponentParams={{loadingMessage: "Loading, one moment please..."}}
                    />
                </div>
            </div>
        </div>
    );

}
export default Statistics;