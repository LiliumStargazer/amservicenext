'use client'
import React, { useContext, useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Card from "@/components/card";
import {faCloud , faList, faMusic, faLineChart} from '@fortawesome/free-solid-svg-icons';
import amclublogo from "@/public/images/amClubLogo.png";
import wikiLogo from "@/public/images/logos-wikijs.png";
import chatwoot from "@/public/images/chatwoot.png";
import prestaShop from "@/public/images/Prestashop.png";
import taiga from "@/public/images/taiga-2.svg";
import vte from "@/public/images/vtenext.png";
import tableau from "@/public/images/tableau-software.svg";
import amlog from "@/public/images/image2.jpg";
import useDownloadBackupOnClick from "@/hooks/useDownloadBackupOnClick";
import {Context} from "@/app/Context";
import usePasswordLevels from "@/hooks/usePasswordLevels";

function Login() {
    const [windowHeight, setWindowHeight] = useState(0);
    const {serial, setSerial} = useContext(Context);
    const [aliveSerial, setAliveSerial] = useState("");
    const { level1, level2, level3, level4, setPassword, password } = usePasswordLevels();

  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);

  const router = useRouter();
  const handleDownloadAMLog = useDownloadBackupOnClick(router);


    const onClickOpenWindow = (url, inputValue) => {
        const finalUrl = url.includes("{input}") ? url.replace("{input}", inputValue) : url;
        window.open(finalUrl, "_blank");
    }

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
                      router={router}
                      id={"amlog"}
                      isInput={true}
                      onButtonClick={handleDownloadAMLog}
                      onInputChange={(event) => setSerial(event.target.value)}
                      value={serial}
                  />
                  <Card
                      title={"Password"}
                      placeholder="Insert Password"
                      description="Calcolatore di password per i servizi tecnici"
                      color={"#63E6BE"}
                      id={"ampassword"}
                      isInput={true}
                      passwordLevels={{level1, level2, level3, level4, setPassword, password}}
                      onInputChange={(event) => setPassword(event.target.value)}
                      value={password}
                  />
                  <Card
                      title="Alive"
                      description="Servizi MQTT dei distributori"
                      icon={faCloud}
                      placeholder="Type Serial"
                      color={"#e32400"}
                      id={"alive"}
                      isInput={true}
                      onButtonClick={() => onClickOpenWindow("https://alive2.amdistributori.it:8443/dettaglio-distributore/?serialnumber={input}", aliveSerial)}
                      onInputChange={(event) => setAliveSerial(event.target.value)}
                      value={aliveSerial}
                  />
                  <Card
                      title="Am Club"
                      description="Consolle di gestione dei distributori per i clienti"
                      imageSrc={amclublogo}
                      onButtonClick={() => onClickOpenWindow("https://amclub.amdistributori.it/admin", "")}
                  />
                  <Card
                      title="Am Wiki"
                      description="Risosrse e documentazione per il team di lavoro"
                      imageSrc={wikiLogo}
                      onButtonClick={() => onClickOpenWindow("https://docs.amdistributori.it/", "")}
                      scale={1.5}
                  />
                  <Card
                      title="ChatWoot"
                      description="Piattaforma omnichannel per il servizio clienti"
                      imageSrc={chatwoot}
                      onButtonClick={() => onClickOpenWindow("https://chat.amdistributori.it/app/accounts/1/dashboard", "")}
                  />
                  <Card
                      title="Lis e Prodotti"
                      description="Dashboard dei servizi LIS e delle immagini dei prodotti"
                      icon={faList}
                      onButtonClick={() => onClickOpenWindow("https://dashboard.amdistributori.it/login", "")}
                      color={"#74C0FC"}
                  />
                  <Card
                      title="AM Shop"
                      description="Dashboard shop clienti"
                      imageSrc={prestaShop}
                      onButtonClick={() => onClickOpenWindow("https://shop.amdistributori.it/admin771urkqup/index.php?controller=AdminLogin&token=74aacc696c102df86bb3444752ec4dc0", "")}
                      scale={0.6}
                  />
                  <Card
                      title="Taiga Project"
                      description="Piattaforma di gestione dei progetti"
                      imageSrc={taiga}
                      onButtonClick={() => onClickOpenWindow("https://prj.amdistributori.it/login?unauthorized=true&next=%2F", "")}
                      scale={0.5}
                  />
                  <Card
                      title="VTE"
                      description="l CRM di AM, contiene il modulo per la gestione dei ticket di assistenza"
                      imageSrc={vte}
                      onButtonClick={() => onClickOpenWindow("https://www.dacsy.it/", "")}
                      scale={0.5}
                  />
                  <Card
                      title="Tableau"
                      description="Dashboard per le statistiche"
                      imageSrc={tableau}
                      onButtonClick={() => onClickOpenWindow("https://stat.dacsy.it/#/signin", "")}
                      scale={0.5}
                  />
                  <Card
                      title="Audio Generator"
                      description="File audio utilizzati dai prodotti"
                      icon={faMusic}
                      color={"#B197FC"}
                      onButtonClick={() => onClickOpenWindow("https://audiogateway.amdistributori.it:8443/", "")}
                      scale={0.5}
                  />
                  <Card
                      title="Statistic"
                      description="Statistiche dei ticket"
                      icon={faLineChart}
                      color={"#f8820e"}
                      scale={0.5}
                      router={router}
                      onButtonClick={() => router.push("/technical.assistance.statistics")}
                      id={"statistics"}
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

