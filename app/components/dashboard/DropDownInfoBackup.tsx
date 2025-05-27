'use client'

import React, {useEffect, useState} from "react";
import {v4 as uuidv4} from 'uuid';
import {formatStringDateOrder} from "@/app/utils/utils";
import {backupListDetails} from "@/app/types/types";

interface InfoDropDownProps {
    disabled: boolean;
    backupList: string[];
    isLoadingBackupList: boolean;
}

const DropDownInfoBackup: React.FC <InfoDropDownProps>= ({disabled, backupList, isLoadingBackupList}) => {
    const [backupInfo, setBackupInfo] = useState<backupListDetails[]>([]);
    const classNameButton = ( disabled  ? "btn btn-disabled btn-circle btn-ghost btn-sm text-info" : "btn btn-circle btn-ghost btn-sm text-info" );

    useEffect(() => {
        if ( isLoadingBackupList ) return;

        if (backupList && backupList.length > 0) {
            const backupListTemp: backupListDetails[] = backupList.map((backupItem, ) => {
                const dashDateTimeFormat = backupItem[2]; // "24-04-2022 02:18:43"
                const [datePart, timePart] = dashDateTimeFormat.split(' ');
                const [day, month, year] = datePart.split('-');
                const [hour, minute, second] = timePart.split(':');
                const jsMonth = parseInt(month, 10) - 1;
                //this dateObs is needed to sort the backupListTemp

                const date = new Date(Number(year), jsMonth, Number(day), Number(hour), Number(minute), Number(second));

                return {
                    dashDateTimeFormat: date,
                    backup: {
                        slashDateTimeFormat: formatStringDateOrder ( dashDateTimeFormat ),
                        name: backupItem[0],
                        size: backupItem[1]
                    }
                };
            });
            backupListTemp.sort((a, b) => a.dashDateTimeFormat.getTime() - b.dashDateTimeFormat.getTime());
            backupListTemp.reverse();
            setBackupInfo(backupListTemp);
        }
    }, [backupList, isLoadingBackupList]);

    return (
        <div className="dropdown">
            <div tabIndex={0} role="button" className={classNameButton} >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        className="w-8 h-8 stroke-current">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                         d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            </div>
            <div
                tabIndex={0}
                className="dropdown-content card card-compact bg-info text-primary-content z-[1] w-100 p-2 shadow">
                <div className="card-body">
                    <h3 className="card-title">
                        Backups Info
                    </h3>
                    {backupInfo.map((item: backupListDetails) => {
                        return (
                            <div key={uuidv4()} className="flex whitespace-nowrap">
                                <p className="p-0.5"><strong>Date: </strong>{item.backup.slashDateTimeFormat}</p>
                                <p className="p-0.5" ><strong>Name: </strong>{item.backup.name}</p>
                                <p className="p-0.5" ><strong>Size: </strong>{item.backup.size}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default DropDownInfoBackup;
