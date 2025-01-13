'use client'

import React, { useCallback, useEffect, useMemo, useState } from "react";
import "@/app/styles/gridStyle.css";
import {
    ModuleRegistry,
    RowStyleModule,
    ClientSideRowModelModule,
    GridReadyEvent,
    CellDoubleClickedEvent,
    ColDef,
    GridApi,
    TextFilterModule,
    themeQuartz,
    colorSchemeDarkBlue,
    ValidationModule,
    CellStyleModule,
    NumberFilterModule,
} from "ag-grid-community";
import { AgGridReact } from 'ag-grid-react';
import {LogEventData, RawLogEventData} from "@/app/types/types";
import {rowClassRules} from "@/app/utils/rowClassRules";
import {getRowsMap} from "@/app/utils/getRowMap";
import LoadingOverlayAgGrid from "@/app/components/body/LoadingOverlayAgGrid";

interface AgGridMasterLogReactQueryProps {
    loading: boolean;
    rawLogEvents: RawLogEventData[];
    selectedEvents: RawLogEventData[];
    onCellDoubleClicked: (event: CellDoubleClickedEvent) => void;
    isResettingSearchingEvent: boolean;
    setIsResettingSearchingEvent: (value: boolean) => void;
    section: string;
    setMessage: (message: string) => void;
    searchValue: string;
    setStoredGridApi: (api: GridApi) => void;
}

ModuleRegistry.registerModules([ClientSideRowModelModule, RowStyleModule, ValidationModule, CellStyleModule,TextFilterModule, NumberFilterModule]);

const theme = (themeQuartz.withPart(colorSchemeDarkBlue)).withParams({
    spacing: 3,
    wrapperBorderRadius: 4,
    fontSize: 12,
    inputBorder: '1px',
    headerHeight: 40,
})

const AgGridMaster: React.FC<AgGridMasterLogReactQueryProps> = ({
                                                                    loading,
                                                                    rawLogEvents,
                                                                    selectedEvents,
                                                                    onCellDoubleClicked,
                                                                    isResettingSearchingEvent,
                                                                    setIsResettingSearchingEvent,
                                                                    section,
                                                                    setMessage,
                                                                    searchValue,
                                                                    setStoredGridApi
}) => {

    const [storedData, setStoredData] = useState<LogEventData[]>([]);
    const [gridApi, setGridApi] = useState<GridApi | null>(null);

    useEffect(() => {
            const rows = getRowsMap(rawLogEvents);
            setStoredData(rows);
            if (gridApi)
                gridApi.setGridOption('rowData', rows);

    }, [rawLogEvents, gridApi, setMessage, setStoredData]);

    useEffect(() => {
            const rows = getRowsMap(selectedEvents);
            if (gridApi && selectedEvents.length > 0){
                gridApi.setGridOption('rowData', rows);
            }
            setMessage('');
    }, [gridApi, selectedEvents, setMessage]);

    useEffect(() => {
        if ( storedData.length > 0 && searchValue.length === 0 && gridApi && isResettingSearchingEvent) {
            gridApi.setGridOption('rowData', storedData);
            setIsResettingSearchingEvent(false);
        }
    }, [gridApi, isResettingSearchingEvent, searchValue.length, setIsResettingSearchingEvent, storedData]);

    const onGridReady = useCallback((params: GridReadyEvent) => {
        setStoredGridApi(params.api);
        setGridApi(params.api);
    }, [setGridApi, setStoredGridApi]);

    const colDefsBase: ColDef<LogEventData>[] = useMemo(() => [
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

    if (section !== 'master')
        return;

    return (
        <div className="w-full h-full pb-2 flex-grow">
            <div className="w-full h-full overflow-hidden" >
                <AgGridReact<LogEventData>
                    theme={theme}
                    loading={loading}
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

export default AgGridMaster;