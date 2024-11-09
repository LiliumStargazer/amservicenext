import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSnowflake} from "@fortawesome/free-solid-svg-icons/faSnowflake";
import useStore from "@/app/store";

const FridgeButton: React.FC = () => {
    const setTable = useStore(state => state.setTable);
    const loadingGlobal = useStore(state => state.loadingGlobal);
    const table = useStore(state => state.table);

    if (table === 'no_table')
        return null;

    return (
        <div >
            <button onClick={() => setTable('fridgeTable')} disabled={loadingGlobal}>
                <FontAwesomeIcon icon={faSnowflake} size="2xl" className="text-info"/>
            </button>
        </div>
    );
}

export default FridgeButton;