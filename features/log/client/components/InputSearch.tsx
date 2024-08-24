import React from "react";
import useStore from "@/app/store";

interface InputSearchProps {
    disabled?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputSearch: React.FC<InputSearchProps> = ({ disabled, onChange }) => {
    const searchValue = useStore(state => state.searchValue);
    const setSearchValue = useStore(state => state.setSearchValue);
    const loading = useStore(state => state.loading);
    const defaultDisabled = disabled || loading;

    const inputProps: React.InputHTMLAttributes<HTMLInputElement> = {};
    if (disabled) inputProps.disabled = disabled;
    if (onChange) inputProps.onChange = onChange;
    if (searchValue) inputProps.value = searchValue;

    return (
        <label className="input input-bordered input-info flex items-center gap-2">
            <input
                type="search"
                className="grow"
                placeholder="Search..."
                aria-label="InputSearch"
                aria-describedby="button-addon2"
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                disabled={defaultDisabled}
                {...inputProps}
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

export default InputSearch;