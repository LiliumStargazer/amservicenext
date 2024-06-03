import React, { useContext, useState, useEffect } from "react";
import {Context} from "@/app/Context";

function InputSearch({disabled}) {
    const { setSearchValue , loading} = useContext(Context);
    const [searchTerm, setSearchTerm] = useState('');

    const defaultDisabled = disabled || loading;

    useEffect(() => {
        if (searchTerm.length === 0)
            setSearchValue('');
        else{
            setSearchValue(searchTerm);
        }
    }, [ searchTerm, setSearchValue])

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className="relative flex w-1/6 flex-right flex-wrap float-right items-stretch">
            <input
                type="search"
                className="input input-md input-info m-0 block w-[1px] min-w-0 flex-auto"
                placeholder="Search..."
                aria-label="InputSearch"
                aria-describedby="button-addon2"
                value={searchTerm}
                onChange={handleInputChange}
                disabled={defaultDisabled}
            />
        </div>
    );
}

export default InputSearch;
