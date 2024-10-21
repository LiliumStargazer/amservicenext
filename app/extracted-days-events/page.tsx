'use client'
import React, {useCallback, useEffect, useMemo, useState} from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "@/src/client/styles/gridStyle.css";
import Dialog from "@/src/client/components/log/Dialog";
import { FirstDataRenderedEvent, GridReadyEvent, CellClickedEvent, CellDoubleClickedEvent, ColDef } from "ag-grid-community";
import {AgGridReact} from "ag-grid-react";
import useStore from "@/app/store";
import {rowClassRules} from "@/src/client/utils/rowClassRules";
import {handleTagData} from "@/src/client/styles/handleTagData";

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
    const [extractedData, setExtractedData] = useState<any[]>([]);
    const [extractedID, setExtractedID] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [logData, setLogData] = useState<RowData[]>([]);
    const serial = useStore(state => state.serial);
    const setIsDialogOpen = useStore(state => state.setIsDialogOpen);
    const setDialogContent = useStore(state => state.setDialogContent);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('extractedData') || '[]');
        const id = JSON.parse(localStorage.getItem('rowID') || '0');
        console.log(serial);
        console.log('id', id);
        setExtractedData(data);
        setExtractedID(id);
    }, []);

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
        { headerName: 'Time', field: 'Time', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: false, floatingFilter: true, suppressHeaderFilterButton: true },
        { headerName: 'Evento', field: 'EventString', flex: 2, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: false, floatingFilter: true, suppressHeaderFilterButton: true },
        { headerName: 'Stato', field: 'State', flex: 1, minWidth: 80, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: false, floatingFilter: true, suppressHeaderFilterButton: true },
        { headerName: 'Producer', field: 'DevProducer', flex: 2, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: false, floatingFilter: true, suppressHeaderFilterButton: true },
        { headerName: 'Dev', field: 'DevIndex', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: false, floatingFilter: true, suppressHeaderFilterButton: true },
        { headerName: 'Sub', field: 'SubIndex', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: false, floatingFilter: true, suppressHeaderFilterButton: true },
        { headerName: 'T1', field: 'Tag1', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: false, floatingFilter: true, suppressHeaderFilterButton: true },
        { headerName: 'T2', field: 'Tag2', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: false, floatingFilter: true, suppressHeaderFilterButton: true },
        { headerName: 'T3', field: 'Tag3', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: false, floatingFilter: true, suppressHeaderFilterButton: true },
        { headerName: 'T4', field: 'Tag4', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: false, floatingFilter: true, suppressHeaderFilterButton: true },
        { headerName: 'Fase', field: 'Fase', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: false, floatingFilter: true, suppressHeaderFilterButton: true },
        { headerName: 'Tag Data', field: 'TagData', flex: 2, minWidth: 140, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: false, floatingFilter: true, suppressHeaderFilterButton: true },
    ], []);

    const onCellClicked = useCallback((event: CellClickedEvent) => {
        handleTagData(event, setIsDialogOpen, setDialogContent);
    }, [logData, setIsDialogOpen, setDialogContent]);

    const onCellDoubleClicked = useCallback((event: CellDoubleClickedEvent) => {
        handleTagData(event, setIsDialogOpen, setDialogContent);
    }, [setDialogContent, setIsDialogOpen]);

    const onGridReady = useCallback((params: GridReadyEvent) => {
        setLogData(extractedData);
        setLoading(false);
    }, [extractedData]);

    const onFirstDataRendered = useCallback((event: FirstDataRenderedEvent) => {
        event.api.ensureIndexVisible(extractedID, 'top');
    }, [extractedID]);

    return (
        <div className="h-screen">
            <Dialog/>
            <div className="h-full">
                <div className={"ag-theme-quartz-dark compact w-full h-full"}>
                    <AgGridReact<RowData>
                        loading={loading}
                        rowData={logData}
                        columnDefs={colDefsBase}
                        onCellClicked={onCellClicked}
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