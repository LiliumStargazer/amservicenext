import React, { useEffect, useRef, useState } from "react";
import useStore from "@/app/store";
import { debounce } from "lodash";

const SearchEvents: React.FC = () => {
    const searchValueDebounced = useStore(state => state.searchValueDebounced);
    const setSearchValueDebounced = useStore(state => state.setSearchValueDebounced);
    const loadingGlobal = useStore(state => state.loadingGlobal);
    const table = useStore(state => state.table);
    const [searchValue, setSearchValue] = useState(searchValueDebounced);

    const debouncedSetSearchValue = useRef(
        debounce((value: string) => {
            setSearchValueDebounced(value);
        }, 1000)
    ).current;

    useEffect(() => {
        return () => {
            debouncedSetSearchValue.cancel();
        };
    }, [debouncedSetSearchValue]);

    useEffect(() => {
        console.log("searchValueDebounced", searchValueDebounced);
        setSearchValue(searchValueDebounced);
    }, [searchValueDebounced]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchValue(value);
        debouncedSetSearchValue(value);
    };

    if (table !== "master") return null;

    return (
        <label className="input input-bordered input-info flex items-center gap-2 w-80">
            <input
                type="search"
                className="grow text-sm "
                placeholder="SearchEvents in the whole database..."
                aria-label="SearchEvents"
                aria-describedby="button-addon2"
                value={searchValue}
                onChange={handleChange}
                disabled={loadingGlobal}
            />
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70">
                <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd" />
            </svg>
        </label>
    );
}

export default SearchEvents;