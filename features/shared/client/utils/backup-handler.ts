import { stringToDate, isEmpty, isChanged, isNull, isGreaterThanOne } from "@/features/shared/client/utils/utils";
import { getBackupList, downloadExtractAndReadBackup, getSerialValidationServer } from "@/features/shared/client/api";
import useStore from "@/app/store";

// lib/backup-handler.ts

interface BackupElement {
    [index: number]: string;
}
function setDataOnContext({ backupList, backupData, softwareTypeTemp, latestBackup }: {
    backupList: any[];
    backupData: any[];
    softwareTypeTemp: string;
    latestBackup: string;
}): void {
    const setLogDaMaster = useStore.getState().setLogDaMaster;
    const setBackupList = useStore.getState().setBackupList;
    const setBackupSelected = useStore.getState().setBackupSelected;
    const setSoftwareType = useStore.getState().setSoftwareType;

    setLogDaMaster(backupData);
    setBackupList(backupList);
    setBackupSelected(latestBackup);
    setSoftwareType(softwareTypeTemp);
}

function selectLatestBackup(backupList: BackupElement[]): string {
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

export function validateSerialAndSetAlert(serial: string) {

    const setSerial = useStore.getState().setSerial;
    const setMessage = useStore.getState().setMessage;
    const serialTrimmed = serial.trim();

    if (serialTrimmed.length === 4)
        setSerial("0" + serial);
    if (serialTrimmed === "") {
        setMessage("Please type a serial-numbers number");
        return false;
    } else if (isNaN(parseInt(serialTrimmed, 10))) {
        setMessage("Serial number must be a number");
        return false;
    } else if (serialTrimmed.length < 4) {
        setMessage("Serial number too short");
        return false;
    } else if (serialTrimmed.length > 5) {
        setMessage("Serial number too long");
        return false;
    }
    return true;
}

function getSoftwareType(latestBackup: string, backupList: BackupElement[]): string {
    if (latestBackup.includes('AndBk')) {
        return 'android';
    } else if (latestBackup.includes('DbBackup')) {
        return 'windows';
    } else if (latestBackup.includes('LastBk')) {
        const foundElement = backupList.find(
            element => element[0].includes('AndBk') || element[0].includes('DbBackup')
        );
        if (foundElement) {
            if (foundElement[0].includes('AndBk')) {
                return 'android';
            } else if (foundElement[0].includes('DbBackup')) {
                return 'windows';
            }
        } else {
            return 'unknown';
        }
    }
    return 'unknown';
}

function reset(): void {
    const setStoredSerial = useStore.getState().setStoredSerial;
    const setBackupList = useStore.getState().setBackupList;
    const setBackupSelected = useStore.getState().setBackupSelected;
    const setLogDaMaster = useStore.getState().setLogDaMaster;
    const setSoftwareType = useStore.getState().setSoftwareType;
    const setMessage = useStore.getState().setMessage;
    const setFrigoData = useStore.getState().setFrigoData;

    setStoredSerial(null);
    setBackupList([]);
    setBackupSelected('');
    setLogDaMaster([]);
    setSoftwareType('unknown');
    setMessage('');
    setFrigoData([]);
}

function partialReset(): void {
    const setLogDaMaster = useStore.getState().setLogDaMaster;
    const setMessage = useStore.getState().setMessage;
    const setFrigoData = useStore.getState().setFrigoData;

    setLogDaMaster([]);
    setFrigoData([]);
    setMessage('');
}


export async function handleDownload(serial: string): Promise<boolean | void> {

    try {
        const { storedSerial, backupSelected, setStoredSerial, setMessage, setLogDaMaster, setSoftwareType, backupList,
            setBackupList, setBackupSelected} = useStore.getState();

        if (isNull(storedSerial) || isChanged(storedSerial ?? '', serial)) {
            reset();
            const serialValidated = await getSerialValidationServer(serial);
            if (serialValidated.error != null) {
                setMessage(serialValidated.error);
                return;
            }
            if (serialValidated) {
                setStoredSerial(serial);
                const backupList = await getBackupList(serial);
                if (!Array.isArray(backupList)) {
                    setMessage("No database files: " + backupList.error);
                    setLogDaMaster([]);
                    setSoftwareType('unknown');
                } else {
                    const latestBackup = selectLatestBackup(backupList);
                    const backupData = await downloadExtractAndReadBackup(serial, latestBackup);
                    if (backupData.error) {
                        setMessage("database corrupted: " + backupData.error);
                    }
                    if (isEmpty(backupData)) {
                        setMessage('The backup does not exist on the server, please check the serial-numbers number and try again.');
                    }

                    const softwareTypeTemp = getSoftwareType(latestBackup, backupList);
                    setLogDaMaster(backupData);
                    setBackupList(backupList);
                    setBackupSelected(latestBackup);
                    setSoftwareType(softwareTypeTemp);
                    return true;
                }
            } else {
                setMessage('The backup does not exist on the server, please check the serial-numbers number and try again.');
            }
        } else if (!isEmpty(backupSelected)) {
            partialReset();
            const backupData = await downloadExtractAndReadBackup(serial, backupSelected);
            if (backupData.error) {
                setMessage("database corrupted: " + backupData.error);
                return;
            }
            setLogDaMaster(backupData);
            if (!backupList) {
                const softwareTypeTemp = getSoftwareType(backupSelected, backupList);
                setSoftwareType(softwareTypeTemp);
            }
        }
    } catch (error) {
        console.error('Error while downloading backup:', error);
    }
}