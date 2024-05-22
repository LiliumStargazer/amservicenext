import React, {useContext,  useState} from "react";;
import {convertiStringaData, isbackupSelectedEmpty, isSerialChanged, isStoredSerialNull, checkBackupSize} from "../../lib/functionsClient";
import {getBackupList, getBackupReadedOnServer, isSerialNumberOnSftp} from "../../lib/apiClient";
import {Context} from "@/app/Context";

function Button({ router, className }) {

    const { serialTyped, setSerialTyped, setMessage, setPage,
         backupSelected, setLogDaMaster, setSoftwareType, setBackupList, setBackupSelected, storedSerial,
        setStoredSerial, setLoading, loading} = useContext(Context);

    const classes = className || "btn btn-info join-item ";
    const link = "/amservice";

    const handleDownload = async () => {
        let check = true;
        if (serialTyped.length ===4)
            setSerialTyped("0" + serialTyped);

        if (serialTyped === ""){
            setMessage("Please type a serial number");
            check = false;
        }
        if (serialTyped.length < 4 ){
            setMessage("Serial number too short ");
            check = false;
        }

        if (serialTyped.length> 5){
            setMessage("Serial number too long");
            check = false;
        }

        if (isNaN(parseInt(serialTyped, 10))){
            setMessage("Serial number must be a number");
            check = false;
        }

        if (check){
            router.push(link);
            setPage("Master");
            setLoading(true);
            DownloadBackup();
        }
    };

    async function DownloadBackup() {
        try {
            if (isStoredSerialNull(storedSerial) || isSerialChanged(storedSerial, serialTyped)) {
                if (await isSerialNumberOnSftp(serialTyped)) {
                    setStoredSerial(serialTyped);
                    let backupList = await getBackupList(serialTyped);
                    let latestBackup = selectLatestBackup(backupList);
                    setBackupList(backupList);
                    let backupData = await getBackupReadedOnServer(serialTyped, latestBackup);
                    let softwareType = getSoftwareType(latestBackup);
                    setDataOnContext(backupList, backupData, softwareType, latestBackup);
                    setLoading(false);
                } else {
                    setMessage('the backup does not exist on the server, please check the serial number and try again.');
                    setLoading(false);
                }
            } else if (!isbackupSelectedEmpty(backupSelected)) {
                let backupData = await getBackupReadedOnServer(serialTyped, backupSelected);
                let softwareType = getSoftwareType(backupSelected);
                setDataOnContextOnBackupChange(backupData, softwareType)
                setLoading(false);
            }
        } catch (error) {
            setMessage(`${error}`);
            setLoading(false);
        }

        function setDataOnContext(backupList, backupData, softwareType, latestBackup){
            setLogDaMaster(backupData);
            setBackupList(backupList);
            setBackupSelected(latestBackup);
            setSoftwareType(softwareType);
        }

        function setDataOnContextOnBackupChange(backupData, softwareType){
            setLogDaMaster(backupData);
            setSoftwareType(softwareType);
        }

        function selectLatestBackup(backupList){
            let latestDate = null;
            let latestBackup = null;
            for ( let element of backupList){
                let date = convertiStringaData(element[2])

                if (latestDate === null || ( date > latestDate && checkBackupSize(element[1]) )  ) {
                    latestDate = date;
                    latestBackup = element[0];
                }
            }
            return latestBackup;
        }

        function getSoftwareType(latestBackup){
            if (latestBackup.includes('AndBk')){
                return 'android';
            }
            else if (latestBackup.includes('DbBackup')){
                return 'windows';
            }
            else
                return 'unknown';
        }
    }
    
    return (
        <button
            className={`${classes}  ${loading ? "btn-disabled" : "" }`}
            onClick={handleDownload}
            disabled={loading}
        >
            GET
        </button>
    );
}

export default Button;
