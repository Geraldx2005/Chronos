import React from "react";

const SizeInput = ({ label, value, onValueChange }) => {
    return (
        <div className="w-[50%] flex flex-col gap-0.5">
            <label htmlFor={label} className="text-base font-medium">
                {label}
            </label>

            <input
                type="number"
                id={label}
                className="no-spinner w-full h-8 px-2 py-1 bg-nero-700 rounded-md border border-nero-600 text-base"
                value={value}
                onChange={(e) => onValueChange(e.target.value)}
            />
        </div>
    );
};

export default SizeInput;
