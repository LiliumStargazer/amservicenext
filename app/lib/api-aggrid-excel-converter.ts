import ExcelJS from 'exceljs';

async function apiAggridExcelConverter(csvData: string, fileName: string): Promise<void> {
    try {
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
    } catch (error) {
        console.error('Error converting CSV to Excel:', error);
    }
}

export default apiAggridExcelConverter;