import {AgGridReact} from "ag-grid-react";
import React, {useMemo, useRef} from "react";
import useWindowSize from "@/src/client/hooks/useWindowSize";

interface AgGridProps {
    rows?: any[];
    colDefs: any[];
    options?: object;
    quickFilterText?: string;
    isCached?: boolean;
    defaultColDef?: object;
    onGridReady?: (params: any) => void;
    immutableData?: boolean; // Add this line
    getRowNodeId?: (data: any) => any;
    onFirstDataRendered?: (params: any) => void;
}


const AgGrid: React.FC<AgGridProps> = ({
    rows,
    colDefs,
    options,
    quickFilterText,
    isCached,
    defaultColDef,
    onGridReady,
    immutableData,getRowNodeId

}) => {
    const { height: windowHeight } = useWindowSize();
    const height = Number.isFinite(windowHeight) ? windowHeight : 0;

    const containerStyle = useMemo(() => {
        const validHeight = typeof height === 'number' ? height - (height * 0.08) : 'auto';
        return { width: '100%', height: validHeight };
    }, [height]);

    const gridStyle = useMemo(() => {
        const validHeight = typeof height === 'number' ? height - 100 : 'auto';
        return { height: validHeight, width: '100%' };
    }, [height]);

    const gridRef = useRef<AgGridReact>(null);

    const agGridProps: any = {
        ref: gridRef
    };

    if (rows) agGridProps.rowData = rows;
    if (colDefs) agGridProps.columnDefs = colDefs;
    if (options) agGridProps.gridOptions = options;
    agGridProps.quickFilterText = quickFilterText;
    if (isCached !== undefined) agGridProps.cacheQuickFilter = isCached;
    if (defaultColDef) agGridProps.defaultColDef = defaultColDef;
    if (onGridReady) agGridProps.onGridReady = onGridReady;

    return (
        <div className={"ag-theme-quartz-dark"} style={gridStyle}>
            <div style={containerStyle}>
                <AgGridReact
                    {...agGridProps}
                />
            </div>
        </div>
    );
}

export default AgGrid;