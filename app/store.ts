import { create } from 'zustand'

interface State {
    serial: string;
    setSerial: (value: string) => void;
    softwareType: string;
    setSoftwareType: (value: string) => void;
    backupList: any[];
    setBackupList: (value: any[]) => void;
    backupSelected: string;
    setBackupSelected: (value: string) => void;
    logDaMaster: any[];
    setLogDaMaster: (value: any[]) => void;
    searchValue: string;
    setSearchValue: (value: string) => void;
    loading: boolean;
    setLoading: (value: boolean) => void;
    message: string;
    setMessage: (value: string) => void;
    storedSerial: string | null;
    setStoredSerial: (value: string | null) => void;
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
    isChart: boolean;
    setIsChart: (value: boolean) => void;
    page: string;
    setPage: (value: string) => void;
    param: Record<string, any>;
    setParam: (value: Record<string, any>) => void;
    eventsTranslatedByAlive: Record<string, any>;
    setEventsTranslatedByAlive: (value: Record<string, any>) => void;
    isDialogOpen: boolean;
    setIsDialogOpen: (value: boolean) => void;
    dialogContent: string;
    setDialogContent: (value: string) => void;
    gridApi: null;
    setGridApi: (value: any | null) => void;
}

const useStore = create<State>((set) => ({
    serial: '',
    setSerial: (value) => set({ serial: value }),
    softwareType: '',
    setSoftwareType: (value) => set({ softwareType: value }),
    backupList: [],
    setBackupList: (value) => set({ backupList: value }),
    backupSelected: '',
    setBackupSelected: (value) => set({ backupSelected: value }),
    logDaMaster: [],
    setLogDaMaster: (value) => set({ logDaMaster: value }),
    searchValue: '',
    setSearchValue: (value) => set({ searchValue: value }),
    loading: false,
    setLoading: (value) => set({ loading: value }),
    message: '',
    setMessage: (value) => set({ message: value }),
    storedSerial: null,
    setStoredSerial: (value) => set({ storedSerial: value }),
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
    isChart: false,
    setIsChart: (value) => set({ isChart: value }),
    page: 'Home',
    setPage: (value) => set({ page: value }),
    param: {},
    setParam: (value) => set({ param: value }),
    eventsTranslatedByAlive: {},
    setEventsTranslatedByAlive: (value) => set({ eventsTranslatedByAlive: value }),
    isDialogOpen: false,
    setIsDialogOpen: (value) => set({ isDialogOpen: value }),
    dialogContent: '',
    setDialogContent: (value) => set({ dialogContent: value }),
    gridApi: null,
    setGridApi: (value) => set({ gridApi: value })
}));

export default useStore;
