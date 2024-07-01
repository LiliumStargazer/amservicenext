import React, {useContext } from 'react';
import {Context} from "@/app/Context";
import {readFrigoTable, getParam} from "@/lib/api";
import {handleExport, handleMenuClick} from "@/lib/dropdown-menu-helper";

function DropdownMenu() {
    const { setPage, setMessage, gridApi, searchValue, storedSerial, backupSelected, logDaMaster,
        setFrigoData, setParam, setLoading} = useContext(Context);

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
                    <button onClick={() => setPage("Master")}>Master</button>
                </li>
                <li>
                    <button onClick={()=> handleMenuClick(readFrigoTable, storedSerial, backupSelected, setFrigoData, setPage, "Frigo", setMessage, logDaMaster, setLoading) }>Frigo</button>
                </li>
                <li>
                    <button onClick={() => handleMenuClick(getParam, storedSerial, backupSelected, setParam, setPage, "Param", setMessage, logDaMaster, setLoading) }>Param</button>
                </li>
                <li>
                    <button onClick={() => handleExport(gridApi, searchValue, setMessage, storedSerial, backupSelected, logDaMaster)}>Export To Excel</button>
                </li>
            </ul>
        </div>
    );
}

export default DropdownMenu;
