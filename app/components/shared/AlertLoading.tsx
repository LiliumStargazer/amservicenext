'use client'

import React from "react";

const AlertLoading: React.FC = () => {
    return (
        <div role="alert" className="alert">
            <span className="loading loading-ring loading-lg"></span>
            <span>Loading...</span>
        </div>
    );
}

export default AlertLoading;