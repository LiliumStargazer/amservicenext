import React, { useContext, useState, useEffect } from "react";
import {Context} from "@/app/Context";
import {debounce} from "lodash";

function Search({disabled}) {
    const { setSearchValue } = useContext(Context);
    const [searchTerm, setSearchTerm] = useState('');

    const debouncedSearch = debounce(value => setSearchValue(searchTerm), 0);

    useEffect(() => {
        if (searchTerm.length === 0)
            setSearchValue('');
        else
            debouncedSearch();
    }, [ searchTerm, debouncedSearch, setSearchValue])

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className="relative flex w-1/6 flex-right flex-wrap float-right items-stretch">
            <input
                type="search"
                className="m-0 block w-[1px] min-w-0 flex-auto textarea textarea-info text-md font-bol"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="button-addon2"
                value={searchTerm}
                onChange={handleInputChange}
                disabled={disabled}
            />
        </div>
    );
}

export default Search;
