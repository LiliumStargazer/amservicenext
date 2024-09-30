import React from "react";
import useStore from "@/app/store";
import useValidateSerialAndNavigate from "@/features/shared/client/hooks/useValidateSerialAndNagivate";

const GetButton = () => {
    const loading = useStore(state => state.loading);
    const classNameButton = loading ? "btn btn-info btn-disabled" : "btn btn-info";
    const serialTemp = useStore(state => state.serialTemp);
    const validateSerialAndNavigate = useValidateSerialAndNavigate();

    const handleClickLog = async () => {
        await validateSerialAndNavigate(serialTemp);
    }

    return (
        <button
            className={classNameButton}
            disabled={loading}
            onClick={handleClickLog}
        >
            Go!
        </button>
    );
};

export default GetButton;