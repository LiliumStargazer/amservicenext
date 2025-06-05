import { onClickOpenWindow } from "@/app/utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import amclub from "@/public/mini/amClubLogoMini.png";
import amwiki from "@/public/mini/logos-wikijsMini.png";
import prestashop from "@/public/mini/PrestashopMini.png";
import chatWooot from "@/public/mini/chatwootMini.png";
import academy from "@/public/mini/amacademyMini.png";
import taiga from "@/public/mini/taigaMini.svg";
import tableau from "@/public/mini/tableauMini.svg";
import { faJs } from "@fortawesome/free-brands-svg-icons";
import { faList, faMusic } from "@fortawesome/free-solid-svg-icons";

interface DrawerLinksProps {
    serial: string;
}

const DrawerLinks: React.FC<DrawerLinksProps> = () => {


    return (
        <div className="drawer drawer-end">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content ">
                <label htmlFor="my-drawer-4" className="drawer-button btn btn-info btn-sm">Shortcuts</label>
            </div>
            <div className="drawer-side z-[9999]">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 space-y-4">
                    {/* Sidebar content here */}
                    <li>
                        <button
                            id="amclub"
                            className="btn btn-ghost btn-md flex gap-4 items-center w-full text-left"
                            onClick={() => onClickOpenWindow("https://amclub.amdistributori.it/admin", "")}
                        >
                            <Image src={amclub} alt="amclub" className="responsive-image" />
                        </button>
                    </li>
                    <li>
                        <button
                            id="shop"
                            className="btn btn-ghost btn-md flex gap-4 items-center w-full text-left"
                            onClick={() =>
                                onClickOpenWindow(
                                    "https://shop.amdistributori.it/admin771urkqup/index.php?controller=AdminLogin&token=74aacc696c102df86bb3444752ec4dc0",
                                    ""
                                )
                            }
                        >
                            <Image src={prestashop} alt="shop" className="responsive-image" />
                        </button>
                    </li>
                    <li>
                        <button
                            id="amwiki"
                            className="btn btn-ghost btn-md flex gap-4 items-center w-full text-left"
                            onClick={() => onClickOpenWindow("https://docs.amdistributori.it/", "")}
                        >
                            <Image src={amwiki} alt="amwiki" className="responsive-image" />
                            <span>Am Wiki</span>
                        </button>
                    </li>
                    <li>
                        <button
                            id="json"
                            className="btn btn-ghost btn-md flex gap-4 items-center w-full text-left"
                            onClick={() => onClickOpenWindow("https://collaudo.amdistributori.it/", "")}
                        >
                            <FontAwesomeIcon icon={faJs} style={{ color: "#FFD43B" }} size="2xl" />
                            <span>JSON</span>
                        </button>
                    </li>
                    <li>
                        <button
                            id="tableau"
                            className="btn btn-ghost btn-md flex gap-4 items-center w-full text-left"
                            onClick={() => onClickOpenWindow("https://stat.dacsy.it/#/signin", "")}
                        >
                            <Image src={tableau} alt="tableau" className="responsive-image" />
                            <span>Tableau</span>
                        </button>
                    </li>
                    <li>
                        <button
                            id="taiga"
                            className="btn btn-ghost btn-md flex gap-4 items-center w-full text-left"
                            onClick={() =>
                                onClickOpenWindow(
                                    "https://prj.amdistributori.it/login?unauthorized=true&next=%2F",
                                    ""
                                )
                            }
                        >
                            <Image src={taiga} alt="taiga" className="responsive-image" />
                            <span>Taiga</span>
                        </button>
                    </li>

                    <li>
                        <button
                            id="chatwoot"
                            className="btn btn-ghost btn-md flex gap-4 items-center w-full text-left"
                            onClick={() =>
                                onClickOpenWindow(
                                    "https://chat.amdistributori.it/app/accounts/1/dashboard",
                                    ""
                                )
                            }
                        >
                            <Image src={chatWooot} alt="chatwoot" className="responsive-image" />
                            <span>Chatwoot</span>
                        </button>
                    </li>
                    <li>
                        <button
                            id="academy"
                            className="btn btn-ghost btn-md flex gap-4 items-center w-full text-left"
                            onClick={() => onClickOpenWindow("https://academy.amdistributori.it/", "")}
                        >
                            <Image src={academy} alt="academy" className="responsive-image" />
                            <span>Academy</span>
                        </button>
                    </li>
                    <li>
                        <button
                            id="lis"
                            className="btn btn-ghost btn-md flex gap-4 items-center w-full text-left"
                            onClick={() => onClickOpenWindow("https://dashboard.amdistributori.it/login", "")}
                        >
                            <FontAwesomeIcon icon={faList} style={{ color: "#74C0Fc" }} size="2x" />
                            <span>Lis & Products</span>
                        </button>
                    </li>
                    <li>
                        <button
                            id="audio"
                            className="btn btn-ghost btn-md flex gap-4 items-center w-full text-left"
                            onClick={() => onClickOpenWindow("https://audiogateway.amdistributori.it:8443/", "")}
                        >
                            <FontAwesomeIcon icon={faMusic} style={{ color: "#B197FC" }} size="2x" />
                            <span>Audio Gateway</span>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default DrawerLinks;
