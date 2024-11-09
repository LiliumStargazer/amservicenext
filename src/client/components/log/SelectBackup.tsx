import React, {useCallback, useEffect, useState} from 'react';
import useStore from "@/app/store";
import { isGreaterThanOne, stringToDate } from "@/src/client/utils/utils";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {apiGetBackupList} from "@/src/client/api/api";

interface SelectBackupProps {}

const SelectBackup: React.FC<SelectBackupProps> = () => {
    const backupSelected = useStore(state => state.backupSelected);
    const setBackupSelected = useStore(state => state.setBackupSelected);
    const serial = useStore(state => state.serial);
    const setMessage = useStore(state => state.setMessage);
    const setBackupList = useStore(state => state.setBackupList);
    const backupList = useStore(state => state.backupList);
    const table = useStore(state => state.table);
    const setTable = useStore(state => state.setTable);
    const loadingGlobal = useStore(state => state.loadingGlobal);
    const setLoadingGlobal = useStore(state => state.setLoadingGlobal);
    const [backupOptions, setBackupOptions] = useState<React.ReactNode[]>([]);
    const queryClient = useQueryClient();
    const [isSerialChanged, setIsSerialChanged] = useState(false);

    const { isLoading, isError, data, error } = useQuery({
        queryKey: ['getBackuplist', serial, backupList, isSerialChanged],
        queryFn: () => apiGetBackupList(serial),
        enabled: backupList.length === 0 && isSerialChanged && !!serial,
    });

    useEffect(() => {
        setBackupSelected('');
        setBackupList([]);
        setIsSerialChanged(true);
    }, [serial, setBackupList, setBackupSelected, setIsSerialChanged]);

    const getLatestBackup = useCallback((backupList: any[]) => {
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

        if (isLoading){
            setLoadingGlobal(true);
            return;
        }

        if (isError){
            setLoadingGlobal(false);
            setMessage("An error occurred while fetching the backup list: " + error.message);
            setTable("no_table");
            return
        }

        if ( data && data.error ){
            if ( data.error.includes("No such file"))
                setMessage("No backup found");
            else
                setMessage("An error occurred while fetching the backup list: " + data.error);

            setTable("no_table");
            setLoadingGlobal(false);
            return
        }

        if (data && data.length !== 0) {
            const latestBackup = getLatestBackup(data);

            if ( data.length > 0) {
                const list : any[] = data;
                const filteredAndSortedBackups = list
                    .filter(element => !element[1].includes("0 bytes"))
                    .map(element => element[0]);

                filteredAndSortedBackups.sort().reverse();

                let backupOptions: React.ReactNode[] = [] = filteredAndSortedBackups.map(element => <option key={element}>{element}</option>);
                setBackupOptions(backupOptions);
            }
            setBackupList(data);
            setBackupSelected(latestBackup);
            setIsSerialChanged(false);
        }
    }, [isError, data, error, queryClient, isLoading, serial, backupList, setBackupList, setBackupSelected, setMessage, setTable, setLoadingGlobal, getLatestBackup]);

    if ( table !== 'master' && table !== 'no_table')
        return;

    if (backupOptions.length === 0)
        return;

    return (
        <select
            className="select select-md select-bordered max-w-min min-w-44 join-item"
            value={backupSelected}
            onChange={(event) => setBackupSelected(event.target.value)}
            disabled={loadingGlobal}
        >
            {backupOptions}
        </select>
    );
};

export default SelectBackup;