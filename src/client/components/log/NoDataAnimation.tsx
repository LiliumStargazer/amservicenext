import React, {useEffect, useMemo} from "react";
import LottieAnimation from 'lottie-react';
import useWindowSize from "@/src/client/hooks/useWindowSize";
import useStore from "@/app/store";
import no_data_lottie from "@/public/no_data_lottie.json";



const NoDataAnimation = () => {
    const table = useStore(state => state.table);
    const { height: windowHeight } = useWindowSize();
    const height = Number.isFinite(windowHeight) ? windowHeight : 0;

    const containerStyle = useMemo(() => {
        const validHeight = typeof height === 'number' ? height - (height * 0.2) : 'auto';
        return { width: '100%', height: validHeight };
    }, [height]);

    useEffect(() => {
    }, [table]);

    if ( table !== "no_table") return null;

    return (
        <div className="flex justify-center items-center h-screen" style={containerStyle}>
            <div>
                <LottieAnimation
                    animationData={no_data_lottie}
                    loop
                    autoPlay
                    style={{ width: 400, height: 400 }}
                />
            </div>
        </div>
    );
}

export default NoDataAnimation;