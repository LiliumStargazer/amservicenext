import React from 'react';
import { Status } from "@/app/enum/enum";
import { param } from 'drizzle-orm';
import ParamSections from './ParamSections';
import SelectParam from './SelectParam';

interface ContainerParamProps {
    serial: string;
    backup: boolean;
    setMessage: (message: string) => void;
    setStatus: (status: Status) => void;
}

const ContainerParam: React.FC<ContainerParamProps> = ({ serial, backup, setMessage, setStatus }) => {
    const handleAction = () => {
        // Example logic
        setMessage(`Processing serial: ${serial}`);
        setStatus('In Progress');
        // Perform backup or other actions here
    };

    return (
        <>
            <div className=" flex justify-center">
                <SelectParam
                    loading={isLoadingParam}
                    IDParam={IDParam}
                    handleOnChangeParam={handleOnChangeParam}
                    rawIdList={rawIdList}
                />
            </div>
            <ParamSections
                loading={isLoadingParam}
                param={param}
                listinoItems={listinoItems}
                jsonParams={jsonParams}
            />
        </>
    );
};

export default ContainerParam;
