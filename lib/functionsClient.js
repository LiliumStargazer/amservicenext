
function isbackupSelectedEmpty(backupSelected){
    return backupSelected === '';
}

function isSerialChanged(storedSerial, serialTyped){
    return storedSerial !== serialTyped;
}
function isStoredSerialNull(storedSerial){
    return storedSerial === null;
}

function convertiStringaData(stringaData) {
    return new Date(stringaData);
}

function checkBackupSize(string) {
    let parts = string.split(" ");
    if (parts.length >= 2) {
        let size = parseFloat(parts[0]);
        if (size > 0)
            return true;
    }
    return false;
}

export {isStoredSerialNull, isbackupSelectedEmpty, isSerialChanged, convertiStringaData, checkBackupSize}