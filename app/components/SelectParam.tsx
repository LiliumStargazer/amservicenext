'use client'

import React, {useEffect} from 'react';
import {ParamList} from "@/app/types/types";
import {convertTimeStampToDate} from "@/app/utils/utils";

interface SelectParamProps {
    loading: boolean;
    IDParam: string;
    handleOnChangeParam: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    rawIdList:ParamList[];
}

const SelectParam: React.FC<SelectParamProps>= ({loading, IDParam, handleOnChangeParam, rawIdList}) => {
    const [paramList, setParamList] = React.useState<React.ReactNode[]>([]);

    useEffect(() => {
        if (rawIdList.length > 0) {
            const options = rawIdList.map((element: ParamList) => (
                <option key={element.ID} value={element.ID}>
                    Id: {element.ID} Data: {convertTimeStampToDate(parseInt(element.DataOra))}
                </option>
            ));
            setParamList(options);
        }
    }, [rawIdList]);

    return (
        loading ? <div className="skeleton h-12 w-64"></div>
            :
            <select
                className="select select-bordered select-md max-w-min min-w-max z-auto"
                value={IDParam}
                onChange={handleOnChangeParam}
            >
                {paramList}
            </select>
    );
};

export default SelectParam;