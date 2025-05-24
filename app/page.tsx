'use client'

import React, {use, useCallback, useEffect, useRef, useState} from "react";
import {AliveEvent, ErrorResponse, FingerRawData, RawFridgeData, RawLogEventData} from "@/app/types/types";
import { CellDoubleClickedEvent } from "ag-grid-community";
import { GridApi } from "ag-grid-community";
import SelectBackup from "@/app/components/SelectBackup";
import DropDownInfoBackup from "@/app/components/DropDownInfoBackup";
import IconSoftware from "@/app/components/IconSoftware";
import SearchEvents from "@/app/components/InputSearchEvents";
import Alert from "@/app/components/Alert";
import AgGridFridge from "@/app/components/AgGridFridge";
import Dialog from "@/app/components/Dialog";
import ContainerChartFridge from "@/app/components/ContainerChartFridge";
import ButtonGet from "@/app/components/ButtonGet";
import InputLog from "@/app/components/InputSerial";
import SelectFridge from "@/app/components/SelectFridge";
import AgGridFingersTransaction from "@/app/components/AgGridFingersTransaction";
import ButtonFinger from "@/app/components/ButtonFinger";
import ButtonParam from "@/app/components/ButtonParam";
import ButtonFridge from "@/app/components/ButtonFridge";
import ButtonExcel from "@/app/components/ButtonExcel";
import AgGridMaster from "@/app/components/AgGridMaster";
import SwapChartTable from "@/app/components/SwapChartTable";
import NavbarTop from "@/app/components/NavbarTop";
import DatePicker from "@/app/components/DatePicker";
import ButtonHome from "@/app/components/ButtonHome";
import ParamSections from "@/app/components/ParamSections";
import SelectParam from "@/app/components/SelectParam";
import {useVteData} from "@/app/hooks/useVteData";
import Badge from "@/app/components/Badge";
import BadgeVTE from "@/app/components/BadgeVTE";
import ButtonRecoverDb from "@/app/components/ButtonRecoverDb";
import RecoverDbContainer from "@/app/components/RecoverDbContainer";
import { useDownloadBackupMutation, useGetAliveEventsCorsHandlingMutation, useGetEventsByDateMutation, useGetEventsFilteredMutation } from "@/app/hooks/useMutations";
import { date } from "drizzle-orm/pg-core";
import { debounce } from "lodash";
import InputSearchEvents from "@/app/components/InputSearchEvents";
import { useBackupListQuery, useGetFilteredEventsQuery } from "@/app/hooks/useQueries";
import ContainerFridgeSection from "@/app/components/ContainerFridgeSection";
import { Status } from "@/app/enum/enum";
import ContainerBadge from "@/app/components/ContainerBadge";

const DashBoard: React.FC = () => {
    const [serial, setSerial] = useState<string>('');
    const [status, setStatus] = useState<Status>(Status.None);
    const [isFetchRequest, setIsFetchRequest] = useState<boolean>(false);
    const [storedGridAPi, setStoredGridApi] = useState<GridApi | null>(null);
    const [message, setMessage] = useState<string>('');
    const [eventString, seteventString] = useState<string | null>(null);
    const [isAliveEvent, setIsAliveEvent] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogContent, setDialogContent] = useState<string | AliveEvent | null>(null);
    const [backup, setBackup] = useState<string>('');
    const [isBackupReady, setIsBackupReady] = useState(false);
    const [datePickerDate, setDatePickerDate] = useState<Date>(new Date());
    const [dateIsoString, setDateIsoString] = useState<string | null>(null);
    const [searchValue, setSearchValue] = useState<string>('');
    const [loading, setLoading] = React.useState(false);
    const [isResettingSearchingEvent, setIsResettingSearchingEvent] = useState(false);
    const [section, setSection] = useState<string>('master');
    const [isGetBackupListEnabled, setIsGetBackupListEnabled] = useState<boolean>(false);
    const [isDownloadBackupEnabled, setIsDownloadBackupEnabled] = useState<boolean>(false);
    const [isGetEventsByDateEnabled, setIsGetEventsByDateEnabled] = useState<boolean>(false);
    const [isGetfilteredEventsEnabled, setIsGetfilteredEventsEnabled] = useState<boolean>(false);
    const [isGetSoftwareEnabled, setIsGetSoftwareEnabled] = useState<boolean>(false);
    const [isGetFingerTransactionEnabled, setIsGetFingerTransactionEnabled] = useState<boolean>(false);
    const [rawLogEvents, setRawLogEvents] = useState<RawLogEventData[]>([]);
    const [filteredEvents, setFilteredEvents] = useState<RawLogEventData[]>([]);
    const [backupList, setBackupList] = useState<string[]>([]);
    const [softwareType, setsoftwareType] = useState<string>('');
    const [rawFingerTransactions, setRawFingerTransactions] = useState<FingerRawData[]>([]);
    const { data: backupListData, error: errorBackupList, isLoading: isLoadingBackupList } = useBackupListQuery(serial);
    const { trigger: triggerDownloadBackup, isMutating: isLoadingDownloadBackup, error: errorDownloadBackup } = useDownloadBackupMutation();
    const { trigger: triggerGetEventsByDate, error: errorGetEventsByDate, data: dataGetEventsByDate } = useGetEventsByDateMutation();
    /* const { trigger: triggerEventsByFilter, error: errorEventsByFilter, isMutating: isMutatingEventsByFilter, data: dataEventsByFilter } = useGetEventsFilteredMutation(); */
    const { data: dataFilteredEvents, error: errorFilteredEvents, isLoading: isLoadingFilteredEvents } = useGetFilteredEventsQuery(serial, backup, isBackupReady, searchValue);
    const { trigger: triggerAliveEvents, error: errorAliveEvents, isMutating: isMutatingAliveEvents, data: dataAliveEvents } = useGetAliveEventsCorsHandlingMutation();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (isLoadingBackupList || isLoadingFilteredEvents || isLoadingDownloadBackup || isMutatingAliveEvents) {
                setStatus(Status.Loading);
                return;
            }
            if (errorBackupList || errorFilteredEvents || errorDownloadBackup || errorAliveEvents) {
                setStatus(Status.Error);
                setMessage('Error fetching data');
                return;
            }
            if (serial.length === 5 && backupList.length > 0) {
                setStatus(Status.Success);
            } else {
                setStatus(Status.None);
            }
        }, 300); // Delay of 300ms to debounce state changes
        return () => clearTimeout(timeoutId); // Cleanup timeout on dependency change
    }, [
        isLoadingBackupList,
        isLoadingFilteredEvents,
        isLoadingDownloadBackup,
        isMutatingAliveEvents,
        errorBackupList,
        errorFilteredEvents,
        errorDownloadBackup,
        errorAliveEvents,
        serial.length,
        backupList.length,
    ]);

    const onCellDoubleClicked = useCallback(async (event: CellDoubleClickedEvent) => {
        if (event.colDef.field === 'EventString') {
            try {
                await triggerAliveEvents();
                if (Array.isArray(dataAliveEvents)) {
                    const matchedEvent = dataAliveEvents.find(
                        (aliveEvent: AliveEvent) => aliveEvent.EventString === event.value
                    );
                    if (!matchedEvent) {
                        setMessage("No event found");
                        return;
                    }
                    setDialogContent(matchedEvent);
                    setIsDialogOpen(true);
                }
            } catch (error) {
                setMessage(error instanceof Error ? error.message : 'Errore sconosciuto');
            }
        }           
        if (event.colDef.field === 'TagData') {
            setDialogContent(event.data.TagData);
            setIsDialogOpen(true);
        }
        if (event && event.colDef.field === 'DataOraR') {
            const [day, month, year] = event.data.DataOraR.split('/');
            const newDate = new Date(Date.UTC(year, month - 1, day, 12, 0, 0)).toISOString();
            const id = event.data.ID;

            const queryParams = new URLSearchParams({
                date: newDate,
                id: id.toString(),
                serial: serial.toString(),
                backup: backup.toString(),
            }).toString();

            const newWindow = window.open(`/extracted-days-events?${queryParams}`, '_blank');
            if (!newWindow) {
                setMessage('Please allow popups for this website');
            }
        }
    }, [triggerAliveEvents, dataAliveEvents, serial, backup]);

    useEffect(() => {
        if (Array.isArray(backupListData) ) {
            setBackupList(backupListData);
        }
    }, [backupListData]);

    useEffect(() => {
        console.log('searchValue', searchValue);
        if (searchValue.length === 0) {
            console.log('sono vuoto');
            setFilteredEvents([]);
        }
    }, [searchValue]);

    useEffect(() => {
        if (serial.length !== 5) {
            setBackupList([]);
            setRawLogEvents([]);
            setBackup('');
            setIsBackupReady(false);
        }
    }, [serial]);

    useEffect(() => {
        if (errorBackupList) {
            setMessage("Error fetching backup list");
        }
    }, [errorBackupList]);

    useEffect(() => {
        const downloadBackup = async () => {
                try {
                    await triggerDownloadBackup({ serial, backup });
                    await triggerGetEventsByDate({ serial, backup , date: null });
                } catch (error) {
                    setMessage(error instanceof Error ? error.message : 'Errore sconosciuto');
                }
            };
        if (serial.length === 5 && backup) {
            downloadBackup();
        }
    }, [backup, serial, triggerDownloadBackup, triggerGetEventsByDate,]);

    
    useEffect(() => {
        if (Array.isArray(dataGetEventsByDate)) {
            setRawLogEvents(dataGetEventsByDate)
            setIsBackupReady(true);
        }
    }, [dataGetEventsByDate]);

    useEffect(() => {
        if (Array.isArray(dataFilteredEvents)) {
            if (dataFilteredEvents.length === 0) {
                setMessage("No data found.");
                setFilteredEvents([]);
                return;
            }
            setFilteredEvents(dataFilteredEvents as RawLogEventData[]);
        }
    }, [dataFilteredEvents]);

    const onSelectBackup = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        setBackup(event.target.value);
    }, [setBackup]);

    const handleDatePickerChange = useCallback((date: Date ) => {
        // conversion in local date string without timezone ( keep gmt+1 )
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const localDateString = `${year}-${month}-${day}T00:00:00.000Z`;
        triggerGetEventsByDate({ serial, backup, date: localDateString }).catch((error) => {
            setMessage(error instanceof Error ? error.message : 'Errore sconosciuto');
        });

        setDatePickerDate(date);
        setDateIsoString(localDateString);
        setIsGetEventsByDateEnabled(true);
    }, [setDatePickerDate, setDateIsoString, setIsGetEventsByDateEnabled, serial, backup, triggerGetEventsByDate]);

    return (
        <div className="h-screen flex flex-col">
       {/*      <NavbarTop
                serialTemp={serial}
                setMessage={setMessage}
            /> */}
            <div className="bg-base-100 text-neutral-content min-h-8 max-h-8 flex flex-row mb-4 mt-6 w-full">
                <div className="flex flex-row justify-between items-center w-full px-2">
                    {/* Left: Buttons */}
                    <div className="flex flex-row space-x-4">
                        <p className=" text-xl text-neutral-content font-bold ml-2">AM Service</p>
                        <ButtonHome loading={loading} setSection={setSection}/>
                        <ButtonRecoverDb loading={loading} setSection={setSection} />
                        <ButtonParam isBackupReady={isBackupReady} loading={loading} setSection={setSection} setMessage={setMessage}/>
                        <ButtonFridge isBackupReady={isBackupReady} loading={loading} setSection={setSection} setMessage={setMessage}/>
                        <ButtonFinger
                            isBackupReady={isBackupReady}
                            loading={loading}
                            setSection={setSection}
                            setIsGetFingerTransactionEnabled={setIsGetFingerTransactionEnabled}/>
                        <ButtonExcel
                            isBackupReady={isBackupReady}
                            loading={loading}
                            setMessage={setMessage}
                            section={section}
                            storedGridAPi={storedGridAPi}
                        />
                    </div>
                    {/* Right: Section controls */}
                    {section === 'master' && (
                        <div className="flex flex-row items-center space-x-2">
                            <InputLog loading={loading} setSerialTemp={setSerial} setIsFetchRequest={setIsFetchRequest} />
        {/*                     <ButtonGet loading={loading} setIsFetchRequest={setIsFetchRequest} /> */}
                            <SelectBackup
                                setBackup={setBackup}
                                backup={backup}
                                loading={loading}
                                onSelectBackup={onSelectBackup}
                                backupList={backupList}
                            />
                            <DropDownInfoBackup
                                loading={loading}
                                backupList={backupList as string[]}
                                isLoadingBackupList={isLoadingBackupList}
                                isBackupReady={isBackupReady}
                            />
                            <DatePicker
                                loading={loading}
                                datePickerDate={datePickerDate}
                                handleDatePickerChange={handleDatePickerChange}
                                isBackupReady={isBackupReady}
                            />
                            <InputSearchEvents loading={loading} setSearchValue={setSearchValue} isBackupReady={isBackupReady}/>
                            <div className="flex flex-row space-x-2 mt-2">
                                <IconSoftware softwareType={softwareType}/>
                                <Badge text={serial}/>
        {/*                         <Badge text={machineModel}/>
                                <BadgeVTE customerName={customerName} VTElink={VTElink}/> */}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <ContainerBadge status={status} setStatus={setStatus} setMessage={setMessage} message={message}/>
            <div className="flex-grow flex-col space-y-4 ">
                {section === 'master' &&
                    <AgGridMaster
                        loading={loading}
                        rawLogEvents={rawLogEvents}
                        filteredEvents={filteredEvents}
                        onCellDoubleClicked={onCellDoubleClicked}
                        setStoredGridApi={setStoredGridApi}
                    />
                }
                { section ==='recoverdb' && <RecoverDbContainer />}
                {section === 'fridge' &&
                    <ContainerFridgeSection
                        serial={serial}
                        backup={backup}
                        setMessage={setMessage}
                        setStoredGridApi={setStoredGridApi}
                    />
                }
                {section === 'fingersTransaction' &&
                    <AgGridFingersTransaction
                        serial={serial}
                        backup={backup}
                        setMessage={setMessage}
                        setStatus={setStatus}
                        setStoredGridApi={setStoredGridApi}
                    />
                }
                {section === 'param' && (
                    <>
                        <div className=" flex justify-center">
                            <SelectParam
                                loading={isLoadingParam}
                                IDParam={IDParam}
                                handleOnChangeParam={handleOnChangeParam}
                                rawIdList={rawIdList}
                            />
                        </div>
                        <ParamSections
                            loading={isLoadingParam}
                            param={param}
                            listinoItems={listinoItems}
                            jsonParams={jsonParams}
                        />
                    </>
                )}
            </div>
            <Dialog isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} dialogContent={dialogContent}/>
        </div>
    );
}

export default DashBoard;