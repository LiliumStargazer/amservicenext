import {useCallback, useMemo} from "react";
import Button from "@/components/button";
import {filterParams, getRowStyle, tagDataCellRenderer} from "@/lib/aggrid-helper";
import ButtonDialog from "@/components/button-dialog";


export function useAgGridConfig( rows, getRowIds, isExtracted = false) {
    const getRowStyleCallback = useCallback(getRowStyle, []);

    const colDefsBase = useMemo(() => [
            { headerName: 'ID', field: 'IDR', flex: 1, maxWidth: 70, cellStyle: { whiteSpace: 'nowrap' }, filter: false, sortable: false },
            { headerName: 'Data', field: 'DataOraR', flex: 1, minWidth: 140, cellStyle: { whiteSpace: 'nowrap' }, filter: 'agDateColumnFilter', sortable: false, filterParams: filterParams, suppressHeaderMenuButton: true },
            { headerName: 'Time', field: 'Time', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: false, sortable: false },
            { headerName: 'Evento', field: 'EventString', flex: 2, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: false, floatingFilter: false, cellRenderer: (params) => {
                    return ( <ButtonDialog rowEvent={params.value } type={"event"} /> ) ;
                }
            },
            { headerName: 'Stato', field: 'State', flex: 1, maxWidth: 80, cellStyle: { whiteSpace: 'nowrap' }, filter: false, sortable: false, floatingFilter: false },
            { headerName: 'Producer', field: 'DevProducer', flex: 2, cellStyle: { whiteSpace: 'nowrap' }, filter: false, sortable: false, floatingFilter: false },
            { headerName: 'Dev', field: 'DevIndex', flex: 1, maxWidth: 75, cellStyle: { whiteSpace: 'nowrap' }, filter: false, sortable: false, floatingFilter: false },
            { headerName: 'Sub', field: 'SubIndex', flex: 1, maxWidth: 75, cellStyle: { whiteSpace: 'nowrap' }, filter: false, sortable: false, floatingFilter: false },
            { headerName: 'T1', field: 'Tag1', flex: 1, maxWidth: 75, cellStyle: { whiteSpace: 'nowrap' }, filter: false, sortable: false, floatingFilter: false },
            { headerName: 'T2', field: 'Tag2', flex: 1, maxWidth: 75, cellStyle: { whiteSpace: 'nowrap' }, filter: false, sortable: false, floatingFilter: false },
            { headerName: 'T3', field: 'Tag3', flex: 1, maxWidth: 75, cellStyle: { whiteSpace: 'nowrap' }, filter: false, sortable: false, floatingFilter: false },
            { headerName: 'T4', field: 'Tag4', flex: 1, maxWidth: 75, cellStyle: { whiteSpace: 'nowrap' }, filter: false, sortable: false, floatingFilter: false },
            { headerName: 'Fase', field: 'Fase', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: false, sortable: false, floatingFilter: false },
            { headerName: 'Tag Data', field: 'TagData', flex: 2, cellStyle: { whiteSpace: 'nowrap' }, filter: false, sortable: false, floatingFilter: false, cellRenderer: (props) => { return tagDataCellRenderer(props)} },
        ], []);

    const colDefs = useMemo(() => {
        let newColDefs = [...colDefsBase];
        if (!isExtracted) {
            newColDefs.push({ headerName: 'Action', field: 'ID', flex: 1, minWidth: 90, sortable: false,
                cellRenderer: (props) => { return ( <Button className="btn btn-ghost btn-xs" rows={rows} props={props} text={"Extract"} /> ) }, filter: false, floatingFilter: false }
            );
        }
        return newColDefs;
    },[colDefsBase, isExtracted, rows]);

    const baseOptions = useMemo(() => ({
        animateRows: false,
        cacheQuickFilter: true,
        rowBuffer: 400,
        defaultColDef: { cellStyle: { textAlign: 'left' } },
        getRowId: getRowIds,
        rowStyle: { fontSize: '12px', margin: '0px', padding: '0px' },
        rowHeight: 30,
        getRowStyle: getRowStyleCallback,
        headerHeight: 30,
        pagination: true,
        paginationPageSizeSelector: [100, 200, 500],
        paginationPageSize: 100,
    }), [getRowIds, getRowStyleCallback]);

    const options = useMemo(() => {
        if (!isExtracted) {
            return {
                ...baseOptions,
            }
        }
        else {
            return {
                ...baseOptions,
                rowModelType: 'clientSide',
            }
        }
    }, [isExtracted, baseOptions]);

    return { colDefs, options };
}
