'use client'

import React, { useEffect, ChangeEvent } from "react";
import { useRouter, usePathname } from "next/navigation";

import useDownloadBackup from "@/features/log/client/hooks/useDownloadBackup";
import loading_lottie from "@/public/loading_lottie.json";
import no_data_lottie from "@/public/no_data_lottie.json";
import useStore from "@/app/store";
import InputTextGeneric from "@/features/shared/client/components/InputTextGeneric";
import SelectBackup from "@/features/log/client/components/Select";
import InfoDropDown from "@/features/log/client/components/InfoDropDown";
import ButtonGeneric from "@/features/shared/client/components/ButtonGeneric";
import IconSoftware from "@/features/log/client/components/IconSoftware";
import Badge from "@/features/log/client/components/Badge";
import ButtonNav from "@/features/shared/client/components/ButtonNav";
import ButtonsRadioGroup from "@/features/log/client/components/ButtonsRadioGroup";
import InputSearch from "@/features/log/client/components/InputSearch";
import DropDownMenu from "@/features/log/client/components/DropDownMenu";
import Alert from "@/features/log/client/components/Alert";
import AnimationLottie from "@/features/shared/client/components/AnimationLottie";
import AggridFrigo from "@/features/log/client/components/AgGridFridge";
import AgGridMaster from "@/features/log/client/components/AgGridMaster";
import Dialog from "@/features/log/client/components/Dialog";
import Chart from "@/features/log/client/components/Chart";
import Param from "@/features/log/client/components/Param";



const Log: React.FC = () => {
    const table = useStore(state => state.table);
    const isChart = useStore(state => state.isChart);
    const logDaMaster = useStore(state => state.logDaMaster);
    const loading = useStore(state => state.loading);
    const storedSerial = useStore(state => state.storedSerial);
    const setSerial = useStore(state => state.setSerial);
    const backupList = useStore(state => state.backupList);
    const setMessage = useStore(state => state.setMessage);
    const message = useStore(state => state.message);
    const frigoData = useStore(state => state.frigoData);

    const router = useRouter();
    const pathname = usePathname();
    const handleDownloadAMLog = useDownloadBackup(router);

    useEffect(() => {
        if (!loading && logDaMaster.length === 0 && message === "" && pathname === "/log") {
            setMessage("Download the backup to see the data.");
        }
    }, [loading, logDaMaster, message, pathname, setMessage]);


    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="navbar-start space-x-2 ">
                    <InputTextGeneric
                        id={"amlog"}
                        className="input input-md input-bordered join-item max-w-36"
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setSerial(event.target.value)}
                    />
                    <ButtonGeneric
                        router={router}
                        text={"Go!"}
                        onClick={handleDownloadAMLog}
                        className="btn btn-info"
                    />
                    {table === "master" && backupList.length > 0 && <SelectBackup />}
                    {table === "master" && backupList.length > 0 && <InfoDropDown />}
                    {storedSerial && <Badge />}
                    <IconSoftware />
                    {table === "frigo" && frigoData.length > 0 && <ButtonsRadioGroup />}
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
                    {loading && logDaMaster.length === 0 && <AnimationLottie file={loading_lottie} />}
                    {!loading && logDaMaster.length === 0 && <AnimationLottie file={no_data_lottie} />}
                    <Dialog />
                    {!loading && table === "master" && logDaMaster && logDaMaster.length > 0 && <AgGridMaster />}
                    <div className="mt-5">
                        {!loading && table === "frigo" && !isChart && <AggridFrigo />}
                        {!loading && table === "frigo" && isChart && <Chart />}
                        {!loading && table === "param" && <Param />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Log;