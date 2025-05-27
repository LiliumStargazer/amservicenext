'use client'
import React, {useCallback, useEffect, useMemo, useState} from "react";
import "@/app/styles/gridStyle.css";
import Dialog from "@/app/components/dashboard/Dialog";
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
import {getRowsMap} from "@/app/utils/events-mapper";
import {AliveEvent, ErrorResponse, LogEventData} from "@/app/types/types";
import { useGetAliveEventsCorsHandlingMutation, useGetEventsByDateMutation } from "@/app/hooks/useMutations";

ModuleRegistry.registerModules([ClientSideRowModelModule, RowStyleModule, ValidationModule, CellStyleModule,TextFilterModule, NumberFilterModule, ScrollApiModule]);

const theme = (themeQuartz.withPart(colorSchemeDarkBlue)).withParams({
    spacing: 3,
    wrapperBorderRadius: 4,
    fontSize: 12,
    inputBorder: '1px',
    headerHeight: 40,
})

function Extract() {
    const [logData, setLogData] = useState<LogEventData[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [dialogContent, setDialogContent] = useState<string | AliveEvent | null>(null);
    const router = useRouter();
    const [id, setId] = useState<number | null>(null);
    const [matchedID, setMatchedID] = useState<number | null>(null);
    const [gridApi, setGridApi] = useState<GridApi | null>(null);
    const { trigger: triggerAliveEvents, data: dataAliveEvents } = useGetAliveEventsCorsHandlingMutation();
    const { trigger: triggerGetEventsByDate, error, data: dataGetEventsByDate, isMutating: isMutatingGetEventsByDate } = useGetEventsByDateMutation();


    useEffect(() => {
        if (dataGetEventsByDate && Array.isArray(dataGetEventsByDate)) {
            const rows = getRowsMap(dataGetEventsByDate);
            const findID = rows.findIndex((row: LogEventData) => Number(row.ID) === id);
            setMatchedID(Number(findID));
            setLogData(rows);
        }
    }, [dataGetEventsByDate, id]);

    useEffect(() => {
        const triggerFetchEvents = async ( serial: string, backup: string, date: string) => {
            if (serial && id !== null) {
                await triggerGetEventsByDate({ serial, backup, date });
            }
        };
        if (router) {
            const queryParams = new URLSearchParams(window.location.search);
            const date = queryParams.get('date');
            const idParam = queryParams.get('id');
            const backup = queryParams.get('backup');
            const serial = queryParams.get('serial');
            setId(Number(idParam));
            if (!serial || !backup || !date) {
                return;
            }
            triggerFetchEvents(serial, backup, date);
        }
    }, [id, router, triggerGetEventsByDate]);

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

    const onCellDoubleClicked = useCallback(async (event: CellDoubleClickedEvent) => {
                if (event.colDef.field === 'EventString') {
                    try {
                        await triggerAliveEvents();
                        if (Array.isArray(dataAliveEvents)) {
                            const matchedEvent = dataAliveEvents.find(
                                (aliveEvent: AliveEvent) => aliveEvent.EventString === event.value
                            );
                            if (!matchedEvent) {
                                return;
                            }
                            setDialogContent(matchedEvent);
                            setIsDialogOpen(true);
                        }
                    } catch (error) {
                        console.log("Error fetching alive events:", error);
                    }
                }           
                if (event.colDef.field === 'TagData') {
                    setDialogContent(event.data.TagData);
                    setIsDialogOpen(true);
                }
    }, [dataAliveEvents, triggerAliveEvents]);

    const onGridReady = useCallback((params: GridReadyEvent) => {
        setGridApi(params.api);
    }, []);

    const onFirstDataRendered = useCallback(() => {
        if ( gridApi && matchedID !== null) {
            gridApi.ensureIndexVisible(Number(matchedID), 'top');
        }
    }, [matchedID,gridApi]);

    if ((error as ErrorResponse)?.error) {
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
                        loading={isMutatingGetEventsByDate}
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