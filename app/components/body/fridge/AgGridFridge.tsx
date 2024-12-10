'use client'

import React, {useCallback, useEffect, useMemo, useState,} from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import {formatStringDateOrder, getTimeString} from "@/app/utils/utils";
import {translateFrigoState} from "@/app/utils/eventMapping";
import {AgGridReact} from "ag-grid-react";
import { ColDef , GridReadyEvent, GridApi} from "ag-grid-community";
import {FridgesRowData, RawFridgeData} from "@/app/types/types";
import LoadingOverlayAgGrid from "@/app/components/body/LoadingOverlayAgGrid";

interface AgGridFridgeProps {
    fridgeRawData: RawFridgeData[];
    isLoadingFridge: boolean;
    isSuccessFridge: boolean;
    fridgeSelected: number;
    setMessage: (message: string) => void;
    setStoredGridApi: (api: GridApi) => void;
}

const AgGridFridge: React.FC<AgGridFridgeProps> = ({fridgeRawData, isLoadingFridge, isSuccessFridge, fridgeSelected, setMessage, setStoredGridApi}) => {
    const [fridgeTables, setFridgeTables] = useState<{[key: string]: FridgesRowData[]}>({});
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (isLoadingFridge) {
            setLoading(true);
            return;
        }

        if (isSuccessFridge && Array.isArray(fridgeRawData)) {
            if (fridgeRawData.length === 0) {
                setMessage('No fridge data found');
                setLoading(false);
                return;
            }

            const frigoDataCopy = [...fridgeRawData];
            const fridgesParsedData = frigoDataCopy.reduce((groupedFridgeData: { [key: string]: FridgesRowData[] }, rawFridgeItem: RawFridgeData) => {
                const formattedDate = formatStringDateOrder(rawFridgeItem.DataOraR);
                const state = translateFrigoState(parseInt(rawFridgeItem.FrigoState));

                const temperature = rawFridgeItem.Temperature1 ? parseFloat(rawFridgeItem.Temperature1).toFixed(2) + "°" :
                    rawFridgeItem.Temperature ? parseFloat(rawFridgeItem.Temperature).toFixed(2) : "N/A";

                const temperatureAlarm = rawFridgeItem.WarnAlarm ? parseFloat(rawFridgeItem.WarnAlarm).toFixed(2) :
                    rawFridgeItem.WarnBits ? parseFloat(rawFridgeItem.WarnBits) : "N/A";

                const alarmState = temperatureAlarm !== "N/A" && temperature !== "N/A" ?
                    Number(temperature) >= Number(temperatureAlarm) ? "ON" : "OFF" : "N/A";

                const time = getTimeString(rawFridgeItem.DataOraR);

                const formattedFridgeItem: FridgesRowData = {
                    IDFrigo: rawFridgeItem.IDFrigo,
                    dataOraR: formattedDate,
                    Time: time,
                    Id: rawFridgeItem.Id ? rawFridgeItem.Id.toString() : rawFridgeItem.ID?.toString() || "N/A",
                    Temp1: temperature,
                    AlarmTemp: alarmState,
                    WarnAlarm: temperatureAlarm.toString(),
                    Power: state.Power,
                    Sbrinamento: state.Sbrinamento,
                    Test: state.Test,
                    PorteAperte: state.PorteAperte,
                    SbrinaTempo: state.SbrinaTempo,
                    PreAllarme: state.PreAllarme,
                    Allarme: state.Allarme,
                };

                if (!groupedFridgeData[rawFridgeItem.IDFrigo]) {
                    groupedFridgeData[rawFridgeItem.IDFrigo] = [];
                }
                groupedFridgeData[rawFridgeItem.IDFrigo].push(formattedFridgeItem);

                return groupedFridgeData;
            }, {});

            setFridgeTables(fridgesParsedData);
            setLoading(false);
        }
    }, [fridgeRawData, isLoadingFridge, isSuccessFridge, setMessage, setFridgeTables, setLoading]);

    const colDefsBase: ColDef<FridgesRowData>[]  = useMemo(() => [
        { headerName: 'ID', field: 'Id', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true, floatingFilter: true, suppressHeaderFilterButton: true , suppressFloatingFilterButton: true},
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

    const onGridReady = useCallback((params: GridReadyEvent) => {
        setStoredGridApi(params.api);
    }, [setStoredGridApi]);
    return (
        <div className="w-full h-full flex-grow" >
            <div className="ag-theme-quartz-dark compact w-full h-full">
                <AgGridReact<FridgesRowData>
                    loading={loading}
                    onGridReady={onGridReady}
                    rowData={fridgeTables[fridgeSelected]}
                    columnDefs={colDefsBase}
                    loadingOverlayComponent={LoadingOverlayAgGrid}
                    loadingOverlayComponentParams={{ loadingMessage: "Loading, one moment please..." }}
                    alwaysShowVerticalScroll={true}
                />
            </div>
        </div>
    )
}

export default AgGridFridge;