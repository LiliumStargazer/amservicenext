import React, {  } from "react";
import Image from "next/image";
import wikiLogo from "@/public/images/chatwoot.png";
function ChatWootCard() {
    const handleClick = () => {
        window.open("https://chat.amdistributori.it/app/accounts/1/dashboard", "_blank");
    };

    return (
        <div className="card card-compact w-72 h-96 bg-neutral shadow-xl">
            <figure >
                <Image width='auto' height='auto' src={wikiLogo} alt="Movie" className="responsive-image"/>
            </figure>
            <div className="card-body">
                <h2 className="card-title">Chatwoot</h2>
                <p>Piattaforma mutlichannel per gestire le richeiste dei clienti</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-sm  btn-info" onClick={handleClick}>Go!</button>
                </div>
            </div>
        </div>
    );
}

export default ChatWootCard;
