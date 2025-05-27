'use client'
import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faTableList } from '@fortawesome/free-solid-svg-icons';

interface MasterButtonProps {
    disabled: boolean;
    setSection: React.Dispatch<React.SetStateAction<string>>;
}

const ButtonHome: React.FC <MasterButtonProps>= ({disabled, setSection}) => {
    const [fade, setFade] = useState(false);
    // const [isDisabled, setIsDisabled] = useState(true);

    const isDisabled = disabled;


    useEffect(() => {
        if (fade) {
            const timer = setTimeout(() => setFade(false), 1000);
            return () => clearTimeout(timer);
        }
    }, [fade]);

    return (
        <div>
            <button disabled={isDisabled} onClick={() => setSection('master')}>
                <FontAwesomeIcon
                    icon={faTableList}
                    size="2xl"
                    className="text-primary"
                    fade={fade ? true : undefined}
                    onClick={() => {setFade(true)}}
                />
            </button>
        </div>
    );
}

export default ButtonHome;