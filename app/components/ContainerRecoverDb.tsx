'use client'

import React, {useEffect, useState} from 'react';

import {fetcher} from "@/app/lib/axiosClient";
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation'
import AlertMultiple from "@/app/components/AlertMultiple.";
import { AlertStatus } from "@/app/enum/enum";
console.log('AlertStatus importato:', AlertStatus);


const ContainerRecoverDb: React.FC = () => {
    const [serial, setSerial] = React.useState<string>("");
    const [backupOptions, setBackupOptions] = useState<React.ReactNode[]>([]);
    const [backupSelected, setBackupSelected] = React.useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [status, setStatus] = useState<AlertStatus>(AlertStatus.None);
    const { data: dataBackupList, error: errorBackupList, isLoading: isLoadingBackupList } = useSWR(
        serial.length === 5 ? ['/backups-list', { serial }] : null,
        fetcher, { revalidateOnFocus: false, revalidateOnReconnect: false}
    );
    const { trigger: triggerCheckIntegrity, error: integrityError, isMutating: isCheckingIntegrity } = useSWRMutation(
        ['/integrity-check', { serial, backup: backupSelected }] , fetcher
    );
    const { trigger: triggerDowload, error: errorDownload, isMutating: isDownloadLoading  } = useSWRMutation(
        ['/download-backup', { serial, backup: backupSelected }],  fetcher
    )
    const { trigger: triggerRecover, error: errorRecoverDb, isMutating: isLoadingRecoverDb } = useSWRMutation(
        ['/recover-db', { serial, backup: backupSelected  }], fetcher
    );

    useEffect(() => {
        if (serial.length !== 5) {
            setStatus(AlertStatus.None);
            setMessage("");
            setBackupOptions([]);
            setBackupSelected("");
            return;
        }
        if (dataBackupList && Array.isArray(dataBackupList) ){
            const filteredAndSortedBackups = dataBackupList
                .filter(element => !element[1].includes("0 bytes"))
                .map(element => element[0]);

            filteredAndSortedBackups.sort().reverse();
            const backupOptions: React.ReactNode[] = [] = filteredAndSortedBackups.map(element =>
                <option key={element}>{element}</option>
            );
            setBackupOptions(backupOptions);
            setBackupSelected(filteredAndSortedBackups[0]);
        }
    }, [dataBackupList, serial]);

    useEffect(() => {
        if (errorBackupList) setMessage("Error while trying to fetch backupSelected list " + errorBackupList.message);
        if (errorDownload) setMessage("Error while trying to download backup " + errorDownload.message);
        if (errorRecoverDb) setMessage("Error while trying to recover db " + errorRecoverDb.message);
        if (integrityError) setMessage("Error while trying to check integrity " + integrityError.message);
    }, [errorRecoverDb, errorDownload, setMessage, errorBackupList, integrityError]);

    const handleCkeckIntegrity = async () => {
        if (!serial) return setMessage("Seriale mancante");
        if (!backupSelected) return setMessage("Backup mancante");
        try{
            await triggerDowload();
            const result = await triggerCheckIntegrity();
            console.log(result);
            if (result && result == "OK") {
                setMessage("Integrity check passed");
                setStatus(AlertStatus.Success);
            }
            else {
                setMessage("Integrity check failed");
                setStatus(AlertStatus.Error);
            }
        }   catch (error) {
            setStatus(AlertStatus.Error);
            setMessage(error instanceof Error ? error.message : 'Errore sconosciuto');
        }
    }

    const handleClickRecover = async () => {
        if (!serial) return setMessage("Seriale mancante");
        if (!backupSelected) return setMessage("Backup mancante");
        try{
            await triggerDowload();
            const result = await triggerRecover();
            if (result) {
                setMessage("DB recovered successfully");
                setStatus(AlertStatus.Success);
            }
            else {
                setMessage("DB recovery failed");
                setStatus(AlertStatus.Error);
            }
        }catch (error) {
            setStatus(AlertStatus.Error);
            setMessage(error instanceof Error ? error.message : 'Errore sconosciuto');
        }
    };

    return (
        <>
            <div>
            <AlertMultiple
                isLoading={isLoadingBackupList || isLoadingRecoverDb || isDownloadLoading || isCheckingIntegrity}
                message={message}
                status={status}
            />
            </div>
            <div className="flex items-center justify-center ">
                <div className="card w-full max-w-md bg-base-100 shadow-xl ">
                    <div className="card-header">
                        <h2 className="card-title">Recover DB</h2>
                        <p className="text-sm text-gray-500">Select the backup to recover</p>
                    </div>
                    <div className="card-body space-y-4">
                        <label className="input">
                            <span className="label">Serial</span>
                            <input
                                type="text"
                                placeholder="type here.."
                                onChange={(e) => setSerial(e.target.value)}
                            />
                        </label>
                        <label className="select">
                            <span className="label">Backups</span>
                            <select
                                onChange={e => setBackupSelected(e.target.value)}
                                disabled={backupOptions.length === 0}
                            >
                                {backupOptions}
                            </select>
                        </label>
                        <button
                            className="btn btn-soft"
                            onClick={handleClickRecover}
                            disabled={backupOptions.length === 0}
                        >
                            Recover
                        </button>
                        <button
                            className="btn btn-soft"
                            onClick={handleCkeckIntegrity}
                            disabled={backupOptions.length === 0}
                        >
                            Check
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ContainerRecoverDb;