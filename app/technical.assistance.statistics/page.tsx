'use client'


import React, {useMemo, useState} from "react";
import loading_lottie from "@/public/loading_lottie.json";
import useFetchTickets from "@/features/statistics/hooks/useFetchTickets";
import useStore from "@/app/store";

import {
    colDefs,
    createStatistics,
    filterOnlyActiveTechnicians,
    filterTechnicianFromTickets,
    filterTicketsAndAddTTR,
    options,
    storedTechnicians
} from "@/features/statistics/utils/statistic-helper";
import AnimationLottie from "@/features/shared/client/components/AnimationLottie";
import Header from "@/features/shared/client/components/Header";
import AgGrid from "@/features/shared/client/components/AgGrid";
import useParseCSV from "@/features/statistics/hooks/useParseCSV";




const Statistics: React.FC = () => {
    const  setLoading  = useStore(state => state.setLoading);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    setLoading(true);
    const { ticketHistory, ticketLatest } = useFetchTickets();
    // console.log("Ticket History:", ticketHistory);
    const ticketHistoryParsed = useParseCSV(ticketHistory).parsedData;
    const ticketLatestParsed = useParseCSV(ticketLatest).parsedData;


    const mergedTickets = useMemo(() => {
        if (!ticketHistoryParsed || !ticketLatestParsed || ticketHistoryParsed.length === 0 || ticketLatestParsed.length === 0) {
            return [];
        }
        return [...ticketHistoryParsed, ...ticketLatestParsed];
    }, [ticketHistoryParsed, ticketLatestParsed]);

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

    if (!techniciansStatistic || techniciansStatistic.length === 0) {
        return <AnimationLottie file={loading_lottie} />;
    }
    else {
        console.log("Technicians Statistic:", techniciansStatistic);
        setLoading(false);
        return (
            <div>
                <div>
                    <Header
                        text={"MTT: Medium Time To Restore - TTR: Time To Restore"}
                    />
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

                <div>
                    <AgGrid
                        colDefs={colDefs}
                        options={options}
                        rows={techniciansStatistic}
                    />
                </div>
            </div>
        );
    }
}
export default Statistics;