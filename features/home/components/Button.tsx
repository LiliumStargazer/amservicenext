import React from "react";
import useStore from "@/app/store";

import {getSerialValidationMessage, onClickOpenWindow, trimAndFormatSerial} from "@/features/shared/client/utils/utils";
import {useRouter} from "next/navigation";
import useValidateSerialAndNavigate from "@/features/shared/client/hooks/useValidateSerialAndNagivate";

const Button  = ({ isButtonEnabled, id }: { isButtonEnabled: boolean, id:string }) => {

    const loading = useStore(state => state.loading);
    const aliveSerial = useStore(state => state.aliveSerial);
    const setMessage = useStore(state => state.setMessage);
    const serialTemp = useStore(state => state.serialTemp);
    const classNameButton = loading ? "btn btn-sm btn-info btn-disabled" : "btn btn-sm btn-info";
    const router = useRouter();
    const validateSerialAndNavigate = useValidateSerialAndNavigate();

    const onClickWithValue = () => {

        const formattedSerial = trimAndFormatSerial(aliveSerial);
        const message = getSerialValidationMessage(formattedSerial);
        if (message !== "valid" )
            setMessage(message);
        else
            onClickOpenWindow("https://alive2.amdistributori.it:8443/dettaglio-distributore/?serialnumber={input}", aliveSerial);
    }

    const handleClickLog = async () => {
        await validateSerialAndNavigate(serialTemp);
    }

    const buttonProps = {
        ...(id === "amlog" && { onClick: handleClickLog }),
        ...(id === "alive" && { onClick: () => onClickWithValue() }),
        ...(id === "amclub" && { onClick: () => onClickOpenWindow("https://amclub.amdistributori.it/admin", "") }),
        ...(id === "amwiki" && { onClick: () => onClickOpenWindow("https://docs.amdistributori.it/", "") }),
        ...(id === "chatwoot" && { onClick: () => onClickOpenWindow("https://chat.amdistributori.it/app/accounts/1/dashboard", "") }),
        ...(id === "lis" && { onClick: () => onClickOpenWindow("https://dashboard.amdistributori.it/login", "") }),
        ...(id === "shop" && { onClick: () => onClickOpenWindow("https://shop.amdistributori.it/admin771urkqup/index.php?controller=AdminLogin&token=74aacc696c102df86bb3444752ec4dc0", "") }),
        ...(id === "taiga" && { onClick: () => onClickOpenWindow("https://prj.amdistributori.it/login?unauthorized=true&next=%2F", "") }),
        ...(id === "vte" && { onClick: () => onClickOpenWindow("https://www.dacsy.it/", "") }),
        ...(id === "tableau" && { onClick: () => onClickOpenWindow("https://stat.dacsy.it/#/signin", "") }),
        ...(id === "audio" && { onClick: () => onClickOpenWindow("https://audiogateway.amdistributori.it:8443/", "") }),
        ...(id === "statistics" && { onClick: () => router.push("/technical.assistance.statistics") }),
    };

    return isButtonEnabled ? (
        <button
            className={classNameButton}
            disabled={loading}
            {...buttonProps}
        >
            Go!
        </button>
    ) : null;
};

export default Button;