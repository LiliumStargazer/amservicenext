import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {faI} from "@fortawesome/free-solid-svg-icons/faI";
import {faS} from "@fortawesome/free-solid-svg-icons/faS";
import {faL} from "@fortawesome/free-solid-svg-icons/faL";
import useStore from "@/app/store";

const LisButton: React.FC = () => {
    const setTable = useStore(state => state.setTable);
    return (
        <div >
            <button onClick={() => setTable("lisTransaction")}>
                <FontAwesomeIcon icon={faL} size="lg" className="text-warning"/>
                <FontAwesomeIcon icon={faI} size="lg" className="text-warning"/>
                <FontAwesomeIcon icon={faS} size="lg" className="text-warning"/>
            </button>
        </div>
    );
}

export default LisButton;