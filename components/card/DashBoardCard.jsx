import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList} from '@fortawesome/free-solid-svg-icons';

function DashBoardCard() {
    const handleClick = () => {
        window.open("https://dashboard.amdistributori.it/login", "_blank");
    };

    return (
        <div className="card card-compact w-72 h-96 bg-neutral shadow-xl ">
            <figure className="min-h-[232px]"><FontAwesomeIcon icon={faList} size="10x" style={{color: "#74C0FC"}} />
            </figure>
            <div className="min-h-[152px]">
                <div className="card-body ">
                    <h2 className="card-title">DashBoard Lis e Prodotti</h2>
                    <p className="min-h-[40px]">controllo dei servizi LIS, delle etichette dei prodotti</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-sm btn-info join-item" onClick={handleClick}>Go!</button>
                    </div>
                </div>
            </div>
        </div>

    );

}

export default DashBoardCard;
