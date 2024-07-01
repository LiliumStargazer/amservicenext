import { stringToDate, isEmpty, isChanged, isNull, isGreaterThanOne } from "@/lib/utils";
import { getBackupList, downloadExtractAndReadBackup, getSerialValidationServer } from "@/lib/api";

export async function handleDownload(serial, context) {
    try {
        const { setStoredSerial, setBackupList, setBackupSelected, setLogDaMaster, setSoftwareType, storedSerial, backupSelected, setMessage } = context;

        if (isNull(storedSerial) || isChanged(storedSerial, serial)) {

            const serialValidated = await getSerialValidationServer(serial)
            if (serialValidated.error) {
                setMessage(serialValidated.error);
                return;
            }
            if (serialValidated) {
                setStoredSerial(serial);
                const backupList = await getBackupList(serial);
                if (backupList.error) {
                    setMessage(backupList.error);
                    return;
                }
                if (isEmpty(backupList)) {
                    setMessage('There are no backups on the server, please check the serial number and try again.');
                    return;
                }

                const latestBackup = selectLatestBackup(backupList);
                const backupData = await downloadExtractAndReadBackup(serial, latestBackup);
                if (backupData.error) {
                    setMessage(backupData.error);
                    return;
                }
                if (isEmpty(backupData)) {
                    setMessage('The backup does not exist on the server, please check the serial number and try again.');
                    return;
                }
                const softwareType = getSoftwareType(latestBackup);

                setDataOnContext({ setLogDaMaster, setBackupList, setBackupSelected, setSoftwareType, backupList, backupData, softwareType, latestBackup });
                return true;
            } else {
                setMessage('The backup does not exist on the server, please check the serial number and try again.');
            }
        } else if (!isEmpty(backupSelected)) {
            const backupData = await downloadExtractAndReadBackup(serial, backupSelected);
            const softwareType = getSoftwareType(backupSelected);
            setLogDaMaster(backupData);
            setSoftwareType(softwareType);
        }
    }
    catch (error) {
        console.error('Error while downloading backup:', error);
    }

}

function setDataOnContext({ setLogDaMaster, setBackupList, setBackupSelected, setSoftwareType, backupList, backupData, softwareType, latestBackup }) {
    setLogDaMaster(backupData);
    setBackupList(backupList);
    setBackupSelected(latestBackup);
    setSoftwareType(softwareType);
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

function getSoftwareType(latestBackup) {
    if (latestBackup.includes('AndBk')) {
        return 'android';
    } else if (latestBackup.includes('DbBackup')) {
        return 'windows';
    } else {
        return 'unknown';
    }
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
