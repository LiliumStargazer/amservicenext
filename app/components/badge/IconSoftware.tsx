'use client'

import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAndroid, faWindows} from '@fortawesome/free-brands-svg-icons';

interface IconSoftwareProps {
    softwareType: string;
}

const IconSoftware: React.FC <IconSoftwareProps>= ({softwareType}) => {
    const [softwareIcon, setSoftwareIcon] = useState<React.ReactNode>('');

    useEffect(() => {
            console.log(softwareType);
            if (softwareType.includes('android')){
                setSoftwareIcon(<FontAwesomeIcon icon={faAndroid} size="2xl" style={{ color: "#63E6BE" }} />);
                return;
            }
                
            if (softwareType.includes('windows')) {
                setSoftwareIcon(<FontAwesomeIcon icon={faWindows} size="2xl" style={{ color: "#74C0FC" }} />);
                return;
            }

            setSoftwareIcon('');
    }, [softwareType]);

    if (!softwareIcon) return null;

    return (
        <div className="max-w-fit">
            {softwareIcon}
        </div>
    );
}

export default IconSoftware;