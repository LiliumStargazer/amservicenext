'use client'

import React, { useEffect } from "react";
import useStore from "@/app/store";
import SelectBackup from "@/src/client/components/log/SelectBackup";
import InfoDropDown from "@/src/client/components/log/InfoDropDown";
import IconSoftware from "@/src/client/components/log/IconSoftware";
import Badge from "@/src/client/components/log/Badge";
import ButtonNav from "@/src/client/components/shared/ButtonNav";
import SearchEvents from "@/src/client/components/log/SearchEvents";
import Alert from "@/src/client/components/log/Alert";
import AgGridFridge from "@/src/client/components/log/tables/AgGridFridge";
import Dialog from "@/src/client/components/log/Dialog";
import Chart from "@/src/client/components/log/Chart";
import GetButton from "@/src/client/components/log/buttons/GetButton";
import Input from "@/src/client/components/log/Input";
import SelectFridge from "@/src/client/components/log/buttons/SelectFridge";
import SelectRange from "@/src/client/components/log/SelectRange";
import SelectParam from "@/src/client/components/log/SelectParam";
import AgGridLisTransaction from "@/src/client/components/log/tables/AgGridLisTransaction";
import AgGridFingersTransaction from "@/src/client/components/log/tables/AgGridFingersTransaction";
import FingerButton from "@/src/client/components/log/buttons/FingerButton";
import ParamButton from "@/src/client/components/log/buttons/ParamButton";
import FridgeButton from "@/src/client/components/log/buttons/FridgeButton";
import ExcelButton from "@/src/client/components/log/buttons/ExcelButton";
import LisButton from "@/src/client/components/log/buttons/LisButton";
import MasterButton from "@/src/client/components/log/buttons/MasterButton";
import NoDataAnimation from "@/src/client/components/log/NoDataAnimation";
import AgGridMasterLogReactQuery from "@/src/client/components/log/tables/AgGridMasterLogReactQuery";
import Datepicker from "@/src/client/components/log/Datepicker";
import SwapChartTable from "@/src/client/components/log/buttons/SwapChartTable";
import ParamsAccordition from "@/src/client/components/log/ParamsAccordition";

const Log: React.FC = () => {

    const setTable = useStore(state => state.setTable);
    const table = useStore(state => state.table);

    useEffect(() => {
        if (table !== "master")
            setTable("no_table");
    }, []);

    return (
        <div className={`h-screen ${ table != "param" ? "overflow-hidden" : ""}`}>
            <div className="navbar bg-base-100">
                <div className="navbar-start space-x-2 ">
                    <Input/>
                    <GetButton/>
                    <SelectBackup/>
                    <InfoDropDown/>
                    <Datepicker/>
                    <SelectRange/>
                    <SelectFridge/>
                    <SwapChartTable/>
                    <SelectParam/>
                </div>
                <div className="navbar-center space-x-4">
                    <SearchEvents/>
                </div>

                <div>
                </div>
                <div className="navbar-end space-x-4 ">
                    <IconSoftware/>
                    <Badge/>
                    <MasterButton/>
                    <ParamButton/>
                    <FridgeButton/>
                    <FingerButton/>
                    <LisButton/>
                    <ExcelButton/>
                    <ButtonNav/>
                </div>
            </div>
            <Alert/>
            <div className="h-full flex flex-col space-y-4">
                <Dialog/>
                <NoDataAnimation/>
                <AgGridMasterLogReactQuery/>
                <Chart/>
                <AgGridFridge/>
                <AgGridLisTransaction/>
                <AgGridFingersTransaction/>
                <ParamsAccordition/>
            </div>
        </div>
    );
}

export default Log;