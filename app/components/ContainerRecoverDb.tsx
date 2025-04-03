'use client'

import React, {useEffect} from 'react';
import {useQueryRecoverDb} from "@/app/hooks/useQueryRecoverDb";

interface RecoverdBContainerProps {
    serial: string;
    backup: string;
    loading: boolean;
    setMessage: (message: string) => void;
}

interface RecoverDbResponse {
    error?: string;
    message?: string;
}

const ContainerRecoverDb: React.FC <RecoverdBContainerProps>= ({loading, setMessage, serial, backup}) => {
    const [port, setPort] = React.useState<string>('');
    const [request, setRequest] = React.useState<boolean>(false);
    const {
        isLoading,
        isSuccess,
        isError,
        data,
        error,
    } =useQueryRecoverDb(serial, backup, port, request);

    useEffect(() => {
        if (isError) {
            setMessage(error instanceof Error ? error.message : 'An unknown error occurred');
            setRequest(false);
        }


        if (isSuccess ) {
            const responseData = data as RecoverDbResponse;
            console.log(responseData);
            console.log(data);
            if (responseData.error) {
                setMessage(responseData.error);
            }
            else if ( responseData.message?.includes("Database recovered successfully") ) {
                setMessage(responseData.message);
            }
            setRequest(false);
        }

    }, [isLoading, isSuccess, isError, setMessage, error, data]);

    return (
        <div className="flex space-x-2">
            <select className="select select-info w-full max-w-xs" onChange={(event) => setPort(event.target.value)}>
                <option defaultValue="Select Port">Select Port</option>
                <option>55501</option>
                <option>55002</option>
                <option>55003</option>
                <option>55004</option>
                <option>55005</option>
                <option>55006</option>
                <option>55007</option>
                <option>55008</option>
                <option>55009</option>
            </select>
            <button className="btn btn-active btn-neutral" onClick={() => setRequest(true)} disabled={loading}>
                {isLoading ? (
                    <span className="loading loading-spinner"></span>
                ) : (
                    "Recover DB"
                )}
            </button>
        </div>
    );
}

export default ContainerRecoverDb;