'use client'
import React, { useEffect, useState } from "react";
import {useRouter} from "next/navigation";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Card from "@/components/card";
import {faCloud , faList} from '@fortawesome/free-solid-svg-icons';
import {faKey} from "@fortawesome/free-solid-svg-icons/faKey";
import amclublogo from "@/public/images/amClubLogo.png";
import wikiLogo from "@/public/images/logos-wikijs.png";
import chatwoot from "@/public/images/chatwoot.png";
import prestaShop from "@/public/images/Prestashop.png";
import taiga from "@/public/images/taiga-2.svg";
import vte from "@/public/images/vtenext.png";
import tableau from "@/public/images/tableau-software.svg";
import amlog from "@/public/images/image2.jpg";

function Login() {
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);

  const router = useRouter();

  return (
      <div>
          <Header windowHeight={windowHeight}/>
          <div className="flex flex-col items-center ">
              <div className="grid grid-cols-5 gap-5 mt-5 mb-28">
                  <Card
                      title="Am Log"
                      description="Controllo log dei distributori"
                      imageSrc={amlog}
                      placeholder="Type Serial"
                      type={"amlog"}
                      router={router}
                      cardKey={"amlog"}
                  />
                  <Card
                      title={"Password"}
                      icon={faKey}
                      placeholder="Insert Password"
                      description="Calcolatore di password per i servizi tecnici"
                      color={"#63E6BE"}
                      cardKey={"ampassword"}
                  />
                  <Card
                      title="Alive"
                      description="Servizi MQTT dei distributori"
                      icon={faCloud}
                      placeholder="Type Serial"
                      url="https://alive2.amdistributori.it:8443/dettaglio-distributore/?serialnumber={input}"
                      color={"#e32400"}
                      cardKey={"alive"}
                  />
                  <Card
                      title="Am Club"
                      description="Consolle di gestione dei distributori per i clienti"
                      imageSrc={amclublogo}
                      url="https://amclub.amdistributori.it/admin"
                  />
                  <Card
                      title="Am Wiki"
                      description="Risosrse e documentazione per il team di lavoro"
                      imageSrc={wikiLogo}
                      url="https://docs.amdistributori.it/"
                      scale={1.5}
                  />
                  <Card
                      title="ChatWoot"
                      description="Piattaforma omnichannel per il servizio clienti"
                      imageSrc={chatwoot}
                      url="https://chat.amdistributori.it/app/accounts/1/dashboard"
                  />
                  <Card
                      title="Lis e Prodotti"
                      description="Dashboard dei servizi LIS e delle immagini dei prodotti"
                      icon={faList}
                      url="https://dashboard.amdistributori.it/login"
                      color={"#74C0FC"}
                  />
                  <Card
                      title="AM Shop"
                      description="Dashboard shop clienti"
                      imageSrc={prestaShop}
                      url="https://shop.amdistributori.it/admin771urkqup/index.php?controller=AdminLogin&token=74aacc696c102df86bb3444752ec4dc0"
                      scale={0.6}
                  />
                  <Card
                      title="Taiga Project"
                      description="Piattaforma di gestione dei progetti"
                      imageSrc={taiga}
                      url="https://prj.amdistributori.it/login?unauthorized=true&next=%2F"
                      scale={0.5}
                  />
                  <Card
                      title="VTE"
                      description="l CRM di AM, contiene il modulo per la gestione dei ticket di assistenza"
                      imageSrc={vte}
                      url="https://https://www.dacsy.it/"
                      scale={0.5}
                  />
                  <Card
                      title="Tableau"
                      description="Dashboard per le statistiche"
                      imageSrc={tableau}
                      url="https://stat.dacsy.it/#/signin"
                      scale={0.5}
                  />
              </div>
          </div>
        <div>
          <Footer windowHeight={windowHeight}/>
        </div>
      </div>
  );
}

export default Login;

