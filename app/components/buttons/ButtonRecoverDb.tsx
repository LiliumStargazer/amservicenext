'use client'

import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faDatabase} from "@fortawesome/free-solid-svg-icons/faDatabase";

interface FingerButtonProps {
    setSection: React.Dispatch<React.SetStateAction<string>>;
}

const ButtonRecoverDb: React.FC <FingerButtonProps>= ({ setSection }) => {
    const [fade, setFade] = useState(false);
    useEffect(() => {
        if (fade) {
            const timer = setTimeout(() => setFade(false), 1000);
            return () => clearTimeout(timer);
        }
    }, [fade]);
    const handleClick = () => {
        setSection("recoverdb");
    }

    return (
        <div >
            <button
                onClick={handleClick}
            >
                <FontAwesomeIcon
                    icon={faDatabase}
                    size="2xl"
                    className="text-secondary"
                    style={{color: "#63E6BE",}}
                    fade={fade ? true : undefined}
                    onClick={() => {setFade(true)}}
                />
            </button>
        </div>
    );
}

export default ButtonRecoverDb;