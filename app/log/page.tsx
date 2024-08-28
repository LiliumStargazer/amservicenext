'use client'

import React, { useEffect } from "react";
import {  usePathname } from "next/navigation";
import loading_lottie from "@/public/loading_lottie.json";
import no_data_lottie from "@/public/no_data_lottie.json";
import useStore from "@/app/store";
import SelectBackup from "@/features/log/client/components/Select";
import InfoDropDown from "@/features/log/client/components/InfoDropDown";
import IconSoftware from "@/features/log/client/components/IconSoftware";
import Badge from "@/features/log/client/components/Badge";
import ButtonNav from "@/features/shared/client/components/ButtonNav";
import InputSearch from "@/features/log/client/components/InputSearch";
import DropDownMenu from "@/features/log/client/components/DropDownMenu";
import Alert from "@/features/log/client/components/Alert";
import AnimationLottie from "@/features/shared/client/components/AnimationLottie";
import AggridFrigo from "@/features/log/client/components/AgGridFridge";
import AgGridMaster from "@/features/log/client/components/AgGridMaster";
import Dialog from "@/features/log/client/components/Dialog";
import Chart from "@/features/log/client/components/Chart";
import Param from "@/features/log/client/components/Param";
import Button from "@/features/log/client/components/Button";
import Input from "@/features/log/client/components/Input";
import Pagination from "@/features/log/client/components/Pagination";

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

    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="navbar-start space-x-2 ">
                    <Input />
                    <Button />
                    {table === "master" && backupList.length > 0 && <SelectBackup />}
                    {table === "master" && backupList.length > 0 && <InfoDropDown />}
                    {storedSerial && <Badge />}
                    <IconSoftware />
                    {table === "frigo" && <Pagination />}
                </div>
                <div className="navbar-center">
                    {table === "master" && logDaMaster.length > 0 && <InputSearch />}
                </div>
                <div className="navbar-end space-x-2 ">
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
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Log;