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
import Footer from "../components/Footer";
import TableauCard from "@/components/card/TableauCard";
import Header from "@/components/Header";
import CalcPsw from "@/components/card/CalcPsw";

function Login() {
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);

  const router = useRouter();

  return (
      <div>
          <Header windowHeight={windowHeight}/>
          <div className="flex flex-col items-center ">
              <div className="grid grid-cols-5 gap-5 mt-5 mb-28">
                  <CalcPsw/>
                  <AmServiceCard router={router}/>
                  <AliveCard/>
                  <AmClubCard/>
                  <AmWikiCard/>
                  <ChatWootCard/>
                  <DashBoardCard/>
                  <PrestaShopCard/>
                  <TaigaCard/>
                  <VteCard/>
                  <TableauCard/>
              </div>
          </div>
        <div>
          <Footer windowHeight={windowHeight}/>
        </div>
      </div>
  );
}

export default Login;

