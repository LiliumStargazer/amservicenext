import React, {useEffect, useState, useContext} from 'react';
import {Context} from "@/app/Context";

function SelectBackup() {

    const { backupList , backupSelected, setBackupSelected} = useContext(Context);
    const [backupArray, setBackupArray] = useState([<option defaultValue={"LastBkValid.zip"} key={"disabled"}>LastBkValid.zip</option>]);

    useEffect(() => {
        if (backupList.length > 0) {
            let backupArrayTemp = [];
            /** @type {Array<string>}  */
            let backupListTemp = [];

            for (const element of backupList){
                if ( !element[1].includes("0 bytes"))
                    backupListTemp.push(element[0] );
            }

            backupListTemp.sort();
            backupListTemp.reverse();
            for (const element of backupListTemp)
                    backupArrayTemp.push(<option key={element}>{element}</option>);
            setBackupArray(backupArrayTemp);
        }
        else {
            setBackupArray([]);
        }

    }, [backupList, backupSelected]);

    return (
        <select className="select select-md select-bordered max-w-min min-w-44 join-item" value={backupSelected} onChange={(event) => setBackupSelected(event.target.value)} >
            {backupArray}
        </select>
    );
}
export default SelectBackup;
