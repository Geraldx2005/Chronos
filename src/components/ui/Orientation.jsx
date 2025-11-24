// import React, { useState } from "react";
import RefreshBtn from "../ui/RefreshBtn";

const Orientation = ({ handleRefresh }) => {

  return (
    <div className="w-full p-3 flex justify-start items-center gap-4 border-b-2 border-nero-900">
      <div className="w-[70%] flex">
        <div className="w-full h-8 flex rounded-md">
          {/* Left-side custom arrows */}
          <div className="h-8 bg-nero-750 border border-nero-600 px-2 py-1 flex flex-col justify-center items-center rounded-bl-md rounded-tl-md">
            <span className="text-base">Orientation</span>
          </div>

          {/* Input */}
          <div className="w-[80%] h-8 px-2 py-1 bg-nero-700 rounded-md rounded-bl-none rounded-tl-none border border-nero-600 text-sm"></div>
        </div>
      </div>

      <div className="w-[30%] h-8 flex">
        <RefreshBtn handleRefresh={handleRefresh}/>
      </div>
    </div>
  );
};

export default Orientation;