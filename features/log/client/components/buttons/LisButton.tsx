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
            <button onClick={() => setTable("listransaction")}>
                <FontAwesomeIcon icon={faL} size="xl"/>
                <FontAwesomeIcon icon={faI} size="xl"/>
                <FontAwesomeIcon icon={faS} size="xl"/>
            </button>
        </div>
    );
}

export default LisButton;