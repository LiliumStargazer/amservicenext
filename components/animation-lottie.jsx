import React, {useMemo} from "react";
import LottieAnimation from 'lottie-react';
import useWindowSize from "@/hooks/useWIndowSize";

function AnimationLottie({file}){
    const { height: windowHeight } = useWindowSize();
    const height = Number.isFinite(windowHeight) ? windowHeight : 0;

    const containerStyle = useMemo(() => {
        const validHeight = typeof height === 'number' ? height - ( height * 0.2 ) : 'auto';
        return { width: '100%', height: validHeight };
    }, [height]);

    return (
        <div className="flex justify-center items-center h-screen" style={containerStyle}>
            <div>
                <LottieAnimation
                    animationData={file}
                    loop
                    autoPlay
                    style={{ width: 400, height: 400 }}
                />
            </div>
        </div>
    );
}

export default AnimationLottie;