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
import amacademy from "@/public/images/amacademy.png";
import json from "@/public/images/json.png";
import Header from "@/src/client/components/shared/Header";
import Card from "@/src/client/components/home/Card";
import Footer from "@/src/client/components/shared/Footer";

const Login: React.FC = () => {

    return (
        <div>
            <Header  />
            <div className="flex flex-col items-center ">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-5 mb-28">
                    <Card
                        title="Am Log"
                        id={"amlog"}
                        description="Controllo log dei distributori"
                        imageSrc={amlog}
                        isInput={true}
                    />
                    <Card
                        title={"Password"}
                        description="Password per i servizi tecnici"
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
                        description="Dashboard Consolle di gestione dei distributori per i clienti"
                        imageSrc={amclublogo}
                    />
                    <Card
                        title="Am Wiki"
                        id={"amwiki"}
                        description="Risosrse e documentazione per il team di lavoro"
                        imageSrc={wikiLogo}
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
                    />
                    <Card
                        title="AM Academy"
                        id={"academy"}
                        description="Corsi di aggiornamento"
                        imageSrc={amacademy}
                    />
                    <Card
                        title="JSON Server"
                        id={"json"}
                        description="piattaforma di configurazione dei distributori"
                        imageSrc={json}
                    />
                    <Card
                        title="Taiga Project"
                        id={"taiga"}
                        description="Piattaforma di gestione dei progetti"
                        imageSrc={taiga}
                    />
                    <Card
                        title="VTE"
                        id={"vte"}
                        description="l CRM di AM, contiene il modulo per la gestione dei ticket di assistenza"
                        imageSrc={vte}
                    />
                    <Card
                        title="Tableau"
                        id={"tableau"}
                        description="Dashboard per le statistiche"
                        imageSrc={tableau}
                    />
                    <Card
                        title="Audio Generator"
                        id={"audio"}
                        description="File audio utilizzati dai prodotti"
                        icon={faMusic}
                        color={"#B197FC"}
                    />
                    <Card
                        title="Statistic"
                        id={"statistics"}
                        description="Statistiche dei ticket"
                        icon={faLineChart}
                        color={"#f8820e"}
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