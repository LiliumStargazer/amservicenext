import React, { useCallback, useEffect, useState } from 'react';
import useStore from "@/app/store";
import { getBackupList } from "@/features/shared/client/api";
import { isGreaterThanOne, stringToDate } from "@/features/shared/client/utils/utils";

interface SelectBackupProps {}

const SelectBackup: React.FC<SelectBackupProps> = () => {
    const backupSelected = useStore(state => state.backupSelected);
    const setBackupSelected = useStore(state => state.setBackupSelected);
    const storedSerial = useStore(state => state.storedSerial);
    const setMessage = useStore(state => state.setMessage);
    const setBackupList = useStore(state => state.setBackupList);
    const [backupArray, setBackupArray] = useState<React.ReactNode[]>([]);

    const selectLatestBackup = useCallback((backupList: any[]) => {
        let latestDate: Date | null = null;
        let latestBackup: string = '';
        for (let element of backupList) {
            let date = stringToDate(element[2]);
            if (latestDate === null || (date > latestDate && isGreaterThanOne(element[1]))) {
                latestDate = date;
                latestBackup = element[0];
            }
        }
        return latestBackup;
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if (!storedSerial || storedSerial.length === 0) return;

            try {
                const backupListTemp = await getBackupList(storedSerial);
                if (backupListTemp.error || !Array.isArray(backupListTemp)) {
                    setMessage("No database files: " + backupListTemp.error);
                    return;
                }
                const latestBackup = selectLatestBackup(backupListTemp);
                setBackupList(backupListTemp);
                setBackupSelected(latestBackup);

                if (backupListTemp.length > 0) {
                    let backupArrayTemp: React.ReactNode[] = [];

                    const validBackups = backupListTemp
                        .filter(element => !element[1].includes("0 bytes"))
                        .map(element => element[0]);

                    validBackups.sort().reverse();

                    backupArrayTemp = validBackups.map(element => <option key={element}>{element}</option>);
                    setBackupArray(backupArrayTemp);
                } else {
                    setBackupArray([]);
                }
            } catch (error) {
                console.error('Error fetching backup list:', error);
                setMessage("An error occurred while fetching the backup list.");
            }
        };
        fetchData().catch(err => console.error('Error in fetchData:', err));
    }, [storedSerial]);

    return (
        <select
            className="select select-md select-bordered max-w-min min-w-44 join-item"
            value={backupSelected}
            onChange={(event) => setBackupSelected(event.target.value)}
        >
            {backupArray}
        </select>
    );
};

export default SelectBackup;