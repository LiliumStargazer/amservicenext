'use client'
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faDatabase} from "@fortawesome/free-solid-svg-icons/faDatabase";

interface MasterButtonProps {
    loading: boolean;
    setSection: React.Dispatch<React.SetStateAction<string>>;
}

const ButtonMaster: React.FC <MasterButtonProps>= ({loading, setSection}) => {
    return (
        <div>
            <button onClick={() => setSection('master')} disabled={loading}>
                <FontAwesomeIcon icon={faDatabase} size="2xl" className="text-primary"/>
            </button>
        </div>
    );
}

export default ButtonMaster;