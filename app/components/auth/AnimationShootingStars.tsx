import initAnimation from "@/app/lib/animation";
import "@/app/styles/stars.scss";
import { useEffect, useRef } from "react";

export default function AnimationShootingStars() {
    const terrainCanvasRef = useRef(null);
    const bgCanvasRef = useRef(null);

    useEffect(() => {
        initAnimation(terrainCanvasRef.current, bgCanvasRef.current);
    }, []);

    return (
        <div className="stars landscape">
            <canvas id="terrainCanvas" ref={terrainCanvasRef}></canvas>
            <canvas id="bgCanvas" ref={bgCanvasRef}></canvas>
        </div>
    );
}