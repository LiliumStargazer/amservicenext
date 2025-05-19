'use client'

import React from "react";

interface AlertMultipleProps {
    isLoading: boolean;
    message?: string;
}

const AlertMultiple: React.FC<AlertMultipleProps> = ({isLoading, message}) => {

    if (isLoading) {
        return (
            <div role="alert" className="alert flex items-center justify-center space-x-2">
                <span className="loading loading-ring loading-lg h-6"></span>
                <span className="h-5">Loading...</span>
            </div>
        );
    }

    if (message?.length != 0){
        return (
            <div role="alert" className="alert flex items-center justify-center space-x-2">
                <span className="h-6">{message}</span>
            </div>
        );
    }

    return (
        <div role="alert" className="alert flex items-center justify-center space-x-2">
            <span className="h-6"></span>
        </div>
    );

}

export default AlertMultiple;