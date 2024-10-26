'use client'
import React, {useCallback, useEffect, useMemo, useState} from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "@/src/client/styles/gridStyle.css";
import Dialog from "@/src/client/components/log/Dialog";
import { FirstDataRenderedEvent, GridReadyEvent, CellDoubleClickedEvent, ColDef } from "ag-grid-community";
import {AgGridReact} from "ag-grid-react";
import useStore from "@/app/store";
import {rowClassRules} from "@/src/client/utils/rowClassRules";
import {handleTagData} from "@/src/client/utils/handleTagData";
import { useRouter } from "next/navigation";
import {useQuery} from "@tanstack/react-query";
import {apiGetEventsByDate} from "@/src/client/api/api";
import {getRowsMap} from "@/src/client/utils/getRowMap";

interface RowData {
    IDR: string;
    DataOraR: string;
    EventString: string;
    State: string;
    DevProducer: string;
    DevIndex: string;
    SubIndex: string;
    Tag1: string;
    Tag2: string;
    Tag3: string;
    Tag4: string;
    Fase: string;
    TagData: string;
    Time: string;
}

function Extract() {
    const [loading, setLoading] = useState<boolean>(true);
    const [logData, setLogData] = useState<RowData[]>([]);
    const setIsDialogOpen = useStore(state => state.setIsDialogOpen);
    const setDialogContent = useStore(state => state.setDialogContent);

    const router = useRouter();
    const [date, setDate] = useState<string | null>(null);
    const [id, setId] = useState<Number | null>(null);
    const [matchedID, setMatchedID] = useState<Number | null>(null);
    const [backup, setBackup] = useState<string | null>(null);
    const [serial, setSerial] = useState<string | null>(null);
    const [gridApi, setGridApi] = useState<any>(null);

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
        console.log('State updated:', { date, id, backup, serial });
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

        if (isSuccess && data) {
            const rows = getRowsMap(data);
            console.log(rows);

            const findID = id !== null ? rows.findIndex((row: any) => row.ID === id.toString()) : -1;
            setMatchedID(Number(findID));
            setLogData(rows);
            setLoading(false);
        }
    }, [isLoading, isError, data, error, isSuccess, id, setMatchedID]);


    const colDefsBase: ColDef<RowData>[] = useMemo(() => [
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
        handleTagData(event, setIsDialogOpen, setDialogContent);
    }, [setDialogContent, setIsDialogOpen]);

    const onGridReady = useCallback((params: GridReadyEvent) => {
        setGridApi(params.api);
    }, [matchedID]);

    const onFirstDataRendered = useCallback((event: FirstDataRenderedEvent) => {
        if ( gridApi && matchedID !== null) {
            gridApi.ensureIndexVisible(Number(matchedID), 'top');
        }
    }, [matchedID,gridApi]);

    return (
        <div className="h-screen">
            <Dialog/>
            <div className="h-full">
                <div className={"ag-theme-quartz-dark compact w-full h-full"}>
                    <AgGridReact<RowData>
                        loading={loading}
                        rowData={logData}
                        columnDefs={colDefsBase}
                        onCellDoubleClicked={onCellDoubleClicked}
                        rowClassRules={rowClassRules}
                        onGridReady={onGridReady}
                        onFirstDataRendered={onFirstDataRendered}
                    />
                </div>
            </div>
        </div>
    );
}

export default Extract;