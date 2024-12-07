'use client'

import React, { useEffect, useState } from 'react';

import {convertTimeStampToDate} from "@/app/utils/utils";
import useQueryGetParamsID from "@/app/hooks/log/param/useQueryGetParamsID";
import {useQueryClient} from "@tanstack/react-query";
import {ErrorResponse, Param, ParamList} from "@/app/types/types";
import SelectParam from "@/app/components/log/param/SelectParam";
import ParamListAccordition from "@/app/components/log/param/ParamListAccordition";
import useQueryGetParam from "@/app/hooks/log/param/useQueryGetParam";

interface SelectParamProps {
    serial: string;
    backup: string;
    isBackupReady: boolean;
    setMessage: (message: string) => void;
}

const ParamContainer: React.FC<SelectParamProps>= ({serial, backup, isBackupReady, setMessage}) => {
    const [IDParam, setIDParam] = useState<string>('');
    const [paramIdList, setParamIdList] = useState<React.ReactNode[]>([]);
    const [param, setParam] = useState<Param>({});
    const [loading, setLoading] = useState(false);
    const {
        isLoading:isLoadingParamIDList,
        isSuccess:IsSuccessIDList,
        data: dataIDList,
    } = useQueryGetParamsID(serial, backup, isBackupReady);
    const {
        isLoading: isLoadingParams,
        isSuccess: isSuccessParams,
        data: rawParams,
    } = useQueryGetParam(serial, backup, isBackupReady, IDParam);
    const queryClient = useQueryClient();

    useEffect(() => {
        if (isLoadingParamIDList || isLoadingParams) {
            setLoading(true);
            return;
        }
    }, [isLoadingParamIDList, isLoadingParams]);

    useEffect(() => {
        if ((dataIDList as ErrorResponse)?.error) {
            setMessage("error on param: " + (dataIDList as ErrorResponse)?.error);
            return;
        }
        if ((rawParams as ErrorResponse)?.error) {
            setMessage("error on param: " + (rawParams as ErrorResponse)?.error);
            return;
        }

    }, [dataIDList, rawParams, setMessage]);

    useEffect(() => {

        if (IsSuccessIDList && Array.isArray(dataIDList)) {
            try {
                const valuesArray: ParamList[] = Object.values(dataIDList);
                if (valuesArray.length === 0) {
                    setMessage('No param id found');
                    setLoading(false);
                    return;
                }
                const maxIdElement = valuesArray.reduce((max, element) =>  element.ID > max.ID ? element : max, valuesArray[0]);

                const paramArrayTemp = dataIDList.map((element: ParamList, index: number) => (
                    <option key={index} value={element.ID}>Id: {element.ID} Data: {convertTimeStampToDate(parseInt(element.DataOra))}</option>
                ));

                setParamIdList(paramArrayTemp);
                setIDParam((maxIdElement.ID).toString());
                setLoading(false);
            } catch (error) {
                setMessage('Error processing param data: ' + error);
            }
        }
    }, [dataIDList, IsSuccessIDList,setMessage, setIDParam]);

    const handleOnChange  = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        await queryClient.resetQueries({
                queryKey: ['getParamsBackups'],
                exact: true, // Ensure it matches the exact query key
            }
        ).catch((error) => {console.log(error)});
        setIDParam(e.target.value);
    }

    useEffect(() => {

        if (isSuccessParams && rawParams && typeof rawParams === 'object' ) {

            if (Object.keys(rawParams).length === 0){
                setMessage('No param data found');
                setLoading(false);
                return;
            }
            setParam(rawParams);
            setLoading(false);
        }
    }, [isSuccessParams, rawParams, setMessage]);

    return (
        <>
            <div className=" flex justify-center">
                <SelectParam
                    loading={loading}
                    IDParam={IDParam}
                    handleOnChange={handleOnChange}
                    paramIdList={paramIdList}
                />
            </div>
        <ParamListAccordition
           loading={loading}
              param={param}
        />
        </>
    );
};

export default ParamContainer;