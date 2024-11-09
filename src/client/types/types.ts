export interface RowData {
    ID?: string
    IDR: string;
    DataOraR: string;
    EventString: string;
    State: string;
    DevProducer: string;
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

export interface FridgesRowData {
    ID: string;
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

export interface LisRowData {
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

export interface FingerRowData {
    Date: string;
    Time: string;
    FingerID: string;
    PeopleID: string;
    OperationId: string;
    Money: string;
    Motivo: string;
    ActualValue: string;
}


export type TypeConfigParams = {
    [key: string]: boolean | number | string | undefined;
};

export type TypeDeviceParams = {
    key: number;
    label: string;
    value: string;
    serial: string;
};

export type TypeErogParams = {
    key: number;
    label: string;
    type: string;
    productCode: string;
    inout: string;
    capacity: string;
};

export type TypeFavoriteParams = {
    key: number;
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

export type TypePanelParam = {
    name: string;
    categoryReference: string;
    retroCatReference: string;
    numMaxItem: string;
    panelImage: string;
    visible: string;
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
    serial: string;
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
