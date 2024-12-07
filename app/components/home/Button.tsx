'use client'

import React from "react";
import {onClickOpenWindow} from "@/app/utils/utils";
import { useRouter} from "next/navigation";

interface ButtonProps {
    isButtonEnabled: boolean;
    id: string;
    loading?: boolean;
    onClickWithAliveValue?: () => void;
    handleClickLog?: () => void;
}

const Button: React.FC <ButtonProps>  = ({ isButtonEnabled, id , loading, onClickWithAliveValue, handleClickLog}) => {

    const classNameButton = loading ? "btn btn-sm btn-info btn-disabled" : "btn btn-sm btn-info";
    const router = useRouter();

    const buttonProps = {
        ...(id === "amlog" && { onClick: handleClickLog }),
        ...(id === "alive" && { onClick: onClickWithAliveValue }),
        ...(id === "amclub" && { onClick: () => onClickOpenWindow("https://amclub.amdistributori.it/admin", "") }),
        ...(id === "amwiki" && { onClick: () => onClickOpenWindow("https://docs.amdistributori.it/", "") }),
        ...(id === "chatwoot" && { onClick: () => onClickOpenWindow("https://chat.amdistributori.it/app/accounts/1/dashboard", "") }),
        ...(id === "lis" && { onClick: () => onClickOpenWindow("https://dashboard.amdistributori.it/login", "") }),
        ...(id === "shop" && { onClick: () => onClickOpenWindow("https://shop.amdistributori.it/admin771urkqup/index.php?controller=AdminLogin&token=74aacc696c102df86bb3444752ec4dc0", "") }),
        ...(id === "taiga" && { onClick: () => onClickOpenWindow("https://prj.amdistributori.it/login?unauthorized=true&next=%2F", "") }),
        ...(id === "vte" && { onClick: () => onClickOpenWindow("https://www.dacsy.it/", "") }),
        ...(id === "tableau" && { onClick: () => onClickOpenWindow("https://stat.dacsy.it/#/signin", "") }),
        ...(id === "audio" && { onClick: () => onClickOpenWindow("https://audiogateway.amdistributori.it:8443/", "") }),
        ...(id === "academy" && { onClick: () => onClickOpenWindow("https://academy.amdistributori.it/", "") }),
        ...(id === "json" && { onClick: () => onClickOpenWindow("https://master.d1tobnmc95bhg6.amplifyapp.com", "") }),
        ...(id === "statistics" && { onClick: () => router.push("/technician-tickets-kpi") }),
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