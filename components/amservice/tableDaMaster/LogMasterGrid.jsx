import React, {useContext, useMemo, useCallback, useEffect, useRef,} from "react";
import {Context} from "@/app/Context";
import { AgGridReact } from 'ag-grid-react'; // AG Grid Component

import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import {
    convertT1,
    convertT2,
    convertT4,
    convertTagData,
    formatStringData,
    getRowStyle,
    TagDataCellRenderer
} from "@/lib/formatLogTable";
import {convertToDevType, convertToFase, convertToState} from "@/lib/states";
import ButtonExtract from "@/components/amservice/tableDaMaster/buttonExtract";
import "../../../style/gridStyle.css";

let filterParams  = {
    comparator: (filterLocalDateAtMidnight, cellValue) => {
        const dateAsString = cellValue;

        if (dateAsString == null) {
            return 0;
        }
        const dateParts = dateAsString.split('/');
        const year = Number(dateParts[2]);
        const month = Number(dateParts[1]) - 1;
        const day = Number(dateParts[0]);
        const cellDate = new Date(year, month, day );

        if (cellDate < filterLocalDateAtMidnight) {
            return -1;
        } else if (cellDate > filterLocalDateAtMidnight) {
            return 1;
        }
        return 0;
    },

    minValidYear: 2000,
    maxValidYear: 2035,
    inRangeFloatingFilterDateFormat: "Do MMM YYYY",
}

const defaultColDef = {
    flex: 1,
    floatingFilter: true,
    suppressFloatingFilterButton: true,
};

function LogMasterGrid() {
    const gridRef = useRef();
    const { logDaMaster, searchValue, setGridApi , setMessage} = useContext(Context);
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({height: window.innerHeight-100, width: '100%' }), []);
    const getRowStyleCallback = useCallback(getRowStyle, []);
    const searchValueRef = useRef(searchValue);

    useEffect(() => {
        searchValueRef.current = searchValue;
    }, [searchValue]);

    const onGridReady = useCallback((params) => {
        setGridApi(params.api);
    }, []);

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


    const options = useMemo(() => ({
        cacheQuickFilter: true,
        rowBuffer: 400,
        defaultColDef: {cellStyle: {textAlign: 'left'},},
        pagination: true,
        paginationPageSizeSelector: [100, 200, 500],
        paginationPageSize: 100,
        getRowId: getRowIds,
        rowStyle: {fontSize: '12px', margin: '0px', padding: '0px'},
        rowHeight: 30,
        getRowStyle: getRowStyleCallback,
        headerHeight:30,
    }), [getRowIds, getRowStyleCallback]);

    const handleEventSelection = useCallback((rowObject) => {
        if (searchValueRef.current !== '') {
            const filteredRows = rows.filter(row => row.Data === rowObject.Data);
            filteredRows.reverse();
            localStorage.setItem('rowID', JSON.stringify(rowObject.IDR));
            localStorage.setItem('extractedData', JSON.stringify(filteredRows));
            const url = `/extracted?`;
            window.open(url, '_blank');
        }
        else
            setMessage("Please type a search value");

    }, []);

    const colDefs = useMemo(() => [
        { headerName: 'ID', field: 'IDR', flex:1 , maxWidth: 70, cellStyle: {whiteSpace: 'nowrap'}, filter: false , sortable: false, },
        { headerName: 'Data', field: 'Data', flex:1 , minWidth:140, cellStyle: { whiteSpace: 'nowrap' }, filter: 'agDateColumnFilter' , sortable: false, filterParams: filterParams, suppressHeaderMenuButton: true},
        { headerName: 'Time', field: 'Time', flex:1 , cellStyle: { whiteSpace: 'nowrap' }, filter: false, sortable: false },
        { headerName: 'Evento', field: 'EventString', flex:2 , cellStyle: { whiteSpace: 'nowrap' }, filter: true , sortable: false, floatingFilter:false},
        { headerName: 'Stato', field: 'Stato', flex:1 ,maxWidth: 80, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: false, floatingFilter:false },
        { headerName: 'Producer', field: 'DevProducer', flex:2 , cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: false, floatingFilter:false },
        { headerName: 'Dev', field: 'DevIndex', flex:1 ,maxWidth: 75, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: false, floatingFilter:false },
        { headerName: 'Sub', field: 'SubIndex',flex:1 ,maxWidth: 75, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: false, floatingFilter:false },
        { headerName: 'T1', field: 'T1', flex:1 ,maxWidth: 75, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: false, floatingFilter:false },
        { headerName: 'T2', field: 'Tag2', flex:1 ,maxWidth: 75 , cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: false, floatingFilter:false },
        { headerName: 'T3', field: 'Tag3', flex:1 ,maxWidth: 75, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: false, floatingFilter:false },
        { headerName: 'T4', field: 'Tag4', flex:1 ,maxWidth: 75, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: false , floatingFilter:false},
        { headerName: 'Fase', field: 'Fase', flex:1 , cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: false, floatingFilter:false },
        { headerName: 'TagData', field: 'TagData', flex: 4, wrapText: true, filter:false,  sortable: false , cellRenderer: props => TagDataCellRenderer(props)},
        { headerName: 'Action', field:'ID', flex:1 ,minWidth:90, cellRenderer: ButtonExtract, cellRendererParams: { handleEventSelection: handleEventSelection }, filter:false }
    ],[]);

    if (!logDaMaster || logDaMaster.length === 0 ) {
        return null;
    }

    return (
        <div
            className={"ag-theme-quartz-dark"}
            style={gridStyle}
        >
            <div style={containerStyle}>
                <AgGridReact
                    ref={gridRef}
                    rowData={rows}
                    columnDefs={colDefs}
                    gridOptions={options}
                    quickFilterText={searchValue}
                    cacheQuickFilter={true}
                    defaultColDef={defaultColDef}
                    onGridReady={onGridReady}
                    animateRows={false}
                />
            </div>
        </div>
    )
}

export default LogMasterGrid;
