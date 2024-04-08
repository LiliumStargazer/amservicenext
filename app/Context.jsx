'use client'
import React, {createContext, useState, useMemo} from "react";
const Context = createContext();

const ContextApiProvider = ({children}) =>{
    const [serialTyped, setSerialTyped] =useState('');
    const [softwareType, setSoftwareType] = useState('');
    const [backupList, setBackupList] = useState('');
    const [backupSelected, setBackupSelected] = useState('');
    const [logDaMaster, setLogDaMaster] = useState([]);
    const [gridApi, setGridApi] = useState(null);
    const [searchValue, setSearchValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [timeLine, setTimeLine] = useState([]);
    const [storedSerial, setStoredSerial] = useState(null);
    const [alertMessage, setAlertMessage] = useState('');
    const [frigoData, setFrigoData] = useState([]);
    const [frigoNumber, setFrigoNumber] = useState(0);
    const [activeTab, setActiveTab] = useState(1);
    const [dataFrigoCharts, setDataFrigoCharts] = useState([]);
    const [isChart, setIsChart] = useState(false);
    const [page, setPage] = useState('Master');
    const [frigoTables, setFrigoTables] = useState({});
    const [frigoSelected, setFrigoSelected ] = useState(0);
    const [param, setParam] = useState({});

    const contextValue = useMemo(() => ({
        gridApi, setGridApi,
        frigoNumber, setFrigoNumber,
        frigoTables, setFrigoTables,
        page, setPage,
        isChart, setIsChart,
        dataFrigoCharts, setDataFrigoCharts,
        activeTab, setActiveTab,
        frigoSelected, setFrigoSelected,
        frigoData, setFrigoData,
        alertMessage, setAlertMessage,
        storedSerial, setStoredSerial,
        timeLine, setTimeLine,
        message, setMessage,
        loading, setLoading,
        searchValue, setSearchValue,
        softwareType, setSoftwareType,
        serialTyped, setSerialTyped,
        backupList, setBackupList,
        backupSelected, setBackupSelected,
        logDaMaster, setLogDaMaster,
        param, setParam,
    }), [
        frigoNumber, frigoTables, page, isChart, dataFrigoCharts,
        activeTab, frigoSelected, frigoData, alertMessage,
        storedSerial, timeLine, message, loading, searchValue,
        softwareType, serialTyped, backupList, backupSelected,
        logDaMaster, gridApi
    ]);

    return (
        <Context.Provider
            value = {contextValue}
            >
            {children}
        </Context.Provider>
    )
}
export { Context, ContextApiProvider, };