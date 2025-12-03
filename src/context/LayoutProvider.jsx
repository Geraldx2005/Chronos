// src/context/LayoutProvider.jsx
import { createContext, useContext, useState } from "react";

const LayoutContext = createContext();

export const LayoutProvider = ({ children }) => {
  const [paperUnit, setPaperUnit] = useState("mm");
  const [couponUnit, setCouponUnit] = useState("mm");

  const [paperWidthPt, setPaperWidthPt] = useState(0);
  const [paperHeightPt, setPaperHeightPt] = useState(0);

  const [couponWidthPt, setCouponWidthPt] = useState(0);
  const [couponHeightPt, setCouponHeightPt] = useState(0);

  const [orientation, setOrientation] = useState("portrait");

  const [fontScale, setFontScale] = useState(1);

  const [rightMargin, setRightMargin] = useState(0);
  const [leftMargin, setLeftMargin] = useState(0);
  const [topMargin, setTopMargin] = useState(0);
  const [bottomMargin, setBottomMargin] = useState(0);

  // NEW — detects if user manually edited margins
  const [userMarginOverride, setUserMarginOverride] = useState(false);

  const layout = {
    values: {
      paperUnit,
      couponUnit,
      paperWidthPt,
      paperHeightPt,
      couponWidthPt,
      couponHeightPt,
      orientation,
      fontScale,
      rightMargin,
      leftMargin,
      topMargin,
      bottomMargin,
      userMarginOverride,
    },

    set: {
      setPaperUnit,
      setCouponUnit,
      setPaperWidthPt,
      setPaperHeightPt,
      setCouponWidthPt,
      setCouponHeightPt,
      setOrientation,
      setFontScale,
      setRightMargin,
      setLeftMargin,
      setTopMargin,
      setBottomMargin,

      setUserMarginOverride, // NEW
    },
  };

  return (
    <LayoutContext.Provider value={layout}>
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => useContext(LayoutContext);
