'use client'
import React from 'react';
import { Status } from "@/app/enum/enum";

interface ContainerBadgeProps {
    status: Status;
    setStatus: React.Dispatch<React.SetStateAction<Status>>;
    setMessage: React.Dispatch<React.SetStateAction<string>>;
    message: string;
}

const ContainerBadge: React.FC<ContainerBadgeProps> = ({status, setStatus, setMessage, message}) => {


    return (
        <div className="mb-2">
            <div role="alert" className="alert flex space-x-2 ml-2 mr-2">
                <span className="h-6">
                    {status === Status.Loading && 
                        <div className="badge badge-info">
                            <span className="loading loading-ring loading-lg"></span>
                            <span>Loading...</span>
                        </div>
                    }
                    {status === Status.Error && 
                        <div className="badge badge-error">
                            <svg className="size-[1em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="currentColor"><rect x="1.972" y="11" width="20.056" height="2" transform="translate(-4.971 12) rotate(-45)" fill="currentColor" strokeWidth={0}></rect><path d="m12,23c-6.065,0-11-4.935-11-11S5.935,1,12,1s11,4.935,11,11-4.935,11-11,11Zm0-20C7.038,3,3,7.037,3,12s4.038,9,9,9,9-4.037,9-9S16.962,3,12,3Z" strokeWidth={0} fill="currentColor"></path></g></svg>
                            Error {message}
                        </div>
                    }
                    { status === Status.Success &&
                    <div className="badge badge-success">
                        <svg className="size-[1em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="currentColor" strokeLinejoin="miter" strokeLinecap="butt"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeLinecap="square" stroke-miterlimit="10" strokeWidth="2"></circle><polyline points="7 13 10 16 17 8" fill="none" stroke="currentColor" strokeLinecap="square" stroke-miterlimit="10" strokeWidth="2"></polyline></g></svg>
                        Success
                        </div>
                    }

                </span>
            </div>
        </div>
    );
};

export default ContainerBadge;