import React, {  } from "react";
function ChatWootCard() {
    const handleClick = () => {
        window.open("https://chat.amdistributori.it/app/accounts/1/dashboard", "_blank");
    };

    // return (
    //     <div className="card w-96 bg-base-100 shadow-xl mr-10 ">
    //         <div className="h-80 flex justify-center items-center">
    //             <figure className="px-10 pt-10">
    //                 <figure><img src={"../../images/chatwoot.png"} alt="Movie" className="responsive-image"/></figure>
    //             </figure>
    //         </div>
    //         <div className="card-body items-center text-center">
    //             <h2 className="card-title">Chatwoot</h2>
    //             <p>Piattaforma mutlichannel per gestire le richeiste dei clienti</p>
    //             <div className="card-actions"></div>
    //             <button className="btn btn-info" onClick={handleClick}>Go!</button>
    //         </div>
    //     </div>
    // )
    return (
        <div className="card card-compact w-72 h-96 bg-neutral shadow-xl">
            <figure ><img src={"../../images/chatwoot.png"} alt="Movie" className="responsive-image"/>
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
