// import React, { useState } from "react";
import RefreshBtn from "../ui/RefreshBtn";
import PortraitIcon from "../../assets/portrait.svg";
import LandscapeIcon from "../../assets/landscape.svg";


const Orientation = ({ handleRefresh }) => {

  return (
    <div className="w-full p-3 flex justify-center items-center gap-4 border-b-2 border-nero-900">
      <div className="w-[70%] flex">
        <div className="w-full h-10 flex rounded-md">
          {/* Left-side custom arrows */}
          <div className="h-10 bg-nero-750 border border-nero-600 border-r-0 px-2 py-1 flex flex-col justify-center items-center rounded-bl-md rounded-tl-md">
            <span className="text-sm">Orientation</span>
          </div>

          {/* Input */}
          <div className="w-[60%] h-10 px-2 py-1 flex justify-evenly items-center gap-2 bg-nero-700 rounded-md rounded-bl-none rounded-tl-none border border-nero-600 text-sm">
            <img src={PortraitIcon} alt="portrait" className="w-6.5 h-6.5"/>
            <img src={LandscapeIcon} alt="landscape" className="w-7 h-7"/>
            {/* <LandscapeIcon className="text-nero-400" fontSize="small" /> */}
          </div>
        </div>
      </div>

      <div className="w-[40%] h-10 flex">
        <RefreshBtn handleRefresh={handleRefresh}/>
      </div>
    </div>
  );
};

export default Orientation;