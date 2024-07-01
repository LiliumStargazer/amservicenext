import React from "react";
import LottieAnimation from 'lottie-react';

import not_loaded_lottie from "@/public/not_loaded_lottie.json";

function AnimationLottieNotLoaded() {
  return (
    <div
      className="flex justify-center items-center h-screen"
      style={{ height: `calc(100vh - 100px)` }}
    >
        <div>
            <LottieAnimation
                animationData={not_loaded_lottie}
                loop
                autoPlay
                style={{width: 400, height: 400}}
            />
        </div>
    </div>
  );
}

export default AnimationLottieNotLoaded;