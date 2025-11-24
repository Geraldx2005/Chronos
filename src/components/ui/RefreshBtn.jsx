import AutorenewIcon from "@mui/icons-material/Autorenew";

function RefreshBtn({ handleRefresh }) {

  return (
    <button
      onClick={handleRefresh}
      className="flex justify-center items-center w-full h-8 bg-nero-750 border border-nero-600 text-nero-100 font-bold rounded-md transition-all duration-200 hover:bg-nero-700"
    >
      <AutorenewIcon fontSize="small" />
    </button>
  );
}

export default RefreshBtn;
