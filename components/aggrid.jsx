import {AgGridReact} from "ag-grid-react";

import React, {useMemo, useRef} from "react";
import useWindowSize from "@/hooks/useWIndowSize";
import PropTypes from "prop-types";

const AgGrid = ({rows, colDefs, options, searchValue, isCached, defaultColDef, onGridReady}) => {

    const { height: windowHeight } = useWindowSize();
    const height = Number.isFinite(windowHeight) ? windowHeight : 0;

    const containerStyle = useMemo(() => {
        const validHeight = typeof height === 'number' ? height - ( height * 0.08 ) : 'auto';
        return { width: '100%', height: validHeight };
    }, [height]);

    const gridStyle = useMemo(() => {
        const validHeight = typeof height === 'number' ? height - 100 : 'auto';
        return {height: validHeight, width: '100%' };
    }, [height]);

    const gridRef = useRef();

    const agGridProps = {
         ref: gridRef
    };

    if (rows) agGridProps.rowData = rows;
    if (colDefs) agGridProps.columnDefs = colDefs;
    if (options) agGridProps.gridOptions = options;
    if (searchValue) agGridProps.quickFilterText = searchValue;
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
    )
}

export default AgGrid;

AgGrid.propTypes = {
    rows: PropTypes.array,
    colDefs: PropTypes.array.isRequired,
    options: PropTypes.object,
    searchValue: PropTypes.string,
    isCached: PropTypes.bool,
    defaultColDef: PropTypes.object
};
