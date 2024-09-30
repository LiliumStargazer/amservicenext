'use client'

import React, { useEffect } from "react";
import {  usePathname } from "next/navigation";
import useStore from "@/app/store";
import SelectBackup from "@/features/log/client/components/SelectBackup";
import InfoDropDown from "@/features/log/client/components/InfoDropDown";
import IconSoftware from "@/features/log/client/components/IconSoftware";
import Badge from "@/features/log/client/components/Badge";
import ButtonNav from "@/features/shared/client/components/ButtonNav";
import InputSearch from "@/features/log/client/components/InputSearch";
import Alert from "@/features/log/client/components/Alert";
import AgGridFridge from "@/features/log/client/components/tables/AgGridFridge";
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
import LisButton from "@/features/log/client/components/buttons/LisButton";
import MasterButton from "@/features/log/client/components/buttons/MasterButton";
import AgGridMasterLog from "@/features/log/client/components/tables/AgGridMasterLog";

const Log: React.FC = () => {

    const table = useStore(state => state.table);
    const setTable = useStore(state => state.setTable);
    const pathname = usePathname();
    const logDataFetched = useStore(state => state.logDataFetched);

    useEffect(() => {
        setTable("master");
    }, []);

    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="navbar-start space-x-2 ">
                    <Input />
                    <GetButton />
                    {table === "master" && <SelectBackup />}
                    {table === "master" && <InfoDropDown />}
                    <Badge />
                    <IconSoftware />
                    {table === "frigo" && <SelectRange />}
                    {table === "frigo" && <Pagination />}
                    {table === "param"  && <SelectParam />}
                </div>
                    <div className="navbar-center">
                        {table === "master" && logDataFetched && <InputSearch />}
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
                </div>
            </div>
            <Alert />
            <div>
                <div>
                    <Dialog />
                    {/*{table === "master" && <AgGridMaster />}*/}
                    {table === "master" && <AgGridMasterLog />}
                    <div className="mt-5">
                        { table === "frigo" && <Chart /> }
                        { table === "frigo" && <AgGridFridge />}
                        { table === "param" && <Param />}
                        { table === "listransaction" && < AgGridLisTransaction />}
                        { table === "fingertransaction" && <AgGridFingersTransaction />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Log;