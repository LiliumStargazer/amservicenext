'use client'

import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGear} from "@fortawesome/free-solid-svg-icons/faGear";

interface ParamButtonProps {
    loading: boolean;
    setSection: React.Dispatch<React.SetStateAction<string>>;
}

const ButtonParam: React.FC <ParamButtonProps>= ({loading, setSection}) => {
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
                onClick={() => setSection("param")}
                disabled={loading}
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