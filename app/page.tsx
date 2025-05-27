'use client'

import React, {useCallback, useEffect, useState} from "react";
import {AliveEvent, RawLogEventData} from "@/app/types/types";
import { CellDoubleClickedEvent } from "ag-grid-community";
import { GridApi } from "ag-grid-community";
import SelectBackup from "@/app/components/dashboard/SelectBackup";
import DropDownInfoBackup from "@/app/components/dashboard/DropDownInfoBackup";
import Dialog from "@/app/components/dashboard/Dialog";
import AgGridFingersTransaction from "@/app/components/fingers/AgGridFingersTransaction";
import ButtonFinger from "@/app/components/buttons/ButtonFinger";
import ButtonParam from "@/app/components/buttons/ButtonParam";
import ButtonFridge from "@/app/components/buttons/ButtonFridge";
import ButtonExcel from "@/app/components/buttons/ButtonExcel";
import AgGridMaster from "@/app/components/dashboard/AgGridMaster";
import DatePicker from "@/app/components/dashboard/DatePicker";
import ButtonHome from "@/app/components/shared/ButtonHome";
import ButtonRecoverDb from "@/app/components/buttons/ButtonRecoverDb";
import { useDownloadBackupMutation, useGetAliveEventsCorsHandlingMutation, useGetEventsByDateMutation} from "@/app/hooks/useMutations";
import InputSearchEvents from "@/app/components/dashboard/InputSearchEvents";
import { useBackupListQuery, useGetFilteredEventsQuery } from "@/app/hooks/useQueries";
import ContainerFridgeSection from "@/app/components/fridge/ContainerFridgeSection";
import { Status } from "@/app/enum/enum";
import ContainerBadge from "@/app/components/badge/ContainerBadge";
import ContainerRecoverDb from "./components/recoverdb/ContainerRecoverDb";
import InputSerial from "@/app/components/dashboard/InputSerial";
import ContainerParam from "@/app/components/param/ContainerParam";

const DashBoard: React.FC = () => {
    const [serial, setSerial] = useState<string>('');
    const [status, setStatus] = useState<Status>(Status.None);
    const [storedGridAPi, setStoredGridApi] = useState<GridApi | null>(null);
    const [message, setMessage] = useState<string>('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogContent, setDialogContent] = useState<string | AliveEvent | null>(null);
    const [backup, setBackup] = useState<string>('');
    const [datePickerDate, setDatePickerDate] = useState<Date>(new Date());
    const [searchValue, setSearchValue] = useState<string>('');
    const [section, setSection] = useState<string>('master');
    const [rawLogEvents, setRawLogEvents] = useState<RawLogEventData[]>([]);
    const [filteredEvents, setFilteredEvents] = useState<RawLogEventData[]>([]);
    const [backupList, setBackupList] = useState<string[]>([]);
    const [disabled, setDisabled] = useState<boolean>(false);
    
    const { data: backupListData, error: errorBackupList, isLoading: isLoadingBackupList } = useBackupListQuery(serial);
    const { trigger: triggerDownloadBackup, isMutating: isLoadingDownloadBackup, error: errorDownloadBackup } = useDownloadBackupMutation();
    const { trigger: triggerGetEventsByDate, error: errorGetEventsByDate, data: dataGetEventsByDate } = useGetEventsByDateMutation();
    const { data: dataFilteredEvents, error: errorFilteredEvents, isLoading: isLoadingFilteredEvents } = useGetFilteredEventsQuery(serial, backup, searchValue);
    const { trigger: triggerAliveEvents, error: errorAliveEvents, isMutating: isMutatingAliveEvents, data: dataAliveEvents } = useGetAliveEventsCorsHandlingMutation();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (isLoadingBackupList || isLoadingFilteredEvents || isLoadingDownloadBackup || isMutatingAliveEvents) {
                setStatus(Status.Loading);
                setDisabled(true);
                return;
            }
            if (errorBackupList || errorFilteredEvents || errorDownloadBackup || errorAliveEvents || errorGetEventsByDate) {
                setStatus(Status.Error);
                setDisabled(true);
                return;
            }
            if (errorBackupList) {
                setMessage(errorBackupList.message || 'Error fetching backup list');
                return;
            }
            if (errorFilteredEvents) {
                setMessage(errorFilteredEvents.message || 'Error fetching filtered events');
                return;
            }
            if (errorDownloadBackup) {
                setMessage(errorDownloadBackup.message || 'Error downloading backup');
                return;
            }
            if (errorAliveEvents) {
                setMessage(errorAliveEvents.message || 'Error fetching alive events');
                return;
            }
            if (errorGetEventsByDate) {
                setMessage(errorGetEventsByDate.message || 'Error fetching events by date');
                return;
            }
            if (serial.length === 5 && backupList.length > 0) {
                setStatus(Status.Success);
                setMessage('Ready');
                setDisabled(false);
            } else {
                setStatus(Status.None);
                setMessage("");
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
        errorGetEventsByDate,
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
        }
        if (!backup){
            setDisabled(true);
        }
    }, [serial, backup]);

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
    
    }, [setDatePickerDate, serial, backup, triggerGetEventsByDate]);

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
                        <ButtonHome disabled={disabled} setSection={setSection}/>
                        <ButtonRecoverDb disabled={disabled} setSection={setSection} />
                        <ButtonParam disabled={disabled} setSection={setSection} />
                        <ButtonFridge disabled={disabled} setSection={setSection}/>
                        <ButtonFinger disabled={disabled} setSection={setSection}/>
                        <ButtonExcel disabled={disabled} setMessage={setMessage} section={section} storedGridAPi={storedGridAPi}/>
                    </div>
                    {/* Right: Section controls */}
                    {section === 'master' && (
                        <div className="flex flex-row items-center space-x-2">
                            <InputSerial  setSerial={setSerial} />
                            <SelectBackup
                                setBackup={setBackup}
                                backup={backup}
                                disabled={disabled}
                                onSelectBackup={onSelectBackup}
                                backupList={backupList}
                            />
                            <DropDownInfoBackup disabled={disabled} backupList={backupList as string[]} isLoadingBackupList={isLoadingBackupList}/>
                            <DatePicker disabled={disabled} datePickerDate={datePickerDate} handleDatePickerChange={handleDatePickerChange} />
                            <InputSearchEvents disabled={disabled} setSearchValue={setSearchValue}/>
                            <div className="flex flex-row space-x-2 mt-2">
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <ContainerBadge status={status} setStatus={setStatus} setMessage={setMessage} message={message} serial={serial} backup={backup}/>
            <div className="flex-grow flex-col space-y-4 ">
                {section === 'master' &&
                    <AgGridMaster
                        loading={status === Status.Loading}
                        rawLogEvents={rawLogEvents}
                        filteredEvents={filteredEvents}
                        onCellDoubleClicked={onCellDoubleClicked}
                        setStoredGridApi={setStoredGridApi}
                    />
                }
                { section ==='recoverdb' && <ContainerRecoverDb />}
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
                        <ContainerParam
                            serial={serial}
                            backup={backup}
                            setMessage={setMessage}
                            setStatus={setStatus}
                        />
                    </>
                )}
            </div>
            <Dialog isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} dialogContent={dialogContent}/>
        </div>
    );
}

export default DashBoard;