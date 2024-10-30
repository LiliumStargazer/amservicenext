import { create } from 'zustand'

interface State {
    IDParam: string;
    activeTab: number;
    alertMessage: string;
    aliveSerial: string;
    backupList: any[];
    backupSelected: string;
    dataFrigoCharts: any[];
    dialogContent: object | any[];
    eventsTranslatedByAlive: Record<string, any>;
    excelEvents: any[];
    frigoData: any[];
    frigoNumber: number;
    frigoSelected: number;
    gridApiStore: null;
    intervalMinutes: number;
    isDialogOpen: boolean;
    isSearchEmpty: boolean;
    latestBackup: string;
    loadingGlobal: boolean;
    message: string;
    password: string;
    searchValueDebounced: string;
    serial: string;
    serialTemp: string;
    isDateChanged: boolean;
    table: string;
    isLatestBackupQueryActive: boolean;
    isSearchingLogEvent: boolean;
    datePickerDate: Date;
    setActiveTab: (value: number) => void;
    setAlertMessage: (value: string) => void;
    setAliveSerial: (value: string) => void;
    setBackupList: (value: any[]) => void;
    setBackupSelected: (value: string) => void;
    setDataFrigoCharts: (value: any[]) => void;
    setDialogContent: (value: object | any[]) => void;
    setEventsTranslatedByAlive: (value: Record<string, any>) => void;
    setExcelEvents: (value: any[]) => void;
    setFrigoData: (value: any[]) => void;
    setFrigoNumber: (value: number) => void;
    setFrigoSelected: (value: number) => void;
    setGridApiStore: (value: any | null) => void;
    setIDParam: (value: string) => void;
    setIntervalMinutes: (value: number) => void;
    setIsDialogOpen: (value: boolean) => void;
    setIsSearchEmpty: (value: boolean) => void;
    setLatestBackup: (value: string) => void;
    setLoadingGlobal: (value: boolean) => void;
    setMessage: (value: string) => void;
    setPassword: (value: string) => void;
    setSearchValueDebounced: (value: string) => void;
    setSerial: (value: string) => void;
    setSerialTemp: (value: string) => void;
    setSoftwareType: (value: string) => void;
    setTable: (value: string) => void;
    softwareType: string;
    setIsDateChanged: (value: boolean) => void;
    setDatePickerDate: (value: Date) => void;
    setSearchingLogEvent: (value: boolean) => void;
    setIsLatestBackupQueryActive: (value: boolean) => void;
}

const useStore = create<State>((set) => ({
    isLatestBackupQueryActive: false,
    isSearchingLogEvent: false,
    datePickerDate: new Date(),
    isDateChanged: false,
    IDParam: '',
    activeTab: 1,
    alertMessage: '',
    aliveSerial: '',
    backupList: [],
    backupSelected: '',
    dataFrigoCharts: [],
    dialogContent: [],
    eventsTranslatedByAlive: {},
    excelEvents: [],
    frigoData: [],
    frigoNumber: 0,
    frigoSelected: 0,
    gridApiStore: null,
    intervalMinutes: 0,
    isDialogOpen: false,
    isSearchEmpty: true,
    latestBackup: '',
    loadingGlobal: false,
    message: '',
    password: '',
    searchValueDebounced: '',
    serial: '',
    serialTemp: '',
    softwareType: '',
    table: 'no_table',
    setIsLatestBackupQueryActive: (value) => set({isLatestBackupQueryActive: value}),
    setSearchingLogEvent: (value) => set({isSearchingLogEvent: value}),
    setDatePickerDate: (value) => set({datePickerDate: value}),
    setIsDateChanged: (value) => set({isDateChanged: value}),
    setActiveTab: (value) => set({activeTab: value}),
    setAlertMessage: (value) => set({alertMessage: value}),
    setAliveSerial: (value) => set({aliveSerial: value}),
    setBackupList: (value) => set({backupList: value}),
    setBackupSelected: (value) => set({backupSelected: value}),
    setDataFrigoCharts: (value) => set({dataFrigoCharts: value}),
    setDialogContent: (value) => set({dialogContent: value}),
    setEventsTranslatedByAlive: (value) => set({eventsTranslatedByAlive: value}),
    setExcelEvents: (value) => set({excelEvents: value}),
    setFrigoData: (value) => set({frigoData: value}),
    setFrigoNumber: (value) => set({frigoNumber: value}),
    setFrigoSelected: (value) => set({frigoSelected: value}),
    setGridApiStore: (value) => set({gridApiStore: value}),
    setIDParam: (value) => set({IDParam: value}),
    setIntervalMinutes: (value) => set({intervalMinutes: value}),
    setIsDialogOpen: (value) => set({isDialogOpen: value}),
    setIsSearchEmpty: (value) => set({isSearchEmpty: value}),
    setLatestBackup: (value) => set({latestBackup: value}),
    setLoadingGlobal: (value) => set({loadingGlobal: value}),
    setMessage: (value) => set({message: value}),
    setPassword: (value) => set({password: value}),
    setSearchValueDebounced: (value) => set({searchValueDebounced: value}),
    setSerial: (value) => set({serial: value}),
    setSerialTemp: (value) => set({serialTemp: value}),
    setSoftwareType: (value) => set({softwareType: value}),
    setTable: (value) => set({table: value}),
}));

export default useStore;
