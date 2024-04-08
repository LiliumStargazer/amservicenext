import React, { useContext, useState, useEffect } from "react";
import {Context} from "@/app/Context";



function Search({disabled}) {
    const { searchValue, setSearchValue } = useContext(Context);
    const [searchTerm, setSearchTerm] = useState(searchValue);
    const [typingTimeout, setTypingTimeout] = useState(null);

    useEffect(() => {
        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }
        const timeout = setTimeout(() => {
            setSearchValue(searchTerm);
        }, 500); // Ritardo di 1000 millisecondi

        setTypingTimeout(timeout);
    }, [ searchTerm, setSearchValue]);

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
)
    ;
}

export default Search;
