import React, { useEffect, useState } from 'react';
import { Status } from "@/app/enum/enum";
import ParamSections from './ParamSections';
import SelectParam from './SelectParam';
import { useGetParamsIdsQuery, useGetJsonParamQuery, useGetListinoFullQuery } from '@/app/hooks/useQueries';
import {
    Param,
    jsonParams,
} from "@/app/types/types";
import { useGetParamsMutation } from '@/app/hooks/useMutations';
interface ContainerParamProps {
    serial: string;
    backup: string;
    setMessage: (message: string) => void;
    setStatus: (status: Status) => void;
}

interface Listino {
    prodV: string;
    items: Array<{ code: number, prodName: string }>;
}

const ContainerParam: React.FC<ContainerParamProps> = ({ serial, backup, setMessage, setStatus }) => {
    const [id, setID] = useState<string>('');
    const { data: paramIds, error: errorParamIds, isLoading: isLoadingIDS } = useGetParamsIdsQuery(serial, backup);
    const { trigger: triggerParams, error: errorParams, isMutating: isLoadingParams, data: params } = useGetParamsMutation();
    const { data: jsonParams, error: errorJsonParams, isLoading: isLoadingJson } = useGetJsonParamQuery(serial);
    const { data: listinoItems, error: errorListinoItems, isLoading: isLoadingListino } = useGetListinoFullQuery(serial);


    const handleOnChangeParam  = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        setID(e.target.value);
    }

    useEffect(() => {
        const fetchParam = async () => {
            if (serial && backup && id) {
                await triggerParams({ serial, backup, id });
            }
        }

        if (serial && backup && id){
            setStatus(Status.Loading);
            fetchParam();
        }

    }, [serial, backup, id, triggerParams, setStatus]);

    useEffect(() => {
        if ( errorParamIds || errorParams || errorJsonParams || errorListinoItems) 
            setStatus(Status.Error);
        if (errorParamIds) 
            setMessage(`Error fetching parameter IDs: ${errorParamIds.message}`);
        if (errorParams) 
            setMessage(`Error fetching parameters: ${errorParams.message}`);
        if (errorJsonParams) 
            setMessage(`Error fetching JSON parameters: ${errorJsonParams.message}`);
        if (errorListinoItems) 
            setMessage(`Error fetching listino items: ${errorListinoItems.message}`);
        if (isLoadingIDS || isLoadingParams || isLoadingJson || isLoadingListino)
            setStatus(Status.Loading);
        else
            setStatus(Status.None);

    }, [errorParamIds, errorParams, errorJsonParams, errorListinoItems, setMessage, setStatus, isLoadingIDS, isLoadingParams, isLoadingJson, isLoadingListino]);

    return (
        <>
            <div className=" flex justify-center">
                <SelectParam
                    loading={isLoadingIDS}
                    IDParam={id}
                    handleOnChangeParam={handleOnChangeParam}
                    rawIdList={paramIds as { ID: string; DataOra: string }[]}
                    setIDParam={setID}
                />
            </div>
            {params && listinoItems && (
                    <ParamSections
                        loading={isLoadingParams || isLoadingJson || isLoadingListino}
                        param={params as Param}
                        listinoItems={(listinoItems as Listino).items}
                        jsonParams={jsonParams as jsonParams}
                    />
                )
            }
        </>
    );
};

export default ContainerParam;
