'use client'

import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons/faLock';
import DialogPassword from '@/app/components/buttons/DialogPassword';

const ContainerPassword: React.FC = () => {
    const [openRequest, setOpenRequest] = React.useState<boolean>(false);

    return (
        <>
            <DialogPassword openRequest={openRequest} setOpenRequest={setOpenRequest}/>
            <button 
                id="password" 
                className="text-success"
                onClick={() => setOpenRequest(true)}
            >
                <FontAwesomeIcon icon={faLock} style={{color: "#74C0Fc"}} size="2xl"/>
            </button>
            </>
    );
}

export default ContainerPassword;