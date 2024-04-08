import React, { useContext, useMemo } from "react";
import {Context} from "@/app/Context";

function JoinGroupButtons() {
    const { frigoNumber , setFrigoSelected} = useContext(Context);

    const handleClick = (value) => {
        setFrigoSelected(value);
    };

    const buttons = useMemo(() => {
        if (frigoNumber === 0)
            return null;
        else {
            let buttonArray = [];
            for (let i = 0; i <= frigoNumber; i++) {
                buttonArray.push(<button key={i} className="btn join-item" onClick={() => handleClick(i)}>
                    {i+1}
                </button>);
            }
            return buttonArray;
        }
    }, [frigoNumber ]);



    return (
        <div className="join">
            {buttons}
        </div>
    );
}

export default JoinGroupButtons;
