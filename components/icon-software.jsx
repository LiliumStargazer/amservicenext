import React, { useEffect, useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAndroid, faWindows } from '@fortawesome/free-brands-svg-icons';
import { Context } from "@/app/Context";

function IconSoftware() {
    const { softwareType } = useContext(Context);
    const [softwareIcon, setSoftwareIcon] = useState(null);

    useEffect(() => {
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
    }, [softwareType]);

    if (!softwareIcon) return null;

    return (
        <div>
            {softwareIcon}
        </div>
    );
}

export default IconSoftware;