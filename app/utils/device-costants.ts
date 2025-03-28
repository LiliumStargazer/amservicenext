// DevType.ts
export interface DevTypeInterface {
    value: number;
}

export const DevType: Record<string, DevTypeInterface> = {
    DEVTYPE_NONE: { value: 0 },
    Sankyo_Icm330: { value: 1 },
    ICT_XBA: { value: 2 },
    Mei_Cf: { value: 3 },
    Nri_C2: { value: 4 },
    Nri_Eagle: { value: 5 },
    Nri_G13: { value: 6 },
    Am_Am19: { value: 7 },         // non usabile su android
    Am_Am28: { value: 8 },         // non usabile su android
    Brd_Accel1: { value: 9 },
    Custom_Tg558: { value: 10 },     // obso android
    Finger_S: { value: 11 },
    Am_AmMoco: { value: 12 },
    JCM_DBV_301: { value: 13 },       // obso
    MEI_VN_2612: { value: 14 },       // obso
    ICT_V7: { value: 15 },             // obso
    Custom_Tg2460: { value: 16 },
    AXI_KALY2402: { value: 17 },
    Am_AmGv48: { value: 18 },
    Am_Frigo: { value: 19 },          // moco usata come frigo
    UsbWebcam: { value: 20 },
    ZyZXY100: { value: 21 },
    Am_AmSmoky: { value: 22 },         // nebbiogeno
    Am_PwmLed: { value: 23 },
    Sanden_Frigo: { value: 24 },
    Am_AmHighLevel: { value: 25 },
    Am_AmMicrophone: { value: 26 },
    Newland_FM430: { value: 27 },
    Am_AmPrelievoMot: { value: 28 },
    Am_LockerMot: { value: 29 },     // locker (basato su scheda motori)
    Adimac_Frigo: { value: 30 },     // adimac su rs232 lowlevel
    Am_SerLed: { value: 31 },
    Am_CassInt: { value: 32 },        // cassetto intelligente
    Mei_Gryphon: { value: 35 },
    NPI_Kv20: { value: 40 },
    Az_SrCan: { value: 45 },
    IngenicoIUP250: { value: 50 },
    IngenicoIUC160b: { value: 51 },
    PaxIM20: { value: 55 },
    GloryC5: { value: 60 },
    Crt_288: { value: 61 },
    SielaffDev: { value: 70 },
    xWORCYCLE: { value: 100 },          // da qui in poi il lowlevel non conosce/non li usa
    xBARCODE: { value: 101 },
    xONLINE: { value: 102 },
    xSWCHECK: { value: 103 },
};

export function convertToDevType(value: number): string {
    const matchingState = Object.keys(DevType).find(key => DevType[key].value === value);
    return matchingState || "DEVTYPE_NONE";
}

// Fase.ts
export interface FaseInterface {
    value: number;
}

export const Fase: Record<string, FaseInterface> = {
    Programmazione: { value: 0 },
    Vendita: { value: 1 }
};

export function convertToFase(value: number): string {
    const matchingState = Object.keys(Fase).find(key => Fase[key].value === value);
    return matchingState || "undefined";
}

// State.ts
export interface StateInterface {
    value: number;
}

export const State: Record<string, StateInterface> = {
    DELOG: { value: 0 },
    LOG: { value: 1 },
    TRIG: { value: 2 }
};

export function convertToState(value: number): string {
    const matchingState = Object.keys(State).find(key => State[key].value === value);
    return matchingState || "undefined";
}

// ErogResult.ts
export interface ErogResultInterface {
    value: number;
}

export const ErogResult: Record<string, ErogResultInterface> = {
    NoExecPossible: { value: -1 },    // speciale... per problemi già in fase di richiesta di erogazione (-> non si può mettere in exec)
    InExecution: { value: 0 },        // erogazione in corso (comune a tutti tutti)
    EndOk: { value: 1 },                  // operazione terminata correttamente (motori / spirali / hopper), per G&V significa
    // comuni a tutti
    // motori+hopper
    NoFcTransito: { value: 2 },
    Lock: { value: 3 },                   // non usato
    MotObso: { value: 4 },                // obsoleto (ex currmax)
    TempoCresta: { value: 5 },            // tempo troppo lungo prima di uscire da cresta
    Lento: { value: 6 },                  // motore non ha terminato ciclo in tempo
    CurrmaxF1: { value: 7 },              // superamento corrente max durante fascia 1
    CurrmaxF2: { value: 8 },
    CurrmaxF3: { value: 9 },
    CurrmaxF4: { value: 10 },
    MotNotAligned: { value: 11 },// può essere generato da scheda motori (ma anche da lowlevel.exe) per segnalare che l'ultimo movimento ha lasciato il mot fuori pos usabile
    BadHole1: { value: 12 },
    BadHole2: { value: 13 },
    PhotoBusy: { value: 14 },
    DoorOpened: { value: 15 },// specifico adimac, che nn eroga se porta aperta
    MotOverSoglia: { value: 19 },     // non è tornato da low level e non viene mai memorizzato, usato solo in collaudo automatico
    // gv -> 20
    // Running = 20
    // Ok = 21
    // rimappo qui codici di problemi hopper (il remap su am28 lo fa lowlevel....)
    GvErrBase: { value: 20 },// non compare all'esterno
    GvReserved1: { value: 21 },// non toccare - non compare all'esterno
    GvNoFc: { value: 22 },// il sensore posteriore risulta libero non posso erogare
    GvNoSensAnt: { value: 23 },// l'avanzamento non ha coperto il sensore anteriore
    GvCurrMaxErog: { value: 24 },
    GvLento: { value: 25 },// movimento avvenuto troppo lentamente
    GvEncoderBroken: { value: 26 },// enc non conta
    GvNonStrappato: { value: 27 },// gv precedente non strappato -> riposizionamento senza erogazione
    GvNoZero: { value: 28 },// gv non erogato perchè zero non affidabile
    // rimappo qui codici di problemi hopper (il remap su am19 lo fa lowlevel....)
    HopErrBase: { value: 40 },
    HopReserved1: { value: 41 },// non toccare - non compare all'esterno
    HopNoTransito: { value: 42 },
    HopLock: { value: 43 },// codice riciclato per dire che l'hopper senza transito è già stato provato una seconda volta senza esito -> va riabilitato con intervento utente
    HopSensBusy: { value: 44 },
    HopUserStop: { value: 45 },
    // rimappo qui codici di problemi cassetto vano prelievo
    PrelErrBase: { value: 50 },// non compare all'esterno (-> serve per execution)
    PrelReserved1: { value: 51 },// non toccare - non compare all'esterno (-> serve per OK)
    PrelNoSens: { value: 52 },// uno o più sensori non vanno  - taratura impossibile
    PrelNoTaratura: { value: 53 },
    PrelCurrMax: { value: 54 },
    PrelLento: { value: 55 },
    PrelEncoderBloccato: { value: 56 },
    PrelCurrEffHigh: { value: 57 },// superata corrente efficace
};

export function convertToErogResult(value: number): string {
    const matchingState = Object.keys(ErogResult).find(key => ErogResult[key].value === value);
    return matchingState || "undefined";
}

// MotMoveRequest.ts
export interface MotMoveRequestInterface {
    value: number;
}

export const MotMoveRequest: Record<string, MotMoveRequestInterface> = {
    Stop: { value: 0 },
    Allinea: { value: 1 },
    Eroga: { value: 2 },               // in caso di spintore implica anche uso ascensore
    FreeRun: { value: 3 },              // 'svuota' per gli hopper
    Disallinea: { value: 4 },
    Carica: { value: 5 },                // solo per GV
    Avanza: { value: 6 },               // solo per GV
    Arretra: { value: 7 },              // solo per GV
    ErogaBank: { value: 8 },             // ...
    ApriCassetto: { value: 9 },         // solo prelievo prodotto
    ChiudiCassetto: { value: 10 },       // solo prelievo prodotto
    TaraCassetto: { value: 11 },        // solo prelievo prodotto
    SbloccaCassetto: { value: 12 },      // solo prelievo prodotto
    ErogTest: { value: 13 },           // solo cassetto spintori - erogazione senza mov. ascensore
    ExecHome: { value: 20 },        // solo ascensore
    ExecHomeCurrent: { value: 21 },       // solo ascensore
    GotoLevel: { value: 22 },          // solo ascensore
    GotoPos: { value: 23 },             // solo ascensore
    GotoHome: { value: 24 },             // solo ascensore
};

export function convertToMotMoveRequest(value: number): string {
    const matchingState = Object.keys(MotMoveRequest).find(key => MotMoveRequest[key].value === value);
    return matchingState || "undefined";
}

// translateFrigoState.ts
export function translateFrigoState(element: number): Record<string, string> {
    const frigoStatus = element;
    let power = "";
    let sbrinamento = "OFF";
    let test = "OFF";
    let porteAperte = "OFF";
    let sbrinaTempo = "OFF";
    let preAllarme = "OFF";
    let allarme = "OFF";

    if ((frigoStatus & 1) !== 0)
        power = "ON";
    else
        power = "OFF";

    if ((frigoStatus & 2) !== 0)
        sbrinamento = "ON";
    if ((frigoStatus & 4) !== 0)
        test = "ON";
    if ((frigoStatus & 8) !== 0)
        porteAperte = "ON";
    if ((frigoStatus & 0x10) !== 0)
        sbrinaTempo = "ON";
    if ((frigoStatus & 0x40) !== 0)
        preAllarme = "ON";
    if ((frigoStatus & 0x80) !== 0)
        allarme = "ON";

    return {
        "Power": power,
        "Sbrinamento": sbrinamento,
        "Test": test,
        "PorteAperte": porteAperte,
        "SbrinaTempo": sbrinaTempo,
        "PreAllarme": preAllarme,
        "Allarme": allarme
    };
}

// eventsColors.ts
export const eventsColors: Record<string, string> = {
    "EV_COIN_IN": "#57c284", // verde di successo di Daisy UI
    "EV_BNK_IN": "#57c284", // verde di successo di Daisy UI
    "EV_PAX_PAYMENT": "#57c284", // verde di successo di Daisy UI
    "EV_ING_PAYMENT": "#57c284", // verde di successo di Daisy UI
    "EV_CARD_CICLO_OK_ETA": "#57c284", // verde di successo di Daisy UI
    "EV_TICKET": "#17a2b8",
    "EV_DEV_SERNUM": "#17a2b8",
    "EV_DEV_SERNUMCHANGED": "#17a2b8",
    "EV_ACCENSIONE": "#17a2b8",
    "EV_PRODUCT_PRESSED": "#17a2b8",
    "EV_WDOGFIRED": "#17a2b8",
    "EV_PROD_VENDUTO": "#ffc107",
    "EV_VENDSESSION_END": "#ffc107",
    "EV_USBL_NOISE": "#dc3545",
    "EV_USBL_NOCOM": "#dc3545",
    "EV_USBL_NOCOMLONG": "#dc3545",
    "EV_USBDEV_DETACH": "#dc3545",
    "EV_BNK_ESCROW": "#ffc107",
    "EV_V2_SAMEBNK": "#ffc107",
    "EV_ADIMAC_ALARM": "#dc3545",
    "EV_PROD_NON_VENDUTO": "#dc3545",
    "EV_ACC_RESTART": "#dc3545",
    "EV_NOCOMM": "#dc3545",
    "EV_CARD_NOCOMM": "#dc3545",
    "EV_BNK_NOCOMM": "#dc3545",
    "EV_BNK_JAMMED": "#dc3545",
    "EV_CAC_NOCOMM": "#dc3545",
    "EV_FINGER_NOCOMM": "#dc3545",
    "EV_C5_NOCOMM": "#dc3545",
    "EV_MOT_NOCOMM": "#dc3545",
    "EV_HOP_NOCOMM": "#dc3545",
    "EV_LOCKER_NOCOMM": "#dc3545",
    "EV_GV_NOCOMM": "#dc3545",
    "EV_PRN_NOCOMM": "#dc3545",
    "EV_FRIGO_NOCOMM": "#dc3545",
    "EV_SANDEN_NOCOMM": "#dc3545",
    "EV_IFSANDEN_NOCOMM": "#dc3545",
    "EV_ADIMAC_NOCOMM": "#dc3545",
    "EV_SILEAFF_NOCOMM": "#dc3545",
    "EV_PWM_NOCOMM": "#dc3545",
    "EV_SERLED_NOCOMM": "#dc3545",
    "EV_PREL_NOCOMM": "#dc3545",
    "EV_CS_NOCOMM": "#dc3545",
    "EV_AZ_NOCOMM": "#dc3545",
    "EV_QRB_NOCOMM": "#dc3545",
    "EV_ING_NOCOMM": "#dc3545",
    "EV_PAX_ERROR": "#dc3545",
};

