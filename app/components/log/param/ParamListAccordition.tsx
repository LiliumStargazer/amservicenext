'use client'

import React from "react";
import { v4 as uuidv4 } from 'uuid';
import {
    Erog, Param, Terminal,
    TypeConfigParams,
    TypeErogParams,
    TypeFavoriteParams,
    TypeFingerParams,
    TypeHopperParam,
    TypeIngParam,
    TypeMoneyLineAccceptParam, TypePanelParam,
    TypePaxParams,
    TypeTerminalList,
    TypeVideoWeek,
    TypeVolume,
    TypeVteContractParam,
} from "@/app/types/types";
import AlertLoading from "@/app/components/shared/AlertLoading";

interface ParamsAccorditionProps {
    loading: boolean;
    param: Param;
}

const ParamListAccordition: React.FC <ParamsAccorditionProps>= ({loading, param}) => {

    const configParams: TypeConfigParams[] = [
        { label: 'Abilita Invio Giorno', value: param.AbilitaInvioGiorno?.toString() },
        { label: 'Abilita Invio Mese', value: param.AbilitaInvioMese?.toString() },
        { label: 'Abilita Invio Settimana', value: param.AbilitaInvioSettimana?.toString() },
        { label: 'Abilita Venditore 2', value: param.AbilitaVenditore2?.toString() },
        { label: 'Alternativa Gioco Fumo', value: param.AlternativaGiocoFumo?.toString() },
        { label: 'Audio sulla pressione del micro', value: param.AudioMicroProduct?.toString() },
        { label: 'Microfono', value: param.AudioOnInput?.toString() },
        { label: 'Altoparlante', value: param.AudioOnSpeech?.toString() },
        { label: 'Prezzi automatici Abilitati', value: param.AutoPricesEnabled?.toString() },
        { label: 'Limite Corrente Cassetta Soldi', value: param.CassLimitCurrRuntime?.toString() },
        { label: 'CassMsBuioStartup', value: param.CassMsBuioStartup?.toString() },
        { label: 'Controllo uscita programmazione', value: param.CheckExitProg?.toString() },
        { label: 'Disabilita allarme fotocellule', value: param.DisablePhotoAlarm?.toString() },
        { label: 'EnableCardTransactionMono', value: param.EnableCardTransactionMono?.toString() },
        { label: 'Abilita banner basso', value: param.EnableFloorBanner?.toString() },
        { label: 'Abilita audio prodotti', value: param.EnableProductAudio?.toString() },
        { label: 'Abilita Promozione su attivazione Proximity', value: param.EnablePromoProximity?.toString() },
        { label: 'Abilita Scontrino Ricaricabile', value: param.EnableScontrinoRicaricabile?.toString() },
        { label: 'Abilita Video Broadcast', value: param.EnableVideoBroadcastEst?.toString() },
        { label: 'Abilita EnergySaving', value: param.EnergySaving?.toString() },
        { label: 'Esaurito Visibile', value: param.EsauritoVisibile?.toString() },
        { label: 'Impronta abilitata', value: param.FingerEnabled?.toString() },
        { label: 'Impronta speciale 1', value: param.IDImprontaSpeciale1?.toString() },
        { label: 'Impronta speciale 2', value: param.IDImprontaSpeciale2?.toString() },
        { label: 'Impronta speciale 3', value: param.IDImprontaSpeciale3?.toString() },
        { label: 'Impronta speciale 4', value: param.IDImprontaSpeciale4?.toString() },
        { label: 'Impronta speciale 5', value: param.IDImprontaSpeciale5?.toString() },
        { label: 'Impronta speciale dipendente', value: param.IDImprontaSpecialeDip1?.toString() },
        { label: 'Intestazione', value: param.Intestazione1?.toString() },
        { label: 'Via', value: param.Intestazione2?.toString() },
        { label: 'Citta', value: param.Intestazione3?.toString() },
        { label: 'Abilitazione Logista', value: param.LogistaAbil?.toString() },
        { label: 'Luminosita profilo Giorno', value: param.LumProfiloGiorno?.toString() },
        { label: 'Luminosita profilo Notte', value: param.LumProfiloNotte?.toString() },
        { label: 'Modello Macchina', value: param.MachineModel?.toString() },
        { label: 'MaskInLowlevel', value: param.MaskInLowlevel?.toString() },
        { label: 'Matricola', value: param.Matricola?.toString() },
        { label: 'Valore massimo di transazione', value: param.MaxCardTransaction?.toString() },
        { label: 'Abilita suono netflix', value: param.NetflixSound?.toString() },
        { label: 'Numero massimo calci', value: param.NumPedate?.toString() },
        { label: 'Peso filtro IR', value: param.PesoFiltroIIR?.toString() },
        { label: 'Livello fotocellule', value: param.PhotoLevel?.toString() },
        { label: 'Planogramma in uso', value: param.PlanoInUse?.toString() },
        { label: 'Nr Pollici displayo', value: param.PolliciDisplay?.toString() },
        { label: 'Funzione Proponi Alternativa', value: param.ProponiAlternativa?.toString() },
        { label: 'Proponi borsellino se non ci sono alternative', value: param.ProponiBorsellinoIfNonDecidibile?.toString() },
        { label: 'Limite distanza proximity', value: param.ProxyDistLimit?.toString() },
        { label: 'Proximity tipo filtro', value: param.ProxyFiltType?.toString() },
        { label: 'Proximity tempo rilevazione', value: param.ProxyTimeIn?.toString() },
        { label: 'Proximity tempo fuori rilevazione', value: param.ProxyTimeOut?.toString() },
        { label: 'Password programmazione', value: param.PwdProgrammazione?.toString() },
        { label: 'Resto massimo', value: param.RestoMaxCommon?.toString() },
        { label: 'Ripristino automatico spirali', value: param.RipristinoAutomaticoSpirali?.toString() },
        { label: 'Note scontrino 1', value: param.ScontrinoNote1?.toString() },
        { label: 'Note scontrino 2', value: param.ScontrinoNote2?.toString() },
        { label: 'Note scontrino 3', value: param.ScontrinoNote3?.toString() },
        { label: 'Abilita sensore presenza', value: param.SensPresenzaEnable?.toString() },
        { label: 'Account Skebby', value: param.SmsAccount?.toString() },
        { label: 'Skebby Password', value: param.SmsCryptedPassword?.toString() },
        { label: 'Soglia Accelerometro', value: param.SogliaAccelerometro?.toString() },
        { label: 'Soglia Soglia I0 AGv', value: param.SogliaI0mAGv?.toString() },
        { label: 'Soglia Soglia I1 AGv', value: param.SogliaI1mAGv?.toString() },
        { label: 'Soglia Soglia T0(ms) Gv', value: param.SogliaT0mSGv?.toString() },
        { label: 'Retry massimo SpeechToText', value: param.SpeechMaxRetryBad?.toString() },
        { label: 'Retry massimo Not In Da', value: param.SpeechMaxRetryNotInDa?.toString() },
        { label: 'Retry massimo Silence', value: param.SpeechMaxRetrySilence?.toString() },
        { label: 'Speech minimo caratteri', value: param.SpeechMinChar?.toString() },
        { label: 'Speech risultato parziale', value: param.SpeechPartialResults?.toString() },
        { label: 'Speech Timeout per il video', value: param.SpeechTimeoutForVideo?.toString() },
        { label: 'Temrinal di default spending', value: param.SpendingDefaultTerminal?.toString() },
        { label: 'Temrinal di default spending', value: param.SpendingDefaultTerminal?.toString() },
        { label: 'Telefono 1', value: param.Telefono1?.toString() },
        { label: 'Telefono 2', value: param.Telefono2?.toString() },
        { label: 'T° Spegnimento ventole', value: param.TemperaturaFanOff?.toString() },
        { label: 'T° Accensione ventole', value: param.TemperaturaFanOn?.toString() },
        { label: 'Tempo di acquisto', value: param.TempoAcquistoCommon?.toString() },
        { label: 'Tempo di allarme', value: param.TempoAlarm?.toString() },
        { label: 'Tempo apertura cassetto', value: param.TempoAperturaCassetto?.toString() },
        { label: 'Tempo di campionamento', value: param.TempoCampionamento?.toString() },
        { label: 'Tempo combinatore remoto', value: param.TempoCombinatoreRemoto?.toString() },
        { label: 'Delta (sec) rilevamento calci', value: param.TempoPedate?.toString() },
        { label: 'Tempo ripetizione audio', value: param.TimeAudioRepeat?.toString() },
        { label: 'Timer come proseguire', value: param.TimerComeProseguire?.toString() },
        { label: 'Timer conferma prodotto', value: param.TimerConfermaProdotto?.toString() },
        { label: 'Timer convalida età', value: param.TimerConvalidaEta?.toString() },
        { label: 'Timer metodi di pagamento', value: param.TimerMetodiPagamento?.toString() },
        { label: 'Timer prodotto alternativo', value: param.TimerProdottoAlternativo?.toString() },
        { label: 'Timer scelta prodotto', value: param.TimerSceltaProdotto?.toString() },
        { label: 'Tipo gestionale', value: param.TipoGestionale?.toString() },
        { label: 'Video abilitato', value: param.VideoEnable?.toString() },
        { label: 'email 1', value: param.email1?.toString() },
        { label: 'email 2', value: param.email2?.toString() },
        { label: 'Effetto Luce Da', value: param.EffettoLuceDa?.toString() },
        { label: 'Velocità effetto Luce', value: param.EffettoLuceDaSpeed?.toString() },
        { label: 'Effetto luce tamponatura', value: param.EffettoLuceTamp?.toString() },
        { label: 'Velocità luce tamponatura', value: param.EffettoLuceTampSpeed?.toString() },
        { label: 'Velocità luce tamponatura in vendita', value: param.EffettoLuceTampSpeedVendita?.toString() },
        { label: 'Effetto Luce tamponatur in vendita', value: param.EffettoLuceTampVendita?.toString() },
        { label: 'Abilita luminosità giorno/notte', value: param.EnableBrightnessDayNight?.toString() },
        { label: 'Abilita luminosità giorno/notte', value: param.EnableBrightnessDayNight?.toString() },
        { label: 'Borsellino Abilitato', value: param.BorsellinoEnabled?.toString() },
        { label: 'Codice LIS', value: param.CodicePos?.toString() },
        { label: 'Credito Massimo Comune', value: param.CreditoMaxCommon?.toString() },
        { label: 'Delta Alarm Frigo A', value: param.DeltaAlarmFrigoA?.toString() },
        { label: 'Delta Alarm Frigo B', value: param.DeltaAlarmFrigoB?.toString() },
        { label: 'Abilita ripetizione Audio', value: param.EnableAudioRepeat?.toString() },
        { label: 'Chip Abilitato', value: param.EnableChip?.toString() },
        { label: 'Enable Banda Magnetica', value: param.EnableMag?.toString() },
        { label: 'Frigo A alarm accensione spegnimento (sec)', value: param.FrigoAlarmAHoldoffTime?.toString() },
        { label: 'Frigo B alarm accensione spegnimento (sec)', value: param.FrigoAlarmBHoldoffTime?.toString() },
        { label: 'Frigo Polling Time', value: param.FrigoPollTime?.toString() },
        { label: 'Corrente minima (mA)', value: param.IMinimamA?.toString() },
        { label: 'Corrente minima spirali esterne ', value: param.IMinimamASpiExt?.toString() },
        { label: 'Corrente minima spirali interne ', value: param.IMinimamASpiInt?.toString() },
        { label: 'Timeout inattività ', value: param.InactivityTimeout?.toString() },
        { label: 'Abilita Satispay', value: param.SatispayEnable?.toString() },
        { label: 'Token Corto Satispay', value: param.SatispayShortToken?.toString() },
        { label: 'Isteresi frigo A', value: param.IsteresiFrigoA?.toString() },
        { label: 'Isteresi frigo B', value: param.IsteresiFrigoB?.toString() },
        { label: 'Lampeggio T ', value: param.LabelBlinking?.toString() },
        { label: 'Luminosità giorno T', value: param.LumDay?.toString() },
        { label: 'Luminosità notte T', value: param.LumNight?.toString() },
        { label: 'Modello macchina', value: param.MachineModel?.toString() },
        { label: 'Percentuale Loading massima', value: param.MaxLoadPercentage?.toString() },
        { label: 'Percentuale Loading massima', value: param.MaxLoadPercentage?.toString() },
        { label: 'Comportamento T', value: param.PanelTBehaviour?.toString() },
        { label: 'Pannello T On', value: param.PanelTOn?.toString() },
        { label: 'Pannello T periodo', value: param.PanelTPeriod?.toString() },
        { label: 'Mod Vendita: Prima prodotto', value: param.Primaprodotto?.toString() },
        { label: 'Password abilitata', value: param.PwdEnabled?.toString() },
        { label: 'Release scheda master', value: param.ReleaseSchedaMaster?.toString() },
        { label: 'Allarme remoto scasso', value: param.RemotoScassoEnabled?.toString() },
        { label: 'Righe avanzamento carta', value: param.RigheAvanzamentoCarta?.toString() },
        { label: 'Soglia I0 spirali esterne', value: param.SogliaI0mASpiExt?.toString() },
        { label: 'Soglia I0 spirali interne', value: param.SogliaI0mASpiInt?.toString() },
        { label: 'Soglia I1 spirali esterne', value: param.SogliaI1mASpiExt?.toString() },
        { label: 'Soglia I1 spirali interne', value: param.SogliaI1mASpiInt?.toString() },
        { label: 'Soglia I2 (mA)', value: param.SogliaI2mA?.toString() },
        { label: 'Soglia T0 (ms)', value: param.SogliaT0mS?.toString() },
        { label: 'Soglia T0 spirali esterne', value: param.SogliaT0mSSpiExt?.toString() },
        { label: 'Soglia T1 (ms)', value: param.SogliaT1mS?.toString() },
        { label: 'Temperatura spegnimento ventole', value: param.TemperaturaFanOff?.toString() },
        { label: 'Temperatura frigo A', value: param.TemperaturaFrigoA?.toString() },
        { label: 'Temperatura frigo B', value: param.TemperaturaFrigoB?.toString() },
        { label: 'Tempo attesa resto', value: param.TempoAttesaResto?.toString() },
        { label: 'Tempo campionamento', value: param.TempoCampionamento?.toString() },
        { label: 'Frigo Tempo ciclo', value: param.TempoCiclo?.toString() },
        { label: 'FrigoTempo ciclo spirali esterne', value: param.TempoCicloSpiExt?.toString() },
        { label: 'Frigo Tempo ciclo spirali esterne', value: param.TempoCicloSpiInt?.toString() },
        { label: 'Tempo lampada erogazione', value: param.TempoLampadaErogazione?.toString() },
        { label: 'Tempo vendita multipla', value: param.TempoMultiVendita?.toString() },
        { label: 'Timeout video start', value: param.TimeoutVideoStart?.toString() },
        { label: 'Titolo su categoria', value: param.TitoloSuCategoria?.toString() },
        { label: 'Video 0', value: param.Video0?.toString() },
        { label: 'Video 1', value: param.Video1?.toString() },
        { label: 'Video 2', value: param.Video2?.toString() },
        { label: 'Video 3', value: param.Video3?.toString() },
        { label: 'Video 4', value: param.Video4?.toString() },
        { label: 'Video 5', value: param.Video5?.toString() },
        { label: 'Video 6', value: param.Video6?.toString() },
        { label: 'Modello Webcam', value: param.WebcamModel?.toString() },
    ];

    const netParams: TypeConfigParams[] = [
        { label: 'Dns Primario', value: param.DnsPrimary?.toString() },
        { label: 'Dns Secondario', value: param.DnsSecondary?.toString() },
        { label: 'FtpPort', value: param.FtpPort?.toString() || param.AmFtpPortNumber?.toString() },
        { label: 'FtpUrl', value: param.FtpUrl?.toString() || param.AmFtpServerName?.toString() },
        { label: 'Gateway Address', value: param.GatewayAddress?.toString() },
        { label: 'Ip Address', value: param.IPAddress?.toString() },
        { label: 'Subnet Mask', value: param.SubnetMask?.toString() },
        { label: 'Pool di rete potenziato', value: param.NetPoolEnhanced?.toString() },
    ];

    const corrispettiviParams: TypeConfigParams[] = [
        { label: 'Ade Latitutine', value: param.AdeLat?.toString() },
        { label: 'Ade Longitudine', value: param.AdeLon?.toString() },
        { label: 'Ade Id unico', value: param.AdeUniqueId?.toString() },
        { label: 'Indirizzo corrispettivi', value: param.LookappUrl?.toString() },
        { label: 'Path QrCode', value: param.QrImageFile?.toString() || param.QrImageData?.toString() },
    ];

    const betPassionParams: TypeConfigParams[] = param.BpParam ? [
        { label: 'Pin', value: param.BpParam?.BetPassionCryptedPin?.toString() },
        { label: 'Servizio BetPassion', value: param.BpParam?.BetPassionEnable?.toString() },
        { label: 'Limite massimo contanti', value: param.BpParam?.BetPassionMaxContantiValue?.toString() },
        { label: 'Limite massimo valuta virtuale', value: param.BpParam?.BetPassionMaxVirtualValue?.toString() },
        { label: 'Pagamento Pos', value: param.BpParam?.BetPassionPosEnable?.toString() },
        { label: 'Pagamento Satispay', value: param.BpParam?.BetPassionSatispayEnable?.toString() },
        { label: 'Username', value: param.BpParam?.BetPassionUsername?.toString() },
    ] : [];

    const mpParam: TypeConfigParams[] = param.MpParam? [
        { label: 'Password', value: param.MpParam?.MrPayCryptedPassword?.toString() },
        { label: 'Abilita carte gioco', value: param.MpParam?.MrPayEnableCarteGioco?.toString() },
        { label: 'Abilita conti gioco', value: param.MpParam?.MrPayEnableContiGioco?.toString() },
        { label: 'Crypto Gift', value: param.MpParam?.MrPayEnableGiftCrypto?.toString() },
        { label: 'Abilita vendo Crypto', value: param.MpParam?.MrPayEnableVendoCrypto?.toString() },
        { label: 'Valore taglio massimo', value: param.MpParam?.MrPayMaxTaglioValue?.toString() },
        { label: 'Valore massimo Crypto', value: param.MpParam?.MrPayMaxTaglioValueVendoCrypto?.toString() },
        { label: 'Taglio minimo Crypto', value: param.MpParam?.MrPayMinCartaValueVendoCrypto?.toString() },
        { label: 'Taglio minimo Carta', value: param.MpParam?.MrPayMinCartaValue?.toString() },
        { label: 'Taglio minimo Crypto', value: param.MpParam?.MrPayMinCartaValueVendoCrypto?.toString() },
        { label: 'id', value: param.MpParam?.MrPayUserId?.toString() },
        { label: 'passphrase', value: param.MpParam?.MrPayWsPassphrase?.toString() },
        { label: 'suffisso', value: param.MpParam?.MrPayWsSuffix?.toString() },
    ] : [];

    const deviceParams: TypeConfigParams[] = param.Device ? param.Device.map((device) => ({
        key: device.DeviceType?.toString(),
        label: 'Type',
        value: device.DeviceType?.toString(),
        serial: device.DevSerialID?.toString(),
    })) : [];

    const paxParam: TypePaxParams[] = param.Device ? param.Device.flatMap((device) =>
        device.DevPax?.PaxParam ? [{
            enable: device.DevPax.PaxParam.Enable?.toString() || '',
            bloccoScontrino: device.DevPax.PaxParam.LockReceiptPrint?.toString() || '',
            serialNumber: device.DevPax.PaxParam.SerialNumber?.toString() || '',
        }] : []
    ) : [];

    const ingParam: TypeIngParam[] = param.Device ? param.Device.flatMap((device) =>
        device.DevIngenico?.IngenicoParam ? [{
            enable: device.DevIngenico.IngenicoParam.Enable?.toString() || '',
            porta: device.DevIngenico.IngenicoParam.Port?.toString() || '',
            serialNumber: device.DevIngenico.IngenicoParam.SerialNumber?.toString() || '',
            type: device.DeviceType?.toString() || '',
        }] : []
    ) : [];

    const mapTerminalList = (terminalList: Terminal[]) => {
        return terminalList.map((terminal: Terminal, index: number) => ({
            terminalName: index == 0 ? 'Banca Cliente 1' : index == 1 ? 'Banca Cliente 2' : 'Banca Cliente 3',
            terminalId: terminal.TerminalId?.toString() || '',
            ipCentroServizi: terminal.IpCentroServizi?.toString() || '',
            portaCentroServizi: terminal.PortaCentroServizi?.toString() || '',
            idCertificato: terminal.IdCertificato?.toString() || '',
            idCertificatoPax: terminal.IdCertificatoPax?.toString() || '',
            idPesonalizzazione: terminal.IdPersonalizzazione?.toString() || '',
            personalizzazione: terminal.Personalizzazione?.toString() || '',
            tipoCertificato: terminal.TipoCertificato?.toString() || '',
            codAzienda: terminal.CodAzienda?.toString() || '',
            spending: terminal.Spending?.toString() || '',
        }));
    };

    const terminalList: TypeTerminalList[] = param.Device ? param.Device.flatMap((device) => {
        if (device.DevPax?.PaxParam?.TerminalList) {
            return mapTerminalList(device.DevPax.PaxParam.TerminalList);
        } else if (device.DevIngenico?.IngenicoParam?.TerminalList) {
            return mapTerminalList(device.DevIngenico.IngenicoParam.TerminalList);
        } else {
            return [];
        }
    }) : [];

    const ageParam: TypeConfigParams[] = param.EtaLimite ? param.EtaLimite.map((age, index: number) => ({
        label: index?.toString() || '',
        value: age?.toString() || '',
    })) : [];

    const mapErogParams = (erogList: Erog[]): TypeErogParams[] => {
        return erogList.map((erog: Erog) => ({
            key: erog.Name?.toString() || '',
            label: erog.Name?.toString() || '',
            type: erog.ErogDevType?.toString() || erog.erogType?.toString() || '',
            productCode: erog.ProductCode?.toString() || '',
            inout: erog.InOutNumBase0?.toString() || '',
            capacity: erog.TErogMotori?.Capacity?.toString() || erog.Capacity?.toString() || '',
        }));
    };

    const erogParams: TypeErogParams[] = param.ErogDevLayout
        ? mapErogParams(param.ErogDevLayout)
        : param.IntMotLayout
            ? mapErogParams(param.IntMotLayout)
            : [];

    const favoritesParams: TypeFavoriteParams[] = param.Favorites ? param.Favorites.map((favorite) => ({
        key: favorite.ItemTitle?.toString() || '',
        title: favorite.ItemTitle?.toString() || '',
        subtitle: favorite.ItemSubtitle?.toString() || '',
    })) : [];

    const fingerParams: TypeFingerParams[] = param.FingerInfo ? param.FingerInfo.map((finger) => ({
        ID: finger.FingerID?.toString() || '',
        quality: finger.EnrolledQuality?.toString() || '',
        cf: finger.PeopleID?.toString() || '',
    })) : [];

    const hopperParam: TypeHopperParam[] = param.HopperParam ? param.HopperParam.map((hopper) => ({
        key: hopper.Name?.toString() || '',
        coinvalue: hopper.CoinValue?.toString() || '',
        canalesmistamento: hopper.CoinSorter?.toString() || '',
    })) : [];

    const moneyLineAccceptParam: TypeMoneyLineAccceptParam[] = param.MoneyLineAcceptParam ? param.MoneyLineAcceptParam.map((param) => ({
        key: param.ValoreTaglio?.toString() || '',
        valoreTaglio: param.LineValue?.toString() ||'',
        numeroPezziPrimaBlocco: param.PcsFilterLimit?.toString() || '',
        tempoDisabilitazione: param.TimeDisable?.toString() || '',
        tempoCampionatura: param.WindowFilter?.toString() || '',
        abilitaGestioneTempo: param.TimeFeatureEnabled?.toString() || '',
    })) : [];

    const panelParam: TypePanelParam[] = param.TsParam ? param.TsParam.map((panel) => ({
        name: panel.Name?.toString() || panel.PanelImageName?.toString() || '',
        categoryReference: panel.CatReference?.toString() || '',
        retroCatReference: panel.RetroCatReference?.toString() ||'',
        numMaxItem: panel.NumMaxItem?.toString() || panel.NumEffItem?.toString() ||'',
        panelImage: panel.PanelImageName?.toString() || '',
        visible: panel.Visible?.toString() || '',
    })) : [];

    const vteContractParam: TypeVteContractParam[] = param.VTEContractPackages ? param.VTEContractPackages.map((vte) => ({
        name: vte.name?.toString() || '',
        dataStart : vte.datastart?.toString() || '',
        dataEnd: vte.dataend?.toString() || '',
    })) : [];

    const videoWeek: TypeVideoWeek[] = param.VideoWeek ? param.VideoWeek.map((video: string, index: number) => ({
        number: index?.toString(),
        file : video?.toString(),
    })) : [];

    const volume: TypeVolume[] = param.VolumeDays ? param.VolumeDays.map((volume) => ({
        day: volume.Day? volume.Day.toString() : 'Generic',
        volgiorno : volume.VolProfiloGiorno?.toString() || '',
        volnotte : volume?.VolProfiloNotte?.toString() || '',
    })) : [];

    if (loading)
        return <AlertLoading/>;

    return (
        <div className="container mx-auto p-4 space-y-1 overflow-auto">
            {/* Config Section */}
            {configParams.length > 0 && (
                <div className="collapse bg-base-200">
                    <input type="checkbox"/>
                    <div className="collapse-title text-xl font-medium">Config</div>
                    <div className="collapse-content">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                            {configParams.map((param) => (
                                param.value !== undefined && (
                                    <div className="flex-1 flex flex-col" key={uuidv4()}>
                                        <span className="font-bold text-info">{param.label}:</span>
                                        {param.value}
                                    </div>
                                )
                            ))}
                        </div>
                    </div>
                </div>
            )}
            {/* Corrispettivi Section */}
            {corrispettiviParams.length > 0 && (
                <div className="collapse bg-base-200">
                    <input type="checkbox"/>
                    <div className="collapse-title text-xl font-medium">Corrispettivi</div>
                    <div className="collapse-content">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                            {corrispettiviParams.map((param) => (
                                param.value !== undefined && (
                                    <div className="flex-1 flex flex-col" key={uuidv4()}>
                                        <span className="font-bold text-info">{param.label}:</span>
                                        {(param.value).toString()}
                                    </div>
                                )
                            ))}
                        </div>
                    </div>
                </div>
            )}
            {/* Net Section */}
            {netParams.length > 0 && (
                <div className="collapse bg-base-200">
                    <input type="checkbox"/>
                    <div className="collapse-title text-xl font-medium">Rete</div>
                    <div className="collapse-content">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                            {netParams.map((param) => (
                                param.value !== undefined && (
                                    <div className="flex-1 flex flex-col" key={uuidv4()}>
                                        <span className="font-bold text-info">{param.label}:</span>
                                        {(param.value).toString()}
                                    </div>
                                )
                            ))}
                        </div>
                    </div>
                </div>
            )}
            {/* Age Section */}
            {ageParam.length > 0 && (
                <div className="collapse bg-base-200">
                    <input type="checkbox"/>
                    <div className="collapse-title text-xl font-medium">Age Param</div>
                    <div className="collapse-content">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                            {ageParam.map((param) => (
                                param.value !== undefined && (
                                    <div className="flex-1 flex flex-col" key={uuidv4()}>
                                        <span className="font-bold text-info">Param {param.label}:</span>
                                        {(param.value).toString()} anni
                                    </div>
                                )
                            ))}
                        </div>
                    </div>
                </div>
            )}
            {/* BetPassion Section */}
            {betPassionParams.length > 0 && (
                <div className="collapse bg-base-200">
                    <input type="checkbox"/>
                    <div className="collapse-title text-xl font-medium">BetPassion</div>
                    <div className="collapse-content">
                        {param.BpParam && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                                {betPassionParams.map((param) => (
                                    param.value !== undefined && (
                                        <div className="flex-1 flex flex-col" key={uuidv4()}>
                                            <span className="font-bold text-info">{param.label}:</span>
                                            {(param.value).toString()}
                                        </div>
                                    )
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
            {/* Device Section */}
            {deviceParams.length > 0 && (
                <div className="collapse bg-base-200">
                    <input type="checkbox"/>
                    <div className="collapse-title text-xl font-medium">Device</div>
                    <div className="collapse-content">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                            {deviceParams.map((param) => (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"
                                     key={uuidv4()}>
                                    <div className="flex-1 flex flex-col">
                                        {param.value !== undefined && (
                                            <div>
                                                <span className="font-bold text-info">Type: </span>
                                                {param.value}
                                            </div>
                                        )}
                                        {param.serial !== undefined && (
                                            <div>
                                                <span className="font-bold text-info">Serial: </span>
                                                {param.serial}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            {/* Motor Section */}
            {erogParams.length > 0 && (
                <div className="collapse bg-base-200">
                    <input type="checkbox"/>
                    <div className="collapse-title text-xl font-medium">Erogatori</div>
                    <div className="collapse-content">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                            {erogParams.map((param) => (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"
                                     key={uuidv4()}>
                                    <div className="flex-1 flex flex-col">
                                        {param.label !== undefined && (
                                            <div>
                                                <span className="font-bold text-info">{param.label}</span>
                                            </div>
                                        )}
                                        {param.capacity !== undefined && (
                                            <div className="whitespace-nowrap">
                                                Capacità: {param.capacity}
                                            </div>
                                        )}
                                        {param.type !== undefined && (
                                            <div className="whitespace-nowrap">
                                                Tipo: {param.type}
                                            </div>
                                        )}
                                        {param.productCode !== undefined && (
                                            <div className="whitespace-nowrap">
                                                Codice Prodotto: {param.productCode}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            {/* Favorite Section */}
            {favoritesParams.length > 0 && (
                <div className="collapse bg-base-200">
                    <input type="checkbox"/>
                    <div className="collapse-title text-xl font-medium">Favoriti</div>
                    <div className="collapse-content">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                            {favoritesParams.map((param) => (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"
                                     key={uuidv4()}>
                                    <div className="flex-1 flex flex-col">
                                        {param.title !== undefined && (
                                            <div>
                                                <span className="font-bold text-info">{param.title}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            {/* Impronte Section */}
            {fingerParams.length > 0 && (
                <div className="collapse bg-base-200">
                    <input type="checkbox"/>
                    <div className="collapse-title text-xl font-medium">Impronte</div>
                    <div className="collapse-content">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                            {fingerParams.map((param) => (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"
                                     key={uuidv4()}>
                                    <div className="flex-1 flex flex-col">
                                        {param.ID !== undefined && (
                                            <div>
                                                <span
                                                    className="font-bold text-info whitespace-nowrap">ID: {param.ID}</span>
                                            </div>
                                        )}
                                        {param.cf !== undefined && (
                                            <div>
                                                {param.cf}
                                            </div>
                                        )}
                                        {param.quality !== undefined && (
                                            <div className="whitespace-nowrap">
                                                Qualità: {param.quality}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            {/* Hopper Section */}
            {hopperParam.length > 0 && (
                <div className="collapse bg-base-200">
                    <input type="checkbox"/>
                    <div className="collapse-title text-xl font-medium">Hopper</div>
                    <div className="collapse-content">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                            {hopperParam.map((param) => (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 "
                                     key={uuidv4()}>
                                    <div className="flex-1 flex flex-col">
                                        {param.key !== undefined && (
                                            <div>
                                                <span className="font-bold text-info">{param.key}</span>
                                            </div>
                                        )}
                                        {param.coinvalue !== undefined && (
                                            <div>
                                                Taglio monete: {param.coinvalue}
                                            </div>
                                        )}
                                        {param.canalesmistamento !== undefined && (
                                            <div className="whitespace-nowrap">
                                                Canale smistamento: {param.canalesmistamento}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            {/* Sicurezza Section */}
            {moneyLineAccceptParam.length > 0 && (
                <div className="collapse bg-base-200">
                    <input type="checkbox"/>
                    <div className="collapse-title text-xl font-medium">Sicurezza</div>
                    <div className="collapse-content">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                            {moneyLineAccceptParam.map((param) => (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"
                                     key={uuidv4()}>
                                    <div className="flex-1 flex flex-col">
                                        {param.valoreTaglio !== undefined && (
                                            <div className="whitespace-nowrap">
                                                <span className="font-bold text-info">Valore Taglio:</span>
                                                {param.valoreTaglio}
                                            </div>
                                        )}
                                        {param.abilitaGestioneTempo !== undefined && (
                                            <div>
                                                Gestione tempo: {param.abilitaGestioneTempo}
                                            </div>
                                        )}
                                        {param.numeroPezziPrimaBlocco !== undefined && (
                                            <div className="whitespace-nowrap">
                                                Nr Pezzi prima del blocco: {param.numeroPezziPrimaBlocco}
                                            </div>
                                        )}
                                        {param.tempoCampionatura !== undefined && (
                                            <div className="whitespace-nowrap">
                                                Tempo campionatura: {param.tempoCampionatura}
                                            </div>
                                        )}
                                        {param.tempoCampionatura !== undefined && (
                                            <div className="whitespace-nowrap">
                                                Tempo Disabilitazione: {param.tempoDisabilitazione}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            {/* Mr Pay Section */}
            {mpParam.length > 0 && (
                <div className="collapse bg-base-200">
                    <input type="checkbox"/>
                    <div className="collapse-title text-xl font-medium">Mr Pay</div>
                    <div className="collapse-content">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                            {mpParam.map((param) => (
                                param.value !== undefined && (
                                    <div className="flex-1 flex flex-col" key={uuidv4()}>
                                        <span className="font-bold text-info">{param.label}:</span>
                                        {param.value}
                                    </div>
                                )
                            ))}
                        </div>
                    </div>
                </div>
            )}
            {/* Panel Section */}
            {panelParam.length > 0 && (
                <div className="collapse bg-base-200">
                    <input type="checkbox"/>
                    <div className="collapse-title text-xl font-medium">Pannelli</div>
                    <div className="collapse-content">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                            {panelParam.map((param) => (
                                param.name !== undefined && (
                                    <div className="flex-1 flex flex-col" key={uuidv4()}>
                                        {param.name !== undefined && (
                                            <div>
                                                <span className="font-bold text-info">{param.name}</span>
                                            </div>
                                        )}
                                        {param.categoryReference !== undefined && (
                                            <div>
                                                Categoria: {param.categoryReference}
                                            </div>
                                        )}
                                        {param.retroCatReference !== undefined && (
                                            <div className="whitespace-nowrap">
                                                Retro Categoria: {param.retroCatReference}
                                            </div>
                                        )}
                                        {param.numMaxItem !== undefined && (
                                            <div className="whitespace-nowrap">
                                                nr max icone: {param.numMaxItem}
                                            </div>
                                        )}
                                        {param.panelImage !== undefined && (
                                            <div className="whitespace-nowrap">
                                                Immagine: {param.panelImage}
                                            </div>
                                        )}
                                        {param.visible !== undefined && (
                                            <div className="whitespace-nowrap">
                                                Visibile: {param.visible}
                                            </div>
                                        )}
                                    </div>
                                )
                            ))}
                        </div>
                    </div>
                </div>
            )}
            {/* Vte Contract */}
            {vteContractParam.length > 0 && (
                <div className="collapse bg-base-200">
                    <input type="checkbox"/>
                    <div className="collapse-title text-xl font-medium">VTE</div>
                    <div className="collapse-content">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                            {vteContractParam.map((param) => (
                                param.name !== undefined && (
                                    <div className="flex-1 flex flex-col" key={uuidv4()}>
                                        {param.name !== undefined && (
                                            <div>
                                                <span className="font-bold text-info">{param.name}</span>
                                            </div>
                                        )}
                                        {param.dataStart !== undefined && (
                                            <div>
                                                Data Inizio: {param.dataStart}
                                            </div>
                                        )}
                                        {param.dataEnd !== undefined && (
                                            <div>
                                                Data Fine: {param.dataEnd}
                                            </div>
                                        )}
                                    </div>
                                )
                            ))}
                        </div>
                    </div>
                </div>
            )}
            {/* Video week  */}
            {videoWeek.length > 0 && (
                <div className="collapse bg-base-200">
                    <input type="checkbox"/>
                    <div className="collapse-title text-xl font-medium">Video Week</div>
                    <div className="collapse-content">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                            {videoWeek.map((param) => (
                                param.number !== undefined && (
                                    <div className="flex-1 flex flex-col" key={uuidv4()}>
                                        {param.number !== undefined && (
                                            <div>
                                                <span className="font-bold text-info">{param.number}</span>
                                            </div>
                                        )}
                                        {param.file !== undefined && (
                                            <div>
                                                file: {param.file}
                                            </div>
                                        )}
                                    </div>
                                )
                            ))}
                        </div>
                    </div>
                </div>
            )}
            {/* Volume week  */}
            {volume.length > 0 && (
                <div className="collapse bg-base-200">
                    <input type="checkbox"/>
                    <div className="collapse-title text-xl font-medium">Volume</div>
                    <div className="collapse-content">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                            {volume.map((param) => (
                                param.day !== undefined && (
                                    <div className="flex-1 flex flex-col" key={uuidv4()}>
                                        {param.day !== undefined && (
                                            <div>
                                                <span className="font-bold text-info">{param.day}</span>
                                            </div>
                                        )}
                                        {param.volgiorno !== undefined && (
                                            <div>
                                                Volume Giorno: {param.volgiorno}
                                            </div>
                                        )}
                                        {param.volnotte !== undefined && (
                                            <div>
                                                Volume Notte: {param.volnotte}
                                            </div>
                                        )}
                                    </div>
                                )
                            ))}
                        </div>
                    </div>
                </div>
            )}
            {/* Pax */}
            {paxParam.length > 0 && (
                <div className="collapse bg-base-200">
                    <input type="checkbox"/>
                    <div className="collapse-title text-xl font-medium">Pax</div>
                    <div className="collapse-content">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                            {paxParam.map((param) => (
                                param.enable !== undefined && (
                                    <div className="flex-1 flex flex-col" key={uuidv4()}>
                                        <div>
                                            <span className="font-bold text-info">Params</span>
                                        </div>
                                        {param.enable !== undefined && (
                                            <div>
                                                Enable: {param.enable}
                                            </div>
                                        )}
                                        {param.serialNumber !== undefined && (
                                            <div>
                                                Serial Number: {param.serialNumber}
                                            </div>
                                        )}
                                        {param.bloccoScontrino !== undefined && (
                                            <div>
                                                Blocco scontrino: {param.bloccoScontrino}
                                            </div>
                                        )}
                                    </div>
                                )
                            ))}
                            {terminalList.map((param) => (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"
                                     key={uuidv4()}>
                                    <div className="flex-1 flex flex-col">
                                        {param.terminalName !== undefined && (
                                            <div className="whitespace-nowrap">
                                                <span className="font-bold text-info">{param.terminalName}</span>
                                            </div>
                                        )}
                                        {param.terminalId !== undefined && (
                                            <div className="whitespace-nowrap">
                                                Terminal: {param.terminalId}
                                            </div>
                                        )}
                                        {param.codAzienda !== undefined && (
                                            <div className="whitespace-nowrap">
                                                Codice Azienda: {param.codAzienda}
                                            </div>
                                        )}
                                        {param.idCertificato !== undefined && (
                                            <div className="whitespace-nowrap">
                                                id Certificato: {param.idCertificato}
                                            </div>
                                        )}
                                        {param.ipCentroServizi !== undefined && (
                                            <div className="whitespace-nowrap">
                                                Ip centro servizi: {param.ipCentroServizi}
                                            </div>
                                        )}
                                        {param.idCertificatoPax !== undefined && (
                                            <div className="whitespace-nowrap">
                                                Id certificato pax: {param.idCertificatoPax}
                                            </div>
                                        )}
                                        {param.idPesonalizzazione !== undefined && (
                                            <div className="whitespace-nowrap">
                                                Id personalizzazione: {param.idPesonalizzazione}
                                            </div>
                                        )}
                                        {param.personalizzazione !== undefined && (
                                            <div className="whitespace-nowrap">
                                                Personalizzazione: {param.personalizzazione}
                                            </div>
                                        )}
                                        {param.portaCentroServizi !== undefined && (
                                            <div className="whitespace-nowrap">
                                                Porta Centro Servizi: {param.portaCentroServizi}
                                            </div>
                                        )}
                                        {param.tipoCertificato !== undefined && (
                                            <div className="whitespace-nowrap">
                                                Tipo Certificato: {param.tipoCertificato}
                                            </div>
                                        )}
                                        {param.spending !== undefined && (
                                            <div className="whitespace-nowrap">
                                                Spending: {param.spending}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            {/* Ingenico */}
            {ingParam.length > 0 && (
                <div className="collapse bg-base-200">
                    <input type="checkbox"/>
                    <div className="collapse-title text-xl font-medium">Ingenico</div>
                    <div className="collapse-content">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                            {ingParam.map((param) => (
                                param.enable !== undefined && (
                                    <div className="flex-1 flex flex-col" key={uuidv4()}>
                                        <div>
                                            <span className="font-bold text-info">Params</span>
                                        </div>
                                        {param.enable !== undefined && (
                                            <div>
                                                Enable: {param.enable}
                                            </div>
                                        )}
                                        {param.serialNumber !== undefined && (
                                            <div>
                                                Serial Number: {param.serialNumber}
                                            </div>
                                        )}
                                        {param.porta !== undefined && (
                                            <div>
                                                Blocco scontrino: {param.porta}
                                            </div>
                                        )}
                                    </div>
                                )
                            ))}
                            {terminalList.map((param) => (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"
                                     key={uuidv4()}>
                                    <div className="flex-1 flex flex-col">
                                        {param.terminalName !== undefined && (
                                            <div className="whitespace-nowrap">
                                                <span className="font-bold text-info">{param.terminalName}</span>
                                            </div>
                                        )}
                                        {param.terminalId !== undefined && (
                                            <div className="whitespace-nowrap">
                                                Terminal: {param.terminalId}
                                            </div>
                                        )}
                                        {param.codAzienda !== undefined && (
                                            <div className="whitespace-nowrap">
                                                Codice Azienda: {param.codAzienda}
                                            </div>
                                        )}
                                        {param.idCertificato !== undefined && (
                                            <div className="whitespace-nowrap">
                                                id Certificato: {param.idCertificato}
                                            </div>
                                        )}
                                        {param.ipCentroServizi !== undefined && (
                                            <div className="whitespace-nowrap">
                                                Ip centro servizi: {param.ipCentroServizi}
                                            </div>
                                        )}
                                        {param.idCertificatoPax !== undefined && (
                                            <div className="whitespace-nowrap">
                                                Id certificato pax: {param.idCertificatoPax}
                                            </div>
                                        )}
                                        {param.idPesonalizzazione !== undefined && (
                                            <div className="whitespace-nowrap">
                                                Id personalizzazione: {param.idPesonalizzazione}
                                            </div>
                                        )}
                                        {param.personalizzazione !== undefined && (
                                            <div className="whitespace-nowrap">
                                                Personalizzazione: {param.personalizzazione}
                                            </div>
                                        )}
                                        {param.portaCentroServizi !== undefined && (
                                            <div className="whitespace-nowrap">
                                                Porta Centro Servizi: {param.portaCentroServizi}
                                            </div>
                                        )}
                                        {param.tipoCertificato !== undefined && (
                                            <div className="whitespace-nowrap">
                                                Tipo Certificato: {param.tipoCertificato}
                                            </div>
                                        )}
                                        {param.spending !== undefined && (
                                            <div className="whitespace-nowrap">
                                                Spending: {param.spending}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ParamListAccordition;