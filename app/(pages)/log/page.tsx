'use client'

import React, {useCallback, useState} from "react";
import {AliveEvent, ErrorResponse, RawFridgeData, RawLogEventData} from "@/app/types/types";
import { GridApi } from "ag-grid-community";
import useStore from "@/app/store";
import SelectBackup from "@/app/components/log/master/SelectBackup";
import InfoDropDown from "@/app/components/log/master/InfoDropDown";
import IconSoftware from "@/app/components/log/IconSoftware";
import Badge from "@/app/components/log/Badge";
import ButtonNav from "@/app/components/shared/ButtonNav";
import SearchEvents from "@/app/components/log/master/SearchEvents";
import Alert from "@/app/components/shared/Alert";
import AgGridFridge from "@/app/components/log/fridge/AgGridFridge";
import Dialog from "@/app/components/log/Dialog";
import ChartFridgeContainer from "@/app/components/log/fridge/ChartFridgeContainer";
import GetButton from "@/app/components/buttons/GetButton";
import Input from "@/app/components/log/master/Input";
import SelectFridge from "@/app/components/log/fridge/SelectFridge";
import AgGridFingersTransaction from "@/app/components/log/tables/AgGridFingersTransaction";
import FingerButton from "@/app/components/buttons/FingerButton";
import ParamButton from "@/app/components/buttons/ParamButton";
import FridgeButton from "@/app/components/buttons/FridgeButton";
import ExcelButton from "@/app/components/buttons/ExcelButton";
import LisButton from "@/app/components/buttons/LisButton";
import MasterButton from "@/app/components/buttons/MasterButton";
import AgGridMaster from "@/app/components/log/master/AgGridMaster";
import DatePicker from "@/app/components/log/master/DatePicker";
import SwapChartTable from "@/app/components/log/fridge/SwapChartTable";
import useQueryEventsByDate from "@/app/hooks/log/useQueryEventsByDate";
import useQueryEventsFromAlive from "@/app/hooks/log/useQueryEventsFromAlive";
import useQuerySelectedEvents from "@/app/hooks/log/useQuerySelectedEvents";
import useResetQueries from "@/app/hooks/shared/useResetQueries";
import {useQueryGetBackupList} from "@/app/hooks/log/useQueryGetBackupList";
import {useQueryDownloadBackup} from "@/app/hooks/log/useQueryDownloadBackup";
import {useQueryFridgeData} from "@/app/hooks/log/useQueryFridgeData";
import useAliveEvent from "@/app/hooks/log/useAliveEvent";
import useErrorHandling from "@/app/hooks/log/useErrorHandling";
import useLoadingStatus from "@/app/hooks/log/useLoadingStatus";
import useReset from "@/app/hooks/log/useReset";
import useCellDoubleClick from "@/app/hooks/log/useCellDoubleClick";
import useBackupStatus from "@/app/hooks/log/useBackupStatus";
import useBackupList from "@/app/hooks/log/useBackupList";
import useSearch from "@/app/hooks/log/useSearch";
import ParamContainer from "@/app/components/log/param/ParamContainer";
import TopNavBar from "@/app/components/log/TopNavBar";


const Log: React.FC = () => {
    const serial = useStore(state => state.serial);
    const serialTemp = useStore(state => state.serialTemp);
    const setSerial = useStore(state => state.setSerial);
    const [storedGridAPi, setStoredGridApi] = useState<GridApi | null>(null);
    const [message, setMessage] = useState<string>('');
    const [eventString, seteventString] = useState<string | null>(null);
    const [isAliveEvent, setIsAliveEvent] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogContent, setDialogContent] = useState<string | AliveEvent | null>(null);
    const [backup, setBackup] = useState<string>('');
    const [isBackupReady, setIsBackupReady] = useState(false);
    const [datePickerDate, setDatePickerDate] = useState<Date | null>(new Date());
    const [dateIsoString, setDateIsoString] = useState<string | null>(null);
    const [searchValue, setSearchValue] = useState<string>('');
    const [loading, setLoading] = React.useState(false);
    const [isResettingSearchingEvent, setIsResettingSearchingEvent] = useState(false);
    const [fridgeSelected, setFridgeSelected] = useState<number>(0);
    const [section, setSection] = useState<string>('master');
    const resetQueries = useResetQueries();
    const reset = useReset(
        serialTemp,
        setMessage,
        setBackup,
        setIsBackupReady,
        setSearchValue,
        setSerial,
        setDatePickerDate,
        setDateIsoString,
        resetQueries
    );
    const {
        isLoading: isLoadingBackupList,
        data: backupList,
        isSuccess: isSuccessBackupList
    } = useQueryGetBackupList(serial);

    const {
        isLoading: isDownloading,
        data: dataDownloaded ,
        isSuccess: isDownloaded
    } = useQueryDownloadBackup(serial, backup);
    const {
        isLoading: isLoadingEventsByDate,
        data: eventsByDate,
        isSuccess: isSuccessEventsByDate
    } = useQueryEventsByDate(serial, backup, isBackupReady, dateIsoString );
    const {
        isLoading: isLoadingSelectedEvents,
        data: selectedEvents,
        isSuccess: isSuccessSelectedEvent} = useQuerySelectedEvents(serial, backup, searchValue, isBackupReady);
    const {
        data: aliveEvent,
        isSuccess: isSuccessAliveEvent } = useQueryEventsFromAlive(serial, backup, isAliveEvent);
    const {
        isLoading: isLoadingFridge,
        data: fridgeRawData,
        isSuccess: isSuccessFridge
    } = useQueryFridgeData(serial, backup, isBackupReady, section);
    useAliveEvent(
        isSuccessAliveEvent,
        aliveEvent as AliveEvent[],
        eventString,
        setDialogContent,
        setIsDialogOpen,
        setIsAliveEvent
    );
    useErrorHandling({
        eventsByDate: eventsByDate as ErrorResponse,
        selectedEvents: selectedEvents as ErrorResponse,
        aliveEvent: aliveEvent as ErrorResponse,
        backupList: backupList as ErrorResponse,
        fridgeRawData: fridgeRawData as ErrorResponse,
        section,
        setMessage,
        setSection,
        setLoading
    });
    useBackupList(isSuccessBackupList, backupList as string[], setBackup);
    useBackupStatus(isDownloading, isDownloaded, dataDownloaded as boolean, setIsBackupReady);
    useLoadingStatus(isLoadingEventsByDate, isLoadingSelectedEvents, isLoadingBackupList, isDownloading, setLoading);
    const handleSearchValueChange = useSearch(setSearchValue, setIsResettingSearchingEvent);
    const onCellDoubleClicked = useCellDoubleClick(
        searchValue,
        seteventString,
        setIsAliveEvent,
        setDialogContent,
        setIsDialogOpen,
        setMessage,
        serial,
        backup
    );

    const onSelectBackup = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        setBackup(event.target.value);
        setIsBackupReady(false);
    }, [setBackup, setIsBackupReady]);

    const handleDatePickerChange = useCallback((date: Date | null) => {
        setDatePickerDate(date);
        setDateIsoString(date?.toISOString() || null);
    }, [setDatePickerDate, setDateIsoString]);

    return (
        <div className={`h-screen ${ section != "param" ? "overflow-hidden" : ""}`}>
            <TopNavBar
                serialTemp={serialTemp}
                setMessage={setMessage}
            />
            <div className="navbar bg-base-100">
                <div className="navbar-start space-x-2 ">
                    {section === 'master' && (
                        <>
                            <Input loading={loading} reset={reset}/>
                            <GetButton loading={loading} reset={reset}/>
                            <SelectBackup
                                backup={backup}
                                loading={loading}
                                onSelectBackup={onSelectBackup}
                                isSuccessBackupList={isSuccessBackupList}
                                backupList={backupList as string[]}
                            />
                            <InfoDropDown
                                loading={loading}
                                backupList={backupList as string[]}
                                isLoadingBackupList={isLoadingBackupList}
                            />
                            {isBackupReady &&(
                                <DatePicker
                                    loading={loading}
                                    datePickerDate={datePickerDate}
                                    handleDatePickerChange={handleDatePickerChange}
                                />
                            )}
                        </>
                    )}
                    {isBackupReady && (
                        <>
                            {(section === 'chart' || section ==='fridge') &&
                                <SwapChartTable section={section} setSection={setSection}
                                />
                            }
                            { (section === 'fridge' || section ==='chart') &&
                                <SelectFridge
                                    fridgeRawData={fridgeRawData as RawFridgeData[]}
                                    isLoadingFridge={isLoadingFridge}
                                    isSuccessFridge={isSuccessFridge}
                                    setFridgeSelected={setFridgeSelected}
                                />
                            }
                        </>
                    )}
                </div>
                {isBackupReady && section === 'master' && (
                    <div className="navbar-center space-x-4">
                        <SearchEvents loading={loading} handleSearchValueChange={handleSearchValueChange}/>
                    </div>
                )}
                <div className="navbar-end space-x-4 ">
                    {isBackupReady && (
                        <>
                            <IconSoftware serial={serial} backup={backup} isBackupReady={isBackupReady}/>
                            <Badge/>
                            <MasterButton loading={loading} setSection={setSection}/>
                            <ParamButton loading={loading} setSection={setSection}/>
                            <FridgeButton loading={loading} setSection={setSection}/>
                            <FingerButton loading={loading} setSection={setSection}/>
                            <LisButton loading={loading}/>
                            <ExcelButton
                                loading={loading}
                                setMessage={setMessage}
                                section={section}
                                storedGridAPi={storedGridAPi}
                            />
                        </>
                    )}
                    <ButtonNav setMessage={setMessage}/>
                </div>
            </div>
            <Alert
                message={message}
                setMessage={setMessage}
            />
            <div className="h-full flex flex-col space-y-4">
                <AgGridMaster
                    loading={loading}
                    isSuccessEventsByDate={isSuccessEventsByDate}
                    eventsByDate={eventsByDate as RawLogEventData[]}
                    selectedEvents={selectedEvents as RawLogEventData[]}
                    isSuccessSelectedEvent={isSuccessSelectedEvent}
                    onCellDoubleClicked={onCellDoubleClicked}
                    isResettingSearchingEvent={isResettingSearchingEvent}
                    setIsResettingSearchingEvent={setIsResettingSearchingEvent}
                    section={section}
                    setMessage={setMessage}
                    searchValue={searchValue}
                    setStoredGridApi={setStoredGridApi}
                />
                {section === 'chart' &&
                    <ChartFridgeContainer
                        fridgeRawData={fridgeRawData as RawFridgeData[]}
                        isLoadingFridge={isLoadingFridge}
                        isSuccessFridge={isSuccessFridge}
                        fridgeSelected={fridgeSelected}
                        setMessage={setMessage}
                    />
                }
                {section === 'fridge' &&
                    <AgGridFridge
                        fridgeRawData={fridgeRawData as RawFridgeData[]}
                        isLoadingFridge={isLoadingFridge}
                        isSuccessFridge={isSuccessFridge}
                        fridgeSelected={fridgeSelected}
                        setMessage={setMessage}
                        setStoredGridApi={setStoredGridApi}
                    />
                }
                {section === 'fingersTransaction' &&
                    <AgGridFingersTransaction
                        serial={serial}
                        backup={backup}
                        isBackupReady={isBackupReady}
                        setMessage={setMessage}
                        setStoredGridApi={setStoredGridApi}
                    />
                }
                {section === 'param' && (
                    <ParamContainer
                        serial={serial}
                        backup={backup}
                        isBackupReady={isBackupReady}
                        setMessage={setMessage}
                    />
                )}
            </div>
            <Dialog isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} dialogContent={dialogContent}/>
        </div>

    );
}

export default Log;