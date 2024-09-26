import React from 'react';
import {getParam, getFridgeData} from "@/features/shared/client/api";
import useStore from "@/app/store";
import ExcelJS from "exceljs";
import {GridApi} from 'ag-grid-community';

async function csvToExcelConverter(csvData: string, fileName: string): Promise<void> {
    csvData = csvData.replace(/""/g, '');
    const csvArray = csvData.split('\n').map(row => row.split(','));
    for (const element of csvArray) {
        for (let j = 0; j < element.length; j++) {
            element[j] = element[j].replace(/"/g, '');
        }
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(fileName);

    csvArray.forEach((row) => {
        worksheet.addRow(row);
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `${fileName}.xlsx`;
    link.click();

    // Cleanup
    URL.revokeObjectURL(url);
}

const DropDownMenu: React.FC = () => {
    const setTable = useStore(state => state.setTable);
    const setMessage = useStore(state => state.setMessage);
    const gridApi = useStore(state => state.gridApi) as GridApi | null;
    const searchValue = useStore(state => state.searchValue);
    const storedSerial = useStore(state => state.storedSerial) ?? '';
    const backupSelected = useStore(state => state.backupSelected);
    const logDaMaster = useStore(state => state.logDaMaster);
    const setFrigoData = useStore(state => state.setFrigoData);
    const setParam = useStore(state => state.setParam);
    const setLoading = useStore(state => state.setLoading);

    async function handleExportClick() {
        if (logDaMaster.length === 0) {
            setMessage('Download backup Master first');
            return;
        }
        if (searchValue === '') {
            setMessage("Please search first");
            return;
        }

        if ( gridApi ) {
            try {
                const csvData = gridApi.getDataAsCsv();
                await csvToExcelConverter(String(csvData), 'data');
            } catch (error) {
                setMessage((error as Error).message);
            }
        }
    }

    const handleDataFetch = async (
        fetchFunction: (serial: string, backup: string , id:string ) => Promise<any>,
        setDataCallback: (data: any) => void
    ) => {
        setLoading(true);
        try {
            const data = await fetchFunction(storedSerial, backupSelected, "MAX(ID)");
            setDataCallback(data);
            //per gestire l'array dei frigo
            if ( Array.isArray(data))
                return data.length > 0;
            //per gestire l'oggetto dei parametri
            return !!data;
        } catch (error) {
            if (error instanceof Error) {
                setMessage(error.message);
            } else {
                setMessage('An unexpected error occurred');
            }
        } finally {
            setLoading(false);
        }
    };


    const handleFrigoClick = async () => {

        const result = await handleDataFetch(getFridgeData, setFrigoData);
        if (result) {
            setTable("frigo");
        } else {
            setMessage("No fridge data to display");
        }
    }

    const handleParamClick = async () => {
        const result = await handleDataFetch(getParam, setParam);
        if (result) {
            setTable("param");
        } else {
            setMessage("No param data to display");
        }
    }


    return (
        <div className="dropdown dropdown-hover dropdown-bottom dropdown-end">
            <button className="btn-rounded mt-2 ml-2 mr-2">
                <svg
                    className="swap-off fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 512 512"
                >
                    <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z"/>
                </svg>
            </button>
            <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                    <button onClick={() => setTable("master")}>Master</button>
                </li>
                <li>
                    <button onClick={() => setTable("listransaction")}>Lis Transactions
                    </button>
                </li>
                <li>
                    <button onClick={() => setTable("fingertransaction")}>Fingers Transactions
                    </button>
                </li>
                <li>
                    <button onClick={() => handleFrigoClick()}>Frigo</button>
                </li>
                <li>
                    <button onClick={() => handleParamClick()}>Param
                    </button>
                </li>
                <li>
                    <button onClick={() => handleExportClick()}>Export To Excel
                    </button>
                </li>

            </ul>
        </div>
    );
}

export default DropDownMenu;