import React from "react";
import tableau from "@/public/images/tableau-software.svg";
import Image from "next/image";
function TableauCard(){

    const handleClick = () => {
        window.open("https://stat.dacsy.it/#/signin", "_blank");
    };

    return (
        <div className="card card-compact w-72 h-96 bg-neutral shadow-xl">
            <figure>
                <Image width='auto' height='auto' src={tableau} alt="Movie" className="responsive-image"style={{ transform: 'scale(0.8)' }}/>
            </figure>
            <div className="card-body">
                <h2 className="card-title">Tableau </h2>
                <p>Piattaforma per la consultazione delle statistiche</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-sm  btn-info" onClick={handleClick}>Go!</button>
                </div>
            </div>
        </div>
    );
}

export default TableauCard;