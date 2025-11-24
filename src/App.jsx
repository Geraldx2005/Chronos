// import { useState, useCallback } from "react";
import UploadExcel from "./components/UploadExcel";
import GeneratePDF from "./components/GeneratePDF";
import RefreshBtn from "./components/ui/RefreshBtn";
import ErrorBoundary from "./components/ErrorBoundary";
import PresetHolder from "./components/presets/PresetHolder";
import Panel from "./components/Panel";

export default function App() {
  // const [coupons, setCoupons] = useState([]);

  // Memoized handler to clear coupons
  // const handleRefresh = useCallback(() => {
  //   setCoupons([]);
  // }, []);

  // const hasCoupons = coupons.length > 0;

  return (
    <div className="min-h-screen flex flex-col select-none">
      {/* <header className="w-full h-7 bg-nero-800 flex items-center justify-start px-4 py-1 text-sm text-white font-semibold">Chronos</header> */}

      <main className="flex-1 bg-nero-900 flex items-center justify-start">
        <PresetHolder />
        <Panel />
      </main>
    </div>
  );
}
