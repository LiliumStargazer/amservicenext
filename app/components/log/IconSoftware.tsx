'use client'

import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAndroid, faWindows} from '@fortawesome/free-brands-svg-icons';
import {useQueryGetSoftwareType} from "@/app/hooks/log/useQueryGetSoftwareType";
import {ErrorResponse} from "@/app/types/types";

interface IconSoftwareProps {
    serial: string;
    backup: string;
    isBackupReady: boolean;
}

const IconSoftware: React.FC <IconSoftwareProps>= ({serial, backup, isBackupReady}) => {
    const [softwareIcon, setSoftwareIcon] = useState<React.ReactNode | null>(null);
    const { isLoading, isError, data, error, isSuccess} = useQueryGetSoftwareType(serial, backup, isBackupReady);


    useEffect(() => {
        if (isLoading)
            return;

        if ( isSuccess && data ){
            if ( (data as ErrorResponse).error && ((data as ErrorResponse).error).includes('No backup') ){
                return;
            }

            const result = data as string;
            if (result.includes('android')) {
                setSoftwareIcon(<FontAwesomeIcon icon={faAndroid} size="2xl" style={{ color: "#63E6BE" }} />);
            } else if (result.includes('windows')) {
                setSoftwareIcon(<FontAwesomeIcon icon={faWindows} size="2xl" style={{ color: "#74C0FC" }} />);
            }
        }

    }, [isLoading, isError, isSuccess, data, error]);

    if (!softwareIcon) return null;

    return (
        <div>
            {softwareIcon}
        </div>
    );
}

export default IconSoftware;