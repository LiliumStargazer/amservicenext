import React from "react";

function AmClubCard(){

    const handleClick = () => {
        window.open("https://amclub.amdistributori.it/admin", "_blank");
    };


    return (
        <div className="card card-compact w-72 h-96 bg-neutral shadow-xl">
            <figure className="min-h-[229px]"><img src={'../images/AmClubLogo.png'} alt="Movie"
                                                   className="responsive-image"/>
            </figure>
            <div className="min-h-[152px]">
            <div className="card-body">
                <h2 className="card-title">Am Club</h2>
                <p>Consolle di gestione dei distributori per i clienti</p>
                <div className="card-actions justify-end">
                    <div className="card-actions justify-end">
                        <button className="btn btn-sm  btn-info" onClick={handleClick}>Go!</button>
                    </div>
                </div>
            </div>
            </div>
        </div>

    );


}

export default AmClubCard;