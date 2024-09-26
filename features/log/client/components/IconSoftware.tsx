import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAndroid, faWindows} from '@fortawesome/free-brands-svg-icons';
import useStore from "@/app/store";

const IconSoftware: React.FC = () => {
    const latestBackup = useStore(state => state.latestBackup);
    const backupList = useStore(state => state.backupList);
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
        const softwareType = extractSoftwareType(latestBackup, backupList);
        switch (softwareType) {
            case 'android':
                setSoftwareIcon(<FontAwesomeIcon icon={faAndroid} size="2xl" style={{ color: "#63E6BE" }} />);
                break;
            case 'windows':
                setSoftwareIcon(<FontAwesomeIcon icon={faWindows} size="2xl" style={{ color: "#74C0FC" }} />);
                break;
            default:
                setSoftwareIcon(null);
        }
    }, [backupList ]);

    if (!softwareIcon) return null;

    return (
        <div>
            {softwareIcon}
        </div>
    );
}

export default IconSoftware;