import React, {useCallback, useEffect, useMemo, useRef} from "react";
import useStore from "@/app/store";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";

import "@/features/shared/client/style/gridStyle.css";
import {useAgGridConfigLogMaster} from "@/features/log/client/hooks/useAgGridConfigLogMaster";
import {GridApi, GridReadyEvent} from "ag-grid-community";
import {defaultColDef, mapLogDaMaster} from "@/features/log/client/utils/aggrid-helper";
import AgGrid from "@/features/shared/client/components/AgGrid";


const AgGridMaster: React.FC = () => {

    const logDaMaster = useStore(state => state.logDaMaster);
    const searchValue = useStore(state => state.searchValue);
    const setGridApi = useStore(state => state.setGridApi);
    const gridApiRef = useRef<GridApi | null>(null);

    const onGridReady = useCallback((params: GridReadyEvent) => {
        gridApiRef.current = params.api;
        setGridApi(params.api); // Optionally, store globally if needed
        params.api.paginationGoToLastPage();
    }, [setGridApi]);

    const rows = useMemo(() => {
        return logDaMaster && logDaMaster.length > 0 ? mapLogDaMaster(logDaMaster, false) : [];
    }, [logDaMaster]);

    const getRowIds = useCallback((params: { data: { IDR: string } }) => {
        return String( params.data.IDR ) ;
    }, []);

    const { colDefs, options } = useAgGridConfigLogMaster({rows, getRowIds, isExtracted: false});

    useEffect(() => {
        if (!searchValue && gridApiRef.current) {
            if (!gridApiRef.current.isDestroyed()) {
                gridApiRef.current.paginationGoToLastPage();
            }
        }
    }, [searchValue]);

    if (!logDaMaster || logDaMaster.length === 0) {
        return null;
    }
    
    return (
        <AgGrid
            rows={rows}
            colDefs={colDefs}
            options={options}
            quickFilterText={searchValue}
            defaultColDef={defaultColDef}
            onGridReady={onGridReady}
        />
    );
}

export default AgGridMaster;