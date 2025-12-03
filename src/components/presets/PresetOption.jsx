import { useLayout } from "../../context/LayoutProvider";
import { useRefresh } from "../../context/RefreshContext";
import PresetImg from "../../assets/preset-img.svg";

const PresetOption = ({ paperName, width, height, selected, onSelect }) => {
  const layout = useLayout();
  const { handleRefresh } = useRefresh();

  const mmToPt = (mm) => mm * 2.8346456693;

  const applyPreset = () => {
    layout.set.setPaperWidthPt(mmToPt(width));
    layout.set.setPaperHeightPt(mmToPt(height));
    layout.set.setPaperUnit("mm");
    handleRefresh();
  };

  return (
    <button
      onClick={() => {
        onSelect();
        applyPreset();
      }}
      className={`
        w-full h-full flex flex-col items-center justify-center p-4 gap-4 rounded-md
        transition-colors duration-150
        ${selected
          ? "ring-3 ring-denim-600 ring-inset bg-[#2b2b2b]"
          : "bg-nero-800 hover:bg-[#2b2b2b] ring-0"
        }
      `}
    >
      <img
        src={PresetImg}
        className="w-24 h-24 flex items-center justify-center rounded-md"
      />

      <span className="flex flex-col justify-center items-center text-sm font-semibold">
        <h4 className="text-base">{paperName}</h4>
        <h4 className="font-medium">{`${width} x ${height} mm`}</h4>
      </span>
    </button>
  );
};

export default PresetOption;
