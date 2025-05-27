'use client'

import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFingerprint} from "@fortawesome/free-solid-svg-icons/faFingerprint";

interface FingerButtonProps {
    disabled: boolean;
    setSection: React.Dispatch<React.SetStateAction<string>>;

}

const ButtonFinger: React.FC <FingerButtonProps>= ({disabled, setSection}) => {
    const [fade, setFade] = useState(false);

    useEffect(() => {
        if (fade) {
            const timer = setTimeout(() => setFade(false), 1000);
            return () => clearTimeout(timer);
        }
    }, [fade]);

    return (
        <div >
            <button
                onClick={() => {setSection("fingersTransaction")}}
                disabled={disabled}
            >
                <FontAwesomeIcon
                    icon={faFingerprint}
                    size="2xl"
                    className="text-secondary"
                    fade={fade ? true : undefined}
                    onClick={() => {setFade(true)}}
                />
            </button>
        </div>
    );
}

export default ButtonFinger;