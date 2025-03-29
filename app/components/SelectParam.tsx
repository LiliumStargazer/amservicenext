'use client'

import React, { } from 'react';

interface SelectParamProps {
    loading: boolean;
    IDParam: string;
    handleOnChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    paramIdList: React.ReactNode[];
}

const SelectParam: React.FC<SelectParamProps>= ({loading, IDParam, handleOnChange, paramIdList}) => {

    return (
        loading ? <div className="skeleton h-12 w-64"></div>
            :
            <select
                className="select select-bordered select-md max-w-min min-w-max z-auto"
                value={IDParam}
                onChange={handleOnChange}
            >
                {paramIdList}
            </select>
    );
};

export default SelectParam;