import React, {useContext } from 'react';
import {Context} from "@/app/Context";
import {getFrigoBackup, getParam} from "@/lib/api";
import {convertCsvToExcel} from "@/lib/convertCsvToExcel";

function DropdownMenu() {
    const { setPage, setMessage, gridApi, searchValue, setLoading, serial, backupSelected, logDaMaster,
        setFrigoData, setParam} = useContext(Context);

    const handleClick = (value) => {

        switch (value) {
            case "Master":
                setPage(value);
                break;
            case "Frigo":
                getData(getFrigoBackup, setFrigoData)
                    .then(() => {
                        setPage(value);
                    })
                    .catch((error) => {
                        setMessage(error.message);
                    });
                break;
            case "Param":
                getData(getParam, setParam)
                    .then(() => {
                        setPage(value);
                    })
                    .catch((error) => {
                            // Handle any errors that occurred during fetch
                            setMessage(error.message);
                        });
                break;
        }
    };

    const handleExport = async () => {
        if (searchValue === '') {
            setMessage("Please search first");
        } else {
            try {
                const csvData = gridApi.getDataAsCsv();
                await convertCsvToExcel(csvData, 'data');
            } catch (error) {
                setMessage(error.message);
            }
        }
    }

    async function getData(fetchFunction, successCallback){
        try{
            if (logDaMaster.length === 0){
                setMessage('Download backup Master first');
                return false;
            }
            const result = await fetchFunction(serial, backupSelected);

            if (result.length === 0){
                setMessage('No data found');
                return false;
            }
            else {
                successCallback(result);
            }
        } catch (e){
            setMessage(`${e}`)
        return false;
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div className="dropdown dropdown-hover dropdown-bottom dropdown-end">
            <div role="button" className="btn-rounded mt-2 ml-2 mr-2">
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
            <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                    <button onClick={() => handleClick("Master")}>Master</button>
                </li>
                <li>
                    <button onClick={() => handleClick("Frigo")}>Frigo</button>
                </li>
                <li>
                    <button onClick={() => handleClick("Param")}>Param</button>
                </li>
                <li>
                    <button onClick={() => handleExport()}>Export To Excel</button>
                </li>
            </ul>
        </div>
    );
}

export default DropdownMenu;
