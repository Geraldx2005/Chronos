import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PresetOption from "./PresetOption";

const tabs = ["A-Series", "B-Series", "C-Series", "US Sizes"];

const animation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.18, ease: "easeOut" },
};


const PresetHolder = () => {
  const [currentTab, setCurrentTab] = useState(0);

  const tabClasses = (index) =>
    `px-4 py-2 cursor-pointer whitespace-nowrap transition-colors duration-200 border-b-2 border-transparent
     ${currentTab === index ? "text-nero-300 border-b-2 border-white" : "text-nero-400 hover:text-nero-100"}`;

  return (
    <div className="w-[72%] h-screen">
      <div className="w-full bg-nero-800 border-b-2 border-r-2 border-nero-900 text-nero-300 text-xl px-4 py-2">
        Presets
      </div>

      {/* TABS */}
      <div className="bg-nero-800 border-b-2 border-nero-900 minimal-scrollbar overflow-x-auto">
        <div className="flex items-center justify-center gap-6 px-4">
          {tabs.map((tab, index) => (
            <div
              key={index}
              className={tabClasses(index)}
              onClick={() => setCurrentTab(index)}
            >
              {tab}
            </div>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <div className="minimal-scrollbar w-full h-[calc(100vh-96px)] overflow-auto flex flex-col relative">
        <AnimatePresence mode="wait">
          {currentTab === 0 && (
            <motion.div key="a-series" {...animation}
              className="w-full bg-nero-900 text-nero-300 p-2.5 grid grid-cols-[repeat(auto-fit,minmax(162px,1fr))] grid-auto-rows-[162px] gap-2 place-items-center"
            >
              <PresetOption paperName={"A0"} width={841} height={1189} />
              <PresetOption paperName={"A1"} width={594} height={841} />
              <PresetOption paperName={"A2"} width={420} height={594} />
              <PresetOption paperName={"A3"} width={297} height={420} />
              <PresetOption paperName={"A4"} width={210} height={297} />
              <PresetOption paperName={"A5"} width={148} height={210} />
              <PresetOption paperName={"A6"} width={105} height={148} />
            </motion.div>
          )}

          {currentTab === 1 && (
            <motion.div key="b-series" {...animation}
              className="w-full bg-nero-900 text-nero-300 p-2.5 grid grid-cols-[repeat(auto-fit,minmax(162px,1fr))] grid-auto-rows-[162px] gap-2 place-items-center"
            >
              <PresetOption paperName={"B0"} width={1000} height={1414} />
              <PresetOption paperName={"B1"} width={707} height={1000} />
              <PresetOption paperName={"B2"} width={500} height={707} />
              <PresetOption paperName={"B3"} width={353} height={500} />
              <PresetOption paperName={"B4"} width={250} height={353} />
              <PresetOption paperName={"B5"} width={176} height={250} />
              <PresetOption paperName={"B6"} width={125} height={176} />
            </motion.div>
          )}

          {currentTab === 2 && (
            <motion.div key="c-series" {...animation}
              className="w-full bg-nero-900 text-nero-300 p-2.5 grid grid-cols-[repeat(auto-fit,minmax(162px,1fr))] grid-auto-rows-[162px] gap-2 place-items-center"
            >
              <PresetOption paperName={"C0"} width={917} height={1297} />
              <PresetOption paperName={"C1"} width={648} height={917} />
              <PresetOption paperName={"C2"} width={458} height={648} />
              <PresetOption paperName={"C3"} width={324} height={458} />
              <PresetOption paperName={"C4"} width={229} height={324} />
              <PresetOption paperName={"C5"} width={162} height={229} />
              <PresetOption paperName={"C6"} width={114} height={162} />
            </motion.div>
          )}

          {currentTab === 3 && (
            <motion.div key="us-series" {...animation}
              className="w-full bg-nero-900 text-nero-300 p-2.5 grid grid-cols-[repeat(auto-fit,minmax(162px,1fr))] grid-auto-rows-[162px] gap-2 place-items-center"
            >
              <PresetOption paperName={"Letter"} width={216} height={279} />
              <PresetOption paperName={"Legal"} width={216} height={356} />
              <PresetOption paperName={"Tabloid"} width={279} height={432} />
              <PresetOption paperName={"Ledger"} width={279.4} height={431.8} />
              <PresetOption paperName={"Junior Legal"} width={127} height={203} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PresetHolder;
