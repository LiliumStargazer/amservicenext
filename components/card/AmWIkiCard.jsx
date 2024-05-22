import React from "react";
import wikiLogo from "../../public/images/logos-wikijs.png";
import Image from "next/image";
function AmWikiCard(){

    const handleClick = () => {
        window.open("https://docs.amdistributori.it/", "_blank");
    };

    return (
        <div className="card card-compact w-72 h-96 bg-neutral shadow-xl">
            <figure className="min-h-[232px]" >
                <Image width='auto' height='auto' src={wikiLogo} alt="Movie"
                       className="responsive-image" style={{ transform: 'scale(1.5)' }}/>
            </figure>
            <div className="card-body">
                <h2 className="card-title">AM Wiki</h2>
                <p>Risorse documentali, manuali tecnici, descrizioni commerciali, listini</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-sm  btn-info" onClick={handleClick}>Go!</button>
                </div>
            </div>
        </div>
    );

}

export default AmWikiCard;