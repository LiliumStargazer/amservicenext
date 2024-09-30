import React, { useEffect, useMemo, useState} from "react";
import useStore from "@/app/store";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import "@/features/shared/client/style/gridStyle.css";
import {getLisTransaction} from "@/features/shared/client/api";
import AgGrid from "@/features/shared/client/components/AgGrid";
import {defaultColDef, filterParams} from "@/features/log/client/utils/aggrid-helper";
import useWindowSize from "@/features/shared/client/hooks/useWindowSize";
import { formatStringDateOrder, getTimeFromData, } from "@/features/shared/client/utils/utils";

enum LisErrorCode {
    LisNotResponding = 800,
    NoConnection = 801,
    ParamsNotValid = 9100,
    NumberNotValid = 2000,
    OperationInProgress = 805,
    NumberNotExist_2 = 2,
    ServiceUnavailable = 822,
    NumberNotExist_1022 = 1022,
    LisNotResponding_729 = 729,
    LimitExceeded = 5022,
    ConnectionError_9101 = 9101,
    ConnectionError_1012 = 1012,
    NumberNotValid_1110 = 1110,
    ConnectionError_1103 = 1103,
    NumberNotValid_3010 = 3010,
    NumberNotValid_9200 = 9200,
    NumberNotValid_1101 = 1101,
    NumberNotValid_9505 = 9505,
    ServiceNotAvailable_716 = 716,
    NumberNotValid_9509 = 9509,
    LisContractNotValid = 812
}

const AgGridLisTransaction = () => {
    const storedSerial = useStore(state => state.serial);
    const backupSelected = useStore(state => state.backupSelected);
    const [fingerTransactionRows, setFingerTransactionRows] = useState<any[]>([]);
    const setTable = useStore(state => state.setTable);
    const setMessage = useStore(state => state.setMessage);
    const [loading, setLoading] = useState(false);
    const { height: windowHeight } = useWindowSize();
    const height = Number.isFinite(windowHeight) ? windowHeight : 0;

    const containerStyle = useMemo(() => {
        const validHeight = typeof height === 'number' ? height - (height * 0.08) : 'auto';
        return { width: '100%', height: validHeight };
    }, [height]);

    const LisErrorCodeDescriptions = useMemo(() => ({
        [LisErrorCode.LisNotResponding]: "Lis not responding",
        [LisErrorCode.NoConnection]: "No Connection",
        [LisErrorCode.ParamsNotValid]: "Params not valid",
        [LisErrorCode.NumberNotValid]: "Number not valid",
        [LisErrorCode.OperationInProgress]: "Operation already in progress",
        [LisErrorCode.NumberNotExist_2]: "Number not exist",
        [LisErrorCode.ServiceUnavailable]: "Service available only out of 8-6",
        [LisErrorCode.NumberNotExist_1022]: "Number not exist",
        [LisErrorCode.LisNotResponding_729]: "Lis not responding",
        [LisErrorCode.LimitExceeded]: "Limit exceeded",
        [LisErrorCode.ConnectionError_9101]: "Connection error",
        [LisErrorCode.ConnectionError_1012]: "Connection error",
        [LisErrorCode.NumberNotValid_1110]: "Number not valid",
        [LisErrorCode.ConnectionError_1103]: "Connection error",
        [LisErrorCode.NumberNotValid_3010]: "Number not valid",
        [LisErrorCode.NumberNotValid_9200]: "Number not valid",
        [LisErrorCode.NumberNotValid_1101]: "Number not valid",
        [LisErrorCode.NumberNotValid_9505]: "Number not valid",
        [LisErrorCode.ServiceNotAvailable_716]: "Service not available",
        [LisErrorCode.NumberNotValid_9509]: "Number not valid",
        [LisErrorCode.LisContractNotValid]: "Lis contract not valid"
    }), []);

    const colDef = useMemo(() => [
        { headerName: 'Date', field: 'Date', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: 'agDateColumnFilter', filterParams: filterParams},
        { headerName: 'Time', field: 'Time', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true },
        { headerName: 'ID', field: 'ID', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true },
        { headerName: 'Error', field: 'ErrCode', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true },
        { headerName: 'OperationId', field: 'OperationId', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true },
        { headerName: 'Price', field: 'Price', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true },
        { headerName: 'ProductDesc', field: 'ProductDesc', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true },
        { headerName: 'RecTransactionId', field: 'RecTransactionId', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true },
        { headerName: 'TelNum', field: 'TelNum', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true },
        { headerName: 'TransactionId', field: 'TransactionId', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true },
    ], []);



useEffect(() => {
    const fetchData = async () => {
        setLoading(true);
        try {
            if (storedSerial==null || storedSerial !== '')
                return;

            const results = await getLisTransaction(storedSerial, backupSelected);
            if (!results || results.length === 0) {
                setTable('master');
                setMessage('No lis data found');
            } else {
                const map = Object.entries(results).map(([, value]) => ({
                    Date: formatStringDateOrder( (value as any).DataOraR ) ,
                    Time: getTimeFromData( (value as any).DataOraR ),
                    ID: (value as any).ID,
                    ErrCode: LisErrorCodeDescriptions[(value as any).ErrCode as LisErrorCode] || (value as any).ErrCode,
                    OperationId: (value as any).OperationId,
                    Price: (value as any).Price,
                    ProductDesc: (value as any).ProductDesc,
                    RecTransactionId: (value as any).RecTransactionId,
                    TelNum: (value as any).TelNum,
                    TransactionId: (value as any).TransactionId,
                }));
                setFingerTransactionRows(map);
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

    if (loading || fingerTransactionRows.length === 0){
        return (
            <div style={containerStyle}>
                <div className="skeleton" style={containerStyle} ></div>
            </div>
        )
    }

    return (
        <AgGrid
            rows={fingerTransactionRows}
            colDefs={colDef}
            defaultColDef={defaultColDef}
        />
    );
}

export default AgGridLisTransaction;