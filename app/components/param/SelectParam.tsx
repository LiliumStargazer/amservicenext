'use client'

import React, {useEffect} from 'react';
import {convertTimeStampToDate} from "@/app/utils/utils";

interface SelectParamProps<T extends { ID: string; DataOra: string }> {
    loading: boolean;
    IDParam: string;
    handleOnChangeParam: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    rawIdList: T[];
    setIDParam: (id: string) => void;
}

const SelectParam = <T extends { ID: string; DataOra: string }>({
    loading,
    IDParam,
    handleOnChangeParam,
    rawIdList,
    setIDParam
}: SelectParamProps<T>) => {
    const [paramList, setParamList] = React.useState<React.ReactNode[]>([]);

    useEffect(() => {
        if (rawIdList && rawIdList.length > 0) {
            const options = rawIdList.map((element) => (
                <option key={element.ID} value={element.ID}>
                    Id: {element.ID} Data: {convertTimeStampToDate(parseInt(element.DataOra))}
                </option>
            ));
            setParamList(options);
            const valuesArray = Object.values(rawIdList);
            const maxIdElement = valuesArray.reduce((max, element) =>
                    element.ID > max.ID ? element : max, valuesArray[0]);
                setIDParam(maxIdElement.ID.toString());
        }
    }, [rawIdList, setIDParam]);

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