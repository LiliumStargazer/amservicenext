'use client'
import React from "react";

interface SwapChartTableProps {
    section: string;
    setSection: (section: string) => void;
}

const SwapChartTable: React.FC <SwapChartTableProps> = ({section, setSection}) => {

    const handleChanged = () => {
        if (section === "table") {
            setSection("chart");
        } else {
            setSection("table");
        }
    }

    return (
        <label className="flex cursor-pointer gap-2">
            <span className="label-text">Table</span>
            <input
                type="checkbox"
                checked={section === "chart"}
                className="toggle theme-controller"
                onChange={handleChanged}
            />
            <span className="label-text">Chart</span>
        </label>
    );
}

export default SwapChartTable;