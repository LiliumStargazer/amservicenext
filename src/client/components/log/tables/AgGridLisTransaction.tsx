import React, { useEffect, useMemo, useState} from "react";
import useStore from "@/app/store";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import "@/src/client/styles/gridStyle.css";
import { apiGetLisTransaction} from "@/src/client/api/api";
import { formatStringDateOrder, getTimeFromData, } from "@/src/client/utils/utils";
import {AgGridReact} from "ag-grid-react";
import {LisRowData} from "@/src/client/types/types";
import { ColDef } from "ag-grid-community";
import {useQuery} from "@tanstack/react-query";
import LoadingOverlayAgGrid from "@/src/client/components/log/tables/LoadingOverlayAgGrid";

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
    const serial = useStore(state => state.serial);
    const backupSelected = useStore(state => state.backupSelected);
    const setMessage = useStore(state => state.setMessage);
    const table = useStore(state => state.table);
    const [lisTransactions, setLisTransactions] = useState<any[]>([]);
    const loadingGlobal = useStore(state => state.loadingGlobal);
    const setLoadingGlobal = useStore(state => state.setLoadingGlobal);

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

    const { isLoading, isError, data, error } = useQuery({
        queryKey: ['lisTransaction', serial, backupSelected],
        queryFn: () => apiGetLisTransaction(serial, backupSelected),
        enabled: !!serial && !!backupSelected && table === "lisTransaction",
    });

    useEffect(() => {
        if ( isLoading){
            setLoadingGlobal(true);
            return;
        }

        if (isError){
            setLisTransactions([]);
            setLoadingGlobal(false);
            setMessage("An error occurred while fetching the lis transactions: " + error.message);
            return;
        }

        if (data && data.length === 0) {
            setLisTransactions([]);
            setMessage('No lis data found');
            setLoadingGlobal(false);
            return;
        }

        if ( data && data.length > 0) {

            const map = Object.entries(data).map(([, value]) => {
                return {
                    Date: formatStringDateOrder((value as any).DataOraR),
                    Time: getTimeFromData((value as any).DataOraR),
                    ID: (value as any).ID,
                    ErrCode: (value as any).ErrCode,
                    ErrDesc: LisErrorCodeDescriptions[(value as any).ErrCode as LisErrorCode] || ( (value as any).ErrCode ).toString(),
                    OperationId: (value as any).OperationId,
                    Price: (value as any).Price,
                    ProductDesc: (value as any).ProductDesc,
                    RecTransactionId: (value as any).RecTransactionId,
                    TelNum: (value as any).TelNum,
                    TransactionId: (value as any).TransactionId,
                };
            });
            setLoadingGlobal(false);
            setLisTransactions(map);
        }
    }, [isLoading, isError, data, error, setLisTransactions, setLoadingGlobal, setMessage, LisErrorCodeDescriptions]);

    const colDefBase: ColDef<LisRowData>[]  = useMemo(() => [
        { headerName: 'Date', field: 'Date', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true, floatingFilter: true, suppressHeaderFilterButton: false , suppressFloatingFilterButton: true, browserDatePicker:true},
        { headerName: 'Time', field: 'Time', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: true, floatingFilter: true, suppressHeaderFilterButton: true, suppressFloatingFilterButton: true },
        { headerName: 'ID', field: 'ID', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: false, floatingFilter: true, suppressHeaderFilterButton: true, suppressFloatingFilterButton: true },
        { headerName: 'ErrCode', field: 'ErrCode', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: true, floatingFilter: true, suppressHeaderFilterButton: true, suppressFloatingFilterButton: true },
        { headerName: 'ErrorDesc', field: 'ErrDesc', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: true, floatingFilter: true, suppressHeaderFilterButton: true, suppressFloatingFilterButton: true },
        { headerName: 'OperationId', field: 'OperationId', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: true, floatingFilter: true, suppressHeaderFilterButton: true, suppressFloatingFilterButton: true },
        { headerName: 'Price', field: 'Price', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: true, floatingFilter: true, suppressHeaderFilterButton: true, suppressFloatingFilterButton: true },
        { headerName: 'ProductDesc', field: 'ProductDesc', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: true, floatingFilter: true, suppressHeaderFilterButton: true, suppressFloatingFilterButton: true },
        { headerName: 'RecTransactionId', field: 'RecTransactionId', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: true, floatingFilter: true, suppressHeaderFilterButton: true, suppressFloatingFilterButton: true },
        { headerName: 'TelNum', field: 'TelNum', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: true, floatingFilter: true, suppressHeaderFilterButton: true, suppressFloatingFilterButton: true },
        { headerName: 'TransactionId', field: 'TransactionId', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: true, floatingFilter: true, suppressHeaderFilterButton: true, suppressFloatingFilterButton: true },
    ], []);

    if (table !== "lisTransaction") return null;

    return (
        <div className="w-full h-full ">
            <div className="ag-theme-quartz-dark compact w-full h-full">
                <AgGridReact<LisRowData>
                    rowData={lisTransactions}
                    columnDefs={colDefBase}
                    loading={loadingGlobal}
                    loadingOverlayComponent={LoadingOverlayAgGrid}
                    alwaysShowVerticalScroll={true}
                />
            </div>
        </div>
    );
}

export default AgGridLisTransaction;