import React, { useEffect, useMemo, useState} from "react";
import useStore from "@/app/store";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import "@/src/client/styles/gridStyle.css";
import {apiGetFingersTransactions} from "@/src/client/api/api";
import { formatStringDateOrder, getTimeFromData, } from "@/src/client/utils/utils";
import {AgGridReact} from "ag-grid-react";
import {FingerRowData} from "@/src/client/types/types";
import { ColDef } from "ag-grid-community";
import {useQuery} from "@tanstack/react-query";
import LoadingOverlayAgGrid from "@/src/client/components/log/tables/LoadingOverlayAgGrid";

const AgGridFingersTransaction = () => {
    const serial = useStore(state => state.serial);
    const backupSelected = useStore(state => state.backupSelected);
    const table = useStore(state => state.table);
    const setMessage = useStore(state => state.setMessage);
    const loadingGlobal = useStore(state => state.loadingGlobal);
    const setLoadingGlobal = useStore(state => state.setLoadingGlobal);
    const [fingerTransaction, setFingerTransaction] = useState<any[]>([]);


    const { isLoading, isError, data, error } = useQuery({
        queryKey: ['fingersTransaction', serial, backupSelected],
        queryFn: () => apiGetFingersTransactions(serial, backupSelected),
        enabled: !!serial && !!backupSelected && table === "fingersTransaction",
    });


    useEffect(() => {
        if (isLoading){
            setLoadingGlobal(true);
            return;
        }

        if (isError){
            setLoadingGlobal(false);
            setFingerTransaction([]);
            setMessage("An error occurred while fetching the finger transactions: " + error.message);
            return ;
        }

        if (data && data.length === 0) {
            setFingerTransaction([]);
            setMessage('No finger transactions data found');
            setLoadingGlobal(false);
            return;
        }

        if ( data && data.length > 0) {
            const fingerTransaction = Object.entries(data).map(([, value]) => ({
                Date: formatStringDateOrder((value as any).DataOraR),
                Time: getTimeFromData((value as any).DataOraR),
                FingerID: (value as any).FingerID || (value as any).FingerId,
                PeopleID: (value as any).PeopleID || (value as any).PeopleId,
                Money: (value as any).Money,
                Motivo: (value as any).Motivo,
                ActualValue: (value as any).ActualValue,
            }));
            setLoadingGlobal(false);
            setFingerTransaction(fingerTransaction);
        }

    }, [isLoading, isError, data, error, setLoadingGlobal, setMessage, setFingerTransaction]);

    const colDefBase: ColDef<FingerRowData>[]   = useMemo(() => [
        { headerName: 'Date', field: 'Date', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: true, floatingFilter: true, suppressHeaderFilterButton: true, suppressFloatingFilterButton: true},
        { headerName: 'Time', field: 'Time', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: true, floatingFilter: true, suppressHeaderFilterButton: true, suppressFloatingFilterButton: true},
        { headerName: 'FingerID', field: 'FingerID', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: true, floatingFilter: true, suppressHeaderFilterButton: true, suppressFloatingFilterButton: true },
        { headerName: 'PeopleID', field: 'PeopleID', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: true, floatingFilter: true, suppressHeaderFilterButton: true, suppressFloatingFilterButton: true },
        { headerName: 'OperationId', field: 'OperationId', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: true, floatingFilter: true, suppressHeaderFilterButton: true, suppressFloatingFilterButton: true },
        { headerName: 'Money', field: 'Money', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: true, floatingFilter: true, suppressHeaderFilterButton: true, suppressFloatingFilterButton: true },
        { headerName: 'Motivo', field: 'Motivo', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: true, floatingFilter: true, suppressHeaderFilterButton: true, suppressFloatingFilterButton: true },
        { headerName: 'ActualValue', field: 'ActualValue', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: true, floatingFilter: true, suppressHeaderFilterButton: true, suppressFloatingFilterButton: true },
    ], []);

    if (table !== "fingersTransaction") return null;

    return (
        <div className="w-full h-full ">
            <div className="ag-theme-quartz-dark compact w-full h-full">
                <AgGridReact<FingerRowData>
                    rowData={fingerTransaction}
                    columnDefs={colDefBase}
                    loading={loadingGlobal}
                    loadingOverlayComponent={LoadingOverlayAgGrid}
                />
            </div>
        </div>
    );
}

export default AgGridFingersTransaction;