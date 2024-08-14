'use client'

import React, { useEffect} from "react";
import {useRouter, usePathname} from "next/navigation";
import Alert from "@/components/Alert";
import InputSearch from "@/components/amservice/Input-Search";
import IconSoftware from "@/components/amservice/Icon-Software";
import SelectBackup from "@/components/amservice/Select";
import BackupInfoDropDown from "@/components/amservice/BackupInfoDropDown";
import AggridMaster from "@/components/amservice/master/AgGrid-Master";
import AggridFrigo from "@/components/amservice/fridge/AgGrid-Fridge";
import Chart from "@/components/amservice/fridge/Chart";
//import Param from "@/components/amservice/param/Param";
import InputText from "@/components/amservice/Input-Text";
import ButtonNav from "@/components/navbar/Button";
import Button from "@/components/Button";
import useDownloadBackup from "@/hooks/useDownloadBackup";
import loading_lottie from "@/public/loading_lottie.json";
import no_data_lottie from "@/public/no_data_lottie.json";
import AnimationLottie from "@/components/AnimationLottie";
import Dialog from "components/Dialog";
import Badge from "@/components/amservice/Badge";
import ButtonsRadioGroup from "@/components/Buttons-Radio-Group";
import useStore from "@/app/store";
import NavigationMenu from "@/components/amservice/NavigationMenu";

function Log() {

const page = useStore(state => state.page);
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
      if ( !loading && logDaMaster.length === 0 && message === "" && pathname === "/amservice") {
          setMessage("Download the backup to see the data.");
      }
  },[loading, logDaMaster, message]);

  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start space-x-2 ">
            <InputText
            id={"amlog"}
            className="input input-md input-bordered join-item max-w-36"
            onChange={(event) => setSerial(event.target.value)}
            />
            <Button
                router={router}
                text={"Go!"}
                onButtonClick={handleDownloadAMLog}
                className="btn btn-info"
            />
            {page === "Master" && backupList.length > 0 && <SelectBackup /> }
            {page === "Master" && backupList.length > 0 && <BackupInfoDropDown />}
            {storedSerial && <Badge/>}
            <IconSoftware />
            {page === "Frigo" && frigoData.length >0 && <ButtonsRadioGroup /> }
        </div>
        <div className="navbar-center">
          {page === "Master" && logDaMaster.length > 0 && <InputSearch />}
        </div>
        <div className="navbar-end space-x-2 ">
            <ButtonNav />
            {pathname === "/amservice" && logDaMaster.length > 0 && <NavigationMenu /> }
        </div>
      </div>
      <Alert />
      <div>
        <div>
            {loading && logDaMaster.length === 0 && <AnimationLottie file={loading_lottie}/>}
            {!loading && logDaMaster.length === 0 && <AnimationLottie file={no_data_lottie} />}
            <Dialog />
            {!loading && page === "Master" && logDaMaster && logDaMaster.length > 0 && <AggridMaster />}
            <div className="mt-5">
                {!loading && page === "Frigo" && !isChart && <AggridFrigo />}
                {!loading && page === "Frigo" && isChart && <Chart />}
                {/*  {!loading && page === "Param" && <Param />} */}
            </div>
        </div>
      </div>
    </div>
  );
}

export default Log;