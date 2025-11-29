// src/context/LayoutContext.jsx
import { createContext, useContext, useState } from "react";

const LayoutContext = createContext();

export const LayoutProvider = ({ children }) => {

  // UNITS
  const [paperUnit, setPaperUnit] = useState("mm");
  const [couponUnit, setCouponUnit] = useState("mm");

  // INTERNAL SIZES (pt)
  const [paperWidthPt, setPaperWidthPt] = useState(0);
  const [paperHeightPt, setPaperHeightPt] = useState(0);

  const [couponWidthPt, setCouponWidthPt] = useState(0);
  const [couponHeightPt, setCouponHeightPt] = useState(0);

  const [orientation, setOrientation] = useState("portrait");

  const layout = {
    values: { paperUnit, couponUnit, paperWidthPt, paperHeightPt, couponWidthPt, couponHeightPt, orientation, },
    set: { setPaperUnit, setCouponUnit, setPaperWidthPt, setPaperHeightPt, setCouponWidthPt, setCouponHeightPt, setOrientation, },
  };

  return (
    <LayoutContext.Provider value={layout}>
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => useContext(LayoutContext);
