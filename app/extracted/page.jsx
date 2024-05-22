'use client'
import React, {useCallback, useEffect, useMemo, useState} from "react";
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import {getRowStyle, TagDataCellRenderer} from "@/lib/formatLogTable";
import "../../style/gridStyle.css";

const colDefs = [
    { headerName: 'ID', field: 'IDR', flex:1 , maxWidth: 70, cellStyle: {whiteSpace: 'nowrap'}, filter: false , sortable: false, },
    { headerName: 'Data', field: 'Data', flex:1 , minWidth:140, cellStyle: { whiteSpace: 'nowrap' }, filter: false, sortable: false, },
    { headerName: 'Time', field: 'Time', flex:1 , cellStyle: { whiteSpace: 'nowrap' }, filter: false, sortable: false },
    { headerName: 'Evento', field: 'EventString', flex:2 , cellStyle: { whiteSpace: 'nowrap' }, filter: true , sortable: false, floatingFilter:false},
    { headerName: 'Stato', field: 'Stato', flex:1 ,maxWidth: 80, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: false, floatingFilter:false },
    { headerName: 'Producer', field: 'DevProducer', flex:1 , cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: false, floatingFilter:false },
    { headerName: 'Dev', field: 'DevIndex', flex:1 ,maxWidth: 75, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: false, floatingFilter:false },
    { headerName: 'Sub', field: 'SubIndex',flex:1 ,maxWidth: 75, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: false, floatingFilter:false },
    { headerName: 'T1', field: 'T1', flex:1 ,maxWidth: 75, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: false, floatingFilter:false },
    { headerName: 'T2', field: 'Tag2', flex:1 ,maxWidth: 75 , cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: false, floatingFilter:false },
    { headerName: 'T3', field: 'Tag3', flex:1 ,maxWidth: 75, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: false, floatingFilter:false },
    { headerName: 'T4', field: 'Tag4', flex:1 ,maxWidth: 75, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: false , floatingFilter:false},
    { headerName: 'Fase', field: 'Fase', flex:1 , cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: false, floatingFilter:false },
    { headerName: 'TagData', field: 'TagData', flex: 4, wrapText: true, filter:false,  sortable: false , cellRenderer: props => TagDataCellRenderer(props)},
];



function Extract(){
    const [extractedData, setExtractedData] = useState([]);
    const [extractedID, setExtractedID] = useState(0);
    const [gridStyle, setGridStyle] = useState({height: 0, width: '100%'});

    useEffect(() => {
        const style= {height: window.innerHeight-100, width: '100%' };
        setGridStyle(style);
    }, []);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('extractedData'));
        const id = JSON.parse(localStorage.getItem('rowID'));
        setExtractedData(data);
        setExtractedID(id);
    }, []);

    const [gridApi, setGridApi] = useState(null);
    const [searchValue, setSearchValue] = useState('');
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const getRowStyleCallback = useCallback(getRowStyle, []);

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
    },[gridApi, formattedRows, extractedID]);

    const handleInputChange = (event) => {
        setSearchValue(event.target.value);
    };

    const getRowIds = useCallback((params) => {
        return params.data.IDR;
    }, []);

    const options = useMemo(() => ({
        //getRowHeight: getRowHeight,
        cacheQuickFilter: true,
        defaultColDef: { cellStyle: {textAlign: 'left'},},
        getRowId: getRowIds,
        rowStyle: {fontSize: '12px', margin: '0px', padding: '0px'},
        rowHeight: 30,
        getRowStyle: getRowStyleCallback,
        headerHeight:30,

    }), [ getRowIds, getRowStyleCallback]);

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
                        animateRows={false}
                    />
                </div>
            </div>
        </div>
    )
}

export default Extract;