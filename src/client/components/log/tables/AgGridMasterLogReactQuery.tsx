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
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {apiGetEventsByDate, apiGetEventsFromLatestBackup, apiGetAliveEventsCorsHandling, apiGetSelectedEvents} from "@/src/client/api/api";

const AgGridMasterLogReactQuery = () => {
    const {
        searchValueDebounced,
        serial,
        backupSelected,
        setExcelEvents,
        setMessage,
        setIsDialogOpen,
        setDialogContent,
        setGridApiStore,
        table,
        setTable,
        loadingGlobal,
        setLoadingGlobal,
        datePickerDate,
        setSearchValueDebounced,
        setSearchingLogEvent,
        isSearchingLogEvent,
        setSerial
    } = useStore(state => ({
        searchValueDebounced: state.searchValueDebounced,
        serial: state.serial,
        backupSelected: state.backupSelected,
        setExcelEvents: state.setExcelEvents,
        setMessage: state.setMessage,
        setIsDialogOpen: state.setIsDialogOpen,
        setDialogContent: state.setDialogContent,
        setGridApiStore: state.setGridApiStore,
        table: state.table,
        setTable: state.setTable,
        loadingGlobal: state.loadingGlobal,
        setLoadingGlobal: state.setLoadingGlobal,
        datePickerDate: state.datePickerDate,
        setSearchValueDebounced: state.setSearchValueDebounced,
        setSearchingLogEvent: state.setSearchingLogEvent,
        isSearchingLogEvent: state.isSearchingLogEvent,
        setSerial: state.setSerial
    }));

    const [logData, setLogData] = useState<RowData[]>([]);
    const [isDateChanged, setIsDateChanged] = useState(false);
    const [eventGridAlive, setEventGridAlive] = useState<any>(null);
    const [isAliveEvent, setIsAliveEvent] = useState(false);
    const [date, setDate] = useState<any>(null);
    const [gridApi, setGridApi] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const queryClient = useQueryClient();

    const { isLoading: isLoadingLatestBackup, isError: isErrorLatestBackup, data: latestDataBackup, error: errorLatestBackup } = useQuery({
        queryKey: ['eventsFromLatestBackup', serial, backupSelected, logData, table],
        queryFn: () => apiGetEventsFromLatestBackup(serial, backupSelected),
        enabled: !!serial && !!backupSelected && !backupSelected.includes('No such file') && logData.length === 0 && table === 'master',
    });

    const {isLoading: isLoadingDataByDate, isError: isErrorDataByDate, data: dataByDate, error: errorDataByDate, isSuccess: isSuccessDataByDate} = useQuery({
        queryKey: ['eventsFromDataByDate',serial, backupSelected, table, date, isDateChanged ],
        queryFn: () => apiGetEventsByDate(serial, backupSelected, date),
        enabled: !!serial && !!backupSelected && !backupSelected.includes('No such file') && table === 'master' &&  isDateChanged ,
    });

    const {isLoading: isLoadingAliveEvent, isError: isErrorAliveEvent, data: aliveEvent, error: errorAliveEvent} = useQuery({
        queryKey: ['eventFromAlive',serial, backupSelected, isAliveEvent, table],
        queryFn: () => apiGetAliveEventsCorsHandling(),
        enabled: !!serial && !!backupSelected && !backupSelected.includes('No such file') && isAliveEvent && table === 'master' ,
    });

    const {isLoading: isLoadingSelectedEvents, isError: isErrorSelectedEvents, data: selectedEvents, error: errorSelectedEvents} = useQuery({
        queryKey: ['eventsFromSelectedEvents',serial, backupSelected, searchValueDebounced, table, isSearchingLogEvent],
        queryFn: () => apiGetSelectedEvents(serial, backupSelected, searchValueDebounced),
        enabled: !!serial && !!backupSelected && !backupSelected.includes('No such file') && isSearchingLogEvent && table === 'master' && searchValueDebounced.length !== 0,
    });

    useEffect(() => {
        if (loadingGlobal) {
            setLoading(true);
        }else {
            setLoading(false);
        }
    }, [loadingGlobal, loading, setLoading,setLoadingGlobal]);

    useEffect(() => {
        if (date === null)
            setDate(datePickerDate.toISOString());
        else {
            setDate(datePickerDate.toISOString());
            setIsDateChanged(true);
        }
    }, [datePickerDate]);

    useEffect(() => {
        console.log('serial', serial);
        if (serial && serial.length > 0){
            setLogData([]);
        }
    }, [serial, setSerial, setLogData]);

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
            queryClient.removeQueries({
                    queryKey: ['eventsFromLatestBackup', serial, backupSelected, logData, table],
                    exact: true, // Ensure it matches the exact query key
                }
            );
            const state = queryClient.getQueryState(['eventsFromLatestBackup', serial, backupSelected, logData, table]);
            console.log('state', state);
        }
    }, [latestDataBackup, isLoadingLatestBackup, isErrorLatestBackup, errorLatestBackup]);

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
                const rows = getRowsMap(dataByDate);
                gridApi.setGridOption('rowData', rows);
                setMessage('');
                setSearchValueDebounced('');
                setLoadingGlobal(false);
                setIsDateChanged(false);
                queryClient.resetQueries({
                        queryKey: ['eventsFromDataByDate', serial, backupSelected, table, date, isDateChanged],
                        exact: true, // Ensure it matches the exact query key
                    }
                ).catch((error) => {console.log(error)});
                return;
            }
            else{
                setMessage("No data found.");
                setLoadingGlobal(false);
            }
        }

    }, [isLoadingDataByDate, isErrorDataByDate, dataByDate, errorDataByDate]);

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

    }, [isLoadingAliveEvent, isErrorAliveEvent, aliveEvent, errorAliveEvent]);

    useEffect(() => {

        if (!isSearchingLogEvent)
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
            gridApi.setGridOption('rowData', rows);
            setExcelEvents(rows);
            setMessage('');

            queryClient.removeQueries({
                queryKey: ['eventsFromSelectedEvents',serial, backupSelected, searchValueDebounced, table, isSearchingLogEvent],
                exact: true, // Ensure it matches the exact query key
            });
        } else {
            setMessage("No selected events found.");
        }
        setLoadingGlobal(false);
        setSearchingLogEvent(false);
    }, [isLoadingSelectedEvents, isErrorSelectedEvents, selectedEvents, errorSelectedEvents ]);


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

    }, [setEventGridAlive, setIsAliveEvent,  setDialogContent, setIsDialogOpen, searchValueDebounced]);

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

    if (table !== 'master')
        return;

    return (
        <div className="w-full h-full ">
            <div className="ag-theme-quartz-dark compact w-full h-full overflow-hidden" >
                <AgGridReact<RowData>
                    loading={loading}
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