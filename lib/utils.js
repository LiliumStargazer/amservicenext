
export function isEmpty(backupSelected){
    return backupSelected === '';
}

export function isChanged(storedSerial, serial){
    return storedSerial !== serial;
}
export function isNull(storedSerial){
    return storedSerial === null;
}

export function stringToDate(stringaData) {
    return new Date(stringaData);
}

export function isGreaterThanOne(string) {
    let parts = string.split(" ");
    if (parts.length >= 2) {
        let size = parseFloat(parts[0]);
        if (size > 0)
            return true;
    }
    return false;
}

export function formatStringToDate(stringaInput) {
    let dataInput = new Date(stringaInput);
    let giorno = dataInput.getDate();
    let mese = dataInput.getMonth() + 1;
    let anno = dataInput.getFullYear();
    return giorno + '/' + mese + '/' + anno;
}

export function getTimeString(stringaInput) {
    let part = stringaInput.split(" ");
    return part[1];
}