import React, {useEffect, useContext, useMemo, useState} from "react";
import {Context} from "@/app/Context";
import {AgGridReact} from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

function TableFrigo() {
    const { frigoData,  frigoTables, setFrigoTables, frigoSelected, setFrigoNumber} = useContext(Context);
    const [gridApi, setGridApi] = useState(null);
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({height: window.innerHeight-100, width: '100%' }), []);
    const onGridReady = (params) => {
        setGridApi(params.api);
    };

    function formatStringData(stringaInput) {
        let dataInput = new Date(stringaInput);
        let giorno = dataInput.getDate();
        let mese = dataInput.getMonth() + 1;
        let anno = dataInput.getFullYear();
        return giorno + '/' + mese + '/' + anno;
    }

    function getTimeString(stringaInput) {
        let part = stringaInput.split(" ");
        return part[1];
    }

    const filterDateParam = {
        comparator: (filterLocalDateAtMidnight, cellValue) => {
            const dateAsString = cellValue;
            if (dateAsString == null) return -1;
            const dateParts = dateAsString.split('/');
            const cellDate = new Date(
                Number(dateParts[2]),
                Number(dateParts[1]) - 1,
                Number(dateParts[0])
            );
            if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
                return 0;
            }
            if (cellDate < filterLocalDateAtMidnight) {
                return -1;
            }
            if (cellDate > filterLocalDateAtMidnight) {
                return 1;
            }
            return 0;
        },
    };

    function computeState(element) {
        const frigoStatus = element;
        let power = "";
        let sbrinamento = "OFF";
        let test = "OFF";
        let porteAperte = "OFF";
        let sbrinaTempo = "OFF";
        let preAllarme = "OFF";
        let allarme = "OFF";

        if ((frigoStatus & 1) !== 0)
            power = "ON";
        else
            power = "OFF";

        if ((frigoStatus & 2) !== 0)
            sbrinamento = "ON";
        if ((frigoStatus & 4) !== 0)
            test= "ON";
        if ((frigoStatus & 8) !== 0)
            porteAperte= "ON";
        if ((frigoStatus & 0x10) !== 0)
            sbrinaTempo= "ON";
        if ((frigoStatus & 0x40) !== 0)
            preAllarme= "ON";
        if ((frigoStatus & 0x80) !== 0)
            allarme= "ON";

        return {
            "Power": power,
            "Sbrinamento": sbrinamento,
            "Test": test,
            "PorteAperte": porteAperte,
            "SbrinaTempo": sbrinaTempo,
            "PreAllarme": preAllarme,
            "Allarme": allarme
        };
    }


    useEffect(() => {
        const frigoDataCopy = [...frigoData];
        const splittedTables = frigoDataCopy.reduce((tablesObject, rowFrigoData) => {
            const formattedDate = formatStringData(rowFrigoData.DataOraR);
            const state = computeState(rowFrigoData.FrigoState);
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

        setFrigoTables(splittedTables);
         if ( Object.keys(splittedTables).length > 0)
                setFrigoNumber(Object.keys(splittedTables).length-1);
    }, [frigoData]);



    const colDefs = useMemo(() =>[
        { headerName: 'ID', field: 'ID', flex: 1, cellStyle: { whiteSpace: 'nowrap' } , filter: true},
        { headerName: 'Data', field: 'dataOraR', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: 'agDateColumnFilter', filterParams: filterDateParam },
        { headerName: 'Time', field: 'Time', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true,},
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
    ]);

    const options = {
        rowBuffer:50,
        defaultColDef: {
            cellStyle: {textAlign: 'left', height: '100%'},
        },
        pagination: true,
        paginationPageSizeSelector: [200, 500, 1000],
        paginationPageSize: 500,
        onGridReady:onGridReady,
    }

    return (
        <div style={containerStyle}>
            <div
                className={"ag-theme-quartz-dark"}
                style={gridStyle}
            >
            <AgGridReact
                columnMenu={'new'}
                columnDefs={colDefs}
                rowData={frigoTables[frigoSelected]}
                gridOptions={options}
            />
            </div>
        </div>
    )
}

export default TableFrigo;
