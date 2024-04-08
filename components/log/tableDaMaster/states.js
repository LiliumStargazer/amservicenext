// DevType.js
const DevType = {
    DEVTYPE_NONE: { value: 0 },
    Sankyo_Icm330: { value: 1 },
    ICT_XBA: { value: 2 },
    Mei_Cf: { value: 3 },
    Nri_C2: { value: 4 },
    Nri_Eagle: { value: 5 },
    Nri_G13: { value: 6 },
    Am_Am19: { value: 7},         // non usabile su android
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


function convertToDevType(value) {
    const matchingState = Object.keys(DevType).find(key => DevType[key].value === value);
    return matchingState || "DEVTYPE_NONE";
}

// Fase.js
const Fase = {
    Programmazione: { value: 0 },
    Vendita: { value: 1 }
};

function convertToFase(value) {
    const matchingState = Object.keys(Fase).find(key => Fase[key].value === value);
    return matchingState || "undefined";
}

// State.js
const State = {
    DELOG: { value: 0 },
    LOG: { value: 1 },
    TRIG: { value: 2 }
};

function convertToState(value) {
    const matchingState = Object.keys(State).find(key => State[key].value === value);
    return matchingState || "undefined";
}

const ErogResult = {
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
    PrelReserved1: { value:  51 },// non toccare - non compare all'esterno (-> serve per OK)
    PrelNoSens: { value: 52 },// uno o più sensori non vanno  - taratura impossibile
    PrelNoTaratura: { value: 53 },
    PrelCurrMax: { value: 54 },
    PrelLento: { value: 55 },
    PrelEncoderBloccato: { value: 56 },
    PrelCurrEffHigh: { value: 57 },// superata corrente efficace
};

function convertToErogResult(value) {
    const matchingState = Object.keys(ErogResult).find(key => ErogResult[key].value === value);
    return matchingState || "undefined";
};

const MotMoveRequest = {      // NON PORTABILE (riflette codici sharedMem)
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

function convertToMotMoveRequest(value) {
    const matchingState = Object.keys(MotMoveRequest).find(key => MotMoveRequest[key].value === value);
    return matchingState || "undefined";
};

export{ State, convertToState, Fase, convertToFase, DevType, convertToDevType , ErogResult, convertToErogResult,
    MotMoveRequest, convertToMotMoveRequest};
