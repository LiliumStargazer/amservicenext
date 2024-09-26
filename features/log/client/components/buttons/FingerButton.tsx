import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFingerprint} from "@fortawesome/free-solid-svg-icons/faFingerprint";
import useStore from "@/app/store";

const FingerButton: React.FC = () => {
    const setTable = useStore(state => state.setTable);
    return (
        <div >
            <button onClick={() => setTable("fingertransaction")}>
                <FontAwesomeIcon icon={faFingerprint} size="2xl"/>
            </button>
        </div>
    );
}

export default FingerButton;