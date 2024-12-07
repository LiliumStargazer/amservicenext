'use client'

import React from "react";

interface SelectRangeProps {
    setIntervalMinutes: (value: number) => void;
}

const SelectRange: React.FC<SelectRangeProps> = ({ setIntervalMinutes }) => {
    const handleSelectRange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setIntervalMinutes(Number(event.target.value));
    };

    return (
        <select
            className="select select-bordered max-w-xs"
            onChange={handleSelectRange}
            defaultValue="All"
        >
            <option disabled value="">
                Points per time (default: All)
            </option>
            <option value="0">All</option>
            <option value="15">every 15 min</option>
            <option value="30">every 30 min</option>
            <option value="60">every 1h</option>
        </select>
    );
}

export default SelectRange;