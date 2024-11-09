import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faDatabase} from "@fortawesome/free-solid-svg-icons/faDatabase";
import useStore from "@/app/store";

const MasterButton: React.FC = () => {
    const setTable = useStore(state => state.setTable);
    const loadingGlobal = useStore(state => state.loadingGlobal);
    const table = useStore(state => state.table);

    const handleClick = () => {
        if ( table !== 'master' ){
            setTable("master");
        }
    }

    if (table === 'no_table')
        return null;

    return (
        <div>
            <button onClick={handleClick} disabled={loadingGlobal}>
                <FontAwesomeIcon icon={faDatabase} size="2xl" className="text-primary"/>
            </button>
        </div>
    );
}

export default MasterButton;