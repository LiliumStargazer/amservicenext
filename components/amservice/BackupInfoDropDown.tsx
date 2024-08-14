import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import useStore from "@/app/store";

const BackupInfoDropDown: React.FC = () => {
    const [backupInfo, setBackupInfo] = useState<React.ReactNode[]>([]);
    const backupList = useStore(state => state.backupList);

    useEffect(() => {
        if (backupList.length > 0) {
            let backupListTemp = backupList.map((backupItem: any) => {
                let dateString = backupItem[2]; // "24-04-2022 02:18:43"
                let [datePart, timePart] = dateString.split(' ');
                const [day, month, year] = datePart.split('-');
                const [hour, minute, second] = timePart.split(':');
                const jsMonth = parseInt(month, 10) - 1;
                const dateObj = new Date(year, jsMonth, day, hour, minute, second);
                return {
                    date: dateObj,
                    content: (
                        <p className="text-xs whitespace-nowrap" key={uuidv4()}>
                            {backupItem[2]} | {backupItem[0]} | {backupItem[1]}
                        </p>
                    ),
                };
            });
            backupListTemp.sort((a, b) => a.date.getTime() - b.date.getTime());
            backupListTemp.reverse();
            const backupInfoTemp = backupListTemp.map((item) => item.content);
            setBackupInfo(backupInfoTemp);
        }
    }, [backupList]);

    return (
        <div className="dropdown dropdown-end">
            <label id="dropdownLabel" htmlFor="dropdownControl" className="btn btn-circle btn-ghost btn-sm text-info">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-8 h-8 stroke-current">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            </label>
            <input type="checkbox" id="dropdownControl" className="hidden" />
            <div className="card compact dropdown-content z-[1] bg-base-100 rounded-box w-90">
                <div className="card-body">
                    <h2 className="card-title">Time | Name | Size</h2>
                    {backupInfo}
                </div>
            </div>
        </div>
    );
}

export default BackupInfoDropDown;
