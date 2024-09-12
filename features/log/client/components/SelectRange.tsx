import React from "react";
import useStore from "@/app/store";

const SelectRange: React.FC = () => {

    const setIntervalMinutes = useStore(state => state.setIntervalMinutes);

    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(Number( event.target.value));
        setIntervalMinutes(Number( event.target.value))

    };

    return (
        <select className="select select-bordered  max-w-xs" onChange={handleSelect}>
            <option disabled selected>Points per time ( default: All )  </option>
            <option value="0">All</option>
            <option value="15">every 15 min</option>
            <option value="30">every 30 min</option>
            <option value="60">every 1h</option>
        </select>
    );
}

export default SelectRange;