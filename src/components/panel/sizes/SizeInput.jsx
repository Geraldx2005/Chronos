import React from 'react'

const SizeInput = ({label}) => {
    return (
        <div className='w-[50%] flex flex-col gap-0.5'>
            <label htmlFor="page-width" className='text-base font-medium'>{label}</label>
            <input type="number" name="pageWidth" id="page-width" className='no-spinner w-full h-8 px-2 py-1 bg-nero-700 rounded-md border border-nero-600 text-base'/>
        </div>
    )
}

export default SizeInput