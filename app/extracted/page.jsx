'use client'
import React, {useCallback, useEffect, useMemo, useState} from "react";
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "@/style/gridStyle.css";
import useWindowSize from "@/hooks/useWIndowSize";
import {useAgGridConfig} from "@/hooks/useAgGridConfig";
import {mapLogDaMaster} from "@/lib/aggrid-helper";

function Extract(){
    const [extractedData, setExtractedData] = useState([]);
    const [extractedID, setExtractedID] = useState(0);
    const { height } = useWindowSize();
    const gridStyle = useMemo(() => ({height: height - 100, width: '100%' }), [height]);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('extractedData'));
        const id = JSON.parse(localStorage.getItem('rowID'));
        setExtractedData(data);
        setExtractedID(id);
    }, []);

    const [gridApi, setGridApi] = useState(null);
    const [searchValue, setSearchValue] = useState('');
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);

    const onGridReady = (params) => {
        setGridApi(params.api);
    };

    const rows = useMemo(() => {
        return extractedData && extractedData.length > 0 ? mapLogDaMaster(extractedData) : [];
    }, [extractedData]);

    const rowIndex =  useMemo(() => {
        return rows.findIndex(row => row.IDR === extractedID)
    }, [rows, extractedID]);


    useEffect(() => {
        if (gridApi && rowIndex > -1) {
            const pageSize = gridApi.paginationGetPageSize();
            const pageNumber = Math.floor(rowIndex / pageSize);
            gridApi.paginationGoToPage(pageNumber);
            gridApi.ensureIndexVisible(rowIndex, 'top');
        }
    },[gridApi, rowIndex]);

    const handleInputChange = (event) => {
        setSearchValue(event.target.value);
    };

    const getRowIds = useCallback((params) => {
        return params.data.IDR;
    }, []);

    const { colDefs, options } = useAgGridConfig( rows, getRowIds, true);

    //console.log(useEventsTranslatedByAlive());

    const getRowNodeId = useCallback((data) => {
        return data.IDR;
    }, []);


    return (
        <div>
            <div className="flex items-start space-x-3 p-2">
                <input
                    type="search"
                    className="m-0 block w-[1px] min-w-0 flex-auto textarea textarea-info text-md font-bol"
                    placeholder="InputSearch"
                    aria-label="InputSearch"
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
                        rowData={rows}
                        columnDefs={colDefs}
                        gridOptions={options}
                        quickFilterText={searchValue}
                        onGridReady={onGridReady}
                        immutableData={true}
                        getRowNodeId={getRowNodeId}
                    />
                </div>
            </div>
        </div>
    )
}

export default Extract;