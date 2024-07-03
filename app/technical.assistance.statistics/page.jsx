'use client'

import useParseCSV from "@/hooks/useParseCSV";
import useFetchTickets from "@/hooks/useFetchTickets";

import {
    colDefs,
    options,
    createStatistics,
    filterOnlyActiveTechnicians,
    filterTechnicianFromTickets, filterTicketsAndAddTTR,
    storedTechnicians
} from "@/lib/statistic-helper";
import React, {useContext, useMemo, useState} from "react";
import loading_lottie from "@/public/loading_lottie.json";
import AnimationLottie from "@/components/animation-lottie";
import Header from "@/components/header";
import AgGrid from "@/components/aggrid";
import {Context} from "@/app/Context";

const Statistics = () => {
    const {setLoading}= useContext(Context);
    const [isOpen, setIsOpen] = useState(false);
    setLoading(true);
    const {ticketHistory, ticketLatest} = useFetchTickets();
    const  ticketHistoryParsed  = useParseCSV(ticketHistory).parsedData;
    const  ticketLatestParsed  = useParseCSV(ticketLatest).parsedData;
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
        return filterTechnicianFromTickets(mergedTickets)
    }, [mergedTickets]);

    const activeTechnicians = useMemo(() => filterOnlyActiveTechnicians(technicians, storedTechnicians), [technicians]);
    const ticketFiltered = useMemo(() => {
        if (!mergedTickets || mergedTickets.length === 0) {
            return [];
        }
        return filterTicketsAndAddTTR(mergedTickets, activeTechnicians, isOpen)
    }, [mergedTickets, activeTechnicians, isOpen]);

    if (isOpen)
        console.log(ticketFiltered);

    const techniciansStatistic = useMemo( ()=> createStatistics(ticketFiltered, activeTechnicians), [ticketFiltered, activeTechnicians]);

    const handleClick = (status) => {
        if (status === 'all') {
            setIsOpen(false);
        } else {
            setIsOpen(true);
        }
    }

    const getButtonClass = (buttonName) => {
        if (buttonName === 'open') {
            return `btn ${isOpen ? 'btn-info' : 'btn-neutral'} tn-xs sm:btn-sm md:btn-md lg:btn-md mr-2`;
        }
        else
            return `btn ${!isOpen ? 'btn-info' : 'btn-neutral'} tn-xs sm:btn-sm md:btn-md lg:btn-md mr-2`;
    };

    if (!techniciansStatistic || techniciansStatistic.length === 0) {
        return <AnimationLottie file={loading_lottie}/>;
    }
    else{
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
