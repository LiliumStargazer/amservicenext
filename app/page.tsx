'use client'

import React, {useCallback, useEffect, useState} from "react";
import {AliveEvent, ErrorResponse, RawFridgeData, RawLogEventData} from "@/app/types/types";
import { GridApi } from "ag-grid-community";
import SelectBackup from "@/app/components/NavBar/SelectBackup";
import InfoDropDown from "@/app/components/NavBar/InfoDropDown";
import IconSoftware from "@/app/components/NavBar/IconSoftware";
import Badge from "@/app/components/NavBar/Badge";
import SearchEvents from "@/app/components/NavBar/SearchEvents";
import Alert from "@/app/components/shared/Alert";
import AgGridFridge from "@/app/components/body/fridge/AgGridFridge";
import Dialog from "@/app/components/body/Dialog";
import ChartFridgeContainer from "@/app/components/body/fridge/ChartFridgeContainer";
import GetButton from "@/app/components/NavBar/buttons/GetButton";
import Input from "@/app/components/NavBar/Input";
import SelectFridge from "@/app/components/body/fridge/SelectFridge";
import AgGridFingersTransaction from "@/app/components/body/AgGridFingersTransaction";
import FingerButton from "@/app/components/NavBar/buttons/FingerButton";
import ParamButton from "@/app/components/NavBar/buttons/ParamButton";
import FridgeButton from "@/app/components/NavBar/buttons/FridgeButton";
import ExcelButton from "@/app/components/NavBar/buttons/ExcelButton";
import MasterButton from "@/app/components/NavBar/buttons/MasterButton";
import AgGridMaster from "@/app/components/body/AgGridMaster";
import DatePicker from "@/app/components/NavBar/DatePicker";
import SwapChartTable from "@/app/components/body/fridge/SwapChartTable";
import useQueryEventsByDate from "@/app/hooks/query/useQueryEventsByDate";
import useQueryEventsFromAlive from "@/app/hooks/query/useQueryEventsFromAlive";
import useQuerySelectedEvents from "@/app/hooks/query/useQuerySelectedEvents";
import useResetQueries from "@/app/hooks/query/useResetQueries";
import {useQueryGetBackupList} from "@/app/hooks/query/useQueryGetBackupList";
import {useQueryDownloadBackup} from "@/app/hooks/query/useQueryDownloadBackup";
import {useQueryFridgeData} from "@/app/hooks/query/useQueryFridgeData";
import useAliveEvent from "@/app/hooks/useAliveEvent";
import useErrorHandling from "@/app/hooks/useErrorHandling";
import useLoadingStatus from "@/app/hooks/useLoadingStatus";
import useReset from "@/app/hooks/useReset";
import useCellDoubleClick from "@/app/hooks/useCellDoubleClick";
import useBackupStatus from "@/app/hooks/useBackupStatus";
import useBackupList from "@/app/hooks/useBackupList";
import useSearch from "@/app/hooks/useSearch";
import ParamContainer from "@/app/components/body/param/ParamContainer";
import TopNavBar from "@/app/components/NavBarTop/TopNavBar";
import {getSerialValidationMessage, trimAndFormatSerial} from "@/app/utils/utils";
// import RecoverdBContainer from "@/app/components/NavBar/buttons/RecoverdBContainer";

const Log: React.FC = () => {
    const [serial, setSerial] = useState<string>('');
    const [serialTemp, setSerialTemp] = useState<string>('');
    const [isFetchRequest, setIsFetchRequest] = useState<boolean>(false);
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
        setBackup,
        setIsBackupReady,
        setSearchValue,
        setDatePickerDate,
        setDateIsoString,
        resetQueries
    );

    const {
        isLoading: isLoadingBackupList,
        data: backupList,
        isSuccess: isSuccessBackupList,
        isFetched: isFetchedBackupList
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
    useBackupList(isSuccessBackupList, backupList as string[], setBackup );
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

    useEffect(() => {
        if (isFetchRequest) {
            setLoading(true);
            const formattedSerial = trimAndFormatSerial(serialTemp);
            const message = getSerialValidationMessage(formattedSerial);
            if (message !== "valid" ){
                setMessage(message);
                setLoading(false);
            }
            else{
                reset().catch((error) => setMessage(error.message));
                setSerial(formattedSerial);
                setIsFetchRequest(false);
            }
        }
    }, [serialTemp, isFetchRequest, reset]);

    useEffect(() => {
        if (isFetchedBackupList) {
            setIsFetchRequest(false);
        }
    }, [isFetchedBackupList]);

    return (
        <div className="h-screen flex flex-col">
            <TopNavBar
                serialTemp={serialTemp}
                setMessage={setMessage}
            />
            <div className="navbar bg-base-100">
                <div className="navbar-start space-x-2 ">
                    {section === 'master' && (
                        <>
                            <Input loading={loading} setSerialTemp={setSerialTemp} setIsFetchRequest={setIsFetchRequest}/>
                            <GetButton loading={loading} setIsFetchRequest={setIsFetchRequest}/>
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
                            {/*<RecoverdBContainer*/}
                            {/*    serial={serial}*/}
                            {/*    backup={backup}*/}
                            {/*    loading={loading}*/}
                            {/*    setMessage={setMessage}*/}
                            {/*/>*/}
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
                            <Badge serial={serial}/>
                            <MasterButton loading={loading} setSection={setSection}/>
                            <ParamButton loading={loading} setSection={setSection}/>
                            <FridgeButton loading={loading} setSection={setSection}/>
                            <FingerButton loading={loading} setSection={setSection}/>
                            <ExcelButton
                                loading={loading}
                                setMessage={setMessage}
                                section={section}
                                storedGridAPi={storedGridAPi}
                            />
                        </>
                    )}
                </div>
            </div>
            <Alert
                message={message}
                setMessage={setMessage}
            />
            <div className="flex-grow flex-col space-y-4 ">
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