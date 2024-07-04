import { stringToDate, isEmpty, isChanged, isNull, isGreaterThanOne } from "@/lib/utils";
import { getBackupList, downloadExtractAndReadBackup, getSerialValidationServer } from "@/lib/api";

export async function handleDownload(serial, context) {
    try {
        const { setStoredSerial, setBackupList, setBackupSelected, setLogDaMaster, setSoftwareType, storedSerial,
            backupSelected, setMessage , setFrigoData, backupList} = context;

        if (isNull(storedSerial) || isChanged(storedSerial, serial)) {
            reset(setStoredSerial, setBackupList, setBackupSelected, setLogDaMaster, setSoftwareType, setMessage, setFrigoData);
            const serialValidated = await getSerialValidationServer(serial)
            if (serialValidated.error) {
                setMessage(serialValidated.error);
                return;
            }
            if (serialValidated) {
                setStoredSerial(serial);
                const backupList = await getBackupList(serial);

                if (backupList.error) {
                    setMessage("No database files: "+ backupList.error);
                    setLogDaMaster([]);
                    setSoftwareType('unknown');
                }
                else{
                    const latestBackup = selectLatestBackup(backupList);
                    const backupData = await downloadExtractAndReadBackup(serial, latestBackup);
                    if (backupData.error) {
                        setMessage("database corrupted: ", backupData.error);
                    }
                    if (isEmpty(backupData)) {
                        setMessage('The backup does not exist on the server, please check the serial number and try again.');
                    }

                    const softwareTypeTemp = getSoftwareType(latestBackup, backupList);
                    setDataOnContext({ setLogDaMaster, setBackupList, setBackupSelected, setSoftwareType, backupList, backupData, softwareTypeTemp, latestBackup });
                    return true;
                }
                if (isEmpty(backupList)) {
                    setMessage('There are no backups on the server, please check the serial number and try again.');
                }

            } else {
                setMessage('The backup does not exist on the server, please check the serial number and try again.');
            }
        } else if (!isEmpty(backupSelected)) {
            partialReset(setLogDaMaster, setMessage, setFrigoData);
            const backupData = await downloadExtractAndReadBackup(serial, backupSelected);
            if (backupData.error) {
                setMessage("database corrupted : "+ backupData.error);

                return;
            }
            setLogDaMaster(backupData);
            if (!backupList.error ){
                const softwareTypeTemp = getSoftwareType(backupSelected, backupList);
                setSoftwareType(softwareTypeTemp);
            }
        }
    }
    catch (error) {
        console.error('Error while downloading backup:', error);
    }
}

function setDataOnContext({ setLogDaMaster, setBackupList, setBackupSelected, setSoftwareType, backupList, backupData, softwareTypeTemp, latestBackup }) {
    setLogDaMaster(backupData);
    setBackupList(backupList);
    setBackupSelected(latestBackup);
    setSoftwareType(softwareTypeTemp);
}

function selectLatestBackup(backupList) {
    let latestDate = null;
    let latestBackup = null;
    for (let element of backupList) {
        let date = stringToDate(element[2]);
        if (latestDate === null || (date > latestDate && isGreaterThanOne(element[1]))) {
            latestDate = date;
            latestBackup = element[0];
        }
    }
    return latestBackup;
}

function getSoftwareType(latestBackup, backupList) {

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
}

function reset(setStoredSerial, setBackupList, setBackupSelected, setLogDaMaster, setSoftwareType, setMessage, setFrigoData) {
    setStoredSerial(null);
    setBackupList([]);
    setBackupSelected('');
    setLogDaMaster([]);
    setSoftwareType('unknown');
    setMessage('');
    setFrigoData([]);
}

function partialReset(setLogDaMaster, setMessage, setFrigoData) {
    setLogDaMaster([]);
    setFrigoData([]);
    setMessage('');
}

export function validateSerial(serial, setMessage, setSerial) {

    if (serial.length === 4) setSerial("0" + serial);
    if (serial === "") {
        setMessage("Please type a serial number");
        return false;
    } else if (serial.length < 4) {
        setMessage("Serial number too short");
        return false;
    } else if (serial.length > 5) {
        setMessage("Serial number too long");
        return false;
    } else if (isNaN(parseInt(serial, 10))) {
        setMessage("Serial number must be a number");
        return false;
    }

    return true;
}
