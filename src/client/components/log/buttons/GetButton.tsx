import React from "react";
import useStore from "@/app/store";
import useResetAndNavigate from "@/src/client/hooks/useResetAndNavigate";
import useSetNewData from "@/src/client/hooks/useSetNewData";

const GetButton = () => {
    const loadingGlobal = useStore(state => state.loadingGlobal);
    const classNameButton = loadingGlobal ? "btn btn-info btn-disabled" : "btn btn-info";
    const serialTemp = useStore(state => state.serialTemp);
    const validateSerialAndNavigate = useResetAndNavigate();
    const setNewData = useSetNewData();

    const handleClickLog = () => {
        setNewData(serialTemp).catch(console.error);
    }

    return (
        <button
            className={classNameButton}
            disabled={loadingGlobal}
            onClick={handleClickLog}
        >
            Go!
        </button>
    );
};

export default GetButton;