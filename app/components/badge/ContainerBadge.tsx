'use client'
import React, { useEffect } from 'react';
import { Status } from "@/app/enum/enum";
import IconSoftware from '@/app/components/badge/IconSoftware';
import { useGetSoftwareTypeQuery, useGetVteDataQuery } from '@/app/hooks/useQueries';
import Badge from '@/app/components/badge/Badge';
import BadgeLink from '@/app/components/badge/BadgeLink';

interface ContainerBadgeProps {
    status: Status;
    setMessage: (message: string) => void;
    setStatus: (status: Status) => void;
    message: string;
    serial: string;
    backup: string;
}

const ContainerBadge: React.FC<ContainerBadgeProps> = ({status, setStatus, setMessage, message, serial, backup}) => {
    const [customerName, setCustomerName] = React.useState<string>('');
    const [VTElink, setVTElink] = React.useState<string>('');
    const { data: softwareType, isLoading: softwareTypeIsLoading } = useGetSoftwareTypeQuery(serial, backup);
    const { data: vteData, isLoading: vteIsLoading } = useGetVteDataQuery(serial, backup);

    useEffect(() => {

        if (softwareTypeIsLoading || vteIsLoading) 
            setStatus(Status.Loading);
    }, [, softwareTypeIsLoading, setStatus, setMessage, , vteIsLoading]);


    useEffect(() => {
        if (vteData){
            const response = vteData as { AccountName: string , AssetUrl: string};
            setCustomerName(response.AccountName);
            setVTElink(response.AssetUrl); 
        }

    }, [vteData, setCustomerName, setVTElink]);

    useEffect(() => {
        if (serial.length !== 5){
            setCustomerName('');
            setVTElink('');
        }
    }, [serial, setCustomerName, setVTElink]);

    return (
        <div className="mb-2">
            <div role="alert" className="alert flex ml-2 mr-2">
            <span className="h-6 flex flex-wrap gap-2 items-center">
                {status === Status.Loading && 
                <div className="badge badge-warning flex items-center gap-1">
                    <span className="loading loading-ring loading-lg"></span>
                    <span>Loading...</span>
                </div>
                }
                {status === Status.Error && 
                <div className="badge badge-error flex items-center gap-1">
                    <svg className="size-[1em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="currentColor"><rect x="1.972" y="11" width="20.056" height="2" transform="translate(-4.971 12) rotate(-45)" fill="currentColor" strokeWidth={0}></rect><path d="m12,23c-6.065,0-11-4.935-11-11S5.935,1,12,1s11,4.935,11,11-4.935,11-11,11Zm0-20C7.038,3,3,7.037,3,12s4.038,9,9,9,9-4.037,9-9S16.962,3,12,3Z" strokeWidth={0} fill="currentColor"></path></g></svg>
                    {message}
                </div>
                }
                { status === Status.Success &&
                <div className="badge badge-success flex items-center gap-1">
                     <svg className="size-[1em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="currentColor" strokeLinejoin="miter" strokeLinecap="butt"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="2"></circle><polyline points="7 13 10 16 17 8" fill="none" stroke="currentColor" strokeLinecap="square" stroke-miterlimit="10" strokeWidth="2"></polyline></g></svg>
                    Success
                </div>
                }
                {
                typeof softwareType === 'string' && (
                    <div className="flex items-center">
                    <IconSoftware softwareType={softwareType} />
                    </div>
                )
                }
                {
                serial.length === 5 && backup && (
                    <div className="flex items-center">
                    <Badge text={serial}/>
                    </div>
                ) 
                }
                {
                customerName && VTElink && (
                    <div className="flex items-center">
                    <BadgeLink text={customerName} link={VTElink}/>
                    </div>
                )
                }
            </span>
            </div>
        </div>
    );
};

export default ContainerBadge;