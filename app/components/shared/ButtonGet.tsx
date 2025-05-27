'use client'
import React from "react";


interface GetButtonProps {
    loading: boolean;
    setIsFetchRequest: (isFetchRequest: boolean) => void;
}

const ButtonGet: React.FC<GetButtonProps> = ({loading, setIsFetchRequest}) => {
    const classNameButton = loading ? "btn btn-info btn-disabled" : "btn btn-info";

    const handleClickLog = async () => {
        setIsFetchRequest(true);
    }

    return (
        <button
            className={classNameButton}
            disabled={loading}
            onClick={handleClickLog}
        >
            Get!
        </button>
    );
};

export default ButtonGet;