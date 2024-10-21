import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAndroid, faWindows} from '@fortawesome/free-brands-svg-icons';
import useStore from "@/app/store";
import {apiGetSoftwareType} from "@/src/client/api/api";

const IconSoftware: React.FC = () => {
    const backupSelected = useStore(state => state.backupSelected);
    const backupList = useStore(state => state.backupList);
    const serial = useStore(state => state.serial);
    const [softwareIcon, setSoftwareIcon] = useState<React.ReactNode | null>(null);

    const extractSoftwareType = (latestBackup: string, backupList: any[]) => {
        if (latestBackup.includes('AndBk')) return 'android';
        if (latestBackup.includes('DbBackup')) return 'windows';
        const foundElement = backupList.find(
            element => element[0].includes('AndBk') || element[0].includes('DbBackup')
        );
        return foundElement ? (foundElement[0].includes('AndBk') ? 'android' : 'windows') : 'unknown';
    };


    useEffect(() => {
        const softwareType = extractSoftwareType(backupSelected, backupList);
        switch (softwareType) {
            case 'android':
                setSoftwareIcon(<FontAwesomeIcon icon={faAndroid} size="2xl" style={{ color: "#63E6BE" }} />);
                break;
            case 'windows':
                setSoftwareIcon(<FontAwesomeIcon icon={faWindows} size="2xl" style={{ color: "#74C0FC" }} />);
                break;
            case 'unknown': {
                if (serial.length === 0 || backupSelected.length === 0) return;

                apiGetSoftwareType(serial, backupSelected).then((result) => {
                    if (result.includes('android')) {
                        setSoftwareIcon(<FontAwesomeIcon icon={faAndroid} size="2xl" style={{ color: "#63E6BE" }} />);
                    } else if (result.includes('windows')) {
                        setSoftwareIcon(<FontAwesomeIcon icon={faWindows} size="2xl" style={{ color: "#74C0FC" }} />);
                    }
                }).catch(err => {
                    setSoftwareIcon(null);
                });
                break;
            }
        }
    }, [backupList, backupSelected, serial]);

    if (!softwareIcon) return null;

    return (
        <div>
            {softwareIcon}
        </div>
    );
}

export default IconSoftware;