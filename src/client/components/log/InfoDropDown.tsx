import React, {useEffect, useState} from "react";
import {v4 as uuidv4} from 'uuid';
import useStore from "@/app/store";
import {formatStringDateOrder} from "@/src/client/utils/utils";

const InfoDropDown: React.FC = () => {
    const table = useStore(state => state.table);
    const [backupInfo, setBackupInfo] = useState<any>([]);
    const backupList = useStore(state => state.backupList);
    const loadingGlobal = useStore(state => state.loadingGlobal);
    const [classNameButton, setClassNameButton] = useState(loadingGlobal ? "btn btn-disabled btn-circle btn-ghost btn-sm text-info" : "btn btn-circle btn-ghost btn-sm text-info");


    useEffect(() => {
        if (loadingGlobal) {
            setClassNameButton("btn btn-disabled btn-circle btn-ghost btn-sm text-info");
        } else {
            setClassNameButton("btn btn-circle btn-ghost btn-sm text-info");
        }
    }, [loadingGlobal]);


    useEffect(() => {
        if (backupList.length > 0) {
            let backupListTemp = backupList.map((backupItem: any) => {
                let dateString = backupItem[2]; // "24-04-2022 02:18:43"
                let [datePart, timePart] = dateString.split(' ');
                const [day, month, year] = datePart.split('-');
                const [hour, minute, second] = timePart.split(':');
                const jsMonth = parseInt(month, 10) - 1;
                //this dateObs is needed to sort the backupListTemp
                const dateObj = new Date(year, jsMonth, day, hour, minute, second);

                return {
                    date: dateObj,
                    backup: {
                        date: formatStringDateOrder ( backupItem[2]),
                        name: backupItem[0],
                        size: backupItem[1]
                    }
                };
            });
            backupListTemp.sort((a, b) => a.date.getTime() - b.date.getTime());
            backupListTemp.reverse();
            setBackupInfo(backupListTemp);
        }
    }, [backupList]);

    if (table !== "master") return null;

    return (
        <div className="dropdown" >
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
                    {backupInfo.map((item: any) => {
                        return (
                            <div key={uuidv4()} className="flex whitespace-nowrap">
                                <p className="p-0.5"><strong>Date: </strong>{item.backup.date}</p>
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

export default InfoDropDown;
