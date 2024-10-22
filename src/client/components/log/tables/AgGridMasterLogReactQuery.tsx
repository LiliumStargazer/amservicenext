'use client';
import React, { useCallback, useEffect, useMemo, useState } from "react";
import useStore from "@/app/store";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import "@/src/client/styles/gridStyle.css";
import { GridReadyEvent, CellClickedEvent, CellDoubleClickedEvent, ColDef, FilterChangedEvent } from "ag-grid-community";
import { AgGridReact } from 'ag-grid-react';
import {RowData} from "@/src/client/types/types";
import {rowClassRules} from "@/src/client/utils/rowClassRules";
import {getRowsMap} from "@/src/client/utils/getRowMap";
import LoadingOverlayAgGrid from "@/src/client/components/log/tables/LoadingOverlayAgGrid";
import { useQuery } from '@tanstack/react-query';
import {apiGetEventsByDate, apiGetEventsFromLatestBackup} from "@/src/client/api/apiBackend";
import {apiGetAliveEventsCorsHandling, apiGetSelectedEvents} from "@/src/client/api/api";
import datepicker from "@/src/client/components/log/Datepicker";

const AgGridMasterLogReactQuery = () => {
    const searchValueDebounced = useStore(state => state.searchValueDebounced);
    const serial = useStore(state => state.serial);
    const backupSelected = useStore(state => state.backupSelected);
    const setExcelEvents = useStore(state => state.setExcelEvents);
    const setMessage = useStore(state => state.setMessage);
    const setIsDialogOpen = useStore(state => state.setIsDialogOpen);
    const setDialogContent = useStore(state => state.setDialogContent);
    const setGridApiStore = useStore(state => state.setGridApiStore);
    const table = useStore(state => state.table);
    const setTable = useStore(state => state.setTable);
    const loadingGlobal = useStore(state => state.loadingGlobal);
    const setLoadingGlobal = useStore(state => state.setLoadingGlobal);
    const [logData, setLogData] = useState<RowData[]>([]);
    //const isDateChanged = useStore(state => state.isDateChanged);
    //const setIsDateChanged = useStore(state => state.setIsDateChanged);
    const [isDateChanged, setIsDateChanged] = useState(false);
    const [isExtractData, setIsExtractData] = useState(false);
    const [eventState, setEventState] = useState<any>(null);
    const [isAliveEvent,setIsAliveEvent ] = useState(false);
    const [date, setDate] = useState<any>(null);
    const [gridApi, setGridApi] = useState<any>(null);
    const [selectedEventsResult, setSelectedEventsResult] = useState<RowData[]>([]);
    const [loading, setLoading] = useState(false);
    const datePickerDate = useStore(state => state.datePickerDate);
    const setSearchValueDebounced = useStore(state => state.setSearchValueDebounced);


    useEffect(() => {
        if (loadingGlobal) {
            setLoading(true);
        }else {
            setLoading(false);
        }
    }, [loadingGlobal, loading, setLoading,setLoadingGlobal]);

    useEffect(() => {
        console.log(date);
        if (date === null)
            setDate(datePickerDate.toISOString());
        else {
            console.log(datePickerDate.toISOString());
            setDate(datePickerDate.toISOString());
            setIsDateChanged(true);
        }

    }, [datePickerDate ]);


    const { isLoading: isLoadingLatestBackup, isError: isErrorLatestBackup, data: latestDataBackup, error: errorLatestBackup } = useQuery({
        queryKey: ['eventsFromLatestBackup', serial, backupSelected, logData, table],
        queryFn: () => apiGetEventsFromLatestBackup(serial, backupSelected),
        enabled: !!serial && !!backupSelected && !backupSelected.includes('No such file') && logData.length === 0 && table === 'master',
    });

    const {isLoading: isLoadingDataByDate, isError: isErrorDataByDate, data: dataByDate, error: errorDataByDate, isSuccess: isSuccessDataByDate} = useQuery({
        queryKey: ['eventsFromDataByDate',serial, backupSelected, table, date, isDateChanged, isExtractData ],
        queryFn: () => apiGetEventsByDate(serial, backupSelected, date),
        enabled: !!serial && !!backupSelected && !backupSelected.includes('No such file') && table === 'master' && ( isExtractData || isDateChanged ),
    });

    const {isLoading: isLoadingAliveEvent, isError: isErrorAliveEvent, data: aliveEvent, error: errorAliveEvent} = useQuery({
        queryKey: ['eventFromAlive',serial, backupSelected, isAliveEvent, table],
        queryFn: () => apiGetAliveEventsCorsHandling(),
        enabled: !!serial && !!backupSelected && !backupSelected.includes('No such file') && isAliveEvent && table === 'master' ,
    });

    const {isLoading: isLoadingSelectedEvents, isError: isErrorSelectedEvents, data: selectedEvents, error: errorSelectedEvents} = useQuery({
        queryKey: ['eventsFromSelectedEvents',serial, backupSelected, searchValueDebounced, table],
        queryFn: () => apiGetSelectedEvents(serial, backupSelected, searchValueDebounced),
        enabled: !!serial && !!backupSelected && !backupSelected.includes('No such file') && searchValueDebounced.length !== 0 && table === 'master',
    });


    useEffect(() => {

        if (isLoadingLatestBackup) {
            setLoadingGlobal(true);
            return;
        }

        if (isErrorLatestBackup) {
            setLoadingGlobal(false);
            if (errorLatestBackup.message.includes('No such file')) {
                setMessage("Serial invalid.");
            } else {
                setMessage("Error: " + errorLatestBackup.message);
            }
            setTable("no_table");
            return;
        }

        if (latestDataBackup) {
            if (latestDataBackup.length === 0) {
                setMessage("The database is empty.");
                setLoadingGlobal(false);
                setTable("no_table");
                return;
            }
            const rows = getRowsMap(latestDataBackup);
            setLogData(rows);
            setMessage('');
            setLoadingGlobal(false);
            return;
        }
        setLoadingGlobal(false);
        return;
    }, [latestDataBackup, isLoadingLatestBackup, isErrorLatestBackup, errorLatestBackup, setMessage, setTable]);

    useEffect(() => {

        if (isLoadingDataByDate) {
            setLoadingGlobal(true);
            return;
        }

        if (isErrorDataByDate) {
            setLoadingGlobal(false);
            setMessage("Error: " + errorDataByDate.message);
            return;
        }

        if (isSuccessDataByDate) {
            if (dataByDate && dataByDate.length !== 0) {

                if (isDateChanged) {
                    const rows = getRowsMap(dataByDate);
                    gridApi.setGridOption('rowData', rows);
                    setMessage('');
                    setLoadingGlobal(false);
                    setIsDateChanged(false);
                    setSearchValueDebounced('');
                    return;
                }

                if (isExtractData) {
                    console.log('isExtractData', isExtractData);
                    const newWindow = window.open('', '_blank');
                    if (!newWindow) {
                        setMessage('Please allow popups for this website');
                        setLoadingGlobal(false);
                        return;
                    }
                    const mappedRows = getRowsMap(dataByDate);
                    localStorage.clear();
                    localStorage.setItem('rowID', JSON.stringify(eventState.data.IDR));
                    localStorage.setItem('extractedData', JSON.stringify(mappedRows));
                    setLoadingGlobal(false);
                    setIsExtractData(false);
                    setTimeout(() => {
                        newWindow.location.href = '/extracted-days-events';
                        newWindow.focus();
                    }, 100);
                    return;
                }
            }
            else{
                setMessage("No data found.");
                setLoadingGlobal(false);
            }
        }

    }, [isLoadingDataByDate, isErrorDataByDate, dataByDate, errorDataByDate, isDateChanged, eventState, setSearchValueDebounced, setMessage]);

    useEffect(() => {
        if (isLoadingAliveEvent) {
            setLoadingGlobal(true);
            return;
        }
        if (isErrorAliveEvent) {
            setLoadingGlobal(false);
            setMessage("Error: " + errorAliveEvent.message);
            return;
        }

        if (isAliveEvent && aliveEvent) {
            const rowEvent = eventState.data.EventString;
            const matchedEvent = aliveEvent.find((event) => event.EventString === rowEvent);
            if (matchedEvent) {
                setDialogContent(matchedEvent);
                setIsDialogOpen(true);
            } else {
                console.error('matchedEvent is undefined or null');
                setMessage('Not found eventState in alive');
            }
            setLoadingGlobal(false);
            setIsAliveEvent(false);
        }

    }, [isLoadingAliveEvent, isErrorAliveEvent, aliveEvent, errorAliveEvent, isAliveEvent, eventState]);

    useEffect(() => {

        if ( searchValueDebounced.length === 0 )
            return;

        if (isLoadingSelectedEvents) {
            setLoadingGlobal(true);
            return;
        }

        if (isErrorSelectedEvents) {
            setLoadingGlobal(false);
            setMessage("Error: " + errorSelectedEvents.message);
            return;
        }

        if (selectedEvents && selectedEvents.length !== 0) {
            const rows = getRowsMap(selectedEvents);
            setSelectedEventsResult(rows);
            gridApi.setGridOption('rowData', rows);
            setExcelEvents(rows);
            setMessage('');
            setLoadingGlobal(false);
        } else {
            console.log('selectedEvents', selectedEvents);
            setMessage("No selected events found.");
            setLoadingGlobal(false);
        }
    }, [isLoadingSelectedEvents, isErrorSelectedEvents, selectedEvents, errorSelectedEvents, searchValueDebounced ]);


    const onCellClicked = useCallback((event: CellClickedEvent) => {
        console.log('onCellClicked', event);

        if (event.colDef.field === 'IDR' &&  searchValueDebounced.length === 0){
            setMessage('filter something first...');
            setEventState(event);
            return;
        }

        if (event.colDef.field === 'IDR' && searchValueDebounced.length !== 0){
            setEventState(event);
            const [day, month, year] = event.data.DataOraR.split('/');
            console.log('day', day, 'month', month, 'year', year);
            const newDate = new Date(year, month - 1, day);
            console.log('newDate', newDate.toISOString());
            setDate(newDate.toISOString());
            setIsExtractData(true);
        }

    }, [searchValueDebounced ]);

    const onCellDoubleClicked = useCallback((event: CellDoubleClickedEvent) => {
        if ( event && event.colDef.field === 'EventString' ){
            setEventState(event);
            setIsAliveEvent(true);
        }
    }, []);

    const onGridReady = useCallback((params: GridReadyEvent) => {

        setGridApiStore(params.api);
        setGridApi(params.api);
    }, [searchValueDebounced]);

    const colDefsBase: ColDef<RowData>[] = useMemo(() => [
        { headerName: 'Data', field: 'DataOraR', flex: 1, minWidth: 140, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: false, floatingFilter: true,
            suppressHeaderFilterButton: true,
            suppressFloatingFilterButton: true,
        },
        { headerName: 'Time', field: 'Time', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: true, floatingFilter: true, suppressHeaderFilterButton: true, suppressFloatingFilterButton: true},
        { headerName: 'Evento', field: 'EventString', flex: 2, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: true, floatingFilter: true, suppressHeaderFilterButton: true, suppressFloatingFilterButton: true},
        { headerName: 'Stato', field: 'State', flex: 1, minWidth: 80, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: true, floatingFilter: true, suppressHeaderFilterButton: true, suppressFloatingFilterButton: true },
        { headerName: 'Producer', field: 'DevProducer', flex: 2, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: true, floatingFilter: true, suppressHeaderFilterButton: true, suppressFloatingFilterButton: true },
        { headerName: 'Dev', field: 'DevIndex', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: true, floatingFilter: true, suppressHeaderFilterButton: true, suppressFloatingFilterButton: true },
        { headerName: 'Sub', field: 'SubIndex', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: true, floatingFilter: true, suppressHeaderFilterButton: true, suppressFloatingFilterButton: true },
        { headerName: 'T1', field: 'Tag1', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: true, floatingFilter: true, suppressHeaderFilterButton: true, suppressFloatingFilterButton: true },
        { headerName: 'T2', field: 'Tag2', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: true, floatingFilter: true, suppressHeaderFilterButton: true, suppressFloatingFilterButton: true},
        { headerName: 'T3', field: 'Tag3', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: true, floatingFilter: true, suppressHeaderFilterButton: true, suppressFloatingFilterButton: true },
        { headerName: 'T4', field: 'Tag4', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: true, floatingFilter: true, suppressHeaderFilterButton: true, suppressFloatingFilterButton: true },
        { headerName: 'Fase', field: 'Fase', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: true, floatingFilter: true, suppressHeaderFilterButton: true, suppressFloatingFilterButton: true },
        { headerName: 'Tag Data', field: 'TagData', flex: 2, minWidth: 140, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: true, floatingFilter: true, suppressHeaderFilterButton: true, suppressFloatingFilterButton: true },
        { headerName: 'Action', field: 'IDR', flex: 1, minWidth: 90, cellStyle: { whiteSpace: 'nowrap' }, filter: false, sortable: false, valueGetter: () => 'Extract' },
    ], []);

    if (table !== 'master')
        return;

    return (
        <div className="w-full h-full">
            <div className="ag-theme-quartz-dark compact w-full h-full">
                <AgGridReact<RowData>
                    loading={loading}
                    rowData={logData}
                    columnDefs={colDefsBase}
                    onCellClicked={onCellClicked}
                    onCellDoubleClicked={onCellDoubleClicked}
                    rowClassRules={rowClassRules}
                    animateRows={false}
                    onGridReady={onGridReady}
                    loadingOverlayComponent={LoadingOverlayAgGrid}
                    loadingOverlayComponentParams={{ loadingMessage: "One moment please..." }}
                />
            </div>
        </div>
    );

}

export default AgGridMasterLogReactQuery;