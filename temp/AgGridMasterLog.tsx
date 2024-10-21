'use client';
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useStore from "../app/store";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import "../src/client/styles/gridStyle.css";
import { GridReadyEvent, CellClickedEvent, CellDoubleClickedEvent, ColDef, FilterChangedEvent } from "ag-grid-community";
import { apiGetEventsFromLatestBackup, apiGetEventsByDate, apiGetSelectedEvents} from "../src/client/api/api";
import { AgGridReact } from 'ag-grid-react';
import {RowData} from "../src/client/types/types";
import {rowClassRules} from "../src/client/utils/rowClassRules";
import {handleTagData} from "../src/client/styles/handleTagData";
import {fetchEventData} from "../src/client/styles/fetchEeventData";
import {getRowsMap} from "../src/client/utils/getRowMap";
import LoadingOverlayAgGrid from "../src/client/components/log/tables/LoadingOverlayAgGrid";


const AgGridMasterLog: React.FC = () => {
    const searchValueDebounced = useStore(state => state.searchValueDebounced);
    const serial = useStore(state => state.serial);
    const backupSelected = useStore(state => state.backupSelected);
    const logData = useStore(state => state.excelEvents);
    const setLogData = useStore(state => state.setExcelEvents);
    const isFirstFetch = useStore(state => state.isFirstFetch);
    const setIsFirstFetch = useStore(state => state.setIsFirstFetch);
    const setSearchValueDebounced = useStore(state => state.setSearchValueDebounced);
    const setMessage = useStore(state => state.setMessage);
    const setIsDialogOpen = useStore(state => state.setIsDialogOpen);
    const setDialogContent = useStore(state => state.setDialogContent);
    const setIsDataFetched = useStore(state => state.setIsDataFetched);
    const setGridApi = useStore(state => state.setGridApiStore);
    const table = useStore(state => state.table);
    const setTable = useStore(state => state.setTable);
    const [loading, setLoading] = useState(true);
    const [currentDate, setCurrentDate] = useState('');
    const [isDateChanged, setIsDateChanged] = useState(false);
    const gridApiRef = useRef<any>(null);

    const colDefsBase: ColDef<RowData>[] = useMemo(() => [
        { headerName: 'Data', field: 'DataOraR', flex: 1, minWidth: 140, cellStyle: { whiteSpace: 'nowrap' }, filter: 'agDateColumnFilter', sortable: false, floatingFilter: true,
            filterParams: {
                minValidYear: 2000,
                maxValidYear: 2035,
                inRangeFloatingFilterDateFormat: "Do MMM YYYY"
            },
            suppressHeaderFilterButton: true,
            suppressFloatingFilterButton: true,
        },
        { headerName: 'Time', field: 'Time', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: false, floatingFilter: true, suppressHeaderFilterButton: true, suppressFloatingFilterButton: true,},
        { headerName: 'Evento', field: 'EventString', flex: 2, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: false, floatingFilter: true, suppressHeaderFilterButton: true, suppressFloatingFilterButton: true, },
        { headerName: 'Stato', field: 'State', flex: 1, minWidth: 80, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: false, floatingFilter: true, suppressHeaderFilterButton: true, suppressFloatingFilterButton: true, },
        { headerName: 'Producer', field: 'DevProducer', flex: 2, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: false, floatingFilter: true, suppressHeaderFilterButton: true, suppressFloatingFilterButton: true, },
        { headerName: 'Dev', field: 'DevIndex', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: false, floatingFilter: true, suppressHeaderFilterButton: true, suppressFloatingFilterButton: true, },
        { headerName: 'Sub', field: 'SubIndex', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: false, floatingFilter: true, suppressHeaderFilterButton: true, suppressFloatingFilterButton: true, },
        { headerName: 'T1', field: 'Tag1', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: false, floatingFilter: true, suppressHeaderFilterButton: true, suppressFloatingFilterButton: true, },
        { headerName: 'T2', field: 'Tag2', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: false, floatingFilter: true, suppressHeaderFilterButton: true, suppressFloatingFilterButton: true, },
        { headerName: 'T3', field: 'Tag3', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: false, floatingFilter: true, suppressHeaderFilterButton: true, suppressFloatingFilterButton: true, },
        { headerName: 'T4', field: 'Tag4', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: false, floatingFilter: true, suppressHeaderFilterButton: true, suppressFloatingFilterButton: true, },
        { headerName: 'Fase', field: 'Fase', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: false, floatingFilter: true, suppressHeaderFilterButton: true, suppressFloatingFilterButton: true, },
        { headerName: 'Tag Data', field: 'TagData', flex: 2, minWidth: 140, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: false, floatingFilter: true, suppressHeaderFilterButton: true, suppressFloatingFilterButton: true, },
        { headerName: 'Action', field: 'IDR', flex: 1, minWidth: 90, cellStyle: { whiteSpace: 'nowrap' }, filter: false, sortable: false, valueGetter: () => 'Extract' },
    ], []);

    useEffect(() => {

    }, [table]);

const onCellClicked = useCallback((event: CellClickedEvent) => {
    console.log('clicked');
    if (event.colDef.field === 'IDR') {
        if ( searchValueDebounced.length >0 ) {
            const fetchDataOnExtract = async () => {
                const newWindow = window.open('', '_blank');
                    if (!newWindow) {
                        console.error('Failed to open new window');
                        return;
                    }
                    const [day, month, year] = event.data.DataOraR.split('/');
                    const extractedData = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day))).toISOString();
                    console.log('extractedData', extractedData);
                    const result = await apiGetEventsByDate(serial, backupSelected, extractedData);
                    //console.log('result', result);
                    const mappedRows = getRowsMap(result);
                    console.log('mappedRows', mappedRows);
                    localStorage.clear();
                    localStorage.setItem('rowID', JSON.stringify(event.data.IDR));
                    localStorage.setItem('extractedData', JSON.stringify(mappedRows));
                    newWindow.location.href = '/extracted-days-events';
                    newWindow.focus();

                };
            fetchDataOnExtract().catch(err => console.error('Error in fetchData', err));
        } else {
            const filteredRows = logData.filter(row => row.DataOraR === event.data.DataOraR);
            localStorage.clear();
            localStorage.setItem('rowID', JSON.stringify(event.data.IDR));
            localStorage.setItem('extractedData', JSON.stringify(filteredRows));
            const url = `/extracted-days-events`;
            const newWindow = window.open(url, '_blank');
            if (newWindow) {
                newWindow.focus();
            }

        }
    }

    handleTagData(event, setIsDialogOpen, setDialogContent);
}, [logData, setIsDialogOpen, setDialogContent, searchValueDebounced]);
    const onCellDoubleClicked = useCallback((event: CellDoubleClickedEvent) => {

        fetchEventData(event, setIsDialogOpen, setDialogContent).catch(err => console.error('Error in fetchData:', err));
    }, [setDialogContent, setIsDialogOpen]);

    useEffect(() => {
        if ( !loading )
            setLoading(true);
    }, [backupSelected]);

    useEffect(() => {
        if (!isDateChanged) {
            return;
        } else {
            try {
                const fetchDataOnDateChange = async (serial :any ) => {
                    const backupData = await apiGetEventsByDate(serial, backupSelected, currentDate);
                    if (backupData.error) {
                        setMessage("Database corrupted: " + backupData.error);
                        return;
                    }

                    if (!backupData || backupData.length === 0){
                        setMessage("No data found.");
                        setLoading(false);
                        return;
                    }

                    const rows = getRowsMap(backupData);
                    setLogData(rows);
                    setIsDateChanged(false);
                    setMessage('');
                    setLoading(false);
                };
                setLoading(true);
                fetchDataOnDateChange(serial).catch(err => console.error('Error in fetchData:', err));

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    }, [isDateChanged, currentDate]);

    const onFilterChanged = useCallback((event: FilterChangedEvent) => {
        setSearchValueDebounced('');
        const dateFilterModel = event.api.getFilterModel()['DataOraR'];
        if (dateFilterModel && dateFilterModel.dateFrom) {
            const selectedDate = new Date(dateFilterModel.dateFrom);
            setCurrentDate(selectedDate.toISOString());
            setIsDateChanged(true);
        }
    }, []);

    useEffect(() => {
        if (searchValueDebounced.length === 0) {
            if (!isFirstFetch && !loading)
                setLoading(true);
        } else {
            const fetchFilteredData = async () => {
                const filteredData = await apiGetSelectedEvents(serial, backupSelected, searchValueDebounced);
                if (filteredData.error) {
                    setMessage("Database corrupted: " + filteredData.error);
                    return;
                }

                let rows = [];
                if (filteredData.lenght > 0){
                    console.log(true);
                    rows = getRowsMap(filteredData);
                }

                setLogData(rows);
                setLoading(false);
            }

            setLoading(true);
            fetchFilteredData().catch(err => console.error('Error in fetchData:', err));
        }

    }, [searchValueDebounced]);


    const onGridReady = useCallback((params: GridReadyEvent) => {
        gridApiRef.current = params.api;
        setGridApi(params.api);
        const fetchDataOnGridReady = async (serial : string, backupSelected :string) => {

            try {
                const backupData = await apiGetEventsFromLatestBackup(serial, backupSelected);
                if (backupData.error) {
                    console.log(backupData.error);
                    if ( (backupData.error).includes('No such file') ) {
                        setMessage("Serial invalid.");
                        setTable("no_table");
                        setLoading(false);
                        return;
                    }else {
                        setMessage("Database corrupted: " + backupData.error);
                        setTable("no_table");
                        setLoading(false);
                        return;
                    }
                }

                if (!backupData || backupData.length === 0)
                    return;

                const length = backupData.length -1;
                setCurrentDate(backupData[length].DataOraR )
                const rows = getRowsMap(backupData);
                setLogData(rows);
                setIsFirstFetch(false);
                setIsDataFetched(true);
                setMessage('');
                setLoading(false);

            } catch (error) {
                setMessage("An error occurred while downloading the backup.");
                setTable("no_table");
            }
        }

        if (!serial || !backupSelected || backupSelected.length === 0) {
            return;
        }

        if (backupSelected.includes('No such file')) {
            console.log('No such file');
            setTable("no_table");
            setIsFirstFetch(false);
            setLoading(false);
            return;
        }

        if (searchValueDebounced.length > 0)
            return;

        fetchDataOnGridReady(serial, backupSelected).catch(err => console.error('Error in fetchData:', err));

    }, [serial, backupSelected, searchValueDebounced]);

    useEffect(() => {
        if (gridApiRef.current) {
            const params: GridReadyEvent = {
                api: gridApiRef.current,
                type: 'gridReady',
                context: {},
            };
            if (serial && serial.length > 0)
                onGridReady(params);
        }
    }, [serial, onGridReady]);

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
                    rowBuffer={300}
                    onFilterChanged={onFilterChanged}
                    onGridReady={onGridReady}
                    loadingOverlayComponent={LoadingOverlayAgGrid}
                    loadingOverlayComponentParams={{ loadingMessage: "One moment please..." }}
                />
            </div>
        </div>
    );
}

export default AgGridMasterLog;