export function isEmpty(backupSelected: string): boolean {
    return backupSelected === '';
}

export function isChanged(storedSerial: string, serial: string): boolean {
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

export function formatStringToDate(stringaInput: string): string {
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
