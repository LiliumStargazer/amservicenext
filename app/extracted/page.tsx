'use client'
import React, { useCallback, useEffect, useMemo, useState } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "@/features/shared/client/style/gridStyle.css";
import useWindowSize from "@/features/shared/client/hooks/useWindowSize";
import { useAgGridConfigLogMaster } from "@/features/log/client/hooks/useAgGridConfigLogMaster";
import { defaultColDef, mapLogDaMaster } from "@/components/log/tables/shared/aggrid-helper";
import Dialog from "@/components/log/tables/Dialog";
import AgGrid from "@/components/shared/AgGrid";

function Extract() {
    const [extractedData, setExtractedData] = useState<any[]>([]);
    const [extractedID, setExtractedID] = useState<number>(0);
    const { height } = useWindowSize();
    const gridStyle = useMemo(() => {
        const validHeight = typeof height === 'number' ? height - 100 : 'auto';
        return { height: validHeight, width: '100%' };
    }, [height]);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('extractedData') || '[]');
        const id = JSON.parse(localStorage.getItem('rowID') || '0');
        setExtractedData(data);
        setExtractedID(id);
    }, []);

    const [gridApi, setGridApi] = useState<any>(null);
    const [searchValue, setSearchValue] = useState<string>('');
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);

    const onGridReady = (params: any) => {
        setGridApi(params.api);
    };

    const rows = useMemo(() => {
        return extractedData && extractedData.length > 0 ? mapLogDaMaster(extractedData) : [];
    }, [extractedData]);

    const rowIndex = useMemo(() => {
        return rows.findIndex(row => row.IDR === extractedID);
    }, [rows, extractedID]);

    useEffect(() => {
        if (gridApi && rowIndex > -1) {
            const pageSize = gridApi.paginationGetPageSize();
            const pageNumber = Math.floor(rowIndex / pageSize);
            gridApi.paginationGoToPage(pageNumber);
            gridApi.ensureIndexVisible(rowIndex, 'top');
        }
    }, [gridApi, rowIndex]);

    const getRowIds = useCallback((params: { data: { IDR: string } }) => {
        return String( params.data.IDR ) ;
    }, []);

    const { colDefs, options } = useAgGridConfigLogMaster({rows, getRowIds, isExtracted: true});

    return (
        <div>
            <Dialog />
            <div>
                <div className="flex justify-center items-center p-2">
                    <label className="input input-bordered input-info flex items-center gap-2">
                        <input
                            type="search"
                            className="grow"
                            placeholder="Search..."
                            aria-label="InputSearch"
                            aria-describedby="button-addon2"
                            value={searchValue}
                            onChange={(event) => setSearchValue(event.target.value)}
                        />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70"
                        >
                            <path
                                fillRule="evenodd"
                                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </label>
                </div>
                <div style={containerStyle}>
                    <div className={"ag-theme-quartz-dark"} style={gridStyle}>
                        <AgGrid
                            rows={rows}
                            colDefs={colDefs}
                            options={options}
                            quickFilterText={searchValue}
                            defaultColDef={defaultColDef}
                            onGridReady={onGridReady}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Extract;