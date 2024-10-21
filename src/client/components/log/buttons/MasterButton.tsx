import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faDatabase} from "@fortawesome/free-solid-svg-icons/faDatabase";
import useStore from "@/app/store";

const MasterButton: React.FC = () => {
    const setTable = useStore(state => state.setTable);
    return (
        <div >
            <button onClick={() => setTable("master")}>
                <FontAwesomeIcon icon={faDatabase} size="2xl" className="text-primary"/>
            </button>
        </div>
    );
}

export default MasterButton;