// src/context/LayoutContext.jsx
import { createContext, useContext, useState } from "react";

const LayoutContext = createContext();

export const LayoutProvider = ({ children }) => {

  // Units
  const [paperUnit, setPaperUnit] = useState("mm");
  const [couponUnit, setCouponUnit] = useState("mm");

  // Internal Sizes (pt)
  const [paperWidthPt, setPaperWidthPt] = useState(0);
  const [paperHeightPt, setPaperHeightPt] = useState(0);

  // External Sizes (pt)
  const [couponWidthPt, setCouponWidthPt] = useState(0);
  const [couponHeightPt, setCouponHeightPt] = useState(0);

  // Orientation
  const [orientation, setOrientation] = useState("portrait");

  // Font Scale
  const [fontScale, setFontScale] = useState(1);

  const layout = {
    values: { paperUnit, couponUnit, paperWidthPt, paperHeightPt, couponWidthPt, couponHeightPt, orientation, fontScale },
    set: { setPaperUnit, setCouponUnit, setPaperWidthPt, setPaperHeightPt, setCouponWidthPt, setCouponHeightPt, setOrientation, setFontScale },
  };

  return (
    <LayoutContext.Provider value={layout}>
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => useContext(LayoutContext);
