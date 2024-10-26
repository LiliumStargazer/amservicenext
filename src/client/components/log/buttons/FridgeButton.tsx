import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSnowflake} from "@fortawesome/free-solid-svg-icons/faSnowflake";
import useStore from "@/app/store";

const FridgeButton: React.FC = () => {
    const setTable = useStore(state => state.setTable);
    const loadingGlobal = useStore(state => state.loadingGlobal);
    return (
        <div >
            <button onClick={() => setTable('fridge')} disabled={loadingGlobal}>
                <FontAwesomeIcon icon={faSnowflake} size="2xl" className="text-info"/>
            </button>
        </div>
    );
}

export default FridgeButton;