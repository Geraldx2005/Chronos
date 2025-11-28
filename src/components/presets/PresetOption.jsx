import PresetImg from "../../assets/preset-img.svg";
import { useLayout } from "../../context/LayoutProvider";

const PresetOption = ({ paperName, width, height }) => {
  const layout = useLayout();

  // conversion: mm ➜ pt
  const mmToPt = (mm) => mm * 2.8346456693;

  const applyPreset = () => {
    layout.set.setPaperWidthPt(mmToPt(width));
    layout.set.setPaperHeightPt(mmToPt(height));

    // optional: update unit to mm since presets are in mm
    layout.set.setPaperUnit("mm");
  };

  return (
    <button
      className="w-full h-full bg-nero-800 flex flex-col items-center justify-center p-4 gap-4 rounded-md transition-colors duration-150 hover:bg-[#2b2b2b]"
      onClick={applyPreset}
    >
      <img src={PresetImg} className="w-24 h-24 flex items-center justify-center rounded-md" />

      <span className="flex flex-col justify-center items-center text-sm font-semibold">
        <h4 className="text-base">{paperName}</h4>
        <h4 className="font-medium">{`${width} x ${height} mm`}</h4>
      </span>
    </button>
  );
};

export default PresetOption;
