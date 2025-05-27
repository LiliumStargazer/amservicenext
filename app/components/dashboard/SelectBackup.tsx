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
        const filteredAndSortedBackups = backupList
            .filter(element => !element[1].includes("0 bytes"))
            .map(element => element[0]);

        filteredAndSortedBackups.sort().reverse();
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
            {backupOptions}
        </select>
    );
};

export default SelectBackup;