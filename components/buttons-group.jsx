import React, {useContext, useMemo, useCallback, useEffect} from "react";
import {Context} from "@/app/Context";

function ButtonsGroup() {
    const { frigoNumber , setFrigoSelected, softwareType} = useContext(Context);

    useEffect(() => {

        if ( softwareType.includes("win")) {
            setFrigoSelected(1);
        }
    }, [softwareType]);

    const handleClick = useCallback((value) => {

        if ( softwareType.includes("win")) {
            setFrigoSelected(value+1);
        }
        else {
            setFrigoSelected(value);
        }

    }, [setFrigoSelected]);


    const buttons = useMemo(() => {
        return Array.from({ length: frigoNumber }, (_, i) => (
            <button key={i} className="btn join-item" onClick={() => handleClick(i)}>
                {i+1}
            </button>
        ));
    }, [frigoNumber, handleClick]);

    return (
        <div className="join">
            {buttons}
        </div>
    );
}

export default ButtonsGroup;
