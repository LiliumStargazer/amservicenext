'use client'

import React from "react";
import { AlertStatus } from "@/app/enum/enum";

interface AlertMultipleProps {
    isLoading: boolean;
    message?: string;
    status?: AlertStatus;
}

const AlertMultiple: React.FC<AlertMultipleProps> = ({isLoading, message, status}) => {

    if (isLoading) {
        return (
            <div role="alert" className="alert flex items-center justify-center space-x-2">
                <span className="loading loading-ring loading-lg h-6"></span>
                <span className="h-5">Loading...</span>
            </div>
        );
    }

    if (message?.length != 0){
        if (status=== AlertStatus.Success)
            return (
                <div role="alert" className="alert alert-success flex items-center justify-center space-x-2">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24"></svg>
                    <span className="h-6">{message}</span>
                </div>
            );
        if (status=== AlertStatus.Error)
            return (
                <div role="alert" className="alert alert-error flex items-center justify-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24"></svg>
                    <span className="h-6">{message}</span>
                </div>
            );
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