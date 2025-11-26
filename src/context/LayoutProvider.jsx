// src/context/LayoutContext.jsx
import { createContext, useContext, useState } from "react";

const LayoutContext = createContext();

export const LayoutProvider = ({ children }) => {
  //
  // UNITS (UI-level only)
  //
  const [paperUnit, setPaperUnit] = useState("in");
  const [couponUnit, setCouponUnit] = useState("mm");

  //
  // INTERNAL SIZES — ALWAYS STORED IN POINTS (pt)
  //
  const [paperWidthPt, setPaperWidthPt] = useState(0);   // default: 12 in
  const [paperHeightPt, setPaperHeightPt] = useState(0); // default: 18 in

  const [couponWidthPt, setCouponWidthPt] = useState(0);  // 42 mm approx
  const [couponHeightPt, setCouponHeightPt] = useState(0); // 75 mm approx

  return (
    <LayoutContext.Provider
      value={{
        //
        // UNITS
        //
        paperUnit,
        setPaperUnit,
        couponUnit,
        setCouponUnit,

        //
        // INTERNAL PT VALUES
        //
        paperWidthPt,
        setPaperWidthPt,
        paperHeightPt,
        setPaperHeightPt,

        couponWidthPt,
        setCouponWidthPt,
        couponHeightPt,
        setCouponHeightPt,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

// Custom hook for easy access
export const useLayout = () => useContext(LayoutContext);
