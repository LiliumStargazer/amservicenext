import React, {useContext, useMemo, useCallback, } from "react";
import {Context} from "@/app/Context";
import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { getRowStyle, formatStringData, convertT1, convertT2, convertT4, convertTagData} from "./formatLogTable.js";
import {convertToState, convertToDevType, convertToFase} from "./states";

function LogMasterGrid() {
    const { logDaMaster, searchValue, setGridApi } = useContext(Context);
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({height: window.innerHeight-100, width: '100%' }), []);
    const getRowStyleCallback = useCallback(getRowStyle, []);


    const onGridReady = (params) => {
        setGridApi(params.api);

    };

    const filterDateParam = {
        comparator: (filterLocalDateAtMidnight, cellValue) => {
            const dateAsString = cellValue;
            if (dateAsString == null) return -1;
            const dateParts = dateAsString.split('/');
            const cellDate = new Date(
                Number(dateParts[2]),
                Number(dateParts[1]) - 1,
                Number(dateParts[0])
            );
            if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
                return 0;
            }
            if (cellDate < filterLocalDateAtMidnight) {
                return -1;
            }
            if (cellDate > filterLocalDateAtMidnight) {
                return 1;
            }
            return 0;
        },
    };

    const rows = useMemo(() => {
        if (logDaMaster && logDaMaster.length > 0) {
            return logDaMaster.map((rowLogDaMaster, rowIndex) => {
                const formattedDate = formatStringData(rowLogDaMaster.DataOraR);
                const convertedState = convertToState(parseInt(rowLogDaMaster.State));
                const convertedDevType = convertToDevType(parseInt(rowLogDaMaster.DevProducer));
                const convertedFase = convertToFase(parseInt(rowLogDaMaster.Fase))
                const time = rowLogDaMaster.DataOraR.slice(11);
                const convertedT1 = convertT1(rowLogDaMaster.EventString, rowLogDaMaster.Tag1);
                const convertedT2 = convertT2(rowLogDaMaster.EventString, rowLogDaMaster.Tag2);
                const convertedT4 = convertT4(rowLogDaMaster.EventString, rowLogDaMaster.Tag4);
                const convertedTagData = convertTagData(rowLogDaMaster.EventString, rowLogDaMaster.TagData,
                    rowLogDaMaster.Tag1, rowLogDaMaster.Tag2, rowLogDaMaster.Tag3);
                return {
                    IDR: rowIndex,
                    Data: formattedDate,
                    EventString: rowLogDaMaster.EventString,
                    Stato: convertedState,
                    DevProducer: convertedDevType,
                    DevIndex: rowLogDaMaster.DevIndex,
                    SubIndex: rowLogDaMaster.SubIndex,
                    DevClass: rowLogDaMaster.DevClass,
                    T1: convertedT1,
                    Tag2: convertedT2,
                    Tag3: rowLogDaMaster.Tag3,
                    Tag4: convertedT4.value,
                    Fase: convertedFase,
                    TagData: convertedTagData,
                    Time: time,
                };
            });
        } else {
            return [];
        }
    }, [logDaMaster]);

    const getRowIds = useCallback((params) => {
        return params.data.IDR;
    }, []);

    const getRowHeight = useCallback((params) => {
        if (params.data.EventString === "EV_PAX_PAYMENT" || params.data.EventString === "EV_ING_PAYMENT" )
            return 52*(params.data.TagData.trim().length/90);

        if ( params.data.EventString === "EV_MRPAY_EXECUTERECHARGE" && params.data.TagData.length > 90 )
            return (50) *(params.data.TagData.trim().length/90);

        return 35;
    }, []);

    const options = useMemo(() => ({
        cacheQuickFilter: true,
        rowBuffer: 400,
        getRowHeight: getRowHeight,
        defaultColDef: {cellStyle: {textAlign: 'left'},},
        pagination: true,
        paginationPageSizeSelector: [100, 200, 500],
        paginationPageSize: 100,
        getRowId: getRowIds,
        getRowStyle: getRowStyleCallback,
    }), []);

    const handleEventSelection = useCallback((rowObject) => {
        const filteredRows = rows.filter(row => row.Data === rowObject.Data);
        filteredRows.reverse();
        localStorage.setItem('rowID', JSON.stringify(rowObject.IDR));
        localStorage.setItem('extractedData', JSON.stringify(filteredRows));
        const url = `/extracted?`;
        window.open(url, '_blank');
    }, [rows]);

    const ButtonRenderer = useMemo(() => {
        return ({ data }) => {
            return <button className="btn btn-ghost btn-xs" onClick={() => handleEventSelection(data)} >Extract</button>;
        };
    }, [handleEventSelection]);

    const colDefs = useMemo(() => [
        { headerName: 'ID', field: 'IDR', width: 80, cellStyle: {whiteSpace: 'nowrap'}, filter: false ,  sortable: false},
        { headerName: 'Data', field: 'Data', width: 110, cellStyle: { whiteSpace: 'nowrap' }, filter: 'agDateColumnFilter',
            filterParams: filterDateParam, sortable: false},
        { headerName: 'Time', field: 'Time', width: 100, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: false },
        { headerName: 'Evento', field: 'EventString', width: 220, cellStyle: { whiteSpace: 'nowrap' }, filter: true , sortable: false},
        { headerName: 'Stato', field: 'Stato', width: 85 ,cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: false },
        { headerName: 'Producer', field: 'DevProducer', width: 150, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: false },
        { headerName: 'Dev', field: 'DevIndex', width: 80, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: false },
        { headerName: 'Sub', field: 'SubIndex',width: 80, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: false },
        { headerName: 'T1', field: 'T1', width: 90, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: false },
        { headerName: 'T2', field: 'Tag2', width: 80, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: false },
        { headerName: 'T3', field: 'Tag3', width: 80, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: false },
        { headerName: 'T4', field: 'Tag4', width: 90, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: false },
        { headerName: 'Fase', field: 'Fase', width: 130, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: false },
        { headerName: 'TagData', field: 'TagData', flex: 2, wrapText: true,  sortable: false },
        { headerName: 'Action', field:'ID', width: 100, cellRenderer:ButtonRenderer}
    ],[]);

    if (!logDaMaster || logDaMaster.length === 0 ) {
        return null;
    }

    return (
        <div style={containerStyle}>
            <div
                className={"ag-theme-quartz-dark"}
                style={gridStyle}
            >
                <AgGridReact
                    rowData={rows}
                    columnDefs={colDefs}
                    gridOptions={options}
                    quickFilterText={searchValue}
                    onGridReady={onGridReady}
                />
            </div>
        </div>
    )
}
export default LogMasterGrid;
