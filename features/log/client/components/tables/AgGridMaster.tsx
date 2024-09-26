import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import useStore from "@/app/store";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";

import "@/features/shared/client/style/gridStyle.css";
import {useAgGridConfigLogMaster} from "@/features/log/client/hooks/useAgGridConfigLogMaster";
import {GridApi, GridReadyEvent} from "ag-grid-community";
import {
    convertT1,
    convertT2,
    convertT4, convertTagData,
    defaultColDef, filterParams, getRowStyle, handleExtractClick,
    matchLogEventWithAliveEvents
} from "@/features/log/client/utils/aggrid-helper";
import AgGrid from "@/features/shared/client/components/AgGrid";
import {getBackupDataFromServer, getEventsAliveViaSrv} from "@/features/shared/client/api";
import {
    formatStringDateOrder,

} from "@/features/shared/client/utils/utils";
import LottieAnimation from "lottie-react";
import useWindowSize from "@/features/shared/client/hooks/useWindowSize";
import loading_lottie from "@/public/loading_lottie.json";
import {convertToDevType, convertToFase, convertToState} from "@/features/log/client/utils/event-converter";



const AgGridMaster: React.FC = () => {

    const searchValue = useStore(state => state.searchValue);
    const setGridApi = useStore(state => state.setGridApi);
    const gridApiRef = useRef<GridApi | null>(null);
    const [loading, setLoading] = useState(false);
    //const [logDaMaster, setLogDaMaster] = useState([]);
    const [rowData, setRowData] = useState<any[]>([]);
    const storedSerial = useStore(state => state.storedSerial);
    const setMessage = useStore(state => state.setMessage);
    const latestBackup = useStore(state => state.latestBackup);
    const backupSelected = useStore(state => state.backupSelected);
    const getRowStyleCallback = useCallback(getRowStyle, []);
    const setIsDialogOpen = useStore(state => state.setIsDialogOpen);
    const setDialogContent = useStore(state => state.setDialogContent);
    const { height: windowHeight } = useWindowSize();
    const height = Number.isFinite(windowHeight) ? windowHeight : 0;

    const containerStyle = useMemo(() => {
        const validHeight = typeof height === 'number' ? height - (height * 0.2) : 'auto';
        return { width: '100%', height: validHeight };
    }, [height]);

    const colDefsBase = useMemo(() => [
        { headerName: 'ID', field: 'IDR', flex: 1, maxWidth: 70, cellStyle: { whiteSpace: 'nowrap' }, filter: false, sortable: false },
        { headerName: 'Data', field: 'DataOraR', flex: 1, minWidth: 140, cellStyle: { whiteSpace: 'nowrap' }, filter: 'agDateColumnFilter', sortable: false, filterParams: filterParams, suppressHeaderMenuButton: true },
        { headerName: 'Time', field: 'Time', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: false, sortable: false },
        { headerName: 'Evento', field: 'EventString', flex: 2, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: false, floatingFilter: false },
        { headerName: 'Stato', field: 'State', flex: 1, minWidth: 80, cellStyle: { whiteSpace: 'nowrap' }, filter: false, sortable: false, floatingFilter: false },
        { headerName: 'Producer', field: 'DevProducer', flex: 2, cellStyle: { whiteSpace: 'nowrap' }, filter: false, sortable: false, floatingFilter: false },
        { headerName: 'Dev', field: 'DevIndex', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: false, sortable: false, floatingFilter: false },
        { headerName: 'Sub', field: 'SubIndex', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: false, sortable: false, floatingFilter: false },
        { headerName: 'T1', field: 'Tag1', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: false, sortable: false, floatingFilter: false },
        { headerName: 'T2', field: 'Tag2', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: false, sortable: false, floatingFilter: false },
        { headerName: 'T3', field: 'Tag3', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: false, sortable: false, floatingFilter: false },
        { headerName: 'T4', field: 'Tag4', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: false, sortable: false, floatingFilter: false },
        { headerName: 'Fase', field: 'Fase', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: false, sortable: false, floatingFilter: false },
        { headerName: 'Tag Data', field: 'TagData', flex: 2, minWidth: 140, cellStyle: { whiteSpace: 'nowrap' }, filter: false, sortable: false, floatingFilter: false},
        { headerName: 'Action', field: 'ID', flex: 1, minWidth: 90, sortable: false, cellStyle: { whiteSpace: 'nowrap' }, filter: 'none', valueGetter: () => 'Extract' },
    ], []);

    function handleExtractClick(rows: LogRow[], props: { data: LogRow }): void {
        const filteredRows = rows.filter(row => row.DataOraR === props.data.DataOraR);
        localStorage.setItem('rowID', JSON.stringify(props.data.IDR));
        localStorage.setItem('extractedData', JSON.stringify(filteredRows));
        const url = `/extracted?`;
        window.open(url, '_blank');
    }


    const onCellClicked = useCallback((event: CellClickedEvent)=> {
        if (event.colDef.field === 'ID') {
            handleExtractClick(rows, event.node);
        }

        if (event.colDef.field === 'TagData') {
            const textValue = event.data.EventString;
            if (textValue.includes("EV_PAX_PAYMENT") || textValue.includes("EV_ING_PAYMENT")
                || textValue.includes("EV_MRPAY_EXECUTERECHARGE")
                || textValue.includes("EV_SWEXC")) {
                setIsDialogOpen(true);
                setDialogContent(event.data.TagData);
            }
        }
    }, [rows]);

    const onCellDoubleClicked = useCallback((event: CellDoubleClickedEvent) => {
        if (event.colDef.field === 'EventString') {
            const fetchData = async () => {
                try {
                    const rowEvent = event.data.EventString;
                    const data = await getEventsAliveViaSrv();
                    const matchedEvent = matchLogEventWithAliveEvents(data, rowEvent);
                    if (matchedEvent) {
                        setDialogContent(matchedEvent);
                        setIsDialogOpen(true);
                    } else {
                        console.error('matchedEvent is undefined or null');
                    }
                } catch (error) {
                    console.error(error);
                }
            };
            fetchData().catch(error => console.error(error));
        }
    }, []);


    const getRowIds = useCallback((params: { data: { IDR: string } }) => {
        return String( params.data.IDR ) ;
    }, []);

    const baseOptions = useMemo(() => ({
        onCellClicked: onCellClicked,
        onCellDoubleClicked: onCellDoubleClicked,
        animateRows: false,
        cacheQuickFilter: true,
        rowBuffer: 100,
        defaultColDef: { cellStyle: { textAlign: 'left' } },
        getRowId: getRowIds,
        rowStyle: { fontSize: '12px', margin: '0px', padding: '0px' },
        rowHeight: 30,
        getRowStyle: getRowStyleCallback,
        headerHeight: 30,
        pagination: true,
        paginationPageSizeSelector: [100, 200, 500],
        paginationPageSize: 500,
    }), [getRowIds, getRowStyleCallback]);

    // spostamento della logica e delle chiamate nei singoli componenti
    useEffect(() => {
        const fetchData = async () => {
            if (!storedSerial || storedSerial.length === 0 || !latestBackup || latestBackup.length === 0)
                return;

            try {
                setLoading(true);
                //se il backup non è selezionato deve prendere l'ultimo.
                const backupData = await getBackupDataFromServer(storedSerial, backupSelected ? backupSelected : latestBackup);
                // Handle errors or empty backup data
                if (backupData.error) {
                    setMessage("Database corrupted: " + backupData.error);
                    return;
                }

                if (!backupData || backupData.length === 0)
                    return;

                const rows = Object.entries(backupData).map(([value, rowIndex]) => ({
                    IDR: rowIndex,
                    DataOraR: formatStringDateOrder((value as any).DataOraR),
                    EventString: (value as any).EventString,
                    State: convertToState(parseInt((value as any).State)),
                    DevProducer: convertToDevType(parseInt((value as any).DevProducer ? value.(value as any).DevProducer : (value as any).DevId)),
                    DevIndex: (value as any).DevIndex ? (value as any).DevIndex : (value as any).RelIndex,
                    SubIndex: (value as any).SubIndex,
                    DevClass: (value as any).DevClass,
                    Tag1: convertT1((value as any).EventString, (value as any).Tag1),
                    Tag2: convertT2((value as any).EventString, (value as any).Tag2),
                    Tag3: (value as any).Tag3,
                    Tag4: convertT4((value as any).EventString, (value as any).Tag4).value,
                    Fase: convertToFase(parseInt((value as any).Fase)),
                    TagData: convertTagData((value as any).EventString, (value as any).TagData, (value as any).Tag1, (value as any).Tag2, (value as any).Tag3),
                    Time: (value as any).DataOraR.slice(11),
                }));
                setRowData(rows);
                //setLogDaMaster(map);
                setMessage('');
            } catch (error) {
                console.error('Error while downloading backup:', error);
                setMessage("An error occurred while downloading the backup.");
            } finally {
                setLoading(false);
            }
        }
        fetchData().catch(err => console.error('Error in fetchData:', err));
    }, [storedSerial, latestBackup]);

    const onGridReady = useCallback((params: GridReadyEvent) => {
        gridApiRef.current = params.api;
        setGridApi(params.api); // Optionally, store globally if needed
        params.api.paginationGoToLastPage();
    }, [setGridApi]);

    useEffect(() => {
        if (!searchValue && gridApiRef.current) {
            if (!gridApiRef.current.isDestroyed()) {
                gridApiRef.current.paginationGoToLastPage();
            }
        }
    }, [searchValue]);

    if (loading || rowData.length === 0) {
        return (
            <div className="flex justify-center items-center h-screen" style={containerStyle}>
                <div>
                    <LottieAnimation
                        animationData={loading_lottie}
                        loop
                        autoPlay
                        style={{ width: 400, height: 400 }}
                    />
                </div>
            </div>
        );
    }
    return (
        <AgGrid
            rows={rowData}
            colDefs={colDefsBase}
            options={baseOptions}
            quickFilterText={searchValue}
            defaultColDef={defaultColDef}
            onGridReady={onGridReady}
        />
    );
}

export default AgGridMaster;