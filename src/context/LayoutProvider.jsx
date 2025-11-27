// src/context/LayoutContext.jsx
import { createContext, useContext, useState } from "react";

const LayoutContext = createContext();

export const LayoutProvider = ({ children }) => {

  // UNITS
  const [paperUnit, setPaperUnit] = useState("in");
  const [couponUnit, setCouponUnit] = useState("mm");

  // INTERNAL SIZES (pt)
  const [paperWidthPt, setPaperWidthPt] = useState(0);
  const [paperHeightPt, setPaperHeightPt] = useState(0);

  const [couponWidthPt, setCouponWidthPt] = useState(0);
  const [couponHeightPt, setCouponHeightPt] = useState(0);

  const layout = {
    values: { paperUnit, couponUnit, paperWidthPt, paperHeightPt, couponWidthPt, couponHeightPt, },
    set: { setPaperUnit, setCouponUnit, setPaperWidthPt, setPaperHeightPt, setCouponWidthPt, setCouponHeightPt, },
  };

  return (
    <LayoutContext.Provider value={layout}>
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => useContext(LayoutContext);
