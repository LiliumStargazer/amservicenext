import React, {useContext, useMemo, useCallback, useRef, useEffect} from "react";
import {Context} from "@/app/Context";
import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import {  defaultColDef, mapLogDaMaster } from "@/lib/aggrid-helper";
import "@/style/gridStyle.css";
import {useAgGridConfig} from "@/hooks/useAgGridConfig";
import useWindowSize from "@/hooks/useWIndowSize";

function AggridMaster() {
    const gridRef = useRef();
    const { logDaMaster, searchValue, setGridApi } = useContext(Context);
    const { height: windowHeight } = useWindowSize();
    const height = Number.isFinite(windowHeight) ? windowHeight : 0; // Default to 0 if height is not a number
    const containerStyle = useMemo(() => ({ width: '100%', height: height - 100 }), [height]);
    const gridStyle = useMemo(() => ({height: height - 100, width: '100%' }), [height]);

    const onGridReady = useCallback((params) => {
        setGridApi(params.api);
        params.api.paginationGoToLastPage();
    }, [setGridApi]);

    const rows = useMemo(() => {
        return logDaMaster && logDaMaster.length > 0 ? mapLogDaMaster(logDaMaster, false) : [];
    }, [logDaMaster]);

    const getRowIds = useCallback((params) => {
        return params.data.IDR;
    }, []);

    const { colDefs, options } = useAgGridConfig( rows, getRowIds, false);

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
                />
            </div>
        </div>
    )
}

export default AggridMaster;
