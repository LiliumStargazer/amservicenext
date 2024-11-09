import React, {useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFileExcel} from "@fortawesome/free-solid-svg-icons/faFileExcel";
import useStore from "@/app/store";
import {GridApi} from 'ag-grid-community';
import stringApiGridToExcelConverter from '@/src/client/utils/stringApiGridToExcelConverter';

const ExcelButton: React.FC = () => {
    const setMessage = useStore(state => state.setMessage);
    const gridApiStore = useStore(state => state.gridApiStore) as GridApi | null;
    const loadingGbloal = useStore(state => state.loadingGlobal);
    const setExcelData = useStore(state => state.setExcelData);
    const serial = useStore(state => state.serial);
    const table = useStore(state => state.table);

    useEffect(() => {
        if (serial && serial.length > 0){
            setExcelData([]);
        }
    }, [serial]);

    async function handleExportClick() {
        if ( gridApiStore ) {
            try {
                const csvData = gridApiStore.getDataAsCsv();
                await stringApiGridToExcelConverter(String(csvData), table.toString());
            } catch (error) {
                setMessage((error as Error).message);
            }
        }else {
            setMessage('The Api for the grid is not ready yet');
        }
    }

    if (table === 'no_table')
        return null;

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