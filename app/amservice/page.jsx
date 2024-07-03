'use client'

import React, {useContext} from "react";
import Alert from "@/components/alert";
import ButtonsRadioGroup from "@/components/buttons-radio-group";
import ButtonsGroup from "@/components/buttons-group";
import InputSearch from "@/components/input-search";
import IconSoftware from "@/components/icon-software";
import SelectBackup from "@/components/select-backup";
import Helper from "@/components/dropdown-info";
import DropdownMenu from "@/components/dropdown-menu";
import AnimationLottieloading from "@/components/animation-lottieloading";
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
import AnimationLottieNotLoaded from "@/components/animation-lottieNotLoaded";
import useDownloadBackupOnClick from "@/hooks/useDownloadBackupOnClick";

function Log() {

    const { page, isChart, logDaMaster, loading, storedSerial, setSerial, backupList} = useContext(Context);
    const router = useRouter();
    const handleDownloadAMLog = useDownloadBackupOnClick(router);

    return (
      <div>
        <div className="mb-3 mt-2">
          <div className="flex items-start ml-2 mr-2 space-x-3">
            <div className="join">
              <InputText
                  id={"amlog"}
                  className="input input-md input-bordered join-item max-w-36"
                  onChange={(event) => setSerial(event.target.value)}
              />
              <SelectBackup />
              <Button
                  router={router}
                  text={"Go!"}
                  onButtonClick={handleDownloadAMLog}
              />
            </div>
              {page === "Master" && backupList.length > 0 && <Helper />}
              {page === "Master" && logDaMaster.length > 0 && <InputSearch />}
            <div className="max-h-4 relative">

            </div>
            <div className="flex items-start ml-2 mr-2 space-x-3">
              {page === "Frigo" && <ButtonsRadioGroup />}
              {page === "Frigo" && <ButtonsGroup />}
            </div>
            <div className="flex space-x-3 absolute right-2">
                {storedSerial && <Kbd />}
              <div className="flex mt-2">
                <IconSoftware />
              </div>
              <ButtonHome />
              <DropdownMenu />
            </div>
          </div>
        </div>
        <div className="items-end"></div>
          <Alert />
        <div>
          <div>
            <AnimationLottieloading />
            {!loading && logDaMaster.length === 0 && <AnimationLottieNotLoaded /> }
            {!loading &&
              page === "Master" &&
              logDaMaster &&
              logDaMaster.length > 0 && <AggridMaster />}
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