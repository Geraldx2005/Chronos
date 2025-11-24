import React from 'react'
import PresetOption from './PresetOption'

const PresetHolder = () => {
  return (
    <>
    <div className='w-[72%] h-screen'>
      <div className='w-full bg-nero-800 border-b-2 border-r-2 border-nero-900 text-nero-300 text-xl px-4 py-2'>Presets</div>
      <div className="minimal-scrollbar w-full h-[calc(100vh-48px)] bg-nero-900 p-2.5 text-nero-300 grid grid-cols-[repeat(auto-fit,minmax(192px,1fr))] grid-auto-rows-[192px] gap-2.5 place-items-center overflow-auto">
        <PresetOption />
        <PresetOption />
        <PresetOption />
        <PresetOption />
        <PresetOption />
        <PresetOption />
        <PresetOption />
        <PresetOption />
        <PresetOption />
        <PresetOption />
        <PresetOption />
        <PresetOption />
        <PresetOption />
        <PresetOption />
        <PresetOption />
        <PresetOption />
        <PresetOption />
        <PresetOption />
        <PresetOption />
        <PresetOption />
        <PresetOption />
        <PresetOption />
        <PresetOption />
        <PresetOption />
      </div>
    </div>
    </>
  )
}

export default PresetHolder