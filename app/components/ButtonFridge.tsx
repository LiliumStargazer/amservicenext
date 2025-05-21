'use client'

import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSnowflake} from "@fortawesome/free-solid-svg-icons/faSnowflake";

interface FridgeButtonProps {
    isBackupReady: boolean;
    loading: boolean;
    setSection: React.Dispatch<React.SetStateAction<string>>;
    setMessage: React.Dispatch<React.SetStateAction<string>>;
}

const ButtonFridge: React.FC <FridgeButtonProps>= ({isBackupReady, loading, setSection, setMessage}, ) => {
    const [fade, setFade] = useState(false);
    const isDisabled = !isBackupReady || loading;

    useEffect(() => {
        if (fade) {
            const timer = setTimeout(() => setFade(false), 1000);
            return () => clearTimeout(timer);
        }
    }, [fade]);

    const handleFridgeClick = () => {
        if (isBackupReady) 
            setSection("fridge");
        else
            setMessage("Backup not ready");
    }


    return (
        <div >
            <button onClick={handleFridgeClick} disabled={isDisabled}>
                <FontAwesomeIcon
                    icon={faSnowflake}
                    size="2xl"
                    className="text-info"
                    fade={fade ? true : undefined}
                    onClick={() => {setFade(true)}}
                />
            </button>
        </div>
    );
}

export default ButtonFridge;