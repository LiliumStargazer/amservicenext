import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGear} from "@fortawesome/free-solid-svg-icons/faGear";
import useStore from "@/app/store";

const ParamButton: React.FC = () => {
    const setTable = useStore(state => state.setTable);
    const loadingGbloal = useStore(state => state.loadingGlobal);
    return (
        <div >
            <button
                onClick={() => setTable("param")}
                disabled={loadingGbloal}
            >
                <FontAwesomeIcon icon={faGear} size="2xl" className="text-error"/>
            </button>
        </div>
    );

}

export default ParamButton;