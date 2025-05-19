'use client'
import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFileExcel} from "@fortawesome/free-solid-svg-icons/faFileExcel";
import apiAggridExcelConverter from '@/app/utils/api-aggrid-excel-converter';
import { ModuleRegistry, CsvExportModule, GridApi } from "ag-grid-community";

interface ExcelButtonProps {
    isBackupReady: boolean
    loading: boolean;
    setMessage: (message: string) => void;
    section: string;
    storedGridAPi: GridApi | null;
}

ModuleRegistry.registerModules([ CsvExportModule ]);

const ButtonExcel: React.FC <ExcelButtonProps>= ({isBackupReady, loading, setMessage, section, storedGridAPi}) => {
    const [fade, setFade] = useState(false);
    const isDisabled = !isBackupReady || loading;

    useEffect(() => {
        if (fade) {
            const timer = setTimeout(() => setFade(false), 1000);
            return () => clearTimeout(timer);
        }
    }, [fade]);

    async function handleExportClick() {
        if ( storedGridAPi ) {
            try {
                const csvData = storedGridAPi.getDataAsCsv();
                await apiAggridExcelConverter(String(csvData), section.toString());
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
                disabled={isDisabled}
            >
                <FontAwesomeIcon
                    icon={faFileExcel}
                    size="2xl"
                    className="text-success"
                    fade={fade ? true : undefined}
                    onClick={() => {setFade(true)}}
                />
            </button>
        </div>
    );
}

export default ButtonExcel;