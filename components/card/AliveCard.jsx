import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloud } from '@fortawesome/free-solid-svg-icons';

function AliveCard() {
    const [serialNumber, setSerialNumber] = useState("");

    const handleChange = (event) => {
        setSerialNumber(event.target.value);
    };

    const handleClick = () => {
        const url = `https://alive2.amdistributori.it:8443/dettaglio-distributore/?serialnumber=${serialNumber}`;
        window.open(url, "_blank");
    };

    return (
        <div className="card card-compact w-72 h-96 bg-neutral shadow-xl ">
            <figure className="min-h-[232px]"><FontAwesomeIcon icon={faCloud} size="10x" style={{color: "#e32400"}} />
            </figure>
            <div className="min-h-[152px]">
            <div className="card-body ">
                <h2 className="card-title">Alive</h2>
                <p className="min-h-[40px]">Servizi MQTT dei distributori</p>
                <div className="card-actions justify-end">
                    <div className="join">
                        <input
                            className="input input-sm input-bordered w-32 mr-0 join-item"
                            placeholder="Type Serial"
                            value={serialNumber}
                            onChange={handleChange}
                        />
                        <button
                            className="btn btn-sm btn-info join-item"
                            onClick={handleClick}
                        >
                            Go!
                        </button>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
}

export default AliveCard;
