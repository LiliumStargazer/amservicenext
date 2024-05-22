import React from "react";
import taiga from "@/public/images/vtenext.png";
import Image from "next/image";
function VteCard(){

    const handleClick = () => {
        window.open("https://https://www.dacsy.it/", "_blank");
    };

    return (
        <div className="card card-compact w-72 h-96 bg-neutral shadow-xl">
            <figure>

                <Image width='auto' height='auto' src={taiga} alt="Movie" className="responsive-image"style={{ transform: 'scale(0.7)' }}/>
            </figure>
            <div className="card-body">
            <h2 className="card-title">VTE</h2>
                <p>il CRM di AM, contiene il modulo per la gestione dei ticket di assistenza</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-sm  btn-info" onClick={handleClick}>Go!</button>
                </div>
            </div>
        </div>
    );
}

export default VteCard;