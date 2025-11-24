import { useState, useCallback } from "react"
import SizeConfigPanel from "./panel/sizes/SizeConfigPanel";
import MarginConfigPanel from "./panel/margin/MarginConfigPanel";
import Orientation from "./ui/Orientation";
import UploadExcel from "./UploadExcel";
import ErrorBoundary from "./ErrorBoundary";
import GeneratePDF from "./GeneratePDF";

const Panel = () => {
  const [coupons, setCoupons] = useState([]);

  // Memoized handler to clear coupons
  const handleRefresh = useCallback(() => {
    setCoupons([]);
  }, []);

  const hasCoupons = coupons.length > 0;
  return (
    <>
      <div className="w-[28%] h-screen bg-amber-300">
        <div className='w-full bg-nero-800 text-nero-300 text-xl px-4 py-2'>Configuration</div>
        <div className="h-[calc(100vh-44px)] flex flex-col justify-start items-center text-4xl bg-nero-800 border-t-2 border-nero-900 text-nero-300">
          <SizeConfigPanel />
          <MarginConfigPanel />
          <Orientation handleRefresh={handleRefresh} />
          <UploadExcel setCoupons={setCoupons} hasCoupons={hasCoupons} couponsLength={coupons.length} coupons={coupons}/>
        </div>
      </div>
    </>
  );
};

export default Panel;
