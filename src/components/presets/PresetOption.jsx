import PresetImg from "../../assets/preset-img.svg"

const PresetOption = ({paperName, width, height}) => {
  return (
    <button className='w-full h-full bg-nero-800 flex flex-col items-center justify-center p-4 gap-4 rounded-md transition-colors duration-150 hover:bg-[#2b2b2b]'>
      <img src={PresetImg} className='w-24 h-24 flex items-center justify-center rounded-md'></img>
      <span className='flex flex-col justify-center items-center text-sm font-semibold'>
      <h4 className="text-base">{paperName}</h4>
      <h4 className='font-medium'>{`${width} x ${height} mm`}</h4>
      </span>
      </button>
  )
}

export default PresetOption