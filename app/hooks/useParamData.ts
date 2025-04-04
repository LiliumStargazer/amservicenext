import React, {useEffect, useState} from "react";
import {ErrorResponse, Param, ParamList, jsonParams} from "@/app/types/types";
import useQueryGetParamsID from "@/app/hooks/useQueryGetParamsID";
import useQueryGetParam from "@/app/hooks/useQueryGetParam";
import {useQueryGetListinoFull} from "@/app/hooks/useQueryGetListinoFull";
import {useQueryGetJsonParam} from "@/app/hooks/useQueryGetJsonParam";
import {useQueryClient} from "@tanstack/react-query";

export interface ParamDataHookProps {
    serial: string;
    backup: string;
    isBackupReady: boolean;
    setMessage: (message: string) => void;
}

interface Listino {
    prodV: string;
    items: Array<{ code: number, prodName: string }>;
}

export const useParamData = ({serial, backup, isBackupReady, setMessage}: ParamDataHookProps) => {
    const [IDParam, setIDParam] = useState<string>('');
    const [rawIdList, setRawIdList] = useState<ParamList[]>([]);
    const [param, setParam] = useState<Param>({});
    const [jsonParams, setJsonParams]= useState<jsonParams>({});
    const [isLoadingParam, setIsLoadingParam] = useState(false);
    const [isGetListino, setIsGetListino] = useState(true);
    const [listinoItems, setListinoItems] = useState<Array<{ code: number, prodName: string }> | null>(null);
    const [machineModel, setMachineModel] = useState<string>('');
    const queryClient = useQueryClient();

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
    const {
        isLoading: isLoadingListino,
        isSuccess: isSuccessListino,
        data: rawListino,
        isError: isErrorListino,
    } = useQueryGetListinoFull(serial, isGetListino );
    const {
        isLoading: isLoadingJsonParam,
        isSuccess: isSuccessJsonParam,
        data: rawJsonParams,
    } =useQueryGetJsonParam(serial, isBackupReady);

    useEffect(() => {
        if (isLoadingParamIDList || isLoadingParams || isLoadingListino || isLoadingJsonParam) {
            setIsLoadingParam(true);
        }else{
            setIsLoadingParam(false);
        }
    }, [isLoadingParamIDList, isLoadingParams, isLoadingListino, isLoadingJsonParam]);


    useEffect(() => {
        if (isSuccessJsonParam && rawJsonParams && typeof rawJsonParams === 'object')
            setJsonParams(rawJsonParams);
    }, [isSuccessJsonParam, rawJsonParams]);

    useEffect(() => {
        if (isErrorListino) {
            setMessage("Error on listino: " + (rawListino as ErrorResponse).error);
            return;
        }
        if (isSuccessListino && rawListino && typeof rawListino === 'object'){
            setListinoItems((rawListino as Listino).items);
        }
        setIsGetListino(false);
    }, [isErrorListino, isSuccessListino, listinoItems, rawListino, setMessage]);

    useEffect(() => {
        if (isSuccessParams && rawParams && typeof rawParams === 'object' ) {
            if (Object.keys(rawParams).length === 0){
                setMessage('No param data found');
                return;
            }
            setParam(rawParams as Param);
        }
    }, [isSuccessParams, rawParams, setMessage]);

    useEffect(() => {
        if (IsSuccessIDList && Array.isArray(dataIDList)) {
            try {
                const valuesArray: ParamList[] = Object.values(dataIDList);
                if (valuesArray.length === 0) {
                    setMessage('No param id found');
                    return;
                }

                const maxIdElement = valuesArray.reduce((max, element) =>
                    element.ID > max.ID ? element : max, valuesArray[0]);
                setRawIdList(dataIDList);
                setIDParam(maxIdElement.ID.toString());
            } catch (error) {
                setMessage('Error processing param data: ' + error);
            }
        }
    }, [dataIDList, IsSuccessIDList, setMessage]);

    useEffect(() => {
        if (param?.MachineModel !== undefined)
            setMachineModel((param.MachineModel).toString());
        else if ( jsonParams?.modello !== undefined){
            setMachineModel( jsonParams.modello );
        }

    }, [jsonParams, param.MachineModel]);

    const handleOnChangeParam  = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        setIDParam(e.target.value);
        await queryClient.resetQueries({
                queryKey: ['getParamsBackups'],
                exact: true, // Ensure it matches the exact query key
            }
        ).catch((error) => {console.log(error)});
    }

    return {
        IDParam,
        rawIdList,
        param,
        jsonParams,
        isLoadingParam,
        listinoItems,
        handleOnChangeParam,
        machineModel
    };
}