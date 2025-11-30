import { useEffect, useState } from "react";
import { useLayout } from "../../../context/LayoutProvider";
import { useRefresh } from "../../../context/RefreshContext";
import UnitSelector from "./UnitSelector";
import SizeInput from "./SizeInput";

const SizeConfigPanel = () => {
    const layout = useLayout();
    const { handleRefresh } = useRefresh();

    // Unit conversions
    const mmToPt = (mm) => mm * 2.8346456693;
    const ptToMm = (pt) => pt * 0.352778;

    const inToPt = (inch) => inch * 72;
    const ptToIn = (pt) => pt / 72;

    const round = (n) => Number(n.toFixed(3));

    // Temporary UI input states
    const [paperWidthInput, setPaperWidthInput] = useState("");
    const [paperHeightInput, setPaperHeightInput] = useState("");

    const [couponWidthInput, setCouponWidthInput] = useState("");
    const [couponHeightInput, setCouponHeightInput] = useState("");

    // Sync UI buffers when PT values or units change
    useEffect(() => {
        setPaperWidthInput(
            layout.values.paperUnit === "mm"
                ? round(ptToMm(layout.values.paperWidthPt))
                : round(ptToIn(layout.values.paperWidthPt))
        );
        setPaperHeightInput(
            layout.values.paperUnit === "mm"
                ? round(ptToMm(layout.values.paperHeightPt))
                : round(ptToIn(layout.values.paperHeightPt))
        );

        setCouponWidthInput(
            layout.values.couponUnit === "mm"
                ? round(ptToMm(layout.values.couponWidthPt))
                : round(ptToIn(layout.values.couponWidthPt))
        );
        setCouponHeightInput(
            layout.values.couponUnit === "mm"
                ? round(ptToMm(layout.values.couponHeightPt))
                : round(ptToIn(layout.values.couponHeightPt))
        );
    }, [
        layout.values.paperWidthPt,
        layout.values.paperHeightPt,
        layout.values.couponWidthPt,
        layout.values.couponHeightPt,
        layout.values.paperUnit,
        layout.values.couponUnit,
    ]);

    // fontScale always stays synced.
    useEffect(() => {
        if (layout.values.couponWidthPt > 0) {
            updateFontScale(layout.values.couponWidthPt);
        }
    }, [layout.values.couponWidthPt]);


    // Change handlers (No flickering)
    const handlePaperWidthChange = (val) => {
        setPaperWidthInput(val);

        if (val === "") return;
        const num = Number(val);
        if (isNaN(num)) return;

        layout.set.setPaperWidthPt(layout.values.paperUnit === "mm" ? mmToPt(num) : inToPt(num));
        handleRefresh();
    };

    const handlePaperHeightChange = (val) => {
        setPaperHeightInput(val);

        if (val === "") return;
        const num = Number(val);
        if (isNaN(num)) return;

        layout.set.setPaperHeightPt(layout.values.paperUnit === "mm" ? mmToPt(num) : inToPt(num));
        handleRefresh();
    };

    const handleCouponWidthChange = (val) => {
        setCouponWidthInput(val);

        if (val === "") return;
        const num = Number(val);
        if (isNaN(num)) return;

        // Convert to pt based on unit
        const widthPt =
            layout.values.couponUnit === "mm" ? mmToPt(num) : inToPt(num);

        layout.set.setCouponWidthPt(widthPt);

        // Update Font Scale
        updateFontScale(widthPt);

        handleRefresh();
    };

    const handleCouponHeightChange = (val) => {
        setCouponHeightInput(val);

        if (val === "") return;
        const num = Number(val);
        if (isNaN(num)) return;

        layout.set.setCouponHeightPt(layout.values.couponUnit === "mm" ? mmToPt(num) : inToPt(num));
        handleRefresh();
    };

    // Base width reference for scaling
    const BASE_COUPON_WIDTH_PT = 120;

    // Updates the font scale inside LayoutContext
    const updateFontScale = (widthPt) => {
        if (!widthPt) return;
        const scale = widthPt / BASE_COUPON_WIDTH_PT;
        layout.set.setFontScale(scale);
    };

    return (
        <div className="w-full flex flex-col gap-4 p-3 border-b-2 border-nero-900">
            {/* Page Size */}
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
                        value={layout.values.paperUnit}
                        onChange={(val) => {
                            layout.set.setPaperUnit(val);
                            handleRefresh();
                        }}
                    />
                </div>
            </div>

            {/* Coupon Size */}
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
                        value={layout.values.couponUnit}
                        onChange={(val) => {
                            layout.set.setCouponUnit(val);
                            handleRefresh();
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default SizeConfigPanel;
