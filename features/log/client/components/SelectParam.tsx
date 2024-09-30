import React, { useEffect, useState } from 'react';
import useStore from "@/app/store";
import {getParam, getParamIds} from "@/features/shared/client/api";
import {convertTimestampToDate} from "@/features/shared/client/utils/utils";

const SelectParam = () => {
    const param = useStore(state => state.param);
    const serial = useStore(state => state.serial) ?? '';
    const backupSelected = useStore(state => state.backupSelected);
    const setParam = useStore(state => state.setParam);
    const setCategorySelected = useStore(state => state.setCategorySelected);
    const [defaulID, setDefaultID] = useState<string>('');
    const [paramArray, setParamArray] = useState<string[]>([]);
    const [storedParams, setStoredParams] = useState<React.ReactNode[]>([]);

    useEffect(() => {
        if (param && storedParams.length === 0) {

            getParamIds(serial, backupSelected)
                .then((data) => {
                    try {
                        setParamArray(data);
                    } catch (error) {
                        console.error('Error setting param array:', error);
                    }
                })
                .catch((error) => {
                    console.error('Error fetching param IDs:', error);
                });
        }

    }, [param, serial, backupSelected]);

    useEffect(() => {
        if (paramArray.length > 0) {
            const maxIdElement = paramArray.reduce((max, element) => (element as any).ID > (max as any).ID ? element : max, paramArray[0]);
            const paramArrayTemp = paramArray.map((element: any, index) => (
                <option key={index} value={element.ID}>Id: {element.ID} Data: {convertTimestampToDate( element.DataOra) }</option>
            ));
            setStoredParams(paramArrayTemp);
            setDefaultID(( maxIdElement as any).ID);

        }
    }, [paramArray]);

    const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDefaultID(e.target.value);
        getParam(serial, backupSelected, defaulID.toString() ).then((data) => {
            setParam(data);
            setCategorySelected(null);
        }).catch((error) => {
            console.error('Error fetching param:', error);
        });

    }

    if (storedParams.length === 0) {
        return (
            <div className="skeleton h-12 w-64"></div>
        );
    }

    return (
        <select
            className="select select-md select-ghost max-w-min min-w-44 join-item flex flex-auto"
            value={defaulID.toString()}
            onChange={(e) => handleOnChange(e) }
        >
            {storedParams}
        </select>
    );
};

export default SelectParam;