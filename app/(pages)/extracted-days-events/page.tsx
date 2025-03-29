'use client'
import React, {useCallback, useEffect, useMemo, useState} from "react";
import "@/app/styles/gridStyle.css";
import Dialog from "@/app/components/Dialog";
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
    ScrollApiModule
} from "ag-grid-community";
import {AgGridReact} from "ag-grid-react";
import {eventsRowStyles} from "@/app/styles/events-row-styles";
import { useRouter } from "next/navigation";
import {useQuery} from "@tanstack/react-query";
import {apiGetEventsByDate} from "@/app/lib/apiGET";
import {getRowsMap} from "@/app/utils/events-mapper";
import {AliveEvent, ErrorResponse, LogEventData} from "@/app/types/types";
import useQueryEventsFromAlive from "@/app/hooks/useQueryEventsFromAlive";
import useAliveEvent from "@/app/hooks/useAliveEvent";

ModuleRegistry.registerModules([ClientSideRowModelModule, RowStyleModule, ValidationModule, CellStyleModule,TextFilterModule, NumberFilterModule, ScrollApiModule]);

const theme = (themeQuartz.withPart(colorSchemeDarkBlue)).withParams({
    spacing: 3,
    wrapperBorderRadius: 4,
    fontSize: 12,
    inputBorder: '1px',
    headerHeight: 40,
})

function Extract() {
    const [loading, setLoading] = useState<boolean>(true);
    const [logData, setLogData] = useState<LogEventData[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [dialogContent, setDialogContent] = useState<string | AliveEvent | null>(null);
    const router = useRouter();
    const [date, setDate] = useState<string | null>(null);
    const [id, setId] = useState<number | null>(null);
    const [matchedID, setMatchedID] = useState<number | null>(null);
    const [backup, setBackup] = useState<string | null>(null);
    const [serial, setSerial] = useState<string | null>(null);
    const [gridApi, setGridApi] = useState<GridApi | null>(null);
    const [isAliveEvent, setIsAliveEvent] = useState<boolean>(false);
    const [eventString, setEventString] = useState<string | null>(null);

    const { data: aliveEvent, isSuccess: isSuccessAliveEvent } = useQueryEventsFromAlive(isAliveEvent);

    useAliveEvent(
        isSuccessAliveEvent,
        isAliveEvent,
        aliveEvent as AliveEvent[],
        eventString,
        setDialogContent,
        setIsDialogOpen,
        setIsAliveEvent
    );

    useEffect(() => {
        if (router) {
            const queryParams = new URLSearchParams(window.location.search);
            const dateParam = queryParams.get('date');
            const idParam = queryParams.get('id');
            const backupParam = queryParams.get('backup');
            const serialParam = queryParams.get('serial');
            setDate(dateParam);
            setId(Number(idParam));
            setBackup(backupParam);
            setSerial(serialParam);
        }
    }, [router]);

    useEffect(() => {
    }, [date, id, backup, serial]);

    const {isLoading, isError, data, error, isSuccess} = useQuery({
        queryKey: ['eventsFromDataByDate', serial, backup, date],
        queryFn: () => apiGetEventsByDate(serial ?? '', backup ?? '', date ?? ''),
        enabled: !!serial && !!backup && !!date,
    });

    useEffect(() => {
        if (isLoading)
            setLoading(true);

        if (isError)
            console.error(error);

        if (isSuccess && Array.isArray(data)) {
            const rows = getRowsMap(data);
            const findID = id !== null ? rows.findIndex((row: LogEventData) => Number(row.ID) === id) : -1;
            setMatchedID(Number(findID));
            setLogData(rows);
            setLoading(false);
        }
    }, [isLoading, isError, data, error, isSuccess, id, setMatchedID]);

    const colDefsBase: ColDef<LogEventData>[] = useMemo(() => [
        { headerName: 'Data', field: 'DataOraR', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: false, floatingFilter: false, suppressHeaderFilterButton: true, suppressFloatingFilterButton: true },
        { headerName: 'Time', field: 'Time', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: false, floatingFilter: true, suppressHeaderFilterButton: true, suppressFloatingFilterButton: true },
        { headerName: 'Evento', field: 'EventString', flex: 2, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: false, floatingFilter: true, suppressHeaderFilterButton: true, suppressFloatingFilterButton: true },
        { headerName: 'Stato', field: 'State', flex: 1, minWidth: 80, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: false, floatingFilter: true, suppressHeaderFilterButton: true, suppressFloatingFilterButton: true },
        { headerName: 'Producer', field: 'DevProducer', flex: 2, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: false, floatingFilter: true, suppressHeaderFilterButton: true, suppressFloatingFilterButton: true },
        { headerName: 'Dev', field: 'DevIndex', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: false, floatingFilter: true, suppressHeaderFilterButton: true, suppressFloatingFilterButton: true },
        { headerName: 'Sub', field: 'SubIndex', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: false, floatingFilter: true, suppressHeaderFilterButton: true, suppressFloatingFilterButton: true },
        { headerName: 'T1', field: 'Tag1', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: false, floatingFilter: true, suppressHeaderFilterButton: true, suppressFloatingFilterButton: true },
        { headerName: 'T2', field: 'Tag2', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: false, floatingFilter: true, suppressHeaderFilterButton: true, suppressFloatingFilterButton: true },
        { headerName: 'T3', field: 'Tag3', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: false, floatingFilter: true, suppressHeaderFilterButton: true, suppressFloatingFilterButton: true },
        { headerName: 'T4', field: 'Tag4', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: false, floatingFilter: true, suppressHeaderFilterButton: true, suppressFloatingFilterButton: true },
        { headerName: 'Fase', field: 'Fase', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: false, floatingFilter: true, suppressHeaderFilterButton: true, suppressFloatingFilterButton: true },
        { headerName: 'Tag Data', field: 'TagData', flex: 2, minWidth: 140, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: false, floatingFilter: true, suppressHeaderFilterButton: true, suppressFloatingFilterButton: true },
    ], []);

    const onCellDoubleClicked = useCallback((event: CellDoubleClickedEvent) => {
        if (event.colDef.field === 'TagData') {
            const textValue = event.data.EventString;
            if (
                textValue.includes("EV_PAX_PAYMENT") ||
                textValue.includes("EV_ING_PAYMENT") ||
                textValue.includes("EV_MRPAY_EXECUTERECHARGE") ||
                textValue.includes("EV_SWEXC")
            ) {
                setIsDialogOpen(true);
                setDialogContent(event.data.TagData);
            }
        } else if (event.colDef.field === 'EventString') {
            setEventString(event.data.EventString);
            setIsAliveEvent(true);
        }
    }, []);

    const onGridReady = useCallback((params: GridReadyEvent) => {
        setGridApi(params.api);
    }, []);

    const onFirstDataRendered = useCallback(() => {
        if ( gridApi && matchedID !== null) {
            gridApi.ensureIndexVisible(Number(matchedID), 'top');
        }
    }, [matchedID,gridApi]);

    if ((data as ErrorResponse)?.error) {
        return <p>Something wrong</p>
    }

    return (
        <div className="h-screen">
            <Dialog
                isDialogOpen={isDialogOpen}
                setIsDialogOpen={setIsDialogOpen}
                dialogContent={dialogContent}
            />
            <div className="h-full">
                <div className={"w-full h-full"}>
                    <AgGridReact<LogEventData>
                        theme={theme}
                        loading={loading}
                        rowData={logData}
                        columnDefs={colDefsBase}
                        onCellDoubleClicked={onCellDoubleClicked}
                        rowClassRules={eventsRowStyles}
                        onGridReady={onGridReady}
                        onFirstDataRendered={onFirstDataRendered}
                    />
                </div>
            </div>
        </div>
    );
}

export default Extract;