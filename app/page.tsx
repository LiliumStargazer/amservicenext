'use client'
import React from "react";
import { faCloud, faList, faMusic, faLineChart } from '@fortawesome/free-solid-svg-icons';
import amclublogo from "@/public/images/amClubLogo.png";
import wikiLogo from "@/public/images/logos-wikijs.png";
import chatwoot from "@/public/images/chatwoot.png";
import prestaShop from "@/public/images/Prestashop.png";
import taiga from "@/public/images/taiga-2.svg";
import vte from "@/public/images/vtenext.png";
import tableau from "@/public/images/tableau-software.svg";
import amlog from "@/public/images/image2.jpg";
import Card from "@/features/home/components/Card";
import Header from "@/features/shared/client/components/Header";
import Footer from "@/features/shared/client/components/Footer";

const Login: React.FC = () => {

    return (
        <div>
            <Header  />
            <div className="flex flex-col items-center ">
                <div className="grid grid-cols-5 gap-5 mt-5 mb-28">
                    <Card
                        title="Am Log"
                        id={"amlog"}
                        description="Controllo log dei distributori"
                        imageSrc={amlog}
                        isInput={true}
                    />
                    <Card
                        title={"Password"}
                        description="Calcolatore di password per i servizi tecnici"
                        color={"#63E6BE"}
                        id={"ampassword"}
                        isButtonEnabled={false}
                        isInput={true}
                    />
                    <Card
                        id={"alive"}
                        title="Alive"
                        description="Servizi MQTT dei distributori"
                        icon={faCloud}
                        color={"#e32400"}
                        isInput={true}
                    />
                    <Card
                        title="Am Club"
                        id={"amclub"}
                        description="Consolle di gestione dei distributori per i clienti"
                        imageSrc={amclublogo}
                    />
                    <Card
                        title="Am Wiki"
                        id={"amwiki"}
                        description="Risosrse e documentazione per il team di lavoro"
                        imageSrc={wikiLogo}
                        scale={1.5}
                    />
                    <Card
                        title="ChatWoot"
                        id={"chatwoot"}
                        description="Piattaforma omnichannel per il servizio clienti"
                        imageSrc={chatwoot}
                    />
                    <Card
                        title="Lis e Prodotti"
                        id={"lis"}
                        description="Dashboard dei servizi LIS e delle immagini dei prodotti"
                        icon={faList}
                        color={"#74C0FC"}
                    />
                    <Card
                        title="AM Shop"
                        id={"shop"}
                        description="Dashboard shop clienti"
                        imageSrc={prestaShop}
                        scale={0.6}
                    />
                    <Card
                        title="Taiga Project"
                        id={"taiga"}
                        description="Piattaforma di gestione dei progetti"
                        imageSrc={taiga}
                        scale={0.5}
                    />
                    <Card
                        title="VTE"
                        id={"vte"}
                        description="l CRM di AM, contiene il modulo per la gestione dei ticket di assistenza"
                        imageSrc={vte}
                        scale={0.5}
                    />
                    <Card
                        title="Tableau"
                        id={"tableau"}
                        description="Dashboard per le statistiche"
                        imageSrc={tableau}
                        scale={0.5}
                    />
                    <Card
                        title="Audio Generator"
                        id={"audio"}
                        description="File audio utilizzati dai prodotti"
                        icon={faMusic}
                        color={"#B197FC"}
                        scale={0.5}
                    />
                    <Card
                        title="Statistic"
                        id={"statistics"}
                        description="Statistiche dei ticket"
                        icon={faLineChart}
                        color={"#f8820e"}
                        scale={0.5}
                    />
                </div>
            </div>
            <div>
                <Footer  />
            </div>
        </div>
    );
}

export default Login;