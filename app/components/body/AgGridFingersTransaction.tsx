'use client'

import React, {useCallback, useEffect, useMemo, useState} from "react";
// import "@/app/styles/gridStyle.css";
import { formatStringDateOrder, getTimeFromData, } from "@/app/utils/utils";
import {AgGridReact} from "ag-grid-react";
import {FingerData, FingerRawData} from "@/app/types/types";
import { ModuleRegistry, ClientSideRowModelModule, themeQuartz, colorSchemeDarkBlue, GridReadyEvent, ColDef } from "ag-grid-community";
import LoadingOverlayAgGrid from "@/app/components/body/LoadingOverlayAgGrid";
import { GridApi } from "ag-grid-community";

interface AgGridFingersTransactionProps {
    isLoadingFingerTransaction: boolean;
    rawFingerTransactions: FingerRawData[];
    setStoredGridApi: (api: GridApi) => void;
}

ModuleRegistry.registerModules([ClientSideRowModelModule]);
const theme = (themeQuartz.withPart(colorSchemeDarkBlue)).withParams({spacing:3});

const AgGridFingersTransaction: React.FC<AgGridFingersTransactionProps> = ({isLoadingFingerTransaction, rawFingerTransactions, setStoredGridApi }) => {

    const [fingerTransaction, setFingerTransaction] = useState<FingerData[]>([]);

    useEffect(() => {
        const fingerTransaction = rawFingerTransactions.map((transaction: FingerRawData) : FingerData => {
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
        setFingerTransaction(fingerTransaction);

    }, [rawFingerTransactions]);

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
            <div className="w-full h-full">
                <AgGridReact<FingerData>
                    theme={theme}
                    rowData={fingerTransaction}
                    onGridReady={onGridReady}
                    columnDefs={colDefBase}
                    loading={isLoadingFingerTransaction}
                    loadingOverlayComponent={LoadingOverlayAgGrid}
                    loadingOverlayComponentParams={{ loadingMessage: "Loading, one moment please..." }}
                    alwaysShowVerticalScroll={true}
                />
            </div>
        </div>
    );
}

export default AgGridFingersTransaction;