
export interface SystemPaths {
    remoteDirectory: string;
    remoteBackupFile: string;
    localBackupDirectory: string;
    localBackupZippedFile: string;
    localBackupUnzippedFile: string | null;
}

export interface PasswordLevels {
    Level1: string;
    Level2: string;
    Level3: string;
    Level4: string;
}

export interface RawParams {
    Data: Uint8Array;
}

export interface ErrorResponse {
    error: string;
}
export interface RawLogEventData {
    ID: string,
    DataOraR:string,
    EventString: string,
    State: string,
    DevProducer?: string,
    DevId?: string,
    DevIndex?: string,
    RelIndex?: string,
    SubIndex: string,
    DevClass: string,
    Tag1:string,
    Tag2: string,
    Tag3: string,
    Tag4: string,
    Fase: string,
    TagData: string,
    Time: string,
}

export interface LogEventData {
    ID?: string
    IDR: string;
    DataOraR: string;
    EventString: string;
    State: string;
    DevProducer?: string;
    DevIndex: string;
    SubIndex: string;
    Tag1: string;
    Tag2: string;
    Tag3: string;
    Tag4: string;
    Fase: string;
    TagData: string;
    Time: string;
}

export interface AliveEvent {
    EventCode: string;
    EventString: string;
    TagDataTrad: string;
    Tag1Trad: string;
    Tag2Trad: string;
    Tag3Trad: string;
    Tag4Trad: string;
    EventTrad: string;
}

export interface FridgesRowData {
    IDFrigo: string;
    Id: string;
    dataOraR: string;
    Time: string;
    Temp1: string;
    WarnAlarm: string;
    AlarmTemp: string;
    Power: string;
    Sbrinamento: string;
    Test: string;
    PorteAperte: string;
    SbrinaTempo: string;
    PreAllarme: string;
    Allarme: string;
}

export interface RawFridgeData {
    DataOraR: string;
    DataOra: string;
    IDFrigo: string;
    FrigoState: string;
    Id?: string; // android
    Temperature1?: string; // android
    Temperature2?:string; // android
    Temperature3?: string; // android
    Temperature4?: string; // android
    WarnAlarm?: string; // android
    ID?: string; // windows
    Temperature?: string; // windows
    Temp2?: string; // windows
    Temp3?: string; // windows
    Temp4?: string; // windows
    WarnBits?: string; // windows
}

export interface LisData {
    Date: string;
    Time: string;
    ID: string;
    ErrCode: string;
    ErrDesc: string;
    OperationId: string;
    Price: string;
    ProductDesc: string;
    RecTransactionId: string;
    TelNum: string;
    TransactionId: string;
}

export interface LisRawData {
    DataOraR: string;
    ID: string;
    ErrCode: string;
    OperationId: string;
    Price: string;
    ProductDesc: string;
    RecTransactionId: string;
    TelNum: string;
    TransactionId: string;
}

export interface FingerData {
    Date: string;
    Time: string;
    FingerID: string;
    PeopleID: string;
    OperationId?: string;
    Money: number;
    Motivo: string;
    ActualValue: number;
}

export interface FingerRawData {
    DataOraR: string;
    FingerID?: string;
    FingerId?: string;
    PeopleID?: string;
    PeopleId?: string;
    ID: string;
    Money: number;
    Motivo: string;
    ActualValue: number;
};

export interface ChartData {
    date: Date;
    Temp1: number;
    Power: number;
    Time: string;
}

export type TypeConfigParams = {
    [key: string]: boolean | number | string | undefined;
};

export interface backupListDetails{
    dashDateTimeFormat: Date,
    backup :{
        slashDateTimeFormat: string,
        name: string,
        size: string
    }
}

export interface DialogContent {
    EventCode: string;
    EventString: string;
    EventTrad: string;
    Tag1Trad: string;
    Tag2Trad: string;
    Tag3Trad: string;
    Tag4Trad: string;
    TagDataTrad: string;
}

export interface Ticket {
    Manutentore: string;
    'Nr Ticket': string;
    'Tipo ticket': string;
    'Stato ticket': string;
    'Data chiusura': string;
    'data ticket': string;
    TimeToRestore?: number;
}

export interface Technician {
    Manutentore: string;
    Active: boolean;
}

export interface TechnicianStatistics {
    Manutentore: string;
    totalTickets: number;
    totalTimeToRestore: number;
    ticketsWithTimeToRestoreLessOrEqualThree: number;
    ticketsWithTimeToRestoreBetweenFourAndFive: number;
    ticketsWithTimeToRestoreGreaterThanFive: number;
    MTTR?: number;
    percentageOfTicketsWithTimeToRestoreLessOrEqualThree?: number;
    percentageOfTicketsWithTimeToRestoreBetweenFourAndFive?: number;
    percentageOfTicketsWithTimeToRestoreGreaterThanFive?: number;
}

export interface ParamList{
    ID : string,
    DataOra : string
}

export type TypeErogParams = {
    key: number | string;
    label: string;
    type: string;
    productCode: string;
    inout: string;
    capacity: string;
};

export type TypeFavoriteParams = {
    key: string;
    title: string;
    subtitle: string;
};

export type TypeFingerParams = {
    ID: string;
    quality: string;
    cf: string;
};

export type TypeHopperParam = {
    key: string;
    coinvalue: string;
    canalesmistamento: string;
}

export type TypeMoneyLineAccceptParam = {
    key: string;
    valoreTaglio: string;
    numeroPezziPrimaBlocco: string;
    tempoDisabilitazione: string;
    tempoCampionatura: string;
    abilitaGestioneTempo: string;
}

export type TypeVteContractParam = {
    name: string;
    dataStart: string;
    dataEnd: string;
}

export type TypeVideoWeek = {
    number: string;
    file: string;
}

export type TypeVolume = {
    day: string;
    volgiorno: string;
    volnotte: string;
}

export type TypePaxParams = {
    enable: string;
    bloccoScontrino: string;
    serialNumber: string;
}

export type TypeTerminalList = {
    terminalName: string | undefined;
    terminalId: string;
    ipCentroServizi: string;
    portaCentroServizi: string;
    idCertificato: string;
    codAzienda: string;
    idCertificatoPax: string;
    idPesonalizzazione: string;
    personalizzazione: string;
    tipoCertificato: string;
    spending: string;
}

export type TypeIngParam = {
    enable: string;
    porta: string;
    serialNumber: string;
    type: string;
}

export interface TypePanelParam {
    name: string;
    categoryReference: string;
    retroCatReference: string;
    numMaxItem: string;
    panelImage: string;
    visible: string;
}

export interface Erog {
    Name?: string | number;
    ErogDevType?: string | number;
    erogType?: string | number;
    ProductCode?: string | number;
    InOutNumBase0?: string | number;
    TErogMotori?: {
        Capacity?: string | number;
    };
    Capacity?: string | number;
}

export interface Terminal {
    TerminalId?: string | number;
    IpCentroServizi?: string | number;
    PortaCentroServizi?: string | number;
    IdCertificato?: string | number;
    IdCertificatoPax?: string | number;
    IdPersonalizzazione?: string | number;
    Personalizzazione?: string | number;
    TipoCertificato?: string | number;
    CodAzienda?: string | number;
    Spending?: string | number;
}

export interface Param {
    AbilitaInvioGiorno?: string | number;
    AbilitaInvioMese?: string | number;
    AbilitaInvioSettimana?: string | number;
    AbilitaVenditore2?: string | number;
    AlternativaGiocoFumo?: string | number;
    AudioMicroProduct?: string | number;
    AudioOnInput?: string | number;
    AudioOnSpeech?: string | number;
    AutoPricesEnabled?: string | number;
    CassLimitCurrRuntime?: string | number;
    CassMsBuioStartup?: string | number;
    CheckExitProg?: string | number;
    DisablePhotoAlarm?: string | number;
    EnableCardTransactionMono?: string | number;
    EnableFloorBanner?: string | number;
    EnableProductAudio?: string | number;
    EnablePromoProximity?: string | number;
    EnableScontrinoRicaricabile?: string | number;
    EnableVideoBroadcastEst?: string | number;
    EnergySaving?: string | number;
    EsauritoVisibile?: string | number;
    FingerEnabled?: string | number;
    IDImprontaSpeciale1?: string | number;
    IDImprontaSpeciale2?: string | number;
    IDImprontaSpeciale3?: string | number;
    IDImprontaSpeciale4?: string | number;
    IDImprontaSpeciale5?: string | number;
    IDImprontaSpecialeDip1?: string | number;
    Intestazione1?: string | number;
    Intestazione2?: string | number;
    Intestazione3?: string | number;
    LogistaAbil?: string | number;
    LumProfiloGiorno?: string | number;
    LumProfiloNotte?: string | number;
    MachineModel?: string | number;
    MaskInLowlevel?: string | number;
    Matricola?: string | number;
    MaxCardTransaction?: string | number;
    NetflixSound?: string | number;
    NumPedate?: string | number;
    PesoFiltroIIR?: string | number;
    PhotoLevel?: string | number;
    PlanoInUse?: string | number;
    PolliciDisplay?: string | number;
    ProponiAlternativa?: string | number;
    ProponiBorsellinoIfNonDecidibile?: string | number;
    ProxyDistLimit?: string | number;
    ProxyFiltType?: string | number;
    ProxyTimeIn?: string | number;
    ProxyTimeOut?: string | number;
    PwdProgrammazione?: string | number;
    RestoMaxCommon?: string | number;
    RipristinoAutomaticoSpirali?: string | number;
    ScontrinoNote1?: string | number;
    ScontrinoNote2?: string | number;
    ScontrinoNote3?: string | number;
    SensPresenzaEnable?: string | number;
    SmsAccount?: string | number;
    SmsCryptedPassword?: string | number;
    SogliaAccelerometro?: string | number;
    SogliaI0mAGv?: string | number;
    SogliaI1mAGv?: string | number;
    SogliaT0mSGv?: string | number;
    SpeechMaxRetryBad?: string | number;
    SpeechMaxRetryNotInDa?: string | number;
    SpeechMaxRetrySilence?: string | number;
    SpeechMinChar?: string | number;
    SpeechPartialResults?: string | number;
    SpeechTimeoutForVideo?: string | number;
    SpendingDefaultTerminal?: string | number;
    Telefono1?: string | number;
    Telefono2?: string | number;
    TemperaturaFanOff?: string | number;
    TemperaturaFanOn?: string | number;
    TempoAcquistoCommon?: string | number;
    TempoAlarm?: string | number;
    TempoAperturaCassetto?: string | number;
    TempoCampionamento?: string | number;
    TempoCombinatoreRemoto?: string | number;
    TempoPedate?: string | number;
    TimeAudioRepeat?: string | number;
    TimerComeProseguire?: string | number;
    TimerConfermaProdotto?: string | number;
    TimerConvalidaEta?: string | number;
    TimerMetodiPagamento?: string | number;
    TimerProdottoAlternativo?: string | number;
    TimerSceltaProdotto?: string | number;
    TipoGestionale?: string | number;
    VideoEnable?: string | number;
    email1?: string | number;
    email2?: string | number;
    EffettoLuceDa?: string | number;
    EffettoLuceDaSpeed?: string | number;
    EffettoLuceTamp?: string | number;
    EffettoLuceTampSpeed?: string | number;
    EffettoLuceTampSpeedVendita?: string | number;
    EffettoLuceTampVendita?: string | number;
    EnableBrightnessDayNight?: string | number;
    BorsellinoEnabled?: string | number;
    CodicePos?: string | number;
    CreditoMaxCommon?: string | number;
    DeltaAlarmFrigoA?: string | number;
    DeltaAlarmFrigoB?: string | number;
    EnableAudioRepeat?: string | number;
    EnableChip?: string | number;
    EnableMag?: string | number;
    FrigoAlarmAHoldoffTime?: string | number;
    FrigoAlarmBHoldoffTime?: string | number;
    FrigoPollTime?: string | number;
    IMinimamA?: string | number;
    IMinimamASpiExt?: string | number;
    IMinimamASpiInt?: string | number;
    InactivityTimeout?: string | number;
    SatispayEnable?: string | number;
    SatispayShortToken?: string | number;
    IsteresiFrigoA?: string | number;
    IsteresiFrigoB?: string | number;
    LabelBlinking?: string | number;
    LumDay?: string | number;
    LumNight?: string | number;
    MaxLoadPercentage?: string | number;
    PanelTBehaviour?: string | number;
    PanelTOn?: string | number;
    PanelTPeriod?: string | number;
    Primaprodotto?: string | number;
    PwdEnabled?: string | number;
    ReleaseSchedaMaster?: string | number;
    RemotoScassoEnabled?: string | number;
    RigheAvanzamentoCarta?: string | number;
    DnsPrimary?: string | number;
    DnsSecondary?: string | number;
    FtpPort?: string | number;
    AmFtpPortNumber?: string | number;
    FtpUrl?: string | number;
    AmFtpServerName?: string | number;
    GatewayAddress?: string | number;
    IPAddress?: string | number;
    SubnetMask?: string | number;
    NetPoolEnhanced?: string | number;
    AdeLat?: string | number;
    AdeLon?: string | number;
    AdeUniqueId?: string | number;
    LookappUrl?: string | number;
    QrImageFile?: string | number;
    QrImageData?: string | number;
    SogliaI0mASpiExt?: string | number;
    SogliaI0mASpiInt?: string | number;
    SogliaI1mASpiExt?: string | number;
    SogliaI1mASpiInt?: string | number;
    SogliaT0mSSpiExt?: string | number;
    SogliaI2mA?: string | number;
    SogliaT0mS?: string | number;
    SogliaT1mS?: string | number;
    TemperaturaFrigoA?: string | number;
    TemperaturaFrigoB?: string | number;
    TempoAttesaResto?: string | number;
    TempoCiclo?: string | number;
    TempoCicloSpiExt?: string | number;
    TempoCicloSpiInt?: string | number;
    TempoLampadaErogazione?: string | number;
    TempoMultiVendita?: string | number;
    TimeoutVideoStart?: string | number;
    TitoloSuCategoria?: string | number;
    Video0?: string | number;
    Video1?: string | number;
    Video2?: string | number;
    Video3?: string | number;
    Video4?: string | number;
    Video5?: string | number;
    Video6?: string | number;
    WebcamModel?: string | number;
    BpParam?: {
        BetPassionCryptedPin?: string | number;
        BetPassionEnable?: string | number;
        BetPassionMaxContantiValue?: string | number;
        BetPassionMaxVirtualValue?: string | number;
        BetPassionPosEnable?: string | number;
        BetPassionSatispayEnable?: string | number;
        BetPassionUsername?: string | number;
    };
    MpParam?: {
        MrPayCryptedPassword?: string | number;
        MrPayEnableCarteGioco?: string | number;
        MrPayEnableContiGioco?: string | number;
        MrPayEnableGiftCrypto?: string | number;
        MrPayEnableVendoCrypto?: string | number;
        MrPayMaxTaglioValue?: string | number;
        MrPayMaxTaglioValueVendoCrypto?: string | number;
        MrPayMinCartaValueVendoCrypto?: string | number;
        MrPayMinCartaValue?: string | number;
        MrPayUserId?: string | number;
        MrPayWsPassphrase?: string | number;
        MrPayWsSuffix?: string | number;
    };
    Device?: {
        DeviceType?: string,
        DevSerialID?: string | number,
        DevPax?: {
            PaxParam?: {
                Enable?: string | number;
                LockReceiptPrint?: string | number;
                SerialNumber?: string | number;
                TerminalList?: Terminal[];
            };
        },
        DevIngenico?: {
            IngenicoParam?: {
                Enable?: string | number;
                Port?: string | number;
                SerialNumber?: string | number;
                TerminalList?: Terminal[];
            }
        },
    }[]; // Device[], gli square brackets [] indicano che è un array di oggetti;
    EtaLimite?: {
        age?: string | number;
    }[];
    ErogDevLayout?: Erog[];
    IntMotLayout?: Erog[];
    Favorites?: {
        ItemTitle?: string | number;
        ItemSubtitle?: string | number;
    }[];
    FingerInfo?: {
        FingerID?: string | number;
        EnrolledQuality?: string | number;
        PeopleID?: string | number;
    }[];
    HopperParam?: {
        Name?: string | number;
        CoinValue?: string | number;
        CoinSorter?: string | number;
    }[];
    MoneyLineAcceptParam?: {
        ValoreTaglio?: string | number;
        LineValue?: string | number;
        PcsFilterLimit?: string | number;
        TimeDisable?: string | number;
        WindowFilter?: string | number;
        TimeFeatureEnabled?: string | number;
    }[];
    TsParam?: {
        Name?: string | number;
        PanelImageName?: string | number;
        CatReference?: string | number;
        RetroCatReference?: string | number;
        NumMaxItem?: string | number;
        NumEffItem?: string | number;
        Visible?: string | number;
    }[];
    VTEContractPackages?: {
        name?: string | number;
        datastart?: string | number;
        dataend?: string | number;
    }[];
    VideoWeek?: string[];
    VolumeDays?: {
        Day?: string | number;
        VolProfiloGiorno?: string | number;
        VolProfiloNotte?: string | number;
    }[];
}