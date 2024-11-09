'use client';
import React, { useCallback, useEffect, useMemo, useState } from "react";
import useStore from "@/app/store";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import "@/src/client/styles/gridStyle.css";
import { GridReadyEvent, CellDoubleClickedEvent, ColDef } from "ag-grid-community";
import { AgGridReact } from 'ag-grid-react';
import {RowData} from "@/src/client/types/types";
import {rowClassRules} from "@/src/client/utils/rowClassRules";
import {getRowsMap} from "@/src/client/utils/getRowMap";
import LoadingOverlayAgGrid from "@/src/client/components/log/tables/LoadingOverlayAgGrid";
import {useQueryClient} from '@tanstack/react-query';
import useQueryLatestEvents from "@/src/client/hooks/useQueryLatestEvents";
import useQueryEventsByDate from "@/src/client/hooks/useQueryEventsByDate";
import useQueryEventsFromAlive from "@/src/client/hooks/useQueryEventsFromAlive";
import useQuerySelectedEvents from "@/src/client/hooks/useQuerySelectedEvents";

const AgGridMasterLogReactQuery = () => {
    const searchValueDebounced = useStore(state => state.searchValueDebounced);
    const serial = useStore(state => state.serial);
    const backupSelected = useStore(state => state.backupSelected);
    const setExcelData = useStore(state => state.setExcelData);
    const setMessage = useStore(state => state.setMessage);
    const setIsDialogOpen = useStore(state => state.setIsDialogOpen);
    const setDialogContent = useStore(state => state.setDialogContent);
    const setGridApiStore = useStore(state => state.setGridApiStore);
    const table = useStore(state => state.table);
    const loadingGlobal = useStore(state => state.loadingGlobal);
    const setLoadingGlobal = useStore(state => state.setLoadingGlobal);
    const datePickerDate = useStore(state => state.datePickerDate);
    const setSearchValueDebounced = useStore(state => state.setSearchValueDebounced);
    const setSearchingLogEvent = useStore(state => state.setSearchingLogEvent);
    const isSearchingLogEvent = useStore(state => state.isSearchingLogEvent);
    const setIsLatestBackupQueryActive = useStore(state => state.setIsLatestBackupQueryActive);
    const [logData, setLogData] = useState<RowData[]>([]);
    const [isDateChanged, setIsDateChanged] = useState(false);
    const [eventGridAlive, setEventGridAlive] = useState<any>(null);
    const [isAliveEvent, setIsAliveEvent] = useState(false);
    const [date, setDate] = useState<any>(null);
    const [gridApi, setGridApi] = useState<any>(null);
    const queryClient = useQueryClient();

    const { isLoading: isLoadingLatestBackup, isPending: isPendingLatestBackup, isError: isErrorLatestBackup, data: latestDataBackup, error: errorLatestBackup , isSuccess: isSuccessLatestBackup } = useQueryLatestEvents();
    const { isLoading: isLoadingDataByDate, isError: isErrorDataByDate, data: dataByDate, error: errorDataByDate, isSuccess: isSuccessDataByDate } = useQueryEventsByDate(date, isDateChanged);
    const { isLoading: isLoadingAliveEvent, isError: isErrorAliveEvent, data: aliveEvent, error: errorAliveEvent } = useQueryEventsFromAlive(isAliveEvent);
    const { isLoading: isLoadingSelectedEvents, isError: isErrorSelectedEvents, data: selectedEvents, error: errorSelectedEvents } = useQuerySelectedEvents();

    useEffect(() => {
        if (date === null)
            setDate(datePickerDate.toISOString());
        else {
            setDate(datePickerDate.toISOString());

            const resetQuery = async () => {
                await queryClient.resetQueries({
                        queryKey: ['eventsFromDataByDate'],
                        exact: true, // Ensure it matches the exact query key
                    }
                ).catch((error) => {console.log(error)});
            }

            resetQuery().catch((error) => {console.log(error)});
            setIsDateChanged(true);
        }
    }, [datePickerDate]);

    useEffect(() => {
        if (serial && serial.length > 0){
            setLogData([]);
        }
    }, [serial]);

    useEffect(() => {
        if ( isLoadingLatestBackup ){
            if (!loadingGlobal)
                setLoadingGlobal(true);
            return;
        }

        if (isPendingLatestBackup )
            return;

        if (isErrorLatestBackup && errorLatestBackup) {
            setLoadingGlobal(false);
            if (errorLatestBackup.message.includes('No such file')) {
                setMessage("Serial invalid.");
            } else {
                setMessage("Error: " + errorLatestBackup.message);
            }
            return;
        }

        if (isSuccessLatestBackup) {
            if (latestDataBackup.length === 0) {
                setMessage("The database is empty.");
                setLoadingGlobal(false);
                setIsLatestBackupQueryActive(false);
                return;
            }
            if (latestDataBackup.error ) {
                setMessage("error: " + latestDataBackup.error);
                setLoadingGlobal(false);
                setIsLatestBackupQueryActive(false);
                return;
            }

            if (logData.length != latestDataBackup.length) {
                const rows = getRowsMap(latestDataBackup);
                setMessage('data updated');
                gridApi.setGridOption('rowData', rows);
            } else if (logData.length === latestDataBackup.length) {
                setMessage('No new data found.');
            } else {
                const rows = getRowsMap(latestDataBackup);
                setLogData(rows);
            }

            setMessage('');
            setLoadingGlobal(false);
            setIsLatestBackupQueryActive(false);
        }
    }, [latestDataBackup, isPendingLatestBackup, isErrorLatestBackup, isLoadingLatestBackup, errorLatestBackup, logData, gridApi, queryClient, isSuccessLatestBackup]);

    useEffect(() => {

        if (isLoadingDataByDate) {
            setLoadingGlobal(true);
            return;
        }

        if (isErrorDataByDate && errorDataByDate) {
            setLoadingGlobal(false);
            setMessage("Error: " + errorDataByDate.message);
            return;
        }

        if (isSuccessDataByDate) {
            if (dataByDate && dataByDate.length !== 0) {
                const rows = getRowsMap(dataByDate);
                gridApi.setGridOption('rowData', rows);
                setMessage('');
                setSearchValueDebounced('');
                setLoadingGlobal(false);
                setIsDateChanged(false);
                return;
            }
            else{
                setMessage("No data found.");
                setLoadingGlobal(false);
            }
        }

    }, [isLoadingDataByDate, isErrorDataByDate, dataByDate, errorDataByDate, gridApi, queryClient]);

    useEffect(() => {
        if (isLoadingAliveEvent) {
            setLoadingGlobal(true);
            return;
        }
        if (isErrorAliveEvent && errorAliveEvent) {
            setLoadingGlobal(false);
            setMessage("Error: " + errorAliveEvent.message);
            return;
        }

        if (isAliveEvent && aliveEvent) {
            const matchedEvent = aliveEvent.find((event: any) => event.EventString === eventGridAlive);
            if (matchedEvent) {
                setDialogContent(matchedEvent);
                setIsDialogOpen(true);
            } else {
                setMessage('Not found eventGridAlive in alive');
            }
            setLoadingGlobal(false);
            setIsAliveEvent(false);
        }

    }, [isLoadingAliveEvent, isErrorAliveEvent, aliveEvent, errorAliveEvent, eventGridAlive, isAliveEvent ]);

    useEffect(() => {

        if (!isSearchingLogEvent)
            return;

        if (isLoadingSelectedEvents) {
            setLoadingGlobal(true);
            return;
        }

        if (isErrorSelectedEvents && errorSelectedEvents) {
            setLoadingGlobal(false);
            setMessage("Error: " + errorSelectedEvents.message);
            return;
        }
        if (selectedEvents && selectedEvents.length !== 0) {
            const rows = getRowsMap(selectedEvents);
            gridApi.setGridOption('rowData', rows);
            setExcelData(rows);
            setMessage('');

            //da correggere, attivare il reset solo quando cambia il valore cercato e non ad ogni render
            queryClient.removeQueries({
                queryKey: ['eventsFromSelectedEvents'],
                exact: true, // Ensure it matches the exact query key
            });
        } else {
            setMessage("No selected events found.");
        }
        setLoadingGlobal(false);
        setSearchingLogEvent(false);

    }, [isLoadingSelectedEvents, isErrorSelectedEvents, selectedEvents, errorSelectedEvents, isSearchingLogEvent, gridApi, queryClient]);


    const onCellDoubleClicked = useCallback((event: CellDoubleClickedEvent) => {
        if (event.colDef.field === 'EventString') {
            setEventGridAlive(event.data.EventString);
            setIsAliveEvent(true);
        }
        if (event.colDef.field === 'TagData'){
            setDialogContent(event.data.TagData);
            setIsDialogOpen(true);
        }

        if ( searchValueDebounced.length === 0 && event && event.colDef.field === 'DataOraR'){
            setMessage('Please enter a search value');
            return;
        }

        if (event && event.colDef.field === 'DataOraR') {
            const [day, month, year] = event.data.DataOraR.split('/');
            const newDate = new Date(Date.UTC(year, month - 1, day, 12, 0, 0)).toISOString();
            const id = event.data.ID;

            const queryParams = new URLSearchParams({
                date: newDate,
                id: id.toString(),
                serial: serial.toString(),
                backup: backupSelected.toString(),
            }).toString();

            const newWindow = window.open(`/extracted-days-events?${queryParams}`, '_blank');
            if (!newWindow) {
                setMessage('Please allow popups for this website');
            }
        }

    }, [searchValueDebounced]);

    const onGridReady = useCallback((params: GridReadyEvent) => {
        setGridApiStore(params.api);
        setGridApi(params.api);
    }, []);

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
    ], []);

    if (table !== 'master' )
        return;

    return (
        <div className="w-full h-full pb-2">
            <div className="ag-theme-quartz-dark compact w-full h-full overflow-hidden" >
                <AgGridReact<RowData>
                    loading={loadingGlobal}
                    rowData={logData}
                    columnDefs={colDefsBase}
                    onCellDoubleClicked={onCellDoubleClicked}
                    rowClassRules={rowClassRules}
                    animateRows={false}
                    onGridReady={onGridReady}
                    loadingOverlayComponent={LoadingOverlayAgGrid}
                    loadingOverlayComponentParams={{ loadingMessage: "Loading, one moment please..." }}
                />
            </div>
        </div>
    );

}

export default AgGridMasterLogReactQuery;