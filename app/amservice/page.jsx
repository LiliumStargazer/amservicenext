'use client'

import React, {useContext} from "react";
import Alert from "@/components/Alert";
import JoinRadioButtons from "@/components/amservice/tableFrigo/JoinRadioButtons";
import JoinGroupButtons from "@/components/amservice/tableFrigo/JoinGroupButtons";
import Search from "@/components/amservice/Search";
import SoftwareIcon from "@/components/amservice/SoftwareIcon";
import BackupSelect from "@/components/amservice/BackupSelect";
import Button from "@/components/amservice/GetButtonAmService";
import Helper from "@/components/amservice/InfoDropdown";
import MenuDropdown from "@/components/amservice/menuDropdown";
import LottieLoading from "@/components/amservice/LottieLoading";
import LogMasterGrid from "@/components/amservice/tableDaMaster/LogMasterGrid";
import TableFrigo from "@/components/amservice/tableFrigo/tableFrigo";
import Chart from "@/components/amservice/tableFrigo/Chart";
import Param from "@/components/amservice/param/Param";
import {Context} from "../Context";
import TextInputAmService from "@/components/amservice/TextInputAmService";
import {useRouter} from "next/navigation";
import HomeButton from "@/components/HomeButton";
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
                        <HomeButton/>
                        <div className="flex mt-2">
                            <SoftwareIcon/>
                        </div>
                        <div className="join">
                            <TextInputAmService />
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
                    {!loading && page === "Master" && logDaMaster && logDaMaster.length > 0 && <LogMasterGrid/>}
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