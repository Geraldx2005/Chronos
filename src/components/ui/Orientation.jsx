// import React, { useState } from "react";
import RefreshBtn from "../ui/RefreshBtn";
// import PortraitIcon from "../../assets/portraitIcon.jsx";
import LandscapeIcon from "../../assets/landscape.svg";
import PortraitIcon from "../../assets/PortraitIcon.jsx";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


const Orientation = ({ handleRefresh }) => {

  return (
    <div className="w-full p-3 flex justify-center items-center gap-4 border-b-2 border-nero-900">
      <div className="w-[70%] flex">
        <div className="w-full h-8 flex rounded-md">
          {/* Left-side custom arrows */}
          <div className="h-8 bg-nero-750 border border-nero-600 border-r-0 px-2 py-1 flex flex-col justify-center items-center rounded-bl-md rounded-tl-md">
            <span className="text-sm">Orientation</span>
          </div>

            <div className="relative w-full flex items-center">
                <select
                    className="appearance-none w-full h-8 px-2 py-1 pl-3 bg-nero-700 rounded-md border rounded-l-none border-nero-600 text-sm text-nero-200 focus:outline-none cursor-pointer"
                    // value={value}
                    // onChange={(e) => onChange(e.target.value)}
                >
                    <option value="portrait">Portrait</option>
                    <option value="andscape">Landscape</option>
                </select>

                {/* Custom Arrow */}
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-nero-300 text-xs">
                    <KeyboardArrowDownIcon className="text-nero-400"/>
                </span>
            </div>          
        </div>
      </div>

      <div className="w-[40%] h-8 flex">
        <RefreshBtn handleRefresh={handleRefresh}/>
      </div>
    </div>
  );
};

export default Orientation;