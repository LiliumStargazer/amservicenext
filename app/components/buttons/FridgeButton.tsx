'use client'

import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSnowflake} from "@fortawesome/free-solid-svg-icons/faSnowflake";

interface FridgeButtonProps {
    loading: boolean;
    setSection: React.Dispatch<React.SetStateAction<string>>;
}

const FridgeButton: React.FC <FridgeButtonProps>= ({loading, setSection}, ) => {

    return (
        <div >
            <button onClick={() => setSection('chart')} disabled={loading}>
                <FontAwesomeIcon icon={faSnowflake} size="2xl" className="text-info"/>
            </button>
        </div>
    );
}

export default FridgeButton;