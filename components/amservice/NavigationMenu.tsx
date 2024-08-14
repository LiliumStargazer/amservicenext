import React from 'react';
import { readFrigoTable, getParam } from "@/lib/api";
import { handleExport } from "@/lib/csvToExcelManager";
import useStore from "@/app/store";

type FetchFunction = (storedSerial: string, backupSelected: string) => Promise<any[]>;

interface FetchParams {
    fetchFunction: FetchFunction;
    storedSerial: string;
    backupSelected: string;
    logDaMaster: any[];
}

interface CallbackParams {
    setMessage: (message: string) => void;
    successCallback: (data: any[]) => void;
    setPage: (page: string) => void;
    setLoading: (loading: boolean) => void;
}

function handleMenuClick(
    fetchParams: FetchParams,
    callbackParams: CallbackParams,
    value: string
): void {
    const { fetchFunction, storedSerial, backupSelected, logDaMaster } = fetchParams;
    const { setMessage, successCallback, setPage, setLoading } = callbackParams;

    if (logDaMaster.length === 0) {
        setMessage('Download backup Master first');
        return;
    }

    setLoading(true);
    successCallback([]);

    fetchFunction(storedSerial, backupSelected)
        .then((result) => {
            if (result.length === 0) {
                setMessage('No data found');
            } else {
                successCallback(result);
                setPage(value);
            }
        })
        .catch((error) => {
            setMessage(error.message);
        })
        .finally(() => {
            setLoading(false);
        });
}

const NavigationMenu: React.FC = () => {
    const setPage = useStore(state => state.setPage);
    const setMessage = useStore(state => state.setMessage);
    const gridApi = useStore(state => state.gridApi);
    const searchValue = useStore(state => state.searchValue);
    const storedSerial = useStore(state => state.storedSerial) ?? '';
    const backupSelected = useStore(state => state.backupSelected);
    const logDaMaster = useStore(state => state.logDaMaster);
    const setFrigoData = useStore(state => state.setFrigoData);
    const setParam = useStore(state => state.setParam);
    const setLoading = useStore(state => state.setLoading);


    const fetchParams: FetchParams = {
        fetchFunction: readFrigoTable,
        storedSerial,
        backupSelected,
        logDaMaster
    };

    const callbackParams: CallbackParams = {
        setMessage,
        successCallback: setFrigoData,
        setPage,
        setLoading
    };

    return (
        <div className="dropdown dropdown-hover dropdown-bottom dropdown-end">
            <button className="btn-rounded mt-2 ml-2 mr-2">
                <svg
                    className="swap-off fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 512 512"
                >
                    <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z"/>
                </svg>
            </button>
            <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                    <button onClick={() => setPage("Master")}>Master</button>
                </li>
                <li>
                    <button onClick={() => handleMenuClick(fetchParams, callbackParams, "Frigo")}>Frigo</button>
                </li>
                <li>
                    <button onClick={() => handleMenuClick({...fetchParams, fetchFunction: getParam}, {
                        ...callbackParams,
                        successCallback: setParam
                    }, "Param")}>Param
                    </button>
                </li>
                <li>
                    <button onClick={async () => {
                        if (gridApi) {
                            try {
                                await handleExport(gridApi, searchValue, setMessage, storedSerial, backupSelected, logDaMaster);
                            } catch (error) {
                                setMessage((error as Error).message);
                            }
                        } else {
                            setMessage('Grid API is not available');
                        }
                    }}>Export To Excel
                    </button>
                </li>
            </ul>
        </div>
    );
}

export default NavigationMenu;