import React, { useEffect, useState } from 'react';
import { Status } from "@/app/enum/enum";
import CollapseParam from '@/app/components/param/CollapseParam';
import SelectParam from '@/app/components/param/SelectParam';
import { useGetParamsIdsQuery } from '@/app/hooks/useQueries';
import {Param,jsonParams} from "@/app/types/types";
import { useGetJsonParamMutation, useGetListinoFullMutation, useGetParamsMutation } from '@/app/hooks/useMutations';
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
    const { trigger: triggerJsonParams, error: errorJsonParams, isMutating: isLoadingJson, data: jsonParams } = useGetJsonParamMutation();
    const { trigger: triggerListinoItems, error: errorListinoItems, isMutating: isLoadingListino, data: listinoItems } = useGetListinoFullMutation();

    const handleOnChangeParam  = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        setID(e.target.value);
        setStatus(Status.Loading);
    }

    useEffect(() => {
        if (serial && backup && id) {
            setStatus(Status.Loading);
            (async () => {
                try {
                    await triggerParams({ serial, backup, id });
                    await triggerJsonParams({ serial });
                    await triggerListinoItems({ serial }); 
                } catch (error) {
                    setStatus(Status.Error);
                    setMessage(`Error fetching parameters: ${error instanceof Error ? error.message : String(error)}`);
                }
            })();
        }
    }, [serial, backup, id, triggerParams, setStatus, triggerJsonParams, triggerListinoItems, setMessage]);

    useEffect(() => {
        if ( errorParamIds || errorParams || errorJsonParams || errorListinoItems)
            setStatus(Status.Error);
        if (errorParamIds){
            setMessage(`Error fetching parameter IDs: ${errorParamIds.message}`);
            return;
        }
        if (errorParams){
            setMessage(`Error fetching parameters: ${errorParams.message}`);
            return;
        }   
        if (errorJsonParams){
            setMessage(`Error fetching JSON parameters: ${errorJsonParams.message}`);
            return;
        }     
        if (errorListinoItems){
            setMessage(`Error fetching listino items: ${errorListinoItems.message}`);
            return;
        }
            
        if (isLoadingIDS || isLoadingParams || isLoadingJson || isLoadingListino)
            setStatus(Status.Loading);
        else
            setStatus(Status.Success);

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
            {(isLoadingParams || isLoadingJson || isLoadingListino) ? null : (
            params && listinoItems && jsonParams && (
                <CollapseParam
                param={params as Param}
                listinoItems={(listinoItems as Listino).items}
                jsonParams={jsonParams as jsonParams}
                />
            )
            )}
        </>
    );
};

export default ContainerParam;
