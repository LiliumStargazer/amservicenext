import React, {useEffect} from "react";
import useStore from "@/app/store";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import {formatStringToDate, getTimeString} from "@/features/shared/client/utils/utils";
import {translateFrigoState} from "@/features/log/client/utils/event-converter";
import AgGrid from "@/features/shared/client/components/AgGrid";
import {defaultColDef} from "@/features/log/client/utils/aggrid-helper";

const colDefs = [
    { headerName: 'ID', field: 'ID', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true },
    { headerName: 'Data', field: 'dataOraR', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true },
    { headerName: 'Time', field: 'Time', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true },
    { headerName: 'Temp1', field: 'Temp1', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true },
    { headerName: 'Warn Alarm', field: 'WarnAlarm', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true },
    { headerName: 'Allarm Temp', field: 'AlarmTemp', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true },
    { headerName: 'Power', field: 'Power', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true },
    { headerName: 'Sbrinamento', field: 'Sbrinamento', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true },
    { headerName: 'Test', field: 'Test', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true },
    { headerName: 'Porte Aperte', field: 'PorteAperte', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true },
    { headerName: 'Sbrina a Tempo', field: 'SbrinaTempo', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true },
    { headerName: 'Pre-Allarme', field: 'PreAllarme', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true },
    { headerName: 'Allarme', field: 'Allarme', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true },
];

const AggridFrigo: React.FC = () => {
    const frigoData = useStore(state => state.frigoData);
    const frigoTables = useStore(state => state.frigoTables);
    const setFrigoTables = useStore(state => state.setFrigoTables);
    const frigoSelected = useStore(state => state.frigoSelected);
    const setFrigoSelected = useStore(state => state.setFrigoSelected);
    const setFrigoNumber = useStore(state => state.setFrigoNumber);

    useEffect(() => {
        const frigoDataCopy = [...frigoData];

        let arrayTables = frigoDataCopy.reduce((tablesObject, rowFrigoData) => {
            const formattedDate = formatStringToDate(rowFrigoData.DataOraR );
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

        }, {});

        //controllo che la prima posizione sia piena, altrimenti tiro tutto indietro di 1
        if (!arrayTables[0]) {
            const updatedTables: { [key: number]: any[] } = {};
            Object.keys(arrayTables).forEach(key => {
                const newKey = parseInt(key) - 1;
                updatedTables[newKey] = arrayTables[parseInt(key)];
            });
            arrayTables = updatedTables;
        }
        setFrigoTables(arrayTables);
        setFrigoNumber(Object.keys(arrayTables).length);
        setFrigoSelected(0);

    }, [frigoData]);

    const options = {
        rowBuffer: 50,
        defaultColDef: {
            cellStyle: { textAlign: 'left', height: '100%' },
        },
        pagination: true,
        paginationPageSizeSelector: [200, 500, 1000],
        paginationPageSize: 200,
    }

    if (!frigoTables[frigoSelected]) {
        return null;
    }

    return (
        <AgGrid
            rows={frigoTables[frigoSelected]}
            colDefs={colDefs}
            options={options}
            defaultColDef={defaultColDef}
        />
    )
}

export default AggridFrigo;