import React from "react";
import useStore from "@/app/store";

const ButtonsRadioGroup: React.FC = () => {
    const setIsChart = useStore(state => state.setIsChart);

    const handleselectTable = () => {
        setIsChart(false);
    };

    const handleselectChart = () => {
        setIsChart(true);
    };

    return (
        <div className="join">
            <input className="join-item btn" type="radio" name="options" aria-label="Table" onClick={handleselectTable} />
            <input className="join-item btn" type="radio" name="options" aria-label="Chart" onClick={handleselectChart} />
        </div>
    );
}

export default ButtonsRadioGroup;