import React, {useContext, useMemo, useCallback} from "react";
import {Context} from "@/app/Context";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import {  defaultColDef, mapLogDaMaster } from "@/lib/aggrid-helper";
import "@/style/gridStyle.css";
import {useAgGridConfigLogMaster} from "@/hooks/useAgGridConfigLogMaster";
import AgGrid from "@/components/aggrid";

function AggridMaster() {
    const { logDaMaster, searchValue, setGridApi } = useContext(Context);

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

    const { colDefs, options } = useAgGridConfigLogMaster( rows, getRowIds, false);

    if (!logDaMaster || logDaMaster.length === 0 ) {
        return null;
    }


    return (
        <AgGrid
            rows={rows}
            colDefs={colDefs}
            options={options}
            searchValue={searchValue}
            defaultColDef={defaultColDef}
            onGridReady={onGridReady}
        />
    )
}

export default AggridMaster;
