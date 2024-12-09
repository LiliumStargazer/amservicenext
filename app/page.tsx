'use client'
import React, {KeyboardEvent} from "react";
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
import Card from "@/app/components/home/Card";
import Footer from "@/app/components/shared/Footer";
import ButtonNav from "@/app/components/shared/ButtonNav";
import Alert from "@/app/components/shared/Alert";
import {
    getSerialValidationMessage,
    handleSerialValidation,
    onClickOpenWindow,
    trimAndFormatSerial
} from "@/app/utils/utils";
import useStore from "@/app/store";
import {usePathname, useRouter} from "next/navigation";
import usePasswordLevels from "@/app/hooks/home/usePasswordLevels";

const Login: React.FC = () => {
    const setSerial = useStore(state => state.setSerial);
    const serialTemp = useStore(state => state.serialTemp);
    const setSerialTemp = useStore(state => state.setSerialTemp);
    const [message, setMessage] = React.useState<string>('');
    const [aliveSerial, setAliveSerial] = React.useState<string>('');
    const [loading, setLoading] = React.useState<boolean>(false);
    const [password, setPassword] = React.useState<string>('');
    const { passwords } = usePasswordLevels(password);
    const router = useRouter();
    const pathname = usePathname();

    const handleKeyDownOnAlive = (event: KeyboardEvent) => {
        if (event.key === "Enter") {
            setLoading(true);
            const formattedSerial = trimAndFormatSerial(aliveSerial);
            setSerial(formattedSerial);
            const message = getSerialValidationMessage(formattedSerial);
            if (message !== "valid") {
                setMessage(message);
            } else {
                onClickOpenWindow("https://alive2.amdistributori.it:8443/dettaglio-distributore/?serialnumber={input}", aliveSerial);
            }
        }
        setLoading(false);
    };

    const onClickWithAliveValue = () => {
        setLoading(true);
        const formattedSerial = trimAndFormatSerial(aliveSerial);
        const message = getSerialValidationMessage(formattedSerial);
        if (message !== "valid" )
            setMessage(message);
        else
            onClickOpenWindow("https://alive2.amdistributori.it:8443/dettaglio-distributore/?serialnumber={input}", aliveSerial);
        setLoading(false);
    }

    const handleKeyDownOnLog = async (event: KeyboardEvent) => {
        setLoading(true);
        if (event.key === "Enter") {
            handleSerialValidation(serialTemp, setSerial, setMessage, router, pathname);
        }
        setLoading(false);
    };

    const handleClickLog = () => {
        setLoading(true);
        handleSerialValidation(serialTemp, setSerial, setMessage, router, pathname);
        setLoading(false);
    }

    return (
        <div>
            <div id="header" className="navbar bg-neutral text-neutral-content h-16">
                <ButtonNav setMessage={setMessage}/>
                <div className="ml-10">
                    <Alert message={message} setMessage={setMessage}/>
                </div>
            </div>
            <div className="flex flex-col items-center ">
                <div
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-5 mb-28">
                    <Card
                        title="Am Log"
                        id={"amlog"}
                        description="Controllo log dei distributori"
                        imageSrc={amlog}
                        isInput={true}
                        handleKeyDownOnLog={handleKeyDownOnLog}
                        setSerialTemp={setSerialTemp}
                        handleClickLog={handleClickLog}
                        loading={loading}
                    />
                    <Card
                        title={"Password"}
                        description="Password per i servizi tecnici"
                        color={"#63E6BE"}
                        id={"ampassword"}
                        isButtonEnabled={false}
                        isInput={true}
                        setPassword={setPassword}
                        passwords={passwords}
                        loading={loading}
                    />
                    <Card
                        id={"alive"}
                        title="Alive"
                        description="Servizi MQTT dei distributori"
                        icon={faCloud}
                        color={"#e32400"}
                        isInput={true}
                        handleKeyDownOnAlive={handleKeyDownOnAlive}
                        setAliveSerial={setAliveSerial}
                        onClickWithAliveValue={onClickWithAliveValue}
                        loading={loading}
                    />
                    <Card
                        title="Am Club"
                        id={"amclub"}
                        description="Dashboard Consolle di gestione dei distributori per i clienti"
                        imageSrc={amclublogo}
                        loading={loading}
                    />
                    <Card
                        title="Am Wiki"
                        id={"amwiki"}
                        description="Risosrse e documentazione per il team di lavoro"
                        imageSrc={wikiLogo}
                        loading={loading}
                    />
                    <Card
                        title="ChatWoot"
                        id={"chatwoot"}
                        description="Piattaforma omnichannel per il servizio clienti"
                        imageSrc={chatwoot}
                        loading={loading}
                    />
                    <Card
                        title="Lis e Prodotti"
                        id={"lis"}
                        description="Dashboard dei servizi LIS e delle immagini dei prodotti"
                        icon={faList}
                        color={"#74C0FC"}
                        loading={loading}
                    />
                    <Card
                        title="AM Shop"
                        id={"shop"}
                        description="Dashboard shop clienti"
                        imageSrc={prestaShop}
                        loading={loading}
                    />
                    <Card
                        title="AM Academy"
                        id={"academy"}
                        description="Corsi di aggiornamento"
                        imageSrc={amacademy}
                        loading={loading}
                    />
                    <Card
                        title="JSON Server"
                        id={"json"}
                        description="piattaforma di configurazione dei distributori"
                        imageSrc={json}
                        loading={loading}
                    />
                    <Card
                        title="Taiga Project"
                        id={"taiga"}
                        description="Piattaforma di gestione dei progetti"
                        imageSrc={taiga}
                        loading={loading}
                    />
                    <Card
                        title="VTE"
                        id={"vte"}
                        description="l CRM di AM, contiene il modulo per la gestione dei ticket di assistenza"
                        imageSrc={vte}
                        loading={loading}
                    />
                    <Card
                        title="Tableau"
                        id={"tableau"}
                        description="Dashboard per le statistiche"
                        imageSrc={tableau}
                        loading={loading}
                    />
                    <Card
                        title="Audio Generator"
                        id={"audio"}
                        description="File audio utilizzati dai prodotti"
                        icon={faMusic}
                        color={"#B197FC"}
                        loading={loading}
                    />
                    <Card
                        title="Statistic"
                        id={"statistics"}
                        description="Statistiche dei ticket"
                        icon={faLineChart}
                        color={"#f8820e"}
                        loading={loading}
                    />
                </div>
            </div>
            <div>
                <Footer/>
            </div>
        </div>
    );
}

export default Login;