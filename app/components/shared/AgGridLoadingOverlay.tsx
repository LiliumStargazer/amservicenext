'use client'

import React from 'react';
import type { CustomLoadingOverlayProps } from "ag-grid-react";

const LoadingOverlay = (
    props: CustomLoadingOverlayProps & { loadingMessage: string },
) => {
    return (
        <div className="ag-overlay-loading-center" role="presentation">
            <span className="loading loading-ring loading-lg"></span>
            <div aria-live="polite" aria-atomic="true">
                {props.loadingMessage}
            </div>
        </div>
    );
};

LoadingOverlay.displayName = 'LoadingOverlay';

export default LoadingOverlay;