import { create } from 'zustand'

interface State {
    serialTemp: string;
    setSerialTemp: (value: string) => void;
    serial: string | null;
    setSerial: (value: string ) => void;
    softwareType: string;
    setSoftwareType: (value: string) => void;
    backupList: any[];
    setBackupList: (value: any[]) => void;
    backupSelected: string;
    setBackupSelected: (value: string) => void;
    latestBackup: string;
    setLatestBackup: (value: string) => void;
    logData: any[];
    setLogData: (value: any[]) => void;
    logDataFetched: boolean;
    setLogDataFetched: (value: boolean) => void;
    searchValue: string;
    setSearchValue: (value: string) => void;
    loading: boolean;
    setLoading: (value: boolean) => void;
    message: string;
    setMessage: (value: string) => void;
    alertMessage: string;
    setAlertMessage: (value: string) => void;
    frigoData: any[];
    setFrigoData: (value: any[]) => void;
    frigoNumber: number;
    setFrigoNumber: (value: number) => void;
    frigoTables: Record<string, any>;
    setFrigoTables: (value: Record<string, any>) => void;
    frigoSelected: number;
    setFrigoSelected: (value: number) => void;
    dataFrigoCharts: any[];
    setDataFrigoCharts: (value: any[]) => void;
    activeTab: number;
    setActiveTab: (value: number) => void;
    table: string;
    setTable: (value: string) => void;
    param: Record<string, any>;
    setParam: (value: Record<string, any>) => void;
    eventsTranslatedByAlive: Record<string, any>;
    setEventsTranslatedByAlive: (value: Record<string, any>) => void;
    isDialogOpen: boolean;
    setIsDialogOpen: (value: boolean) => void;
    dialogContent: object | any[];
    setDialogContent: (value: object | any[]) => void;
    gridApi: null;
    setGridApi: (value: any | null) => void;
    intervalMinutes: number;
    setIntervalMinutes: (value: number) => void;
    categorySelected: string | null;
    setCategorySelected: (value: string | null) => void;
    aliveSerial: string;
    setAliveSerial: (value: string) => void;
    password: string;
    setPassword: (value: string) => void;
}

const useStore = create<State>((set) => ({
    serialTemp: '',
    setSerialTemp: (value) => set({ serialTemp: value }),
    softwareType: '',
    serial: '',
    setSerial: (value) => set({ serial: value }),
    setSoftwareType: (value) => set({ softwareType: value }),
    backupList: [],
    setBackupList: (value) => set({ backupList: value }),
    backupSelected: '',
    setBackupSelected: (value) => set({ backupSelected: value }),
    latestBackup: '',
    setLatestBackup: (value) => set({ latestBackup: value }),
    logData: [],
    setLogData: (value) => set({ logData: value }),
    logDataFetched: false,
    setLogDataFetched: (value) => set({ logDataFetched: value }),
    searchValue: '',
    setSearchValue: (value) => set({ searchValue: value }),
    loading: false,
    setLoading: (value) => set({ loading: value }),
    message: '',
    setMessage: (value) => set({ message: value }),
    alertMessage: '',
    setAlertMessage: (value) => set({ alertMessage: value }),
    frigoData: [],
    setFrigoData: (value) => set({ frigoData: value }),
    frigoNumber: 0,
    setFrigoNumber: (value) => set({ frigoNumber: value }),
    frigoTables: {},
    setFrigoTables: (value) => set({ frigoTables: value }),
    frigoSelected: 0,
    setFrigoSelected: (value) => set({ frigoSelected: value }),
    dataFrigoCharts: [],
    setDataFrigoCharts: (value) => set({ dataFrigoCharts: value }),
    activeTab: 1,
    setActiveTab: (value) => set({ activeTab: value }),
    table: 'Home',
    setTable: (value) => set({ table: value }),
    param: {},
    setParam: (value) => set({ param: value }),
    eventsTranslatedByAlive: {},
    setEventsTranslatedByAlive: (value) => set({ eventsTranslatedByAlive: value }),
    isDialogOpen: false,
    setIsDialogOpen: (value) => set({ isDialogOpen: value }),
    dialogContent: [],
    setDialogContent: (value) => set({ dialogContent: value }),
    gridApi: null,
    setGridApi: (value) => set({ gridApi: value }),
    intervalMinutes: 0,
    setIntervalMinutes: (value) => set({ intervalMinutes: value }),
    categorySelected: null,
    setCategorySelected: (value) => set({ categorySelected: value }),
    aliveSerial: '',
    setAliveSerial: (value) => set({ aliveSerial: value }),
    password: '',
    setPassword: (value) => set({ password: value }),
}));

export default useStore;
