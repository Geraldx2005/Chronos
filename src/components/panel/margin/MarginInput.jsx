import React, { useState } from "react";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const MarginInput = ({ label }) => {
    const [value, setValue] = useState("0");

    const increase = () => {
        setValue((v) => String(Number(v || 0) + 1));
    };

    const decrease = () => {
        setValue((v) => String(Number(v || 0) - 1));
    };

    return (
        <div className="w-[50%] flex flex-col gap-0.5">
            <label htmlFor="margin" className="text-sm text-nero-400 font-medium">
                {label}
            </label>

            <div className="w-full h-8 flex rounded-md">
                {/* Left-side custom arrows */}
                <div className="h-8 w-6 bg-nero-750 border border-nero-600 border-r-0 flex flex-col justify-center items-center rounded-bl-md rounded-tl-md">
                    <button
                        type="button"
                        onClick={increase}
                        className="h-4 pt-0.5 flex justify-center items-center leading-none text-nero-400 hover:text-nero-300"
                    >
                        <KeyboardArrowUpIcon sx={{ fontSize: 16, fontWeight: "bold" }} />
                    </button>

                    <button
                        type="button"
                        onClick={decrease}
                        className="h-4 pb-0.5 flex justify-center items-center leading-none text-nero-400 hover:text-nero-300"
                    >
                        <KeyboardArrowDownIcon sx={{ fontSize: 16, fontWeight: "bold" }} />
                    </button>
                </div>


                {/* Input */}
                <input type="number" id="margin"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onFocus={(e) => e.target.select()} // Select the input value on focus
                    className="no-spinner w-[80%] h-8 px-2 py-1 bg-nero-700 rounded-md rounded-bl-none rounded-tl-none border border-nero-600 text-sm" />
            </div>
        </div>
    );
};

export default MarginInput;
