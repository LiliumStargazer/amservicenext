import React from "react";
function TaigaCard(){

    const handleClick = () => {
        window.open("https://prj.amdistributori.it/login?unauthorized=true&next=%2F", "_blank");
    };

    return (
        <div className="card card-compact w-72 h-96 bg-neutral shadow-xl">
            <figure className="max-h-[232px]"><img src={'../../images/taiga-2.svg'} alt="Movie" className="responsive-image" style={{ transform: 'scale(0.8)' }}/>
            </figure>
            <div className="card-body">
                <h2 className="card-title">Taiga Project</h2>
                <p>Piattaforma di gestione dei progetti</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-sm  btn-info" onClick={handleClick}>Go!</button>
                </div>
            </div>
        </div>
    );
}

export default TaigaCard;