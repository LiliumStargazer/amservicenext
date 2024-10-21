import React from 'react';
import LottieAnimation from 'lottie-react';
import loading_triangle from "@/public/loading_triangle.json"; // Ensure the path is correct
import type { CustomLoadingOverlayProps } from "ag-grid-react";

export default (
    props: CustomLoadingOverlayProps & { loadingMessage: string },
) => {
    return (
        <div className="ag-overlay-loading-center" role="presentation">
            <LottieAnimation
                className="custom-loading-overlay"
                animationData={loading_triangle}
                loop
                autoplay
                style={{ width: 200, height: 200,  margin: "0 auto"}}
            />
            <div aria-live="polite" aria-atomic="true">
                {props.loadingMessage}
            </div>
        </div>
    );
};