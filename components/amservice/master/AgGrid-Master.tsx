import React, { useMemo, useCallback, useEffect } from "react";
import useStore from "@/app/store";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import { defaultColDef, mapLogDaMaster } from "@/lib/aggrid-helper";
import "@/style/gridStyle.css";
import { useAgGridConfigLogMaster } from "@/hooks/useAgGridConfigLogMaster";
import AgGrid from "@/components/AgGrid";
import { GridReadyEvent } from "ag-grid-community";
import { GridApi } from "ag-grid-community";


const AggridMaster: React.FC = () => {
    const logDaMaster = useStore(state => state.logDaMaster);
    const searchValue = useStore(state => state.searchValue);
    const gridApi = useStore(state => state.gridApi) as GridApi | null;
    const setGridApi = useStore(state => state.setGridApi);

    const onGridReady = useCallback((params: GridReadyEvent) => {
        setGridApi(params.api);
        params.api.paginationGoToLastPage();
    }, [setGridApi]);

    const rows = useMemo(() => {
        return logDaMaster && logDaMaster.length > 0 ? mapLogDaMaster(logDaMaster, false) : [];
    }, [logDaMaster]);

    const getRowIds = useCallback((params: { data: { IDR: string } }) => {
        return params.data.IDR;
    }, []);

    const { colDefs, options } = useAgGridConfigLogMaster({rows, getRowIds, isExtracted: false});

    useEffect(() => {
        if (!searchValue && gridApi) {
            gridApi.paginationGoToLastPage();
        }
    }, [searchValue, gridApi]);

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

export default AggridMaster;