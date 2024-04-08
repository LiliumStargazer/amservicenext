'use client'

import React, {useContext} from "react";
import Alert from "@/components/log/Alert";
import JoinRadioButtons from "@/components/log/tableFrigo/JoinRadioButtons";
import JoinGroupButtons from "@/components/log/tableFrigo/JoinGroupButtons";
import Search from "@/components/log/Search";
import SoftwareIcon from "@/components/log/SoftwareIcon";
import BackupSelect from "@/components/log/BackupSelect";
import Button from "@/components/shared/GetButton";
import Helper from "@/components/log/InfoDropdown";
import MenuDropdown from "@/components/shared/menuDropdown";
import LottieLoading from "@/components/shared/LottieLoading";
import LogMasterGrid from "@/components/log/tableDaMaster/LogMasterGrid";
import TableFrigo from "@/components/log/tableFrigo/tableFrigo";
import Chart from "@/components/log/tableFrigo/Chart";
import Param from "@/components/log/param/Param";
import {Context} from "../Context";
import TextInput from "@/components/shared/TextInput";
import {useRouter} from "next/navigation";
function Log() {

    const { page, isChart, logDaMaster, loading} = useContext(Context);
    const router = useRouter();

    return (
        <div>
            <div className="mb-3 mt-2">
                <div className="flex items-start ml-2 mr-2 space-x-3">
                    {!loading && page === "Master" && logDaMaster.length > 0 && <Search/> }
                    <div className="max-h-4 relative">
                        <Alert/>
                    </div>
                    <div className="flex items-start ml-2 mr-2 space-x-3">
                        {page === "Frigo" && <JoinRadioButtons/>}
                        {page === "Frigo" && <JoinGroupButtons/>}
                    </div>
                    <div className="flex space-x-3 absolute right-2">
                        <div className="flex mt-2">
                            <SoftwareIcon/>
                        </div>
                        <div className="join">
                            <TextInput />
                            <BackupSelect/>
                            <Button router={router}/>
                        </div>
                        <Helper/>
                        <MenuDropdown/>
                    </div>
                </div>
            </div>
            <div className="items-end">
            </div>
            <div>
                <div>
                    <LottieLoading/>
                    {!loading && page === "Master" && logDaMaster && logDaMaster.length > 0 && <LogMasterGrid className="z-998" />}
                    <div className="mt-5">
                        {!loading && page === "Frigo" && !isChart && <TableFrigo />}
                        {!loading && page === "Frigo" && isChart && <Chart />}
                        {!loading && page === "Param" && <Param />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Log;