'use client'
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {faI} from "@fortawesome/free-solid-svg-icons/faI";
import {faS} from "@fortawesome/free-solid-svg-icons/faS";
import {faL} from "@fortawesome/free-solid-svg-icons/faL";

import {onClickOpenWindow} from "@/app/utils/utils";

interface LisButtonProps {
    loading: boolean;
}

const LisButton: React.FC <LisButtonProps>= ({loading}) => {

    return (
        <div >
            <button disabled={loading} onClick={() => onClickOpenWindow("https://dashboard.amdistributori.it/login", "")}>
                <FontAwesomeIcon icon={faL} size="lg" className="text-warning"/>
                <FontAwesomeIcon icon={faI} size="lg" className="text-warning"/>
                <FontAwesomeIcon icon={faS} size="lg" className="text-warning"/>
            </button>
        </div>
    );
}

export default LisButton;