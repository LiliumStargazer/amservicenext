'use client'
import React, {useCallback, useEffect, useMemo, useState} from "react";
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { getRowStyle } from "../../components/log/tableDaMaster/formatLogTable.js";
function Extract(){
    const [gridApi, setGridApi] = useState(null);
    const [searchValue, setSearchValue] = useState('');
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({height: window.innerHeight-100, width: '100%' }), []);
    const extractedData = useMemo(() => JSON.parse(localStorage.getItem('extractedData')), []);
    const extractedID = useMemo(() => JSON.parse(localStorage.getItem('rowID')), []);
    const getRowStyleCallback = useCallback(getRowStyle, []);

    const colDefs = useMemo(() =>[
        {headerName: 'Nr', field: 'IDR', width: 80, cellStyle: {whiteSpace: 'nowrap'}, filter: true},
        {headerName: 'Data', field: 'Data', width: 110, cellStyle: { whiteSpace: 'nowrap' }, filter: 'agDateColumnFilter' },
        { headerName: 'Time', field: 'Time', width: 100, cellStyle: { whiteSpace: 'nowrap' }, filter: true },
        { headerName: 'Evento', field: 'EventString', width: 205, cellStyle: { whiteSpace: 'nowrap' }, filter: true },
        { headerName: 'Stato', field: 'Stato', width: 85 ,cellStyle: { whiteSpace: 'nowrap' }, filter: true },
        { headerName: 'Producer', field: 'DevProducer', width: 150, cellStyle: { whiteSpace: 'nowrap' }, filter: true },
        { headerName: 'Dev', field: 'DevIndex', width: 80, cellStyle: { whiteSpace: 'nowrap' }, filter: true },
        { headerName: 'Sub', field: 'SubIndex',width: 80, cellStyle: { whiteSpace: 'nowrap' }, filter: true },
        { headerName: 'T1', field: 'T1', width: 90, cellStyle: { whiteSpace: 'nowrap' }, filter: true },
        { headerName: 'T2', field: 'Tag2', width: 80, cellStyle: { whiteSpace: 'nowrap' }, filter: true },
        { headerName: 'T3', field: 'Tag3', width: 80, cellStyle: { whiteSpace: 'nowrap' }, filter: true },
        { headerName: 'T4', field: 'Tag4', width: 80, cellStyle: { whiteSpace: 'nowrap' }, filter: true },
        { headerName: 'Fase', field: 'Fase', width: 130, cellStyle: { whiteSpace: 'nowrap' }, filter: true },
        { headerName: 'TagData', field: 'TagData', flex: 2, wrapText: true },
    ]);

    const formattedRows = useMemo(() => {
        return extractedData.map(row => ({
            IDR: row.IDR,
            Data: row.Data,
            Time: row.Time,
            EventString: row.EventString,
            Stato: row.State,
            DevProducer: row.DevProducer,
            DevIndex: row.DevIndex,
            SubIndex: row.SubIndex,
            T1: row.T1,
            Tag2: row.Tag2,
            Tag3: row.Tag3,
            Tag4: row.Tag4,
            Fase: row.Fase,
            TagData: row.TagData,
        }));
    }, [extractedData]);

    const onGridReady = (params) => {
        setGridApi(params.api);

    };

    useEffect(() => {
        if (gridApi){
            const rowIndex = formattedRows.findIndex(row => row.IDR === extractedID);
            gridApi.ensureIndexVisible(rowIndex, 'top');
        }
    },[gridApi]);

    const handleInputChange = (event) => {
        setSearchValue(event.target.value);
    };

    const getRowIds = useCallback((params) => {
        return params.data.IDR;
    }, []);

    const getRowHeight = useCallback((params) => {
        if (params.data.EventString === "EV_PAX_PAYMENT" || params.data.EventString === "EV_ING_PAYMENT" ||
        params.data.EventString === "EV_MRPAY_EXECUTERECHARGE") {
            return 240;
        }
        return 35;
    }, []);

    const getRowsCallback = useCallback((params) => {
        const margin = 100;
        const startRow = Math.max(params.startRow - margin, 0);
        const endRow = params.endRow + margin;
        const rowsThisBlock = formattedRows.slice(startRow, endRow);
        params.successCallback(rowsThisBlock, formattedRows.length);
    }, [formattedRows]);

    const options = useMemo(() => ({
        getRowHeight: getRowHeight,
        cacheQuickFilter: true,
        defaultColDef: { cellStyle: {textAlign: 'left'},},
        getRowId: getRowIds,
        getRowStyle: getRowStyleCallback,
        rowModel: 'infinite',
        datasource: {getRows: getRowsCallback}
    }), [getRowsCallback]);

    return (
        <div>
            <div className="flex items-start space-x-3 p-2">
                <input
                    type="search"
                    className="m-0 block w-[1px] min-w-0 flex-auto textarea textarea-info text-md font-bol"
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="button-addon2"
                    value={searchValue}
                    onChange={handleInputChange}
                />
            </div>
            <div style={containerStyle}>
                <div
                    className={"ag-theme-quartz-dark"}
                    style={gridStyle}
                >
                    <AgGridReact
                        rowData={formattedRows}
                        columnDefs={colDefs}
                        gridOptions={options}
                        quickFilterText={searchValue}
                        onGridReady={onGridReady}
                    />
                </div>
            </div>
        </div>
    )
}

export default Extract;