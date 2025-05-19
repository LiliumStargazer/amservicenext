'use client'

import React from "react";

interface SearchEventsProps {
    loading: boolean;
    handleSearchValueChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    isBackupReady: boolean
}

const SearchEvents: React.FC <SearchEventsProps> = ({loading, handleSearchValueChange, isBackupReady}) => {
    const isDisabled= !isBackupReady || loading;
    return (
        <div className="flex flex-wrap items-center justify-center w-full">
        <label className="input input-bordered input-info ml-2 mr-2 mb-2">
            <input
                type="search"
                className="grow text-sm"
                placeholder="Search events in the whole database..."
                aria-label="SearchEvents"
                aria-describedby="button-addon2"
                onChange={handleSearchValueChange}
                disabled={isDisabled}
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
        </div>
    );
}

export default SearchEvents;