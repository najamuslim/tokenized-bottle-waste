"use client";

import React from "react";
import Top_Bar from "./pages/topbar";
import Content_Area from "./pages/contents";
import Footers from "./pages/footer";


const dApp = () => {
  return (
    <>
    <Top_Bar></Top_Bar>
    <Content_Area></Content_Area>
    <Footers></Footers>
    </>
  );
}


export default dApp;
