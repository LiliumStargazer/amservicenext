import React from "react";
import Image from "next/image";
import prestaShop from "@/public/images/Prestashop.png";
function PrestaShopCard(){

    const handleClick = () => {
        window.open("https://shop.amdistributori.it/admin771urkqup/index.php?controller=AdminLogin&token=74aacc696c102df86bb3444752ec4dc0", "_blank");
    };

    return (
        <div className="card card-compact w-72 h-96 bg-neutral shadow-xl">
            <figure>
                {/*<img src={'../../images/Prestashop.png'} alt="Movie" className="responsive-image" style={{ transform: 'scale(0.8)' }}/>*/}
                <Image width='auto' height='auto' src={prestaShop} alt="Movie" className="responsive-image" style={{ transform: 'scale(0.8)' }}/>
            </figure>
            <div className="card-body">
                <h2 className="card-title">AM Shop</h2>
                <p>Piattaforma per la gestione degli ordini clienti effettuati attraverso amclub</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-sm  btn-info" onClick={handleClick}>Go!</button>
                </div>
            </div>
        </div>
    );
}

export default PrestaShopCard;