import React, { useEffect, useState } from 'react';
import useStore from "@/app/store";
import { apiGetParamsIds} from "@/src/client/api/api";
import {convertTimestampToDate} from "@/src/client/utils/utils";

const SelectParam = () => {
    const serial = useStore(state => state.serial) ?? '';
    const backupSelected = useStore(state => state.backupSelected);
    const table = useStore(state => state.table);
    const IDParam = useStore(state => state.IDParam);
    const setIDParam = useStore(state => state.setIDParam);
    const setMessage = useStore(state => state.setMessage);
    const setTable = useStore(state => state.setTable);
    const [paramArray, setParamArray] = useState<string[]>([]);
    const [storedParams, setStoredParams] = useState<React.ReactNode[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if (table !== "param")
            return;

        const fetchParamList = async () => {
            try {
                const data = await apiGetParamsIds(serial, backupSelected);

                if (!data || data.length === 0) {
                    setLoading(false);
                    setMessage('No param IDs found');
                    setTable('master');
                    setLoading(false);
                    return;
                }
                setLoading(false);
                setParamArray(data);
            } catch (error) {
                console.error('Error fetching param IDs:', error);
                setLoading(false);
                setMessage('Error fetching param IDs');
                setTable('master');
                setLoading(false);
            }
        }
        setLoading(true);
        fetchParamList().catch(error => console.error('Error fetching param IDs:', error));

    }, [table, serial, backupSelected]);

    useEffect(() => {

        if (paramArray.length === 0)
            return;

        const maxIdElement = paramArray.reduce((max, element) => (element as any).ID > (max as any).ID ? element : max, paramArray[0]);
        const paramArrayTemp = paramArray.map((element: any, index) => (
            <option key={index} value={element.ID}>Id: {element.ID} Data: {convertTimestampToDate( element.DataOra) }</option>
        ));
        setStoredParams(paramArrayTemp);
        setIDParam(( maxIdElement as any).ID);

    }, [paramArray]);

    if (table !== "param")
        return null;

    if (loading) {
        return (
            <div className="skeleton h-12 w-64"></div>
        );
    }

    return (
        <select
            className="select select-md select-ghost max-w-min min-w-44 join-item flex flex-auto"
            value={IDParam}
            onChange={(e) => setIDParam(e.target.value) }
        >
            {storedParams}
        </select>
    );
};

export default SelectParam;