import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFingerprint} from "@fortawesome/free-solid-svg-icons/faFingerprint";
import useStore from "@/app/store";

const FingerButton: React.FC = () => {
    const table = useStore(state => state.table);
    const setTable = useStore(state => state.setTable);
    const loadingGbloal = useStore(state => state.loadingGlobal);

    const handleFingerClick = () => {
        if (table === "fingersTransaction") {
            return;
        }
        setTable("fingersTransaction");
    }


    return (
        <div >
            <button
                onClick={handleFingerClick}
                disabled={loadingGbloal}
            >
                <FontAwesomeIcon icon={faFingerprint} size="2xl" className="text-secondary"/>
            </button>
        </div>
    );
}

export default FingerButton;