import React from "react";
import useStore from "@/app/store";
import useResetAndNavigate from "@/src/client/hooks/useResetAndNavigate";

const GetButton = () => {
    const loadingGlobal = useStore(state => state.loadingGlobal);
    const classNameButton = loadingGlobal ? "btn btn-info btn-disabled" : "btn btn-info";
    const serialTemp = useStore(state => state.serialTemp);
    const validateSerialAndNavigate = useResetAndNavigate();

    const handleClickLog = () => {
        validateSerialAndNavigate(serialTemp);
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