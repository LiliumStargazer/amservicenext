'use client'

import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSnowflake} from "@fortawesome/free-solid-svg-icons/faSnowflake";

interface FridgeButtonProps {
    disabled: boolean;
    setSection: React.Dispatch<React.SetStateAction<string>>;
}

const ButtonFridge: React.FC <FridgeButtonProps>= ({disabled, setSection}) => {
    const [fade, setFade] = useState(false);

    useEffect(() => {
        if (fade) {
            const timer = setTimeout(() => setFade(false), 1000);
            return () => clearTimeout(timer);
        }
    }, [fade]);

    return (
        <div >
            <button onClick={()=>setSection("fridge")} disabled={disabled}>
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