import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSnowflake} from "@fortawesome/free-solid-svg-icons/faSnowflake";
import useStore from "@/app/store";

const FridgeButton: React.FC = () => {
    const setTable = useStore(state => state.setTable);
    return (
        <div >
            <button onClick={() => setTable('fridge')}>
                <FontAwesomeIcon icon={faSnowflake} size="2xl"/>
            </button>
        </div>
    );
}

export default FridgeButton;