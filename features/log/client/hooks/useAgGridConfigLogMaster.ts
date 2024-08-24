import { useCallback, useMemo } from "react";
import useStore from "@/app/store";
import { getEventsAliveViaSrv } from "@/features/shared/client/api";
import {
    CellClickedEvent,
    CellDoubleClickedEvent,
    ColDef,
} from "ag-grid-community";
import {
    filterParams,
    getRowStyle,
    handleExtractClick,
    matchLogEventWithAliveEvents
} from "@/features/log/client/utils/aggrid-helper";

interface UseAgGridConfigLogMasterProps {
    rows: any[];
    getRowIds: (params: any) => string;
    isExtracted?: boolean;
}


export function useAgGridConfigLogMaster({ rows, getRowIds, isExtracted = false }: UseAgGridConfigLogMasterProps) {
    const getRowStyleCallback = useCallback(getRowStyle, []);
    const setIsDialogOpen = useStore(state => state.setIsDialogOpen);
    const setDialogContent = useStore(state => state.setDialogContent);

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
    ], []);

    const colDefs: ColDef[] = useMemo(() => {
        let newColDefs: ColDef[] = [...colDefsBase];

        if (!isExtracted) {
            newColDefs.push({
                headerName: 'Action',
                field: 'ID',
                flex: 1,
                minWidth: 90,
                sortable: false,
                cellStyle: { whiteSpace: 'nowrap' },
                filter: 'none',
                valueGetter: () => 'Extract' // Fixed value for the "Action" column
            });
        }
        return newColDefs;
    }, [colDefsBase, isExtracted, rows]);


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
    }, [rows]);

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

    const options = useMemo(() => {
        if (!isExtracted) {
            return {
                ...baseOptions,
            }
        } else {
            return {
                ...baseOptions,
                rowModelType: 'clientSide',
            }
        }
    }, [isExtracted, baseOptions]);

    return { colDefs, options };
}