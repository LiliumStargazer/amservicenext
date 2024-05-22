import React, {useCallback, useContext} from "react";
import {Context} from "@/app/Context";


function ButtonExtract({ data, handleEventSelection }) {
    const { setMessage, rows, searchValueRef } = useContext(Context);

    return <button className="btn btn-ghost btn-xs" onClick={() => handleEventSelection(data)} >Extract</button>;
}

export default ButtonExtract;