import React, { useEffect, useState } from 'react';
import useStore from "@/app/store";
import {convertTimestampToDate} from "@/src/client/utils/utils";
import useQueryGetParamsID from "@/src/client/hooks/useQueryGetParamsID";
import {useQueryClient} from "@tanstack/react-query";

type Param = {
    ID: string;
    DataOra: string;
};

const SelectParam = () => {
    const serial = useStore(state => state.serial) ?? '';
    const table = useStore(state => state.table);
    const IDParam = useStore(state => state.IDParam);
    const setIDParam = useStore(state => state.setIDParam);
    const setMessage = useStore(state => state.setMessage);
    const [paramIdList, setParamIdList] = useState<React.ReactNode[]>([]);
    const [loading, setLoading] = useState(false);
    const { isLoading, isError, isSuccess, data, error } = useQueryGetParamsID();
    const queryClient = useQueryClient();


    useEffect(() => {
        if (serial && serial.length > 0){
            setIDParam('');
        }
    }, [serial]);

    useEffect(() => {
        if (isLoading) {
            setLoading(true);
            return;
        }

        if (isError && error) {
            setMessage('Error fetching param: ' + error);
            setLoading(false);
            return;
        }


        if (isSuccess && data) {
            try {
                const valuesArray: Param[] = Object.values(data);
                if (valuesArray.length === 0) {
                    setMessage('No param id found');
                    setLoading(false);
                    return;
                }
                const maxIdElement = valuesArray.reduce((max, element) => ( element as any ).ID > (max as any).ID ? element : max, valuesArray[0]);

                const paramArrayTemp = data.map((element: any, index: number) => (
                    <option key={index} value={element.ID}>Id: {element.ID} Data: {convertTimestampToDate(element.DataOra)}</option>
                ));

                setParamIdList(paramArrayTemp);
                setIDParam(maxIdElement.ID);
                setLoading(false);
            } catch (error) {
                setMessage('Error processing param data: ' + error);
            }
        }
    }, [isLoading, isError, isSuccess, data, error]);

    const handleOnChange  = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        await queryClient.resetQueries({
                queryKey: ['getParamsBackups'],
                exact: true, // Ensure it matches the exact query key
            }
        ).catch((error) => {console.log(error)});
        setIDParam(e.target.value);
        console.log('SelectParam handleOnChange', e.target.value);
    }

    if (table !== "param")
        return null;

    return (
        loading ? <div className="skeleton h-12 w-64"></div> :
        <select
            className="select select-md select-ghost max-w-min min-w-44 join-item flex flex-auto"
            value={IDParam}
            onChange={(e) => handleOnChange(e) }
        >
            {paramIdList}
        </select>
    );
};

export default SelectParam;