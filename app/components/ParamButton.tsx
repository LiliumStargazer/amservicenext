'use client'

import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGear} from "@fortawesome/free-solid-svg-icons/faGear";

interface ParamButtonProps {
    loading: boolean;
    setSection: React.Dispatch<React.SetStateAction<string>>;
}

const ParamButton: React.FC <ParamButtonProps>= ({loading, setSection}) => {

    return (
        <div >
            <button
                onClick={() => setSection("param")}
                disabled={loading}
            >
                <FontAwesomeIcon icon={faGear} size="2xl" className="text-error"/>
            </button>
        </div>
    );

}

export default ParamButton;