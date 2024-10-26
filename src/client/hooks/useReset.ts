
import useStore from "@/app/store";

const useReset = () => {
    const setMessage = useStore(state => state.setMessage);
    const setExcelEvents = useStore(state => state.setExcelEvents);
    const setFrigoData = useStore(state => state.setFrigoData);
    const setSearchValueDebounced = useStore(state => state.setSearchValueDebounced);


    return () => {
        setSearchValueDebounced('');
        setMessage('');
        setExcelEvents([]);
        setFrigoData([]);
    };
};

export default useReset;