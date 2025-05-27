import SwapChartTable from './SwapChartTable';
import SelectFridge from './SelectFridge';
import { useEffect, useState } from 'react';
import ContainerChartFridge from './ContainerChartFridge';
import { RawFridgeData } from '../../types/types';
import AgGridFridge from './AgGridFridge';
import { GridApi } from 'ag-grid-community';
import { useFridgeEventsQuery } from '@/app/hooks/useQueries';

interface ContainerFridgeSectionProps {
    serial: string;
    backup: string;
    setMessage: (message: string) => void;
    setStoredGridApi: (api: GridApi) => void;
}

const ContainerFridgeSection: React.FC<ContainerFridgeSectionProps> = ({ serial, backup, setMessage, setStoredGridApi }) => {
    const [fridgeSelected, setFridgeSelected] = useState<number>(0);
    const [fridgeRawData, setFridgeRawData] = useState<RawFridgeData[]>([]);
    const [section, setSection] = useState<string>('table');
    const { data, error } = useFridgeEventsQuery(serial, backup);
    useEffect(() => {

        if (Array.isArray(data)) {
            setFridgeRawData(data);
        }
    }, [data]);
    
    useEffect(() => {
        if (error) {
            
            setMessage('Error fetching fridge data');
        }
    }, [error, setMessage]);
    // Map the returned values to the expected props

    return (
        <>
            <div className="flex justify-left space-x-2">
                <SwapChartTable section={section} setSection={setSection} />
                <SelectFridge
                    fridgeRawData={fridgeRawData}
                    setFridgeSelected={setFridgeSelected}
                />
            </div>
            {section === 'chart' && (
                <ContainerChartFridge
                    fridgeRawData={fridgeRawData as RawFridgeData[]}
                    fridgeSelected={fridgeSelected}
                    setMessage={setMessage}
                />
            )}
            {section === 'table' && (
                <AgGridFridge
                    fridgeRawData={fridgeRawData as RawFridgeData[]}
                    fridgeSelected={fridgeSelected}
                    setMessage={setMessage}
                    setStoredGridApi={setStoredGridApi}
                />
            )}
        </>
    );
};

export default ContainerFridgeSection;