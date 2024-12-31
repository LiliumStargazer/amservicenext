import {useCallback} from "react";
import {debounce} from "lodash";

const useSearch = (
    setSearchValue: (value: string) => void,
    setIsResettingSearchingEvent: (value: boolean) => void
) => {
    const debouncedSetSearchValue = debounce((value: string) => {
        setSearchValue(value);
        if (value.length === 0) setIsResettingSearchingEvent(true);
    }, 1000);

    return useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        debouncedSetSearchValue(value);
    }, [debouncedSetSearchValue]);
};

export default useSearch;