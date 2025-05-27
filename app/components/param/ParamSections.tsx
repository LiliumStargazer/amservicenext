'use client'

import React, {useEffect, useState} from "react";
import {
    Param,
    TypeErogParams,
    jsonParams, TypeConfigParams,
} from "@/app/types/types";
import {v4 as uuidv4} from "uuid";
import AlertLoading from "@/app/components/shared/AlertLoading";
import {
    getConfig,
    getCorrispettivi, getIngenico,
    getNet, getPax, getTerminals,
    mapAge,
    mapBetPassion,
    mapErog,
    mapFavorites,
    mapFinger,
    mapHopper, mapMisterPay,
    mapMoneyAccept,
    mapPanel,
    mapVideo,
    mapVolume,
    mapVteContracts, processRawDevice, processRawErog
} from "@/app/utils/paramMapping";

interface ParamsAccorditionProps {
    loading: boolean;
    param: Param ;
    listinoItems: Array<{ code: number, prodName: string }> | null;
    jsonParams: jsonParams;
}

const ParamSections: React.FC<ParamsAccorditionProps> = ({loading, param, listinoItems, jsonParams}) => {
    type GenericParam = Record<string, string | number | undefined>;
    const [erogParams, setErogParams] = useState<TypeErogParams[]>([]);
    const [deviceParams, setDeviceParams] = useState<TypeConfigParams[]>([]);
    const terminalList = getTerminals(param);
    const paxParam = getPax(param);
    const ingParam = getIngenico(param);
    const configParams = getConfig(param);
    const netParams = getNet(param);
    const corrispettiviParams = getCorrispettivi(param);
    const betPassionParams = mapBetPassion(param);
    const mpParam = mapMisterPay(param);
    const ageParam = mapAge(param);
    const favoritesParams = mapFavorites(param);
    const fingerParams = mapFinger(param);
    const hopperParam = mapHopper(param);
    const moneyLineAccceptParam = mapMoneyAccept(param);
    const panelParam = mapPanel(param);
    const vteContractParam = mapVteContracts(param);
    const videoWeek = mapVideo(param);
    const volume = mapVolume(param);

    useEffect(() => {
        const rawErog = processRawErog(param, jsonParams);
        const erogs = mapErog(rawErog, listinoItems);
        setErogParams(erogs);
    }, [listinoItems, param, jsonParams]);

    useEffect(() => {
        const mappedDevice = processRawDevice(param, jsonParams);
        setDeviceParams(mappedDevice);
    }, [param, jsonParams]);

    let sections = [
        {title: 'Configurazione', params: configParams},
        {title: 'Corrispettivi', params: corrispettiviParams},
        {title: 'Rete', params: netParams},
        {title: 'Età Param', params: ageParam,
            customRender: (param: GenericParam) => (
                <div className="flex-1 flex flex-col" key={uuidv4()}>
                    <span className="font-bold text-info">Param {param.label}:</span>
                    {param.value} anni
                </div>
            )
        },
        { title: 'BetPassion', params: betPassionParams },
        { title: 'Device', params: deviceParams,
            customRender: (param: GenericParam) => (
                <div className="flex-1 flex flex-col" key={uuidv4()}>
                    {param.value && <div><span className="font-bold text-info">Type:</span> {param.value}</div>}
                    {param.serial && <div><span className="font-bold text-info">Serial:</span> {param.serial}</div>}
                    {param.position && <div><span className="font-bold text-info">Posizione:</span> {param.position}</div>}
                    {param.fotocellule && <div><span className="font-bold text-info">Fotocellule:</span> {param.fotocellule}</div>}
                </div>
            )
        },
        { title: 'Erogatori', params: erogParams,
            customRender: (param: GenericParam) => (
                <div className="flex-2 flex flex-col" key={uuidv4()}>
                    <span className="font-bold text-info">{param.label}</span>
                    {param.capacity && <div>Capacità: {param.capacity}</div>}
                    {param.type && <div>Tipo: {param.type}</div>}
                    {param.productCode && <div>Codice: {param.productCode}</div>}
                    {param.name && <div>Nome: {param.name}</div>}
                    {param.inout && <div>Ingresso: {param.inout}</div>}
                    {param.ripiano && <div>Ripiano: {param.ripiano}</div>}
                </div>
            )
        },
        {title: 'Favorites', params: favoritesParams},
        {title: 'Impronte', params: fingerParams,
            customRender: (param: GenericParam) => (
                <div className="flex-1 flex flex-col" key={uuidv4()}>
                    {param.ID && <div>ID: {param.ID}</div>}
                    {param.quality && <div>Qualità: {param.quality}</div>}
                    {param.cf && <div>CF: {param.cf}</div>}
                </div>
            )
        },
        {title: 'Hopper', params: hopperParam,
            customRender: (param: GenericParam) => (
                <div className="flex-1 flex flex-col" key={uuidv4()}>
                    <span className="font-bold text-info">{param.key}</span>
                    {param.coinvalue && <div>Taglio: {param.coinvalue}</div>}
                    {param.canalesmistamento && <div>Canale: {param.canalesmistamento}</div>}
                </div>
            )
        },
        {title: 'Sicurezza', params: moneyLineAccceptParam,
            customRender: (param: GenericParam) => (
                <div className="flex-1 flex flex-col" key={uuidv4()}>
                    {param.valoreTaglio && <div>Valore: {param.valoreTaglio}</div>}
                    {param.abilitaGestioneTempo && <div>Gestione tempo: {param.abilitaGestioneTempo}</div>}
                    {param.numeroPezziPrimaBlocco && <div>Max pezzi: {param.numeroPezziPrimaBlocco}</div>}
                    {param.tempoCampionatura && <div>Campionatura: {param.tempoCampionatura}</div>}
                </div>
            )
        },
        {title: 'Mr Pay', params: mpParam},
        {title: 'Pannelli', params: panelParam,
            customRender: (param: GenericParam) => (
                <div className="flex-1 flex flex-col" key={uuidv4()}>
                    <span className="font-bold text-info">{param.name}</span>
                    {param.categoryReference && <div>Categoria: {param.categoryReference}</div>}
                    {param.numMaxItem && <div>Max icone: {param.numMaxItem}</div>}
                    {param.panelImage && <div>Immagine: {param.panelImage}</div>}
                </div>
            )
        },
        {title: 'VTE', params: vteContractParam,
            customRender: (param: GenericParam) => (
                <div className="flex-1 flex flex-col" key={uuidv4()}>
                    <span className="font-bold text-info">{param.name}</span>
                    {param.dataStart && <div>Inizio: {param.dataStart}</div>}
                    {param.dataEnd && <div>Fine: {param.dataEnd}</div>}
                </div>
            )
        },
        {title: 'Video Week', params: videoWeek,
            customRender: (param: GenericParam) => (
                <div className="flex-1 flex flex-col" key={uuidv4()}>
                    <span className="font-bold text-info">{param.number}</span>
                    {param.file && <div>File: {param.file}</div>}
                </div>
            )
        },
        {title: 'Volume', params: volume,
            customRender: (param: GenericParam) => (
                <div className="flex-1 flex flex-col" key={uuidv4()}>
                    <span className="font-bold text-info">{param.day}</span>
                    {param.volgiorno && <div>Giorno: {param.volgiorno}</div>}
                    {param.volnotte && <div>Notte: {param.volnotte}</div>}
                </div>
            )
        },
        {title: 'Ingenico', params: ingParam,
            customRender: (param: GenericParam) => (
                <div className="flex-1 flex flex-col" key={uuidv4()}>
                    {param.enable && <div>Abilitato: {param.enable}</div>}
                    {param.serialNumber && <div>Seriale: {param.serialNumber}</div>}
                    {param.porta && <div>Porta: {param.porta}</div>}
                </div>
            )
        },
        {title: 'Pax', params: paxParam,
            customRender: (param: GenericParam) => (
                <div className="flex-1 flex flex-col" key={uuidv4()}>
                    {param.enable && <div>Abilitato: {param.enable}</div>}
                    {param.serialNumber && <div>Seriale: {param.serialNumber}</div>}
                    {param.bloccoScontrino && <div>Blocco Scontrino: {param.bloccoScontrino}</div>}
                </div>
            )
        },
        {title: 'Terminali', params: terminalList,
            customRender: (param: GenericParam) => (
                <div className="flex-1 flex flex-col" key={uuidv4()}>
                    <span className="font-bold text-info">{param.terminalName}</span>
                    {param.terminalId && <div>ID: {param.terminalId}</div>}
                    {param.ipCentroServizi && <div>IP: {param.ipCentroServizi}</div>}
                    {param.codAzienda && <div>Codice: {param.codAzienda}</div>}
                </div>
            )
        }
    ];

    sections = sections.filter((section) => section.params && section.params.length > 0);

    if (loading)
        return <AlertLoading/>;

    return (
        <div className="container mx-auto p-4 space-y-1 overflow-auto">
            {sections.map((section, index) => (
                <div key={index} className="collapse bg-base-200">
                    <input type="checkbox" />
                    <div className="collapse-title text-xl font-medium">{section.title}</div>
                    <div className="collapse-content">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                            {section.params?.map((item, index) => (
                                section.customRender ? section.customRender(item as GenericParam) : (
                                    <div key={index} className="flex-1 flex flex-col">
                                        <span className="font-bold text-info">{(item as GenericParam).label}:</span>
                                        {(item as GenericParam).value}
                                    </div>
                                )
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
export default ParamSections;