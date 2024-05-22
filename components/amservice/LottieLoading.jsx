import React, {useContext, useEffect} from "react";
import LottieAnimation from 'lottie-react';
import {Context} from "@/app/Context";
import loading_lottie from "@/public/loading_lottie.json";

function LottieLoading(){
    const { loading } = useContext(Context);

    useEffect(() => {
    }, [loading]);

    if ( !loading )
        return null;

    return (
        <div className="flex justify-center items-center h-screen" style={{ height: `calc(100vh - 100px)` }}>
            <div>
                <LottieAnimation
                    animationData={loading_lottie}
                    loop
                    autoPlay
                    style={{ width: 400, height: 400 }}
                />
            </div>
        </div>
    );
}

export default LottieLoading;