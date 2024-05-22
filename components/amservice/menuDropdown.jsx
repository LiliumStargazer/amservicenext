import React, {useContext } from 'react';
import * as XLSX from 'xlsx';
import {Context} from "@/app/Context";
import {getFrigoBackup, getParamApi} from "@/lib/apiClient";

function MenuDropdown() {
    const { setPage, setMessage, gridApi, searchValue, setLoading, serialTyped, backupSelected, logDaMaster,
        setFrigoData, setParam} = useContext(Context);

    const handleClick = (value) => {

        if (value === "Master")
            setPage(value);

        if (value === "Frigo"){
           getLogFrigo().then((response) => {
                if (response){
                    setPage(value);
                }
           }).catch((error) => {
                setMessage(error);
           });
        }
        if (value === "Param"){
            getParam().then((response) => {
                if (response){
                    setPage(value);
                }
            }).catch((error) => {
                setMessage(error);
            });
        }
    };

    const handleExport = () => {
        if ( searchValue == ''){
            setMessage("Please type a search value");
            return;
        }else{
            const csvData = gridApi.getDataAsCsv();
            convertCsvToExcel(csvData, 'data');
        }
    }

    function convertCsvToExcel(csvData, fileName) {
        csvData = csvData.replace(/""/g, '');
        const csvArray = csvData.split('\n').map(row => row.split(','));
        for (const element of csvArray) {
            for (let j = 0; j < element.length; j++) {
                element[j] = element[j].replace(/"/g, '');
            }
        }
        const ws = XLSX.utils.aoa_to_sheet(csvArray);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, fileName);
        XLSX.writeFile(wb, fileName + '.xlsx');
    }

    async function getLogFrigo() {

        try{
            if (logDaMaster.length === 0){
                setMessage('Download backup Master first');
                return false;
            }
            const result = await getFrigoBackup(serialTyped, backupSelected)
            if (result.length === 0){
                setMessage('No data found');
                return false;
            }
            setFrigoData(result);
            return true;
        }catch (e) {
            setMessage(`${e}`);
            return false;
        }
    }

    async function getParam() {

        setLoading(true);
        try{
            if (logDaMaster.length === 0){
                setLoading(false);
                setMessage('Download backup Master first');
                return false;
            }
            const result = await getParamApi(serialTyped, backupSelected)
            if (result.length === 0){
                setLoading(false);
                setMessage('No data found');
                return false;
            }
            setParam(result);
            setLoading(false);
            return true;
        }catch (e) {
            setLoading(false);
            setMessage(`${e}`);
            return false;
        }
    }

    return (
        <div className="dropdown dropdown-hover dropdown-bottom dropdown-end">
            <div tabIndex={0} role="button" className="btn-rounded mt-2 ml-2 mr-2">
                    <svg
                        className="swap-off fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 512 512"
                    >
                        <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                    </svg>
            </div>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                    <p onClick={() => handleClick("Master")}>Master</p>
                </li>
                {/*<li>
                    <p onClick={() => handleClick("Frigo")}>Frigo</p>
                </li>*/}
                <li>
                    <p onClick={() => handleClick("Param")}>Param</p>
                </li>
                <li>
                    <p onClick={() => handleExport()}>Export To Excel</p>
                </li>
            </ul>
        </div>
    );
}

export default MenuDropdown;
