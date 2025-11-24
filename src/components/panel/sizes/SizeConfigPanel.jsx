import React from 'react'
import SizeInput from './SizeInput'

const SizeConfigPanel = () => {
    return (
        <div className='w-full flex flex-col gap-2 p-3 border-b-2 border-nero-900'>
            <div className='flex flex-col gap-1'>
                <h2 className='text-xl font-medium'>Page Size</h2>
                <div className='w-full flex justify-start items-center gap-8'>
                    <SizeInput label="Width" />
                    <SizeInput label="Height" />
                </div>
            </div>
            <div className='flex flex-col gap-1'>
                <h2 className='text-xl font-medium'>Coupon Size</h2>
                <div className='w-full flex justify-start items-center gap-8'>
                    <SizeInput label="Width" />
                    <SizeInput label="Height" />
                </div>
            </div>
        </div>
    )
}

export default SizeConfigPanel