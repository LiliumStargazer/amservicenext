import React, {useEffect, useState} from 'react';
import useStore from "@/app/store";
import {v4 as uuidv4} from 'uuid';
import {translateParam} from "@/features/log/client/utils/param-translation";

interface ParamProps {}

const Param: React.FC<ParamProps> = () => {
    const param = useStore(state => state.param);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [params, setParams] = useState<React.ReactNode[]>([]);

    const categoriesAndParams = React.useMemo(() => {
        const result: Record<string, any[]> = {};

        Object.entries(param).forEach(([key, value]) => {
            const translated = translateParam({ [key]: value });
            if (translated && translated.category) {
                if (translated.category === "Device List") {
                    const devices = translated.value;
                    result[translated.category] = result[translated.category] || [];
                    result[translated.category].push(...(Array.isArray(translated.value) ? translated.value : [translated]));
                    devices.forEach((device: any) => {
                        let parsedDevice = translateParam(device);
                        if (parsedDevice && parsedDevice.category === "Frigo") {
                            result["Frigo"] = result["Frigo"] || [];
                            result["Frigo"].push(parsedDevice);
                        }
                        if (parsedDevice && parsedDevice.category === "Pax") {
                            result["Pax"] = result["Pax"] || [];
                            result["Pax"].push(parsedDevice);
                        }
                        if (parsedDevice && parsedDevice.category === "Ingenico IUP250") {
                            result["Ingenico IUP250"] = result["Ingenico IUP250"] || [];
                            result["Ingenico IUP250"].push(parsedDevice);
                        }
                        if (parsedDevice && parsedDevice.category === "Ingenico Single IUC160b") {
                            result["Ingenico Single IUC160b"] = result["Ingenico Single IUC160b"] || [];
                            result["Ingenico Single IUC160b"].push(parsedDevice);
                        }
                    });
                } else {
                    result[translated.category] = result[translated.category] || [];
                    result[translated.category].push(...(Array.isArray(translated.value) ? translated.value : [translated]));
                }
            }
        });
        return result;
    }, [param]);

    const handleCategoryClick = (category: string) => {
        setSelectedCategory(category);
    };

    function bannerProvider(content: string | React.ReactNode) {
        return (
            <div className="mt-2" key={uuidv4()}>
                <div role="alert" className="alert bg-neutral text-neutral-content">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                         className="stroke-current shrink-0 w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>{content}</span>
                </div>
            </div>
        );
    }

    useEffect(() => {
        if (selectedCategory && categoriesAndParams[selectedCategory]) {
            const selectedParams = categoriesAndParams[selectedCategory];
            const renderParams = selectedParams.map((param) => {
                let content: string | any[] | null = null;
                let hopperAggiuntivi: string;
                let ingresso: string;
                let capacity: string;
                let name: string;
                let maxItem: string;
                switch (selectedCategory) {
                    case "Comando Vocale":
                        content = `${param.name} : ${param.value}`;
                        break;
                    case "Pax": {
                        content = [];
                        let banner = (<>
                            Abilitato: {param.value.Enable.toString()} <br/>
                            Disabilita ricevuta: {param.value.LockReceiptPrint.toString()} <br/>
                            Serial Number: {param.value.SerialNumber} <br/>
                        </>);
                        content.push(bannerProvider(banner));
                        banner = (<>
                            Banca Cliente 1 <br/>
                            --------------------------<br/>
                            Codice Azienda: {param.value.TerminalList[0].CodAzienda} <br/>
                            Id Certificato: {param.value.TerminalList[0].IdCertificato} <br/>
                            Id Certificato Pax: {param.value.TerminalList[0].IdCertificatoPax} <br/>
                            Id Personalizzazione: {param.value.TerminalList[0].IdPersonalizzazione} <br/>
                            Ip Centro servizi: {param.value.TerminalList[0].IpCentroServizi} <br/>
                            Terminal Id: {param.value.TerminalList[0].TerminalId} <br/>
                            Banca Cliente: {param.value.TerminalList[0].TerminalName} <br/>
                            Tipo Certificato: {param.value.TerminalList[0].TipoCertificato} <br/>
                        </>);
                        content.push(bannerProvider(banner));
                        banner = (<>
                            Banca Cliente 2 <br/>
                            --------------------------<br/>
                            Codice Azienda: {param.value.TerminalList[2].CodAzienda} <br/>
                            Id Certificato: {param.value.TerminalList[2].IdCertificato} <br/>
                            Id Certificato Pax: {param.value.TerminalList[2].IdCertificatoPax} <br/>
                            Id Personalizzazione: {param.value.TerminalList[2].IdPersonalizzazione} <br/>
                            Ip Centro servizi: {param.value.TerminalList[2].IpCentroServizi} <br/>
                            Terminal Id: {param.value.TerminalList[2].TerminalId} <br/>
                            Banca Cliente: {param.value.TerminalList[2].TerminalName} <br/>
                            Tipo Certificato: {param.value.TerminalList[2].TipoCertificato} <br/>
                        </>);
                        content.push(bannerProvider(banner));
                    }
                        break;
                    case "Ingenico Single IUC160b": {
                        content = [];
                        let banner = (<>
                            Ingenico Abilitato : {param.value.Enable.toString()} <br/>
                        </>);
                        content.push(bannerProvider(banner));
                        banner = (<>
                            Ip Address: {param.value.IpAddress} <br/>
                        </>);
                        content.push(bannerProvider(banner));
                        banner = (<>
                            Porta : {param.value.Porta} <br/>
                        </>);
                        content.push(bannerProvider(banner));
                        banner = (<>
                            Serial Number : {param.value.SerialNumber} <br/>
                        </>);
                        content.push(bannerProvider(banner));
                    }
                        break;
                    case "Ingenico IUP250": {
                        content = [];
                        let banner = (<>
                            Ingenico Abilitato: {param.value.Enable.toString()} <br/>
                            DHCP Abilitato: {param.value.DhcpEnable.toString()} <br/>
                            Ip Address: {param.value.IpAddress} <br/>
                            Blocca emissione automatica scontrini: {param.value.LockReceiptPrint.toString()} <br/>
                            Serial Number: {param.value.SerialNumber} <br/>
                        </>);
                        content.push(bannerProvider(banner));
                        banner = (<>
                            Impostazioni {param.value.TerminalList[0].TerminalName} <br/>
                            Codice Azienda: {param.value.TerminalList[0].CodAzienda} <br/>
                            Id Certificato: {param.value.TerminalList[0].IdCertificato} <br/>
                            Ip Centro Servizi: {param.value.TerminalList[0].IpCentroServizi} <br/>
                            Porta Centro Servizi: {param.value.TerminalList[0].PortaCentroServizi} <br/>
                            Terminal Id: {param.value.TerminalList[0].TerminalId} <br/>
                        </>);
                        content.push(bannerProvider(banner));
                    }
                        break;
                    case "Frigo": {
                        const frigoparams = param.value;
                        const isArray = Array.isArray(frigoparams);
                        if (isArray) {
                            content = [];
                            frigoparams.forEach((frigoparam: any, index: number) => {
                                const fragment = (
                                    <>
                                        Frigo Numero {index}
                                        <br/>
                                        --------------------------<br/>
                                        DeltaAlarm: {frigoparam.DeltaAlarm} <br/>
                                        Delta Temperatura Allarme Condensatore
                                        : {frigoparam.DeltaTemperaturaAllarmeCondensatore} <br/>
                                        Durata Sbrinamento: {frigoparam.DurataSbrinamento} <br/>
                                        Isteresi: {frigoparam.FrigoAlarmHoldoffTime} <br/>
                                        Isteresi: {frigoparam.FrigoPollTime} <br/>
                                        Isteresi: {frigoparam.IminimamA} <br/>
                                        Isteresi: {frigoparam.Isteresi} <br/>
                                        Numero Spirali: {frigoparam.NumSpirali} <br/>
                                        Periodo Sprinamento: {frigoparam.PeriodoSbrinamento} <br/>
                                        Isteresi: {frigoparam.SogliaI0mA} <br/>
                                        Isteresi: {frigoparam.SogliaI1mA} <br/>
                                        Isteresi: {frigoparam.SogliaT0mS} <br/>
                                        Temperatura Allarme Condensatore: {frigoparam.TemperaturaAllarmeCondensatore} <br/>
                                        Temperatura Lavoro: {frigoparam.TemperaturaLavoro} <br/>
                                        Temperatura Warning Condensatore: {frigoparam.TemperaturaWarningCondensatore} <br/>
                                        Tempo Ciclo: {frigoparam.TempoCiclo} <br/>
                                        --------------------------
                                        <br/>
                                        <br/>
                                        <br/>
                                    </>
                                );
                                content = content || [];
                                if (!Array.isArray(content)) {
                                    content = [content];
                                }
                                content.push(bannerProvider(fragment));
                            });
                        } else {
                            content = `${param.name} : ${param.value}`;
                        }
                        break;
                    }
                    case "Device List":
                        content = `${param.DeviceType} - canale: ${param.Channel} - Qt: ${param.Molteplicity} - Seriale: ${param.DevSerialID !== "" ? param.DevSerialID : "non letto"}`;
                        break;
                    case "Favorites":
                        content = `Nome menu: ${param.ItemTitle} `;
                        break;
                    case "Hopper":
                        hopperAggiuntivi = (param.CoinSorter ? `- Canale smistamento: ${param.CoinSorter} ` : "");
                        ingresso = param.InOutNumBase0 ? `- Ingresso: ${param.InOutNumBase0} ` : "";
                        content = `Numero: ${param.Name} ${ingresso} - Valore moneta: ${param.CoinValue}`;
                        break;
                    case "Sapispay":
                        break;
                    case "Motori": {
                        if (param.TErogMotori)
                            capacity = param.TErogMotori.Capacity;
                        else if (param.Capacity)
                            capacity = param.Capacity;
                        else
                            capacity = "0";

                        ingresso = param.InOutNumBase0 ? param.InOutNumBase0 : "0";

                        let motorType = "non definito";
                        if (param.MotorType)
                            motorType = param.MotorType;
                        else if (param.ErogDevType)
                            motorType = param.ErogDevType;

                        content = `Tipo: ${motorType} - Nome: ${(param.Name)} - Ingresso: ${ingresso} 
                        - Codice Prodotto: ${param.ProductCode} - Capacità: ${capacity}`;
                        break;
                    }
                    case "Pannelli":
                        name = param.Name ? param.Name : "non definito";
                        name = param.PanelImageName ? param.PanelImageName : name;
                        maxItem = param.NumMaxItem ? param.NumMaxItem : "non definito";
                        maxItem = param.NumEffItem ? param.NumEffItem : maxItem;

                        content = `Nome: ${name} - Numero massimo elementi: ${maxItem} - Visibile: ${param.Visible ? param.Visible : "False"}`;
                        break;
                    case "Impronte":
                        if (param.FingerID)
                            content = `Id: ${param.FingerID} - Qualità: ${param.EnrolledQuality} - Codice Fiscale: ${param.PeopleID} - Abilitato: ${param.BorsellinoEnabled ? "True" : "False"}`;
                        else
                            content = `${param.name} : ${param.value}`;
                        break;
                    case "Sicurezza Speciale":
                        content = `Valore Taglio: ${param.LineValue} - Numero pezzi prima del blocco: ${param.PcsFilterLimit} - Tempo disabilitazione: ${param.TimeDisable} - Tempo di campionatura: ${param.WindowFilter} - Abilita gestione a tempo: ${param.TimeFeatureEnabled}`;
                        break;
                    case "VTE":
                        content = `Nome funzione: ${param.Name} - Data inizio: ${param.inizio ? param.inizio : "non definito"} - Data fine: ${param.fine ? param.fine : "non definito"}`;
                        break;
                    case "Volume":
                        if (param.name === "Profilo Inizio Giorno")
                            content = `Inizio profilo giorno: ${param.value}`;
                        else if (param.name === "Profilo Fine Giorno")
                            content = `Fine profilo giorno: ${param.value}`;
                        else
                            content = `Giorno: ${param.Day ? param.Day : "Sunday"} - Valore giorno: ${param.VolProfiloGiorno} - Valore notte: ${param.VolProfiloNotte}`;
                        break;
                    case "Video":
                        content = param.subcategory === "videoweek" ? `Filename ${param.name} Data: ${param.datetime}` : `${param.name} : ${param.value}`;
                        break;
                    default:
                        content = `${param.name} : ${param.value}`;
                        break;
                }

                let isObject = typeof content === "object";

                if (!isObject && content) {
                    if (Array.isArray(content)) {
                        return content.map(item => bannerProvider(item));
                    }
                    return bannerProvider(content);
                } else {
                    return content;
                }
            });
            const validParams = renderParams.filter(param => React.isValidElement(param)) as React.ReactElement[];
            setParams(validParams)
        }
    }, [selectedCategory, categoriesAndParams]);

    return (
        <div className="flex-auto m-10">
            <div className="flex-auto space-x-2 space-y-2">
                {Object.entries(categoriesAndParams)
                    .filter(([category]) => category !== "Undefined")
                    .sort((a, b) => a[0].localeCompare(b[0]))
                    .map(([category], index) => (
                        <button className="btn btn-info " key={index} onClick={() => handleCategoryClick(category)}>
                            {category}
                        </button>
                    ))}
            </div>
            <div className="flex-auto mt-5">
                {params}
            </div>
        </div>
    );
}

export default Param;