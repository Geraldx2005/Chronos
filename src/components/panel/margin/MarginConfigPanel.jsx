import React from 'react'
import MarginInput from './MarginInput'

const MarginConfigPanel = () => {
  return (
    <div className='w-full flex flex-col p-3 border-b-2 border-nero-900'>
      <div className='flex flex-col gap-1'>
        <h2 className='text-lg font-medium'>Margin</h2>
        <div className='w-full flex justify-start items-center gap-2'>
          <MarginInput label="Top" />
          <MarginInput label="Bottom" />
          <MarginInput label="Left" />
          <MarginInput label="Right" />
        </div>
      </div>
    </div>
  )
}

export default MarginConfigPanel