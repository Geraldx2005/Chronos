// MarginInput.jsx
import React from "react";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useLayout } from "../../../context/LayoutProvider";

const mmToPt = (mm) => mm * 2.834645669;
const ptToMm = (pt) => pt / 2.834645669;

const MarginInput = ({ label }) => {
    const layout = useLayout();

    const keyMap = {
        Top: "topMargin",
        Bottom: "bottomMargin",
        Left: "leftMargin",
        Right: "rightMargin",
    };

    const key = keyMap[label];
    const valuePt = layout.values[key];
    const valueMm = ptToMm(valuePt).toFixed(2);

    const update = (newMm) => {
        const pt = mmToPt(Number(newMm));
        layout.set[`set${label}Margin`](pt);

        layout.set.setUserMarginOverride(true); // manual override
    };

    const increase = () => update(Number(valueMm) + 1);
    const decrease = () => update(Number(valueMm) - 1);

    return (
        <div className="w-[50%] flex flex-col gap-0.5">
            <label className="text-sm text-nero-400 font-medium">{label}</label>

            <div className="w-full h-8 flex rounded-md">
                <div className="h-8 w-6 bg-nero-750 border border-nero-600 border-r-0 flex flex-col rounded-bl-md rounded-tl-md overflow-hidden">
                    <button
                        type="button"
                        onClick={increase}
                        className="flex-1 flex items-center justify-center text-nero-400 hover:text-nero-300"
                    >
                        <KeyboardArrowUpIcon sx={{ fontSize: 16, marginBottom: "-2px" }} />
                    </button>

                    <button
                        type="button"
                        onClick={decrease}
                        className="flex-1 flex items-center justify-center text-nero-400 hover:text-nero-300"
                    >
                        <KeyboardArrowDownIcon sx={{ fontSize: 16, marginTop: "-2px" }} />
                    </button>
                </div>

                <input
                    type="number"
                    value={valueMm}
                    onChange={(e) => update(e.target.value)}
                    onFocus={(e) => e.target.select()}
                    className="no-spinner w-[80%] h-8 px-2 py-1 bg-nero-700 border border-nero-600 rounded-md rounded-bl-none rounded-tl-none text-sm"
                />
            </div>
        </div>
    );
};

export default MarginInput;
