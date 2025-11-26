import SizeInput from './SizeInput'
import { useLayout } from '../../../context/LayoutProvider'

const SizeConfigPanel = ({ handleRefresh }) => {
    let { paperWidth, paperHeight, couponWidth, couponHeight, setPaperWidth, setPaperHeight, setCouponWidth, setCouponHeight } = useLayout()
    return (
        <div className='w-full flex flex-col gap-2 p-3 border-b-2 border-nero-900'>
            <div className='flex flex-col gap-1'>
                <h2 className='text-xl font-medium'>Page Size</h2>
                <div className='w-full flex justify-start items-center gap-8'>
                    <SizeInput
                        label="Width"
                        value={paperWidth}
                        onValueChange={(val) => {
                            setPaperWidth(val);
                            handleRefresh();
                        }}
                    />

                    <SizeInput
                        label="Height"
                        value={paperHeight}
                        onValueChange={(val) => {
                            setPaperHeight(val);
                            handleRefresh();
                        }}
                    />
                </div>
            </div>
            <div className='flex flex-col gap-1'>
                <h2 className='text-xl font-medium'>Coupon Size</h2>
                <div className='w-full flex justify-start items-center gap-8'>
                    <SizeInput
                        label="Width"
                        value={couponWidth}
                        onValueChange={(val) => {
                            setCouponWidth(val);
                            handleRefresh();
                        }}
                    />

                    <SizeInput
                        label="Height"
                        value={couponHeight}
                        onValueChange={(val) => {
                            setCouponHeight(val);
                            handleRefresh();
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default SizeConfigPanel