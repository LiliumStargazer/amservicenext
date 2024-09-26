import { useState, useEffect } from 'react';
import useStore from "@/app/store";


const useReset = () => {
    const setStoredSerial = useStore(state => state.setStoredSerial);
    const setBackupList = useStore(state=> state.setBackupList);
    const setBackupSelected = useStore(state=> state.setBackupSelected);
    const setLogDaMaster = useStore(state=> state.setLogDaMaster);
    //const setSoftwareType = useStore(state=> state.setSoftwareType);
    const setFrigoData = useStore(state=> state.setFrigoData);
    const setParam = useStore(state=> state.setParam);
    const backupSelected = useStore(state => state.backupSelected);
    const setLatestBackup = useStore(state => state.setlatestBackup);

    return ( (formattedSerial: string) => {

            setStoredSerial(null)
            setBackupList([]);
            if (formattedSerial !== backupSelected){
                setBackupSelected('');
                setLatestBackup('');
            }
            setLogDaMaster([]);
            //setSoftwareType('unknown');
            setFrigoData([])
            setParam({})
    });
}

export default useReset;


