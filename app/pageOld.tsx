'use client'

import React, {useCallback, useEffect, useState} from "react";
import {AliveEvent, ErrorResponse, FingerRawData, RawFridgeData, RawLogEventData} from "@/app/types/types";
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
import useQueryEventsByDate from "@/app/hooks/useQueryEventsByDate";
import useQueryEventsFromAlive from "@/app/hooks/useQueryEventsFromAlive";
import useQuerySelectedEvents from "@/app/hooks/useQuerySelectedEvents";
import useResetQueries from "@/app/hooks/useResetQueries";
import {useQueryGetBackupList} from "@/app/hooks/useQueryGetBackupList";
import {useQueryDownloadBackup} from "@/app/hooks/useQueryDownloadBackup";
import {useQueryFridgeData} from "@/app/hooks/useQueryFridgeData";
import useAliveEvent from "@/app/hooks/useAliveEvent";
import useErrorHandling from "@/app/hooks/useErrorHandling";
import useLoadingStatus from "@/app/hooks/useLoadingStatus";
import useReset from "@/app/hooks/useReset";
import useCellDoubleClick from "@/app/hooks/useCellDoubleClick";
import useBackupStatus from "@/app/hooks/useBackupStatus";
import useBackupList from "@/app/hooks/useBackupList";
import useSearch from "@/app/hooks/useSearch";
import NavbarTop from "@/app/components/NavbarTop";
import {getSerialValidationMessage, trimAndFormatSerial} from "@/app/utils/utils";
import {useQueryGetSoftwareType} from "@/app/hooks/useQueryGetSoftwareType";
import {useQueryFingerTransactions} from "@/app/hooks/useQueryFingerTransactions";
import DatePicker from "@/app/components/DatePicker";
import ButtonHome from "@/app/components/ButtonHome";
import {useParamData} from "@/app/hooks/useParamData";
import ParamSections from "@/app/components/ParamSections";
import SelectParam from "@/app/components/SelectParam";
import {useVteData} from "@/app/hooks/useVteData";
import Badge from "@/app/components/Badge";
import BadgeVTE from "@/app/components/BadgeVTE";
import ButtonRecoverDb from "@/app/components/ButtonRecoverDb";
import ContainerRecoverDb from "@/app/components/ContainerRecoverDb";

const DashBoard: React.FC = () => {
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
    const [datePickerDate, setDatePickerDate] = useState<Date>(new Date());
    const [dateIsoString, setDateIsoString] = useState<string | null>(null);
    const [searchValue, setSearchValue] = useState<string>('');
    const [loading, setLoading] = React.useState(false);
    const [isResettingSearchingEvent, setIsResettingSearchingEvent] = useState(false);
    const [fridgeSelected, setFridgeSelected] = useState<number>(0);
    const [section, setSection] = useState<string>('master');
    const resetQueries = useResetQueries();
    const [isGetBackupListEnabled, setIsGetBackupListEnabled] = useState<boolean>(false);
    const [isDownloadBackupEnabled, setIsDownloadBackupEnabled] = useState<boolean>(false);
    const [isGetEventsByDateEnabled, setIsGetEventsByDateEnabled] = useState<boolean>(false);
    const [isGetSelectedEventsEnabled, setIsGetSelectedEventsEnabled] = useState<boolean>(false);
    const [isGetSoftwareEnabled, setIsGetSoftwareEnabled] = useState<boolean>(false);
    const [isGetFingerTransactionEnabled, setIsGetFingerTransactionEnabled] = useState<boolean>(false);
    const [rawLogEvents, setRawLogEvents] = useState<RawLogEventData[]>([]);
    const [selectedEvents, setSelectedEvents] = useState<RawLogEventData[]>([]);
    const [backupList, setBackupList] = useState<string[]>([]);
    const [softwareType, setsoftwareType] = useState<string>('');
    const [rawFingerTransactions, setRawFingerTransactions] = useState<FingerRawData[]>([]);
    const {
        IDParam,
        rawIdList,
        param,
        jsonParams,
        isLoadingParam,
        listinoItems,
        handleOnChangeParam,
        machineModel
    } = useParamData({serial, backup, isBackupReady, setMessage});
    const {customerName, VTElink} = useVteData(serial);

    const reset = useReset(
        setBackup,
        setIsBackupReady,
        setSearchValue,
        setDatePickerDate,
        setDateIsoString,
        setIsGetBackupListEnabled,
        resetQueries
    );

    const {
        isLoading: isLoadingBackupList,
        data: rawBackupList,
        isFetched: isFetchedBackupList
    } = useQueryGetBackupList(serial, isGetBackupListEnabled);

    const {
        isLoading: isDownloading,
        isSuccess: isSuccessDownloadBackup,
        isFetched: isFetchedDownloadBackup
    } = useQueryDownloadBackup(serial, backup, isDownloadBackupEnabled);

    const {
        isLoading: isLoadingEventsByDate,
        data: rawEventsByDate,
        isFetched: isFetchedEventsByDate
    } = useQueryEventsByDate(serial, backup, dateIsoString , isGetEventsByDateEnabled);

    const {
        isLoading: isLoadingSelectedEvents,
        data: rawSelectedEvents,
        isFetched: isFetchedSelectedEvent
    } = useQuerySelectedEvents(serial, backup, searchValue, isGetSelectedEventsEnabled);

    const {
        data: aliveEvent,
        isSuccess: isSuccessAliveEvent
    } = useQueryEventsFromAlive(isAliveEvent);

    const {
        isLoading: isLoadingFridge,
        data: fridgeRawData,
        isSuccess: isSuccessFridge
    } = useQueryFridgeData(serial, backup, isBackupReady, section);

    const {
        data: rawSoftwareType,
        isFetched: isFetchedSoftwareType
    } = useQueryGetSoftwareType(serial, backup, isGetSoftwareEnabled);

    const {
        isLoading: isLoadingFingerTransaction,
        data: dataFingerTransaction,
        isFetched: isFetchedFingerTransaction
    } = useQueryFingerTransactions(serial, backup, isBackupReady, isGetFingerTransactionEnabled);

    useAliveEvent(
        isSuccessAliveEvent,
        isAliveEvent,
        aliveEvent as AliveEvent[],
        eventString,
        setDialogContent,
        setIsDialogOpen,
        setIsAliveEvent
    );

    useErrorHandling({
        eventsByDate: rawEventsByDate as ErrorResponse,
        selectedEvents: rawSelectedEvents as ErrorResponse,
        aliveEvent: aliveEvent as ErrorResponse,
        rawBackupList: rawBackupList as ErrorResponse,
        fridgeRawData: fridgeRawData as ErrorResponse,
        dataFingerTransaction: dataFingerTransaction as ErrorResponse,
        section,
        setMessage,
        setSection,
        setLoading,
        setIsBackupReady,
        setIsGetSelectedEventsEnabled
    });

    useBackupList(
        rawBackupList as string[],
        setBackup, isFetchedBackupList,
        setIsGetBackupListEnabled,
        setIsDownloadBackupEnabled,
        setBackupList
    );

    useBackupStatus(
        isFetchedDownloadBackup,
        isSuccessDownloadBackup,
        setIsDownloadBackupEnabled,
        setIsBackupReady,
        setIsGetEventsByDateEnabled,
        setIsGetSoftwareEnabled
    );

    useLoadingStatus(
        isLoadingEventsByDate,
        isLoadingSelectedEvents,
        isLoadingBackupList,
        isDownloading,
        setLoading
    );

    const handleSearchValueChange = useSearch(
        setSearchValue,
        setIsResettingSearchingEvent
    );

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
        setIsDownloadBackupEnabled(true);
    }, [setBackup, setIsBackupReady]);

    const handleDatePickerChange = useCallback((date: Date ) => {

        // conversion in local date string without timezone ( keep gmt+1 )
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const localDateString = `${year}-${month}-${day}T00:00:00.000Z`;

        setDatePickerDate(date);
        setDateIsoString(localDateString);
        setIsGetEventsByDateEnabled(true);
    }, [setDatePickerDate, setDateIsoString, setIsGetEventsByDateEnabled]);

    useEffect(() => {
        if (isFetchedEventsByDate) {
            setIsGetEventsByDateEnabled(false);
            if ( Array.isArray(rawEventsByDate)){
                if (rawEventsByDate.length === 0) {
                    setMessage("No data found.");
                    return;
                }
                setRawLogEvents(rawEventsByDate as RawLogEventData[]);
            }
        }
        if (isFetchedSelectedEvent) {
            setIsGetSelectedEventsEnabled(false);
            if (Array.isArray(rawSelectedEvents) ){
                if (rawSelectedEvents.length === 0) {
                    setMessage("No data found.");
                    return;
                }
                setSelectedEvents(rawSelectedEvents as RawLogEventData[]);
            }
        }
        if (isFetchedSoftwareType){
            setIsGetSoftwareEnabled(false);
            console.log('rawSoftwareType',rawSoftwareType);
            if ( typeof rawSoftwareType === 'string'){
                setsoftwareType(rawSoftwareType);
            }
        }
        if (isFetchedFingerTransaction){
            setIsGetFingerTransactionEnabled(false);
            if (Array.isArray(dataFingerTransaction)){
                if (dataFingerTransaction.length === 0) {
                    setMessage("No data found.");
                    return;
                }
                setRawFingerTransactions(dataFingerTransaction as FingerRawData[]);
            }
        }

    }, [dataFingerTransaction,
        isFetchedEventsByDate,
        isFetchedFingerTransaction,
        isFetchedSelectedEvent,
        isFetchedSoftwareType,
        rawEventsByDate,
        rawSelectedEvents,
        rawSoftwareType]);

    useEffect(() => {
        if(searchValue.length > 0 && isBackupReady){
            setIsGetSelectedEventsEnabled(true);
        }
    }, [searchValue, isBackupReady]);

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
                setIsGetBackupListEnabled(true);
            }
            setIsFetchRequest(false);
        }
    }, [serialTemp, isFetchRequest, reset]);


    return (
        <div className="h-screen flex flex-col">
            <NavbarTop
                serialTemp={serialTemp}
                setMessage={setMessage}
            />
            <div className="bg-base-100 text-neutral-content min-h-8 max-h-8 flex flex-row mb-4 mt-2 w-full">
                <div className="space-x-2 flex flex-row ml-2 mr-2 w-full"> {/* Aggiunto w-full */}
                    {section === 'master' && (
                        <>
                            <InputLog loading={loading} setSerialTemp={setSerialTemp} setIsFetchRequest={setIsFetchRequest} />
                            <ButtonGet loading={loading} setIsFetchRequest={setIsFetchRequest} />
                            <SelectBackup
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
                            <div className="flex flex-row space-x-2 mt-2">
                                <IconSoftware softwareType={softwareType}/>
                                <Badge text={serial}/>
                                <Badge text={machineModel}/>
                                <BadgeVTE customerName={customerName} VTElink={VTElink}/>
                            </div>
                        </>
                    )}
                    <div className="flex justify-end space-x-2">
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
                    <div className="flex space-x-4 ml-auto ">
                        <>
                            <ButtonHome loading={loading} setSection={setSection}/>
                            <ButtonRecoverDb loading={loading} setSection={setSection} />
                            {isBackupReady && (
                                <>
                                    <ButtonParam isBackupReady={isBackupReady} loading={loading} setSection={setSection}/>
                                    <ButtonFridge isBackupReady={isBackupReady} loading={loading} setSection={setSection}/>
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
                                </>
                            )}
                        </>
                    </div>
                </div>
            </div>
            <div className="bg-base-100 text-neutral-content min-h-8 max-h-8 flex flex-row w-full mb-4">
                { section === 'master' && (
                    <SearchEvents loading={loading} handleSearchValueChange={handleSearchValueChange} isBackupReady={isBackupReady}/>
                )}
            </div>
            <Alert
                message={message}
                setMessage={setMessage}
            />

            <div className="flex-grow flex-col space-y-4 ">
                {section === 'master' &&
                    <AgGridMaster
                        loading={loading}
                        rawLogEvents={rawLogEvents}
                        selectedEvents={selectedEvents}
                        onCellDoubleClicked={onCellDoubleClicked}
                        isResettingSearchingEvent={isResettingSearchingEvent}
                        setIsResettingSearchingEvent={setIsResettingSearchingEvent}
                        section={section}
                        setMessage={setMessage}
                        searchValue={searchValue}
                        setStoredGridApi={setStoredGridApi}
                    />
                }
                {section === 'chart' &&
                    <ContainerChartFridge
                        fridgeRawData={fridgeRawData as RawFridgeData[]}
                        isLoadingFridge={isLoadingFridge}
                        isSuccessFridge={isSuccessFridge}
                        fridgeSelected={fridgeSelected}
                        setMessage={setMessage}
                    />
                }
                {
                    section ==='recoverdb' &&
                        <ContainerRecoverDb />
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
                        isLoadingFingerTransaction={isLoadingFingerTransaction}
                        rawFingerTransactions={rawFingerTransactions}
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