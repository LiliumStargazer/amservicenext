import React, {useEffect, useContext, useState} from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAndroid, faWindows } from '@fortawesome/free-brands-svg-icons'
import {Context} from "@/app/Context";

function IconSoftware() {
    const { softwareType } = useContext(Context);
    const [software, setSoftware] = useState('');

    useEffect(() => {
        if (softwareType !== '') {
            if ( softwareType === 'android' )
                setSoftware(<FontAwesomeIcon icon={faAndroid} size="2xl" style={{color: "#63E6BE"}} />);
            else if ( softwareType === 'windows' )
                setSoftware(<FontAwesomeIcon icon={faWindows} size="2xl" style={{color: "#74C0FC"}} />);
            else
                setSoftware('');
        }
        else
            setSoftware('');
    }, [softwareType]);

    if (software === '')
        return null;

    return (
        <div>
            {software}
        </div>
    )

}

export default IconSoftware;
