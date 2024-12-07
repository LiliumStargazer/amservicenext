'use client'
import React from "react";


interface GetButtonProps {
    loading: boolean;
    reset: () => Promise<void>;
}

const GetButton: React.FC<GetButtonProps> = ({loading, reset}) => {
    const classNameButton = loading ? "btn btn-info btn-disabled" : "btn btn-info";

    const handleClickLog = async () => {
       await reset();
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