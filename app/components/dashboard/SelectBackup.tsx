'use client'

import React, {useEffect, useState} from 'react';

interface SelectAndDownloadBackupProps {
    setBackup: (backup: string) => void;
    backup: string;
    disabled: boolean;
    onSelectBackup: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    backupList: string[];
}

const SelectBackup: React.FC<SelectAndDownloadBackupProps> = ({ setBackup, onSelectBackup, disabled, backup, backupList }) => {
    const [backupOptions, setBackupOptions] = useState<React.ReactNode[]>([]);
    const isDisabled = !backupOptions || disabled;

    useEffect(() => {
        if (!backupList || backupList.length === 0) {
            setBackupOptions([]);
            return;
        }
        // backupList is expected to be an array of arrays: [filename, size, dateString]
        // dateString format: "dd/mm/yyyy hh:mm"
        const filteredAndSortedBackups = backupList
            .filter(element => !element[1].includes("0 bytes"))
            .sort((a, b) => {
                const parseDate = (str: string) => {
                    // str: "dd/mm/yyyy hh:mm"
                    const [datePart, timePart] = str.split(' ');
                    const [day, month, year] = datePart.split('/').map(Number);
                    const [hour, minute] = timePart.split(':').map(Number);
                    return new Date(year, month - 1, day, hour, minute).getTime();
                };
                const dateA = parseDate(a[2]);
                const dateB = parseDate(b[2]);
                return dateB - dateA;
            });

        const backupOptions: React.ReactNode[] = filteredAndSortedBackups.map(element => (
            <option key={element[0]} value={element[0]}>
                {element[0]}
            </option>
        ));
        setBackupOptions(backupOptions);

        if (filteredAndSortedBackups.length > 0) {
            setBackup(filteredAndSortedBackups[0][0]);
        }
    }, [backupList, setBackup]);

    return (
        <label className="select select-sm min-w-60 max-w-min">
            <span className="label text-info">Backup List:</span>
            <select
                value={backup}
                onChange={onSelectBackup}
                disabled={isDisabled}
            >
            <option value="" disabled hidden></option>
                <option value="" disabled hidden>
                    Select backup
                </option>
                {backupOptions}
            </select>
        </label>
    );
};

export default SelectBackup;