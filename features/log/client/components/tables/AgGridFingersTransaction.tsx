import React, { useEffect, useMemo, useState} from "react";
import useStore from "@/app/store";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import "@/features/shared/client/style/gridStyle.css";
import {getFingersTransaction} from "@/features/shared/client/api";
import AgGrid from "@/features/shared/client/components/AgGrid";
import {defaultColDef, filterParams} from "@/features/log/client/utils/aggrid-helper";
import useWindowSize from "@/features/shared/client/hooks/useWindowSize";
import { formatStringDateOrder, getTimeFromData, } from "@/features/shared/client/utils/utils";

const AgGridFingersTransaction = () => {
    const serial = useStore(state => state.tempSerial);
    const backupSelected = useStore(state => state.backupSelected);
    const [fingerTransaction, setFingerTransaction] = useState<any[]>([]);
    const setTable = useStore(state => state.setTable);
    const setMessage = useStore(state => state.setMessage);
    const [loading, setLoading] = useState(false);
    const { height: windowHeight } = useWindowSize();
    const height = Number.isFinite(windowHeight) ? windowHeight : 0;

    const containerStyle = useMemo(() => {
        const validHeight = typeof height === 'number' ? height - (height * 0.08) : 'auto';
        return { width: '100%', height: validHeight };
    }, [height]);

    const colDef = useMemo(() => [
        { headerName: 'Date', field: 'Date', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: 'agDateColumnFilter', filterParams: filterParams},
        { headerName: 'Time', field: 'Time', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true },
        { headerName: 'FingerID', field: 'FingerID', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true },
        { headerName: 'PeopleID', field: 'PeopleID', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true },
        { headerName: 'OperationId', field: 'OperationId', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true },
        { headerName: 'Money', field: 'Money', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true },
        { headerName: 'Motivo', field: 'Motivo', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true },
        { headerName: 'ActualValue', field: 'ActualValue', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true },
    ], []);

useEffect(() => {
    const fetchData = async () => {
        setLoading(true);
        try {
            const results = await getFingersTransaction(serial, backupSelected);
            console.log(results);
            if (!results || results.length === 0) {
                setTable('master');
                setMessage('No fingers data found');
            } else {

                const fingerTransaction = Object.entries(results).map(([, value]) => ({
                    Date: formatStringDateOrder( (value as any).DataOraR ) ,
                    Time: getTimeFromData( (value as any).DataOraR ),
                    FingerID: (value as any).FingerID || (value as any).FingerId ,
                    PeopleID: (value as any).PeopleID || (value as any).PeopleId,
                    Money: (value as any).Money,
                    Motivo: (value as any).Motivo,
                    ActualValue: (value as any).ActualValue,

                }));
                setFingerTransaction(fingerTransaction);
            }
        } catch (err) {
            console.error('Error fetching finger transactions:', err);
            setTable('master');
            setMessage('Error fetching finger transactions:');
        } finally {
            setLoading(false);
        }
    };
    fetchData().catch(err => console.error('Error in fetchData:', err));
}, []);

    if (loading || fingerTransaction.length === 0){
        return (
            <div style={containerStyle}>
                <div className="skeleton" style={containerStyle} ></div>
            </div>
        )
    }

    return (
        <AgGrid
            rows={fingerTransaction}
            colDefs={colDef}
            defaultColDef={defaultColDef}
        />
    );
}

export default AgGridFingersTransaction;