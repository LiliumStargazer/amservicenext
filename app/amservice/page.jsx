'use client'

import React, {useContext, useEffect} from "react";
import Alert from "@/components/alert";
import InputSearch from "@/components/input-search";
import IconSoftware from "@/components/icon-software";
import SelectBackup from "@/components/select-backup";
import Helper from "@/components/dropdown-info";
import DropdownMenu from "@/components/dropdown-menu";
import AggridMaster from "@/components/aggrid-master";
import AggridFrigo from "@/components/aggrid-frigo";
import Chart from "@/components/chart";
import Param from "@/components/param";
import {Context} from "../Context";
import InputText from "@/components/input-text";
import {useRouter} from "next/navigation";
import ButtonHome from "@/components/button-home";
import Button from "@/components/button";
import Kbd from "@/components/kbd";
import useDownloadBackupOnClick from "@/hooks/useDownloadBackupOnClick";
import loading_lottie from "@/public/loading_lottie.json";
import no_data_lottie from "@/public/no_data_lottie.json";
import AnimationLottie from "@/components/animation-lottie";

function Log() {
  const { page, isChart, logDaMaster, loading, storedSerial, setSerial, backupList, setMessage, message } = useContext(Context);
  const router = useRouter();
  const handleDownloadAMLog = useDownloadBackupOnClick(router);

  useEffect(() => {
      if ( !loading && logDaMaster.length === 0 && message === "") {
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
            {page === "Master" && backupList.length > 0 && <Helper />}
            {storedSerial && <Kbd/>}
            <IconSoftware />
        </div>
        <div className="navbar-center">
          {page === "Master" && logDaMaster.length > 0 && <InputSearch />}
        </div>
        <div className="navbar-end space-x-2 ">
            <ButtonHome />
            <DropdownMenu />
        </div>
      </div>
      <Alert />
      <div>
        <div>
            {loading && logDaMaster.length === 0 && <AnimationLottie file={loading_lottie}/>}
            {!loading && logDaMaster.length === 0 && <AnimationLottie file={no_data_lottie} />}
            {!loading && page === "Master" && logDaMaster && logDaMaster.length > 0 && <AggridMaster />}
            <div className="mt-5">
                {!loading && page === "Frigo" && !isChart && <AggridFrigo />}
                {!loading && page === "Frigo" && isChart && <Chart />}
                {!loading && page === "Param" && <Param />}
            </div>
        </div>
      </div>
    </div>
  );
}

export default Log;