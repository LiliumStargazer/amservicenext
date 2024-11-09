import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGear} from "@fortawesome/free-solid-svg-icons/faGear";
import useStore from "@/app/store";

const ParamButton: React.FC = () => {
    const setTable = useStore(state => state.setTable);
    const loadingGlobal = useStore(state => state.loadingGlobal);
    const table = useStore(state => state.table);

    if (table === 'no_table')
        return null;

    return (
        <div >
            <button
                onClick={() => setTable("param")}
                disabled={loadingGlobal}
            >
                <FontAwesomeIcon icon={faGear} size="2xl" className="text-error"/>
            </button>
        </div>
    );

}

export default ParamButton;