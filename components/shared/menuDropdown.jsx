import React, {useContext } from 'react';

import {getLogFrigo} from "../log/tableFrigo/getLogFrigo";
import {getParam} from "../log/param/getParam";
import * as XLSX from 'xlsx';
import {Context} from "@/app/Context";


function MenuDropdown() {
    const { setPage, setMessage, gridApi, searchValue} = useContext(Context);
    const context = useContext(Context);

    const handleClick = (value) => {
        if (value === "Frigo"){
           getLogFrigo(context).then((response) => {
                if (response){
                    setPage(value);
                }
           }).catch((error) => {
                console.log(error);
                setMessage(error);
           });
        }
        if (value === "Param"){
            getParam(context).then((response) => {
                if (response){
                    setPage(value);
                }
            }).catch((error) => {
                console.log(error);
                setMessage(error);
            });
        }

        else
            setPage(value);
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
                <li>
                    <p onClick={() => handleClick("Frigo")}>Frigo</p>
                </li>
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
