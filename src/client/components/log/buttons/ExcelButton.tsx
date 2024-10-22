import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFileExcel} from "@fortawesome/free-solid-svg-icons/faFileExcel";
import useStore from "@/app/store";
import ExcelJS from "exceljs";
import {GridApi} from 'ag-grid-community';

const ExcelButton: React.FC = () => {
    const logDaMaster = useStore(state => state.excelEvents);
    const setMessage = useStore(state => state.setMessage);
    const searchValueDebounced = useStore(state => state.searchValueDebounced);
    const gridApi = useStore(state => state.gridApiStore) as GridApi | null;
    const loadingGbloal = useStore(state => state.loadingGlobal);

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

    async function handleExportClick() {
        if (logDaMaster.length === 0) {
            setMessage('Download backup Master first');
            return;
        }
        if (searchValueDebounced === '') {
            setMessage("Please search something first");
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

    return (
        <div >
            <button
                onClick={()=> handleExportClick()}
                disabled={loadingGbloal}
            >
                <FontAwesomeIcon icon={faFileExcel} size="2xl" className="text-success" />
            </button>
        </div>
    );
}

export default ExcelButton;