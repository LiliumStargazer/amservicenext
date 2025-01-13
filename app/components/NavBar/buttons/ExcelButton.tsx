'use client'
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFileExcel} from "@fortawesome/free-solid-svg-icons/faFileExcel";
import stringApiGridToExcelConverter from '@/app/utils/stringApiGridToExcelConverter';
import { ModuleRegistry, CsvExportModule, GridApi } from "ag-grid-community";

interface ExcelButtonProps {
    loading: boolean;
    setMessage: (message: string) => void;
    section: string;
    storedGridAPi: GridApi | null;
}

ModuleRegistry.registerModules([ CsvExportModule ]);

const ExcelButton: React.FC <ExcelButtonProps>= ({loading, setMessage, section, storedGridAPi}) => {


    async function handleExportClick() {
        if ( storedGridAPi ) {
            try {
                const csvData = storedGridAPi.getDataAsCsv();
                await stringApiGridToExcelConverter(String(csvData), section.toString());
            } catch (error) {
                setMessage((error as Error).message);
            }
        }else {
            setMessage('The Api for the grid is not ready yet');
        }
    }

    return (
        <div >
            <button
                onClick={()=> handleExportClick()}
                disabled={loading}
            >
                <FontAwesomeIcon icon={faFileExcel} size="2xl" className="text-success" />
            </button>
        </div>
    );
}

export default ExcelButton;