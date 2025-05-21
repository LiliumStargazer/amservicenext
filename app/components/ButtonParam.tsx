'use client'

import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGear} from "@fortawesome/free-solid-svg-icons/faGear";

interface ParamButtonProps {
    isBackupReady: boolean;
    loading: boolean;
    setSection: React.Dispatch<React.SetStateAction<string>>;
    setMessage: React.Dispatch<React.SetStateAction<string>>;
}

const ButtonParam: React.FC <ParamButtonProps>= ({isBackupReady, loading, setSection, setMessage}) => {
    const [fade, setFade] = useState(false);
    const isDisabled = !isBackupReady || loading;

    useEffect(() => {
        if (fade) {
            const timer = setTimeout(() => setFade(false), 1000);
            return () => clearTimeout(timer);
        }
    }, [fade]);

    const handleParamClick = () => {
        if (isBackupReady) {
            setSection("param");
        } else {
            setMessage("Backup not ready");
        }
    }
    return (
        <div >
            <button
                onClick={handleParamClick}
                disabled={isDisabled}
            >
                <FontAwesomeIcon
                    icon={faGear} size="2xl"
                    className="text-error"
                    fade={fade ? true : undefined}
                    onClick={() => {setFade(true)}}
                />
            </button>
        </div>
    );

}

export default ButtonParam;