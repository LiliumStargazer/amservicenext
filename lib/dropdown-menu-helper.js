import {convertCsvToExcel} from "@/lib/convertCsvToExcel";

export function handleMenuClick(fetchFunction, storedSerial, backupSelected, successCallback, setPage, value, setMessage, logDaMaster, setLoading){
    if (logDaMaster.length === 0){
        setMessage('Download backup Master first');
        return;
    }
    setLoading(true);
    successCallback([]);
    fetchFunction(storedSerial, backupSelected).then((result) => {
        if (result.length === 0){
            setMessage('No data found');
        }
        else {
            successCallback(result);
            setPage(value);
        }
    });
    setLoading(false);
}

export async function handleExport(gridApi, searchValue, setMessage, storedSerial, backupSelected, logDaMaster) {
    if (logDaMaster.length === 0){
        setMessage('Download backup Master first');
        return;
    }
    if (searchValue === '') {
        setMessage("Please search first");
    }
    else {
        try {
            const csvData = gridApi.getDataAsCsv();
            await convertCsvToExcel(csvData, 'data');
        }
        catch (error) {
            setMessage(error.message);
        }
    }
}