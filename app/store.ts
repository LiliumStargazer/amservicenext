import { create } from 'zustand'

interface State {
    password: string;
    setPassword: (value: string) => void;
    serial: string;
    setSerial: (value: string) => void;
    serialTemp: string;
    setSerialTemp: (value: string) => void;
}

const useStore = create<State>((set) => ({
    serial: '',
    setSerial: (value) => set({serial: value}),
    serialTemp: '',
    setSerialTemp: (value) => set({serialTemp: value}),
    password: '',
    setPassword: (value) => set({password: value}),

}));

export default useStore;
