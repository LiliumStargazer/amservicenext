'use client'
import React, {useCallback, useEffect, useMemo, useState} from "react";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import "@/app/styles/gridStyle.css";
import { formatStringDateOrder, getTimeFromData, } from "@/app/utils/utils";
import {AgGridReact} from "ag-grid-react";
import {FingerData, FingerRawData} from "@/app/types/types";
import { GridReadyEvent, ColDef } from "ag-grid-community";
import LoadingOverlayAgGrid from "@/app/components/body/tables/LoadingOverlayAgGrid";
import {useQueryFingerTransactions} from "@/app/hooks/log/useQueryFingerTransactions";
import { GridApi } from "ag-grid-community";

interface AgGridFingersTransactionProps {
    serial: string;
    backup: string;
    isBackupReady: boolean;
    setMessage: (message: string) => void;
    setStoredGridApi: (api: GridApi) => void;
}

const AgGridFingersTransaction: React.FC<AgGridFingersTransactionProps> = ({serial, backup, isBackupReady, setMessage, setStoredGridApi }) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [fingerTransaction, setFingerTransaction] = useState<FingerData[]>([]);
    const { isLoading, isError, data, error , isSuccess} = useQueryFingerTransactions(serial, backup, isBackupReady);

    useEffect(() => {
        if (serial && serial.length > 0){
            setFingerTransaction([]);
        }
    }, [serial]);


    useEffect(() => {
        if (isLoading){
            setLoading(true);
            return;
        }

        if (isError){
            setLoading(false);
            setFingerTransaction([]);
            setMessage("An error occurred while fetching the finger transactions: " + error);
            return ;
        }

        if (isSuccess && Array.isArray(data) ) {
            if (data.length === 0) {
                setFingerTransaction([]);
                setMessage('No finger transactions data found');
                setLoading(false);
                return;
            }

            const fingerTransaction = data.map((transaction: FingerRawData) : FingerData => {
                return {
                    Date: formatStringDateOrder(transaction.DataOraR),
                    Time: getTimeFromData(transaction.DataOraR),
                    FingerID: transaction.FingerID || transaction.FingerId || '',
                    PeopleID: transaction.PeopleID || transaction.PeopleId || '',
                    OperationId: transaction.ID || '',
                    Money: transaction.Money,
                    Motivo: transaction.Motivo,
                    ActualValue: transaction.ActualValue,
                };
            });

            setLoading(false);
            setFingerTransaction(fingerTransaction);
        }

    }, [isLoading, isError, data, error, isSuccess, setLoading, setMessage, setFingerTransaction]);

    const colDefBase: ColDef<FingerData>[]   = useMemo(() => [
        { headerName: 'Date', field: 'Date', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: true, floatingFilter: true, suppressHeaderFilterButton: true, suppressFloatingFilterButton: true},
        { headerName: 'Time', field: 'Time', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: true, floatingFilter: true, suppressHeaderFilterButton: true, suppressFloatingFilterButton: true},
        { headerName: 'FingerID', field: 'FingerID', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: true, floatingFilter: true, suppressHeaderFilterButton: true, suppressFloatingFilterButton: true },
        { headerName: 'PeopleID', field: 'PeopleID', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: true, floatingFilter: true, suppressHeaderFilterButton: true, suppressFloatingFilterButton: true },
        { headerName: 'OperationId', field: 'OperationId', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: true, floatingFilter: true, suppressHeaderFilterButton: true, suppressFloatingFilterButton: true },
        { headerName: 'Money', field: 'Money', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: true, floatingFilter: true, suppressHeaderFilterButton: true, suppressFloatingFilterButton: true },
        { headerName: 'Motivo', field: 'Motivo', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: true, floatingFilter: true, suppressHeaderFilterButton: true, suppressFloatingFilterButton: true },
        { headerName: 'ActualValue', field: 'ActualValue', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: true, floatingFilter: true, suppressHeaderFilterButton: true, suppressFloatingFilterButton: true },
    ], []);

    const onGridReady = useCallback((params: GridReadyEvent) => {
        setStoredGridApi(params.api);
    }, [setStoredGridApi]);

    return (
        <div className="w-full h-full ">
            <div className="ag-theme-quartz-dark compact w-full h-full">
                <AgGridReact<FingerData>
                    rowData={fingerTransaction}
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

export default AgGridFingersTransaction;