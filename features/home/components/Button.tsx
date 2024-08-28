import React from "react";
import useStore from "@/app/store";

const Button  = ({ isButtonEnabled, ...rest }: { isButtonEnabled: boolean }) => {

    const loading = useStore(state => state.loading);
    const classNameButton = loading ? "btn btn-sm btn-info btn-disabled" : "btn btn-sm btn-info";

    return isButtonEnabled ?
        <button
            className={classNameButton}
            disabled={loading}
            {...rest}
        >
            Go!
        </button> : null
};

export default Button;