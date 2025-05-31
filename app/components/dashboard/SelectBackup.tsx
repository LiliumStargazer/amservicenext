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
        console.log("SelectBackup: useEffect triggered with backupList:", backupList);
        const filteredAndSortedBackups = backupList
            .filter(element => !element[1].includes("0 bytes"))
            .map(element => element[0]);

        // Ordina i backup per data e ora (indice 2), dal più recente al più vecchio
        filteredAndSortedBackups.sort((a, b) => {
            const dateA = new Date(
            backupList.find(item => item[0] === a)?.[2] || ''
            ).getTime();
            const dateB = new Date(
            backupList.find(item => item[0] === b)?.[2] || ''
            ).getTime();
            return dateB - dateA;
        });
        const backupOptions: React.ReactNode[] = filteredAndSortedBackups.map(element => <option key={element}>{element}</option>);
        setBackupOptions(backupOptions);

        if (filteredAndSortedBackups.length > 0) {
            setBackup(filteredAndSortedBackups[0]);
        }
    }, [backupList, setBackup]);

    return (
        <select
            className="select select-md select-bordered max-w-min min-w-44 join-item"
            value={backup}
            onChange={onSelectBackup}
            disabled={isDisabled}
        >
            <option value="" disabled hidden>
            Select backup
            </option>
            {backupOptions}
        </select>
    );
};

export default SelectBackup;