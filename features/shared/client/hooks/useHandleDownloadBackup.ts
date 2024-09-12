import { useCallback } from 'react';
import { stringToDate, isEmpty, isGreaterThanOne, getSerialValidationMessage, trimAndFormatSerial } from "@/features/shared/client/utils/utils";
import { getBackupList, getBackupDataFromServer, getSerialValidationServer } from "@/features/shared/client/api";
import useStore from "@/app/store";

interface Router {
    push: (url: string) => void;
}

function useHandleDownloadBackup(router: Router) {
    const setSerial = useStore(state => state.setSerial);
    const setMessage = useStore(state => state.setMessage);
    const setLoading = useStore(state => state.setLoading);
    const setTable = useStore(state => state.setTable);
    const setStoredSerial = useStore(state => state.setStoredSerial);
    const setBackupList = useStore(state => state.setBackupList);
    const setBackupSelected = useStore(state => state.setBackupSelected);
    const setLogDaMaster = useStore(state => state.setLogDaMaster);
    const setSoftwareType = useStore(state => state.setSoftwareType);
    const setFrigoData = useStore(state => state.setFrigoData);
    const setParams = useStore(state => state.setParam);

    interface BackupElement {
        [index: number]: string;
    }

    const selectLatestBackup = (backupList: BackupElement[]) => {
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
    }

    const extractSoftwareType = (latestBackup: string, backupList: BackupElement[]) => {
        if (latestBackup.includes('AndBk')) return 'android';
        if (latestBackup.includes('DbBackup')) return 'windows';

        const foundElement = backupList.find(
            element => element[0].includes('AndBk') || element[0].includes('DbBackup')
        );

        return foundElement ? (foundElement[0].includes('AndBk') ? 'android' : 'windows') : 'unknown';
    };

    const reset = () => {
        setStoredSerial(null);
        setBackupList([]);
        setBackupSelected('');
        setLogDaMaster([]);
        setSoftwareType('unknown');
        setFrigoData([]);
        setParams({});
    }

    return useCallback(async (serial: string) => {
        const formattedSerial = trimAndFormatSerial(serial);
        setSerial(formattedSerial);
        const message = getSerialValidationMessage(formattedSerial);
        if (message !== "valid") {
            setMessage(message);
            return;
        }

        setLoading(true);
        setTable("master");
        router.push("/log");
        reset();
        try {
            const serialValidated = await getSerialValidationServer(formattedSerial);
            if (serialValidated.error) {
                setMessage(serialValidated.error);
                return;
            }

            setStoredSerial(formattedSerial);

            // Fetch backup list and handle errors
            const backupListTemp = await getBackupList(formattedSerial);
            if (backupListTemp.error || !Array.isArray(backupListTemp)) {
                setMessage("No database files: " + backupListTemp.error);
                return;
            }

            // Process the latest backup
            const latestBackup = selectLatestBackup(backupListTemp);
            const backupData = await getBackupDataFromServer(formattedSerial, latestBackup);

            // Handle errors or empty backup data
            if (backupData.error) {
                setMessage("Database corrupted: " + backupData.error);
                return;
            }

            if (isEmpty(backupData)) {
                setMessage('The backup does not exist on the server, please check the serial number and try again.');
                return;
            }

            // Update state with fetched data
            const softwareTypeTemp = extractSoftwareType(latestBackup, backupListTemp);
            setLogDaMaster(backupData);
            setBackupList(backupListTemp);
            setBackupSelected(latestBackup);
            setSoftwareType(softwareTypeTemp);
            setMessage('');

        } catch (error) {
            console.error('Error while downloading backup:', error);
            setMessage("An error occurred while downloading the backup.");
        } finally {
            setLoading(false);
        }
    }, [setSerial, setMessage, setLoading, setTable, router]);
}

export default useHandleDownloadBackup;