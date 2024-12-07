'use client'

import React, {useCallback, useEffect, useMemo, useState} from "react";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import "@/app/styles/gridStyle.css";
import { formatStringDateOrder, getTimeFromData, } from "@/app/utils/utils";
import {AgGridReact} from "ag-grid-react";
import {ErrorResponse, LisData, LisRawData} from "@/app/types/types";
import { ColDef, GridReadyEvent , GridApi} from "ag-grid-community";
import LoadingOverlayAgGrid from "@/app/components/log/tables/LoadingOverlayAgGrid";
import {useQueryLisTransactions} from "@/app/hooks/log/useQueryLisTransactions";

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

interface AgGridLisTransactionProps {
    serial: string;
    backup: string;
    section: string;
    isBackupReady: boolean;
    setMessage: (message: string) => void;
    setStoredGridApi: (api: GridApi) => void;
}

const AgGridLisTransaction: React.FC<AgGridLisTransactionProps> = ({serial, backup, section, isBackupReady, setMessage, setStoredGridApi }) => {
    const [lisTransactions, setLisTransactions] = useState<LisData[]>([]);
    const [loading, setLoading] = useState<boolean>(false);


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

    const { isLoading, isError, data, error, isSuccess} = useQueryLisTransactions( serial, backup, section, isBackupReady);

    useEffect(() => {
        if ( isLoading){
            setLoading(true);
            return;
        }

        if (isError){
            setLisTransactions([]);
            setLoading(false);
            setMessage("An error occurred while fetching the lis transactions: " + error);
            return;
        }

        if ((data as ErrorResponse)?.error) {
            setMessage("Error on lis Table: " + (data as ErrorResponse)?.error);
            setLoading(false);
            return;
        }

        if ( isSuccess && Array.isArray(data) ) {

            if (data.length === 0) {
                setLisTransactions([]);
                setMessage('No lis data found');
                setLoading(false);
                return;
            }

            if ( data && data.length > 0) {

                const formattedData  = data.map ((transaction: LisRawData) => {
                    return {
                        Date: formatStringDateOrder(transaction.DataOraR),
                        Time: getTimeFromData(transaction.DataOraR),
                        ID: transaction.ID,
                        ErrCode: transaction.ErrCode,
                        ErrDesc: LisErrorCodeDescriptions[transaction.ErrCode as unknown as LisErrorCode] || transaction.ErrCode.toString(),
                        OperationId: transaction.OperationId,
                        Price: transaction.Price,
                        ProductDesc: transaction.ProductDesc,
                        RecTransactionId: transaction.RecTransactionId,
                        TelNum: transaction.TelNum,
                        TransactionId: transaction.TransactionId,
                    };
                });

                setLoading(false);
                setLisTransactions(formattedData);
            }
        }

    }, [isLoading, isError, data, error, setLisTransactions, setLoading, setMessage,isSuccess, LisErrorCodeDescriptions]);

    const colDefBase: ColDef<LisData>[]  = useMemo(() => [
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

    const onGridReady = useCallback((params: GridReadyEvent) => {
        setStoredGridApi(params.api);
    }, [setStoredGridApi]);

    return (
        <div className="w-full h-full ">
            <div className="ag-theme-quartz-dark compact w-full h-full">
                <AgGridReact<LisData>
                    rowData={lisTransactions}
                    onGridReady={onGridReady}
                    columnDefs={colDefBase}
                    loading={loading}
                    loadingOverlayComponent={LoadingOverlayAgGrid}
                    loadingOverlayComponentParams={{ loadingMessage: "Loading, one moment please..." }}
                    alwaysShowVerticalScroll={true}
                />
            </div>
        </div>
    );
}

export default AgGridLisTransaction;