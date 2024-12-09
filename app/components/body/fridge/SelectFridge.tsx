'use client'

import React, {useEffect, useState} from "react";

import {RawFridgeData} from "@/app/types/types";

interface SelectFridgeProps {
    fridgeRawData: RawFridgeData[];
    setFridgeSelected: (value: number) => void;
    isLoadingFridge: boolean;
    isSuccessFridge: boolean;
}

const SelectFridge: React.FC<SelectFridgeProps> = ({ fridgeRawData, setFridgeSelected ,isLoadingFridge,isSuccessFridge}) => {
    const [input, setInput] = useState<React.ReactNode[]>([]);

    useEffect(() => {

        if (isLoadingFridge) {
            return;
        }

        if (isSuccessFridge && Array.isArray(fridgeRawData)) {

            if (fridgeRawData.length === 0)
                return;

            const fridgeIds = new Set<number>();
            fridgeRawData.forEach((rawFridgeItem: RawFridgeData) => {
                fridgeIds.add(Number(rawFridgeItem.IDFrigo));
            });
            const inputElements: React.ReactNode[] = [];
            const sortedFridgeIds = Array.from(fridgeIds).sort((a, b) => a - b);
            setFridgeSelected(sortedFridgeIds[0]);
            sortedFridgeIds.forEach((id, i) => {
                inputElements.push(
                    <input
                        key={i}
                        className="join-item btn btn-square btn-info"
                        type="radio"
                        name="options"
                        aria-label={(i + 1).toString()}
                        defaultChecked={i === 0}
                        onClick={() => setFridgeSelected(id)}
                    />
                );
            });
            setInput(inputElements);
        }
    }, [fridgeRawData, setFridgeSelected, isSuccessFridge, isLoadingFridge]);

    if (input.length < 2)
        return null;

    return (
        <div className="join">
            {input}
        </div>
    );
}

export default SelectFridge;