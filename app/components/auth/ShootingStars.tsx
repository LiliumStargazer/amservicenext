import initAnimation from "@/app/components/auth/animation";
import "./stars.scss";
import { useEffect, useRef } from "react";

export default function ShootingStars() {
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