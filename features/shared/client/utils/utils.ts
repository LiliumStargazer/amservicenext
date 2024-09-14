
export function isEmpty(backupSelected: string): boolean {
    return backupSelected === '';
}

export function isChanged(storedSerial: string | null, serial: string): boolean {
    return storedSerial !== serial;
}

export function isNull(storedSerial: string | null): boolean {
    return storedSerial === null;
}

export function stringToDate(stringaData: string): Date {
    return new Date(stringaData);
}

export function isGreaterThanOne(string: string): boolean {
    let parts = string.split(" ");
    if (parts.length >= 2) {
        let size = parseFloat(parts[0]);
        if (size > 0)
            return true;
    }
    return false;
}

export function formatStringDateOrder(stringaInput: string): string {
    let dataInput = new Date(stringaInput);
    let giorno = dataInput.getDate();
    let mese = dataInput.getMonth() + 1;
    let anno = dataInput.getFullYear();
    return `${giorno}/${mese}/${anno}`;
}

export function getTimeString(stringaInput: string): string {
    let part = stringaInput.split(" ");
    return part[1];
}

export function convertToDate(dateTimeString: string): Date {
    const [datePart, timePart] = dateTimeString.split(' ');
    const [day, month, year] = datePart.split('-');
    const formattedDateString = `${year}-${month}-${day}T${timePart}`;
    return new Date(formattedDateString);
}

export function getTimeFromData(dateTimeString: string): string {
    const [, timePart] = dateTimeString.split(' ');

    return timePart;
}

export function calculateDaysBetweenDates(dateStartStr: string, dateEndStr: string): number {
    const startDate = new Date(dateStartStr);
    const endDate = new Date(dateEndStr);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export const onClickOpenWindow = (url: string, inputValue: string) => {
    const finalUrl = url.includes("{input}") ? url.replace("{input}", inputValue) : url;
    window.open(finalUrl, "_blank");
}

export const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

export function convertTimestampToDate(ticks: number): string {

    const epochDifferenceInMilliseconds = (new Date('1970-01-01').getTime() - new Date('0001-01-01').getTime());
    const milliseconds = (ticks / 10000) - epochDifferenceInMilliseconds;
    const date = new Date(milliseconds);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
}


export const trimAndFormatSerial = (serial: string): string => {
    let serialTrimmed = serial.trim();
    if (serialTrimmed.length === 4) {
        serialTrimmed = "0" + serialTrimmed;
    }
    return serialTrimmed;
};

export const getSerialValidationMessage = (serial: string): string => {
    if (serial === "") {
        return "Please type a serial number";
    } else if (isNaN(parseInt(serial, 10))) {
        return "Serial number must be a number";
    } else if (serial.length < 4) {
        return "Serial number too short";
    } else if (serial.length > 5) {
        return "Serial number too long";
    }
    return "valid";
};

