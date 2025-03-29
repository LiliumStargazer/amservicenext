
import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCloud, faList, faMusic} from "@fortawesome/free-solid-svg-icons";
import {getSerialValidationMessage, onClickOpenWindow, trimAndFormatSerial} from "@/app/utils/utils";
import Image from "next/image";
import amclub from "@/public/mini/amClubLogoMini.png";
import amwiki from "@/public/mini/logos-wikijsMini.png";
import prestashop from "@/public/mini/PrestashopMini.png";
import chatWooot from "@/public/mini/chatwootMini.png";
import academy from "@/public/mini/amacademyMini.png";
import vte from "@/public/mini/vtenextMini.png";
import taiga from "@/public/mini/taigaMini.svg";
import tableau from "@/public/mini/tableauMini.svg";
import {faLock} from "@fortawesome/free-solid-svg-icons/faLock";
import DialogPassword from "@/app/components/DialogPassword";
import {signOut} from "next-auth/react";
import User from "@/app/components/User";

interface TopNavBarProps {
    serialTemp: string;
    setMessage: (message: string) => void;
}

const TopNavBar: React.FC<TopNavBarProps> = ({serialTemp, setMessage} ) => {

    const [openRequest, setOpenRequest] = React.useState<boolean>(false);

    const onClickWithAliveValue = () => {
        const formattedSerial = trimAndFormatSerial(serialTemp);
        const message = getSerialValidationMessage(formattedSerial);
        if (message !== "valid" )
            setMessage(message);
        else
            onClickOpenWindow("https://alive2.amdistributori.it:8443/dettaglio-distributore/?serialnumber={input}", serialTemp);
    }

    return (
        <>
            <DialogPassword openRequest={openRequest} setOpenRequest={setOpenRequest}/>
            <div className="navbar bg-neutral text-neutral-content">
                <div className="navbar-start">
                    <p className=" text-xl text-neutral-content font-bold ml-2">AM Service</p>
                </div>
                <div className="navbar-center">
                    <div className="tooltip tooltip-bottom" data-tip="Alive">
                        <button id="alive" className="btn btn-ghost btn-md" onClick={onClickWithAliveValue}>
                            <figure className="flex rounded-t-3xl rounded-b-3xl">
                                <FontAwesomeIcon icon={faCloud} style={{color: "#e32400"}} size="2x"/>
                            </figure>
                        </button>
                    </div>
                    <div className="tooltip tooltip-bottom" data-tip="Password calculations">
                        <button id="password" className="btn btn-ghost btn-md" onClick={() => setOpenRequest(true)}>
                            <figure className="flex rounded-t-3xl rounded-b-3xl">
                                <FontAwesomeIcon icon={faLock} style={{color: "#74C0Fc"}} size="2x"/>
                            </figure>
                        </button>
                    </div>
                    <div className="tooltip tooltip-bottom" data-tip="Amclub">
                        <button id="amclub" className="btn btn-ghost btn-md pb-0 mb-0"
                                onClick={() => onClickOpenWindow("https://amclub.amdistributori.it/admin", "")}>
                            <figure className="flex rounded-t-3xl rounded-b-3xl">
                                <Image src={amclub} alt={"amclub"} className="responsive-image"/>
                            </figure>
                        </button>
                    </div>
                    <div className="tooltip tooltip-bottom" data-tip="Am Wiki">
                        <button id="amwiki" className="btn btn-ghost btn-md"
                                onClick={() => onClickOpenWindow("https://docs.amdistributori.it/", "")}>
                            <figure className="flex rounded-t-3xl rounded-b-3xl mt-2">
                                <Image src={amwiki} alt={"amwiki"} className="responsive-image"/>
                            </figure>
                        </button>
                    </div>
                    <div className="tooltip tooltip-bottom" data-tip="JSON configuration">
                        <button id="json" className="btn btn-ghost btn-md mt-2 text-xl"
                                onClick={() => onClickOpenWindow("https://https://collaudo.amdistributori.it/", "")}>
                                Json
                        </button>
                    </div>
                    <div className="tooltip tooltip-bottom" data-tip="Tableau statistics">
                        <button id="tableau" className="btn btn-ghost btn-md"
                                onClick={() => onClickOpenWindow("https://stat.dacsy.it/#/signin", "")}>
                            <figure className="flex rounded-t-3xl rounded-b-3xl">
                                <Image src={tableau} alt={"tableau"} className="responsive-image"/>
                            </figure>
                        </button>
                    </div>
                    <div className="tooltip tooltip-bottom" data-tip="Taiga Projects">
                        <button id="taiga" className="btn btn-ghost btn-md"
                                onClick={() => onClickOpenWindow("https://prj.amdistributori.it/login?unauthorized=true&next=%2F", "")}>
                            <figure className="flex rounded-t-3xl rounded-b-3xl">
                                <Image src={taiga} alt={"taiga"} className="responsive-image"/>
                            </figure>
                        </button>
                    </div>
                    <div className="tooltip tooltip-bottom" data-tip="AM Shop">
                        <button id="shop" className="btn btn-ghost btn-md"
                                onClick={() => onClickOpenWindow("https://shop.amdistributori.it/admin771urkqup/index.php?controller=AdminLogin&token=74aacc696c102df86bb3444752ec4dc0", "")}>
                            <figure className="flex rounded-t-3xl rounded-b-3xl ">
                                <Image src={prestashop} alt={"shop"} className="responsive-image"/>
                            </figure>
                        </button>
                    </div>
                    <div className="tooltip tooltip-bottom" data-tip="Chatwoot">
                        <button id="chatwoot" className="btn btn-ghost btn-md"
                                onClick={() => onClickOpenWindow("https://chat.amdistributori.it/app/accounts/1/dashboard", "")}>
                            <figure className="flex rounded-t-3xl rounded-b-3xl ">
                                <Image src={chatWooot} alt={"chatwoot"} className="responsive-image"/>
                            </figure>
                        </button>
                    </div>
                    <div className="tooltip tooltip-bottom" data-tip="Am Academy">
                        <button id="academy" className="btn btn-ghost btn-md"
                                onClick={() => onClickOpenWindow("https://academy.amdistributori.it/", "")}>
                            <figure className="flex rounded-t-3xl rounded-b-3xl mb-2">
                                <Image src={academy} alt={"academy"} className="responsive-image"/>
                            </figure>
                        </button>
                    </div>
                    <div className="tooltip tooltip-bottom" data-tip="Vtger crm">
                        <button id="vte" className="btn btn-ghost btn-md"
                                onClick={() => onClickOpenWindow("https://www.dacsy.it/", "")}>
                            <figure className="flex rounded-t-3xl rounded-b-3xl ">
                                <Image src={vte} alt={"vte"} className="responsive-image"/>
                            </figure>
                        </button>
                    </div>
                    <div className="tooltip tooltip-bottom" data-tip="Lis and produtcs platform">
                        <button id="lis" className="btn btn-ghost btn-md"
                                onClick={() => onClickOpenWindow("https://dashboard.amdistributori.it/login", "")}>
                            <FontAwesomeIcon icon={faList} style={{color: "#74C0Fc"}} size="2x"/>
                        </button>
                    </div>
                    <div className="tooltip tooltip-bottom" data-tip="Audio Gateway">
                        <button id="audio" className="btn btn-ghost btn-md"
                                onClick={() => onClickOpenWindow("https://audiogateway.amdistributori.it:8443/", "")}>
                            <FontAwesomeIcon icon={faMusic} style={{color: "#B197FC"}} size="2x"/>
                        </button>
                    </div>
                    {/*<div className="tooltip tooltip-bottom" data-tip="Technicians statistics ">*/}
                    {/*    <button id="statistic" className="btn btn-ghost btn-md"*/}
                    {/*            onClick={() => router.push("/technician-tickets-kpi")}>*/}
                    {/*        <FontAwesomeIcon icon={faLineChart} style={{color: "#f8820e"}} size="2x"/>*/}
                    {/*    </button>*/}
                    {/*</div>*/}
                </div>
                <div className="navbar-end">
                    <User/>
                    <button className="btn btn-info " onClick={() => signOut()}>Sign Out</button>
                </div>
            </div>
        </>
    );
}

export default TopNavBar;