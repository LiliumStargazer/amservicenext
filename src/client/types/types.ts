export interface RowData {
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