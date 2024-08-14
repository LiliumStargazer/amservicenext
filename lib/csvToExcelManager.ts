import ExcelJS from 'exceljs';



interface GridApi {
    getDataAsCsv: () => string;
}

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

export async function handleExport(
    gridApi: GridApi,
    searchValue: string,
    setMessage: (message: string) => void,
    storedSerial: string,
    backupSelected: string,
    logDaMaster: any[]
): Promise<void> {
    if (logDaMaster.length === 0) {
        setMessage('Download backup Master first');
        return;
    }
    if (searchValue === '') {
        setMessage("Please search first");
        return;
    }

    try {
        const csvData = gridApi.getDataAsCsv();
        await csvToExcelConverter(csvData, 'data');
    } catch (error) {
        setMessage((error as Error).message);
    }
}
