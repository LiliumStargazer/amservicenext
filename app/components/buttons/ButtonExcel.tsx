'use client'
import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFileExcel} from "@fortawesome/free-solid-svg-icons/faFileExcel";
import apiAggridExcelConverter from '@/app/lib/api-aggrid-excel-converter';
import { ModuleRegistry, CsvExportModule, GridApi } from "ag-grid-community";

interface ExcelButtonProps {
    disabled: boolean;
    setMessage: (message: string) => void;
    section: string;
    storedGridAPi: GridApi | null;
}

ModuleRegistry.registerModules([ CsvExportModule ]);

const ButtonExcel: React.FC <ExcelButtonProps>= ({disabled, setMessage, section, storedGridAPi}) => {
    const [fade, setFade] = useState(false);

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
                disabled={disabled}
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