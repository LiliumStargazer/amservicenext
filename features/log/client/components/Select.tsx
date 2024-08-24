import React, {useEffect, useState} from 'react';
import useStore from "@/app/store";

interface SelectBackupProps {}

const SelectBackup: React.FC<SelectBackupProps> = () => {
    const backupList = useStore(state => state.backupList);
    const backupSelected = useStore(state => state.backupSelected);
    const setBackupSelected = useStore(state => state.setBackupSelected);
    const [backupArray, setBackupArray] = useState<React.ReactNode[]>([<option defaultValue={"LastBkValid.zip"} key={"disabled"}>LastBkValid.zip</option>]);

    useEffect(() => {
        if (backupList.length > 0) {
            let backupArrayTemp: React.ReactNode[] = [];
            let backupListTemp: string[] = [];

            for (const element of backupList) {
                if (!element[1].includes("0 bytes"))
                    backupListTemp.push(element[0]);
            }

            backupListTemp.sort();
            backupListTemp.reverse();
            for (const element of backupListTemp)
                backupArrayTemp.push(<option key={element}>{element}</option>);
            setBackupArray(backupArrayTemp);
        } else {
            setBackupArray([]);
        }
    }, [backupList, backupSelected]);

    return (
        <select className="select select-md select-bordered max-w-min min-w-44 join-item" value={backupSelected} onChange={(event) => setBackupSelected(event.target.value)}>
            {backupArray}
        </select>
    );
}

export default SelectBackup;