'use client'

import React, { useEffect } from "react";
import {  usePathname } from "next/navigation";
import loading_lottie from "@/public/loading_lottie.json";
import no_data_lottie from "@/public/no_data_lottie.json";
import useStore from "@/app/store";
import SelectBackup from "@/features/log/client/components/SelectBackup";
import InfoDropDown from "@/features/log/client/components/InfoDropDown";
import IconSoftware from "@/features/log/client/components/IconSoftware";
import Badge from "@/features/log/client/components/Badge";
import ButtonNav from "@/features/shared/client/components/ButtonNav";
import InputSearch from "@/features/log/client/components/InputSearch";
import DropDownMenu from "@/features/log/client/components/DropDownMenu";
import Alert from "@/features/log/client/components/Alert";
import AnimationLottie from "@/features/shared/client/components/AnimationLottie";
import AggridFrigo from "@/features/log/client/components/tables/AgGridFridge";
import AgGridMaster from "@/features/log/client/components/tables/AgGridMaster";
import Dialog from "@/features/log/client/components/Dialog";
import Chart from "@/features/log/client/components/Chart";
import Param from "@/features/log/client/components/Param";
import GetButton from "@/features/log/client/components/buttons/GetButton";
import Input from "@/features/log/client/components/Input";
import Pagination from "@/features/log/client/components/Pagination";
import SelectRange from "@/features/log/client/components/SelectRange";
import SelectParam from "@/features/log/client/components/SelectParam";
import AgGridLisTransaction from "@/features/log/client/components/tables/AgGridLisTransaction";
import AgGridFingersTransaction from "@/features/log/client/components/tables/AgGridFingersTransaction";
import FingerButton from "@/features/log/client/components/buttons/FingerButton";
import ParamButton from "@/features/log/client/components/buttons/ParamButton";
import FridgeButton from "@/features/log/client/components/buttons/FridgeButton";
import ExcelButton from "@/features/log/client/components/buttons/ExcelButton";
import LisButton from "@/features/log/client/components/LisButton";
import MasterButton from "@/features/log/client/components/buttons/MasterButton";

const Log: React.FC = () => {

    const table = useStore(state => state.table);
    const logDaMaster = useStore(state => state.logDaMaster);
    const loading = useStore(state => state.loading);
    const storedSerial = useStore(state => state.storedSerial);
    const backupList = useStore(state => state.backupList);
    const setMessage = useStore(state => state.setMessage);
    const message = useStore(state => state.message);
    const pathname = usePathname();

    useEffect(() => {

        if (!loading && logDaMaster.length === 0 && message === "" && pathname === "/log") {
            setMessage("Download the backup to see the data.");
        }
    }, [loading, logDaMaster, message, pathname]);

    useEffect(() => {

    }, [loading]);

    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="navbar-start space-x-2 ">
                    <Input />
                    <GetButton />
                    {table === "master" && backupList.length > 0 && <SelectBackup />}
                    {table === "master" && backupList.length > 0 && <InfoDropDown />}
                    {storedSerial && <Badge />}
                    <IconSoftware />
                    {table === "frigo" && <SelectRange />}
                    {table === "frigo" && <Pagination />}
                    {table === "param"  && <SelectParam />}
                </div>
                    <div className="navbar-center">
                        {table === "master" && logDaMaster.length > 0 && <InputSearch />}
                    </div>
                <div>
                </div>
                <div className="navbar-end space-x-4 ">
                    <MasterButton />
                    <ParamButton />
                    <FridgeButton />
                    <FingerButton/>
                    <ExcelButton />
                    <LisButton />
                    <ButtonNav />
                    {pathname === "/log" && logDaMaster.length > 0 && <DropDownMenu />}
                </div>
            </div>
            <Alert />
            <div>
                <div>
                    {loading && <AnimationLottie file={loading_lottie} />}
                    {!loading && logDaMaster.length === 0 && <AnimationLottie file={no_data_lottie} />}
                    <Dialog />
                    {!loading && table === "master" && <AgGridMaster />}
                    <div className="mt-5">
                        {!loading && table === "frigo" && <Chart /> }
                        {!loading && table === "frigo" && <AggridFrigo />}
                        {!loading && table === "param" && <Param />}
                        {!loading && table === "listransaction" && < AgGridLisTransaction />}
                        {!loading && table === "fingertransaction" && <AgGridFingersTransaction />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Log;