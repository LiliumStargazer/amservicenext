'use client'

import React, {useEffect, useState} from 'react';
import AlertMultiple from "@/app/components/AlertMultiple.";
import { AlertStatus } from "@/app/enum/enum";
import { useCheckIntegrityMutation, useDownloadBackupMutation, useRecoverDbMutation, useTransferFingerDbMutation } from '@/app/hooks/useMutations';
import { useBackupList } from '../hooks/useQueries';
console.log('AlertStatus importato:', AlertStatus);


const ContainerRecoverDb: React.FC = () => {
    const [serial, setSerial] = React.useState<string>("");
    const [backupOptions, setBackupOptions] = useState<React.ReactNode[]>([]);
    const [backupSelected, setBackupSelected] = React.useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [status, setStatus] = useState<AlertStatus>(AlertStatus.None);
    const [sourceSerial, setSourceSerial] = React.useState<string>("");
    const [destinationSerial, setDestinationSerial] = React.useState<string>("");
    const [sourceBackup, setSourceBackup] = React.useState<string>("");
    const [sourceBackupOptions, setSourceBackupOptions] = useState<React.ReactNode[]>([]);
    const { trigger: triggerCheckIntegrity, error: integrityError, isMutating: isCheckingIntegrity } = useCheckIntegrityMutation();
    const { trigger: triggerDownload, error: errorDownload, isMutating: isDownloadLoading } = useDownloadBackupMutation();
    const { trigger: triggerRecover, error: errorRecoverDb, isMutating: isLoadingRecoverDb } = useRecoverDbMutation();
    const { trigger: triggerTransfer, error: errorTransfer, isMutating: isLoadingTransfer } = useTransferFingerDbMutation();
    const { data: dataBackupList, error: errorBackupList, isLoading: isLoadingBackupList } = useBackupList(serial);
    const { data: sourceBackupList, error: errorSourceBackupList, isLoading: isLoadingSourceBackupList } = useBackupList(sourceSerial);

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
        if (sourceSerial.length !== 5) {
            setStatus(AlertStatus.None);
            setMessage("");
            setSourceBackupOptions([]);
            setSourceBackup("");
            return;
        }
        if (sourceBackupList && Array.isArray(sourceBackupList) ){
            const filteredAndSortedBackups = sourceBackupList
                .filter(element => !element[1].includes("0 bytes"))
                .map(element => element[0]);

            filteredAndSortedBackups.sort().reverse();
            const sourceBackupOptions: React.ReactNode[] = [] = filteredAndSortedBackups.map(element =>
                <option key={element}>{element}</option>
            );
            setSourceBackupOptions(sourceBackupOptions);
            setSourceBackup(filteredAndSortedBackups[0]);
        }
    }, [sourceBackupList, sourceSerial]);

    useEffect(() => {
        if (errorBackupList) setMessage("Error while trying to fetch backupSelected list " + errorBackupList.message);
        if (errorDownload) setMessage("Error while trying to download backup " + errorDownload.message);
        if (errorRecoverDb) setMessage("Error while trying to recover db " + errorRecoverDb.message);
        if (integrityError) setMessage("Error while trying to check integrity " + integrityError.message);
        if (errorSourceBackupList) setMessage("Error while trying to fetch source backup list " + errorSourceBackupList.message);
        if (errorTransfer) setMessage("Error while trying to transfer finger " + errorTransfer.message);
        if (errorSourceBackupList || errorBackupList || errorDownload || errorRecoverDb || integrityError || errorTransfer) {
            setStatus(AlertStatus.Error);
        }
    }, [errorRecoverDb, errorDownload, setMessage, errorBackupList, integrityError, errorSourceBackupList, errorTransfer]);

    const handleCkeckIntegrity = async () => {
        if (!serial) return setMessage("Seriale mancante");
        if (!backupSelected) return setMessage("Backup mancante");
        try{
            await triggerDownload({ serial, backup: backupSelected });
            const result = await triggerCheckIntegrity({ serial, backup: backupSelected });
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
            setMessage(error instanceof Error ? error.message : 'Errore sconosciuto');
        }
    }

    const handleClickRecover = async () => {
        if (!serial) return setMessage("Seriale mancante");
        if (!backupSelected) return setMessage("Backup mancante");
        try{
            const result = await triggerRecover({ serial, backup: backupSelected });
            if (result) {
                setMessage("DB recovered successfully");
                setStatus(AlertStatus.Success);
            }
            else {
                setMessage("DB recovery failed");
                setStatus(AlertStatus.Error);
            }
        }catch (error) {
            setMessage(error instanceof Error ? error.message : 'Errore sconosciuto');
        }
    };

    const handleTransfer = async () => {
        if (!sourceSerial) return setMessage("Source seriale mancante");
        if (!destinationSerial) return setMessage("Destination seriale mancante");
        if (!sourceBackup) return setMessage("Backup mancante");

        try {
            setStatus(AlertStatus.Info);
            setMessage("Starting transfer...");

            const downloadResult = await triggerDownload({ serial: sourceSerial, backup: sourceBackup });
            if (!downloadResult) {
                setStatus(AlertStatus.Error);
                setMessage("Download failed");
                return;
            }

            setMessage("Integrity check started");
            const integrityResult = await triggerCheckIntegrity({ serial: sourceSerial, backup: sourceBackup });
            if (integrityResult !== "OK") {
                setStatus(AlertStatus.Error);
                setMessage("Integrity check failed");
                return;
            }

            const transferResult = await triggerTransfer({ sourceSerial, targetSerial: destinationSerial, backup: sourceBackup });
            if (transferResult) {
                setStatus(AlertStatus.Success);
                setMessage("Finger transfered successfully");
            } else {
                setStatus(AlertStatus.Error);
                setMessage("Transfer failed");
            }
        } catch (error) {
            setStatus(AlertStatus.Error);
            setMessage(error instanceof Error ? error.message : "Errore sconosciuto");
        }
    };

    return (
        <>
            <div>
            <AlertMultiple
                isLoading={isLoadingBackupList || isLoadingRecoverDb || isDownloadLoading || isCheckingIntegrity || isLoadingSourceBackupList || isLoadingTransfer}
                message={message}
                status={status}
            />
            </div>
            <div className="flex items-center justify-center space-x-4">
                <div className="card w-full max-w-sm bg-base-200 shadow-xl ">
                    <div className="card-header">
                        <h2 className="card-title flex justify-center w-full mt-2">Recover DB</h2>
                    </div>
                    <div className="card-body space-y-4">
                        <label className="input w-full">
                            <span className="label">Serial</span>
                            <input
                                type="text"
                                onChange={(e) => setSerial(e.target.value)}
                            />
                        </label>
                        <p className="text-sm text-gray-500">Select the backup to recover</p>
                        <label className="select w-full">
                            <span className="label">Backups</span>
                            <select
                                className="w-full"
                                onChange={e => setBackupSelected(e.target.value)}
                                disabled={backupOptions.length === 0}
                            >
                                {backupOptions}
                            </select>
                        </label>
                        <button
                            className="btn btn-soft w-full"
                            onClick={handleClickRecover}
                            disabled={backupOptions.length === 0}
                        >
                            Recover
                        </button>
                        <button
                            className="btn btn-soft w-full"
                            onClick={handleCkeckIntegrity}
                            disabled={backupOptions.length === 0}
                        >
                            Check
                        </button>
                    </div>
                </div>
                <div className="card w-full max-w-sm bg-base-200 shadow-xl ">
                    <div className="card-header">
                        <h2 className="card-title flex justify-center w-full mt-2">Transfer Fingers</h2>
                    </div>
                    <div className="card-body space-y-4">
                        <label className="input w-full">
                            <span className="label w-64">Source Serial</span>
                            <input
                                type="text"
                                onChange={(e) => setSourceSerial(e.target.value)}
                            />
                        </label>
                        <p className="text-sm text-gray-500">Select the backup to transfer</p>
                        <label className="select w-full">
                            <span className="label">Transfer</span>

                            <select
                                onChange={e => setSourceBackup(e.target.value)}
                                disabled={sourceBackupOptions.length === 0}
                            >
                                {sourceBackupOptions}
                            </select>
                        </label>
                        <label className="input w-full">
                            <span className="label w-64">Destination Serial</span>
                            <input
                                type="text"
                                onChange={(e) => setDestinationSerial(e.target.value)}
                            />
                        </label>
                        <button
                            className="btn btn-soft w-full"
                            onClick={handleTransfer}
                            disabled={sourceBackupOptions.length === 0 || sourceSerial.length !== 5 || destinationSerial.length !== 5}
                        >
                            Transfer
                        </button>
                    </div>
                </div>                
            </div>
        </>
    );
}

export default ContainerRecoverDb;