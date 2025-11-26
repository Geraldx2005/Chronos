import React from 'react'
import PresetOption from './PresetOption'

const PresetHolder = () => {
  return (
    <>
      <div className='w-[72%] h-screen'>
        <div className='w-full bg-nero-800 border-b-2 border-r-2 border-nero-900 text-nero-300 text-xl px-4 py-2'>Presets</div>
        <div className="minimal-scrollbar w-full h-[calc(100vh-48px)] flex flex-col overflow-auto">
          <div className="minimal-scrollbar w-full bg-nero-900 p-2.5 text-nero-300 grid grid-cols-[repeat(auto-fit,minmax(175px,1fr))] grid-auto-rows-[175px] gap-2 place-items-center">
            <PresetOption paperName={"A4"} width={210} height={297} />
            <PresetOption paperName={"A0"} width={841} height={1189} />
            <PresetOption paperName={"A1"} width={594} height={841} />
            <PresetOption paperName={"A2"} width={420} height={594} />
            <PresetOption paperName={"A3"} width={297} height={420} />
            <PresetOption paperName={"A5"} width={148} height={210} />
            <PresetOption paperName={"A6"} width={105} height={148} />
            <PresetOption paperName={"B0"} width={1000} height={1414} />
            <PresetOption paperName={"B1"} width={707} height={1000} />
            <PresetOption paperName={"B2"} width={500} height={707} />
            <PresetOption paperName={"B3"} width={353} height={500} />
            <PresetOption paperName={"B4"} width={250} height={353} />
            <PresetOption paperName={"B5"} width={176} height={250} />
            <PresetOption paperName={"B6"} width={125} height={176} />
            <PresetOption paperName={"C4"} width={229} height={324} />
            <PresetOption paperName={"C5"} width={162} height={229} />
            <PresetOption paperName={"C6"} width={114} height={162} />
            <PresetOption paperName={"Letter"} width={216} height={279} />
            <PresetOption paperName={"Legal"} width={216} height={356} />
            <PresetOption paperName={"Tabloid"} width={279} height={432} />
            <PresetOption paperName={"Executive"} width={184} height={267} />
          </div>

          {/* Can use this if we need seperator */}
          {/* <div className=" w-full bg-nero-900 p-2.5 text-nero-300 grid grid-cols-[repeat(auto-fit,minmax(175px,1fr))] grid-auto-rows-[175px] gap-2 place-items-center"></div> */}
        </div>
      </div>
    </>
  )
}

export default PresetHolder