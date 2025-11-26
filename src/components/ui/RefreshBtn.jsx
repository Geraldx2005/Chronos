import AutorenewIcon from "@mui/icons-material/Autorenew";

function RefreshBtn({ handleRefresh }) {

  return (
    <button
      onClick={handleRefresh}
      className="flex justify-center items-center w-full h-10 bg-nero-750 border border-nero-600 text-nero-100 font-bold rounded-md transition-all duration-200 hover:bg-nero-700"
    >
      <AutorenewIcon fontSize="medium" className="text-nero-400" />
      <span className="text-sm text-nero-400 font-medium pl-1">Reset</span>
    </button>
  );
}

export default RefreshBtn;
