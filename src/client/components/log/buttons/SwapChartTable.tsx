import React from "react";
import useStore from "@/app/store";

const SwapChartTable = () => {
    const table = useStore(state => state.table);
    const setTable = useStore(state => state.setTable);

    const handleChanged = () => {
        console.log('clicked');
        if (table === "fridgeTable") {
            setTable("fridgeChart");
        } else {
            setTable("fridgeTable");
        }
    }

    if (table !== "fridgeChart" && table !== 'fridgeTable') return null;

    return (
        <label className="flex cursor-pointer gap-2">
            <span className="label-text">Chart</span>
            <input
                type="checkbox"
                checked={table === "fridgeTable"}
                className="toggle theme-controller"
                onChange={handleChanged}
            />
            <span className="label-text">Table</span>
        </label>
    );
}

export default SwapChartTable;