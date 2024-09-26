import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGear} from "@fortawesome/free-solid-svg-icons/faGear";

const ParamButton: React.FC = () => {

    return (
        <div >
            <button className="">
                <FontAwesomeIcon icon={faGear} size="2xl"/>
            </button>
        </div>
    );
}

export default ParamButton;