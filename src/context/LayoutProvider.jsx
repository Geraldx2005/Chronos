// src/context/AuthContext.jsx
import { createContext, useContext, useState } from "react";

const LayoutContext = createContext();

export const LayoutProvider = ({ children }) => {
  const [paperWidth, setPaperWidth] = useState(864);
  const [paperHeight, setPaperHeight] = useState(1296);
  const [couponWidth, setCouponWidth] = useState(119.07);
  const [couponHeight, setCouponHeight] = useState(212.63);

  return (
    <LayoutContext.Provider value={{ paperWidth, setPaperWidth, paperHeight, setPaperHeight, couponWidth, setCouponWidth, couponHeight, setCouponHeight }}>
      {children}
    </LayoutContext.Provider>
  );
};

// Custom useLayout hook for easy access
export const useLayout = () => useContext(LayoutContext);