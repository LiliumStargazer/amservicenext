import React from "react";
import useStore from "@/app/store";

const Pagination = () => {

    const setFrigoSelected = useStore(state => state.setFrigoSelected);
    const frigoNumber = useStore(state => state.frigoNumber);
    const table = useStore(state => state.table);

    const createInput = (frigoNumber: number) => {
        let input = [];
        for (let i = 0; i < frigoNumber; i++) {
            input.push(
                <input
                    key={i}
                    className="join-item btn btn-square btn-info"
                    type="radio"
                    name="options"
                    aria-label={(i + 1).toString()}
                    defaultChecked={i === 0}
                    onClick={() => setFrigoSelected(i)}
                />
            );
        }
        return input;
    };

    const input = createInput(frigoNumber);

    if (frigoNumber <= 1) return null;
    if (table !== "fridge") return null;

    return (
        <div className="join">
            {input}
        </div>
    );
}

export default Pagination;