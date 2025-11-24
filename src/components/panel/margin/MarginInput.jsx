import React, { useState } from "react";

const MarginInput = ({label}) => {
    const [value, setValue] = useState("0");

    const increase = () => {
        setValue((v) => String(Number(v || 0) + 1));
    };

    const decrease = () => {
        setValue((v) => String(Number(v || 0) - 1));
    };

    return (
        <div className="w-[50%] flex flex-col gap-0.5">
            <label htmlFor="margin" className="text-base font-medium">
                {label}
            </label>

            <div className="w-full h-8 flex rounded-md">
                {/* Left-side custom arrows */}
                <div className="h-8 w-6 bg-nero-750 border border-nero-600  flex flex-col justify-center items-center rounded-bl-md rounded-tl-md">
                    <button className="leading-none text-xs hover:text-white text-gray-300" type="button" onClick={increase}>▲</button>
                    <button className="leading-none text-xs hover:text-white text-gray-300" type="button" onClick={decrease}>▼</button>
                </div>

                {/* Input */}
                <input type="number" id="margin" value={value} onChange={(e) => setValue(e.target.value)} className="no-spinner w-[80%] h-8 px-2 py-1 bg-nero-700 rounded-md rounded-bl-none rounded-tl-none border border-nero-600 text-sm" />
            </div>
        </div>
    );
};

export default MarginInput;
