import React, { useContext } from "react";
import {Context} from "@/app/Context";
function ButtonsRadioGroup() {
    const { setIsChart} = useContext(Context);

    const handleselectTable = () => {
        setIsChart(false);
    };

    const handleselectChart = () => {
        setIsChart(true);
    };

    return (
        <div className="join">
            <input className="join-item btn" type="radio" name="options" aria-label="Table" onClick={() => handleselectTable()} />
            <input className="join-item btn" type="radio" name="options" aria-label="Chart" onClick={() => handleselectChart()} />
        </div>
    );
}

export default ButtonsRadioGroup;
