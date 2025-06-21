'use client'

import { useGetEventsName } from '@/app/hooks/useQueries';
import React, { useState, useMemo, useRef } from 'react';

interface Option {
    value: string;
    label: string;
}

interface SelectSearchProps {
    serial : string;
    backup: string;
    disabled: boolean;
    setSearchValue: (serial: string) => void;
}

const SelectSearch: React.FC<SelectSearchProps> = ({ serial, backup, disabled, setSearchValue }) => {
    const [search, setSearch] = useState('');
    const [open, setOpen] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Replace this with your actual data fetching hook
    const { data = [] } = useGetEventsName(serial, backup);

    // Convert data to options
    const options: Option[] = useMemo(
        () =>
            Array.isArray(data)
                ? data
                      .filter((item) => typeof item.EventString === 'string')
                      .map((item) => ({
                          value: item.EventString,
                          label: item.EventString,
                      }))
                : [],
        [data]
    );

    const filteredOptions = useMemo(
        () =>
            options.filter((opt) =>
                opt.label.toLowerCase().includes(search.toLowerCase())
            ),
        [options, search]
    );

    const [selectedValue, setSelectedValue] = useState<string>('');

    const handleSelect = (val: string) => {
        setSelectedValue(val);
        setSearchValue(val);
        setOpen(false);
        setSearch('');
    };

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearch(value);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setSearchValue(value), 700);
    };

    const selectedLabel =
        options.find((opt) => opt.value === selectedValue)?.label || '';

    // Close dropdown when clicking outside
    React.useEffect(() => {
        if (!open) return;
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            const dropdown = document.getElementById('select-search-dropdown');
            if (dropdown && !dropdown.contains(target)) {
                setOpen(false);
                setSearch('');
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [open]);

    return (
    <div className="min-w-76 max-w-min" id="select-search-dropdown">
        <label className="input input-sm ">
            <span className="label text-info">Search events:</span>
            <input
                className="w-full bg-transparent outline-none"
                value={open ? search : selectedLabel}
                onChange={handleOnChange}
                onFocus={() => !disabled && setOpen(true)}
                disabled={disabled}
                readOnly={!open}
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
            {selectedValue && !disabled && (
                <button
                type="button"
                className="ml-1 p-1 rounded hover:bg-base-200"
                onClick={(e) => {
                    e.stopPropagation();
                    setSelectedValue(''); 
                    setSearchValue('');
                    setSearch(''); 
                }}
                tabIndex={-1}
                aria-label="Clear selection"
                >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 text-gray-400"
                >
                    <path
                    fillRule="evenodd"
                    d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                    clipRule="evenodd"
                    />
                </svg>
                </button>
            )}
        </label>
        {open && (
            <ul
                className="absolute z-10 mt-1 w-76 bg-base-100 border border-base-300 rounded shadow max-h-80 overflow-y-auto"
            >
                {filteredOptions.length === 0 && (
                    <li className="px-4 py-2 text-gray-400">Nessuna opzione</li>
                )}
                {filteredOptions.map((opt) => (
                    <li
                        key={opt.value}
                        className={`px-4 py-2 cursor-pointer hover:bg-base-200 text-sm ${
                            selectedValue === opt.value ? 'bg-base-200' : ''
                        }`}
                        onClick={() => handleSelect(opt.value)}
                    >
                        {opt.label}
                    </li>
                ))}
            </ul>
        )}

    </div>
    );
};

export default SelectSearch;