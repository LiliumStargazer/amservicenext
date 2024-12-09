'use client'

import React, {useEffect, useState} from 'react';

interface SelectAndDownloadBackupProps {
    backup: string;
    loading: boolean;
    onSelectBackup: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    isSuccessBackupList: boolean;
    backupList: string[];
}

const SelectBackup: React.FC<SelectAndDownloadBackupProps> = ({onSelectBackup, loading, backup, isSuccessBackupList, backupList }) => {
    const [backupOptions, setBackupOptions] = useState<React.ReactNode[]>([]);
    useEffect(() => {
        if (isSuccessBackupList && Array.isArray(backupList)) {
            const filteredAndSortedBackups = backupList
                .filter(element => !element[1].includes("0 bytes"))
                .map(element => element[0]);

            filteredAndSortedBackups.sort().reverse();
            const backupOptions: React.ReactNode[] = [] = filteredAndSortedBackups.map(element => <option key={element}>{element}</option>);
            setBackupOptions(backupOptions);
        }
    }, [isSuccessBackupList, backupList]);

    if (backupOptions.length === 0)
        return;

    return (
        <select
            className="select select-md select-bordered max-w-min min-w-44 join-item"
            value={backup}
            onChange={onSelectBackup}
            disabled={loading}
        >
            {backupOptions}
        </select>
    );
};

export default SelectBackup;