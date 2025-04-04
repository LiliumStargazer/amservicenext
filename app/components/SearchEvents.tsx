'use client'

import React from "react";

interface SearchEventsProps {
    loading: boolean;
    handleSearchValueChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchEvents: React.FC <SearchEventsProps> = ({loading, handleSearchValueChange}) => {
    return (
        <label className="input input-bordered input-info flex items-center ml-2 mr-2 w-full mb-2">
            <input
                type="search"
                className="grow text-sm"
                placeholder="Search events in the whole database..."
                aria-label="SearchEvents"
                aria-describedby="button-addon2"
                onChange={handleSearchValueChange}
                disabled={loading}
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