'use client'
import React, { useEffect, useState } from "react";

import {useRouter} from "next/navigation";
import AmServiceCard from "../components/card/AmServiceCard";
import AmClubCard from "../components/card/AmClubCard";
import AmWikiCard from "../components/card/AmWIkiCard";
import AliveCard from "../components/card/AliveCard";
import DashBoardCard from "../components/card/DashBoardCard";
import ChatWootCard from "../components/card/ChatwootCard";
import PrestaShopCard from "../components/card/PrestaShopCard";
import TaigaCard from "../components/card/TaigaCard";
import VteCard from "../components/card/VteCard";
import Footer from "../components/shared/Footer";
import Alert from "@/components/log/Alert";
import TableauCard from "@/components/card/TableauCard";

function Login() {
  const [windowHeight, setWindowHeight] = useState(0);
  useEffect(() => {

    setWindowHeight(window.innerHeight);
  }, []);

  const router = useRouter();

  return (
      <div>
          <div className="navbar bg-neutral text-neutral-content"
               style={{height: windowHeight * 0.06 + "px"}}>
            <button className="text-xl ml-2 font-bold">Am Service</button>
              <div className="ml-10">
                <Alert/>
              </div>
          </div>
          <div className="flex flex-col items-center ">
              <div className="grid grid-cols-5 gap-5 mt-5 mb-28">
                  <AliveCard/>
                  <AmWikiCard/>
                  <AmClubCard/>
                  <AmServiceCard router={router}/>
                  <ChatWootCard/>
                  <DashBoardCard/>
                  <PrestaShopCard/>
                  <TaigaCard/>
                  <VteCard/>
                  <TableauCard/>
              </div>
          </div>
        <div>
          <Footer/>
        </div>
      </div>
  );
}

export default Login;

