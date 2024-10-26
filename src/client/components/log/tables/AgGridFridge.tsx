import React, {useEffect, useMemo, } from "react";
import useStore from "@/app/store";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import {formatStringDateOrder, getTimeString} from "@/src/client/utils/utils";
import {translateFrigoState} from "@/src/client/utils/eventMapping";
import {apiFridgeEvents} from "@/src/client/api/api";
import {AgGridReact} from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import {FridgesRowData} from "@/src/client/types/types";
import {useQuery} from "@tanstack/react-query";
import LoadingOverlayAgGrid from "@/src/client/components/log/tables/LoadingOverlayAgGrid";

const AgGridFridge = () => {
    const serial = useStore(state => state.serial);
    const backupSelected = useStore(state => state.backupSelected);
    const setMessage = useStore(state => state.setMessage);
    const frigoData = useStore(state => state.frigoData);
    const setFrigoData = useStore(state => state.setFrigoData);
    const frigoSelected = useStore(state => state.frigoSelected);
    const setFrigoSelected = useStore(state => state.setFrigoSelected);
    const setFrigoNumber = useStore(state => state.setFrigoNumber);
    const table = useStore(state => state.table);
    const loadingGlobal = useStore(state => state.loadingGlobal);
    const setLoadingGlobal = useStore(state => state.setLoadingGlobal);

    const { isLoading, isError, data, error } = useQuery({
        queryKey: ['fridgeData', serial, backupSelected],
        queryFn: () => apiFridgeEvents(serial, backupSelected),
        enabled: !!serial && !!backupSelected && table === "fridge",
    });


    useEffect(() => {
        if (isLoading){
            setLoadingGlobal(true);
            return;
        }

        if (isError){
            setLoadingGlobal(false);
            setMessage("An error occurred while fetching the fridge data: " + error.message);
            return
        }

        if (data && data.length === 0) {
            setFrigoData([]);
            setFrigoSelected(0);
            setMessage('No fridge data found');
            setLoadingGlobal(false);
            return;
        }

        if ( data && data.length > 0) {
            const frigoDataCopy = [...data];
            let arrayTables = frigoDataCopy.reduce((tablesObject, rowFrigoData) => {
                const formattedDate = formatStringDateOrder(rowFrigoData.DataOraR );
                const state = translateFrigoState(rowFrigoData.FrigoState);
                const formattedTemp1 = parseFloat(rowFrigoData.Temperature1).toFixed(2) + "°";
                const alarmTemp = parseFloat(rowFrigoData.Temp1) >= rowFrigoData.WarnAlarm ? "ON" : "OFF";
                const time = getTimeString(rowFrigoData.DataOraR);

                const rowData = {
                    dataOraR: formattedDate,
                    IDFrigo: rowFrigoData.IDFrigo,
                    Time: time,
                    ID: rowFrigoData.Id,
                    Temp1: formattedTemp1,
                    AlarmTemp: alarmTemp,
                    WarnAlarm: rowFrigoData.WarnAlarm,
                    Power: state.Power,
                    Sbrinamento: state.Sbrinamento,
                    Test: state.Test,
                    PorteAperte: state.PorteAperte,
                    SbrinaTempo: state.SbrinaTempo,
                    PreAllarme: state.PreAllarme,
                    Allarme: state.Allarme,
                };

                if (!tablesObject[rowFrigoData.IDFrigo]) {
                    tablesObject[rowFrigoData.IDFrigo] = [];
                }
                tablesObject[rowFrigoData.IDFrigo].push(rowData);
                return tablesObject;

            }, []);

            // importante controllo che la prima posizione sia piena, altrimenti tiro tutto indietro di 1
            if (!arrayTables[0]) {
                const updatedTables: { [key: number]: any[] } = {};
                Object.keys(arrayTables).forEach(key => {
                    const newKey = parseInt(key) - 1;
                    updatedTables[newKey] = arrayTables[parseInt(key)];
                });
                arrayTables = updatedTables;
            }

            setFrigoData(arrayTables);
            setFrigoNumber(Object.keys(arrayTables).length);
            setFrigoSelected(0);
            setLoadingGlobal(false);
        }

        setLoadingGlobal(false);

    }, [isLoading, isError, data, error, setFrigoData, setFrigoSelected, setMessage, serial, setLoadingGlobal]);

    const colDefsBase: ColDef<FridgesRowData>[]  = useMemo(() => [
        { headerName: 'ID', field: 'ID', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true, floatingFilter: true, suppressHeaderFilterButton: true , suppressFloatingFilterButton: true},
        { headerName: 'Data', field: 'dataOraR', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true, floatingFilter: true, suppressHeaderFilterButton: true, suppressFloatingFilterButton: true },
        { headerName: 'Time', field: 'Time', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true, floatingFilter: true, suppressHeaderFilterButton: true, suppressFloatingFilterButton: true },
        { headerName: 'Temp1', field: 'Temp1', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true, floatingFilter: true, suppressHeaderFilterButton: true, suppressFloatingFilterButton: true },
        { headerName: 'Warn Alarm', field: 'WarnAlarm', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true, floatingFilter: true, suppressHeaderFilterButton: true, suppressFloatingFilterButton: true },
        { headerName: 'Allarm Temp', field: 'AlarmTemp', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true, floatingFilter: true, suppressHeaderFilterButton: true, suppressFloatingFilterButton: true },
        { headerName: 'Power', field: 'Power', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true, floatingFilter: true, suppressHeaderFilterButton: true, suppressFloatingFilterButton: true },
        { headerName: 'Sbrinamento', field: 'Sbrinamento', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true, floatingFilter: true, suppressHeaderFilterButton: true, suppressFloatingFilterButton: true },
        { headerName: 'Test', field: 'Test', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true, floatingFilter: true, suppressHeaderFilterButton: true, suppressFloatingFilterButton: true },
        { headerName: 'Porte Aperte', field: 'PorteAperte', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true, floatingFilter: true, suppressHeaderFilterButton: true, suppressFloatingFilterButton: true },
        { headerName: 'Sbrina a Tempo', field: 'SbrinaTempo', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true, floatingFilter: true, suppressHeaderFilterButton: true, suppressFloatingFilterButton: true},
        { headerName: 'Pre-Allarme', field: 'PreAllarme', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true, floatingFilter: true, suppressHeaderFilterButton: true, suppressFloatingFilterButton: true },
        { headerName: 'Allarme', field: 'Allarme', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true, floatingFilter: true, suppressHeaderFilterButton: true, suppressFloatingFilterButton: true },
    ], []);

    if (table !== 'fridge')
        return null;

    return (
        <div className="w-full h-full flex-col">
            <div className="ag-theme-quartz-dark compact w-full h-full">
                <AgGridReact<FridgesRowData>
                    loading={loadingGlobal}
                    rowData={frigoData[frigoSelected]}
                    columnDefs={colDefsBase}
                    loadingOverlayComponent={LoadingOverlayAgGrid}
                    alwaysShowVerticalScroll={true}
                />
            </div>
        </div>
    )
}

export default AgGridFridge;