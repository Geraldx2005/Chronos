import SizeInput from "./SizeInput";
import UnitSelector from "./UnitSelector";
import { useLayout } from "../../../context/LayoutProvider";
import { useEffect, useState } from "react";

const SizeConfigPanel = ({ handleRefresh }) => {
    const {
        paperUnit,
        setPaperUnit,
        couponUnit,
        setCouponUnit,

        paperWidthPt,
        paperHeightPt,
        setPaperWidthPt,
        setPaperHeightPt,

        couponWidthPt,
        couponHeightPt,
        setCouponWidthPt,
        setCouponHeightPt,
    } = useLayout();

    // Unit conversions
    const mmToPt = (mm) => mm * 2.8346456693;
    const ptToMm = (pt) => pt * 0.352778;

    const inToPt = (inch) => inch * 72;
    const ptToIn = (pt) => pt / 72;

    const round = (n) => Number(n.toFixed(3));

    // ----------------------------
    // TEMPORARY UI INPUT STATES
    // ----------------------------

    const [paperWidthInput, setPaperWidthInput] = useState("");
    const [paperHeightInput, setPaperHeightInput] = useState("");

    const [couponWidthInput, setCouponWidthInput] = useState("");
    const [couponHeightInput, setCouponHeightInput] = useState("");

    // Sync UI buffers when PT values or units change
    useEffect(() => {
        setPaperWidthInput(
            paperUnit === "mm"
                ? round(ptToMm(paperWidthPt))
                : round(ptToIn(paperWidthPt))
        );
        setPaperHeightInput(
            paperUnit === "mm"
                ? round(ptToMm(paperHeightPt))
                : round(ptToIn(paperHeightPt))
        );

        setCouponWidthInput(
            couponUnit === "mm"
                ? round(ptToMm(couponWidthPt))
                : round(ptToIn(couponWidthPt))
        );
        setCouponHeightInput(
            couponUnit === "mm"
                ? round(ptToMm(couponHeightPt))
                : round(ptToIn(couponHeightPt))
        );
    }, [
        paperWidthPt,
        paperHeightPt,
        couponWidthPt,
        couponHeightPt,
        paperUnit,
        couponUnit,
    ]);

    // ----------------------------
    // CHANGE HANDLERS (NO FLICKER)
    // ----------------------------

    const handlePaperWidthChange = (val) => {
        setPaperWidthInput(val);

        if (val === "") return;
        const num = Number(val);
        if (isNaN(num)) return;

        setPaperWidthPt(paperUnit === "mm" ? mmToPt(num) : inToPt(num));
        handleRefresh();
    };

    const handlePaperHeightChange = (val) => {
        setPaperHeightInput(val);

        if (val === "") return;
        const num = Number(val);
        if (isNaN(num)) return;

        setPaperHeightPt(paperUnit === "mm" ? mmToPt(num) : inToPt(num));
        handleRefresh();
    };

    const handleCouponWidthChange = (val) => {
        setCouponWidthInput(val);

        if (val === "") return;
        const num = Number(val);
        if (isNaN(num)) return;

        setCouponWidthPt(couponUnit === "mm" ? mmToPt(num) : inToPt(num));
        handleRefresh();
    };

    const handleCouponHeightChange = (val) => {
        setCouponHeightInput(val);

        if (val === "") return;
        const num = Number(val);
        if (isNaN(num)) return;

        setCouponHeightPt(couponUnit === "mm" ? mmToPt(num) : inToPt(num));
        handleRefresh();
    };

    return (
        <div className="w-full flex flex-col gap-4 p-3 border-b-2 border-nero-900">
            {/* PAGE SIZE */}
            <div className="flex flex-col gap-1">
                <h2 className="text-lg text-nero-400 font-medium">Page Size</h2>

                <div className="w-full flex justify-start items-center gap-2">
                    <SizeInput
                        label="Width"
                        value={paperWidthInput}
                        onValueChange={handlePaperWidthChange}
                    />

                    <SizeInput
                        label="Height"
                        value={paperHeightInput}
                        onValueChange={handlePaperHeightChange}
                    />

                    <UnitSelector
                        value={paperUnit}
                        onChange={(val) => {
                            setPaperUnit(val);
                            handleRefresh();
                        }}
                    />
                </div>
            </div>

            {/* COUPON SIZE */}
            <div className="flex flex-col gap-1">
                <h2 className="text-lg text-nero-400 font-medium">Coupon Size</h2>

                <div className="w-full flex justify-start items-center gap-2">
                    <SizeInput
                        label="Width"
                        value={couponWidthInput}
                        onValueChange={handleCouponWidthChange}
                    />

                    <SizeInput
                        label="Height"
                        value={couponHeightInput}
                        onValueChange={handleCouponHeightChange}
                    />

                    <UnitSelector
                        value={couponUnit}
                        onChange={(val) => {
                            setCouponUnit(val);
                            handleRefresh();
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default SizeConfigPanel;
