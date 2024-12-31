'use client'

import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFingerprint} from "@fortawesome/free-solid-svg-icons/faFingerprint";

interface FingerButtonProps {
    loading: boolean;
    setSection: React.Dispatch<React.SetStateAction<string>>;
    setIsGetFingerTransactionEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}

const FingerButton: React.FC <FingerButtonProps>= ({loading, setSection,setIsGetFingerTransactionEnabled}) => {

    const handleFingerClick = () => {
        setSection("fingersTransaction");
        setIsGetFingerTransactionEnabled(true);
    }

    return (
        <div >
            <button
                onClick={handleFingerClick}
                disabled={loading}
            >
                <FontAwesomeIcon icon={faFingerprint} size="2xl" className="text-secondary"/>
            </button>
        </div>
    );
}

export default FingerButton;