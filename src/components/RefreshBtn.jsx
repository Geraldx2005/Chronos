import AutorenewIcon from "@mui/icons-material/Autorenew";

function RefreshBtn({ handleRefresh }) {

  return (
    <button
      onClick={handleRefresh}
      className="bg-emerald-100 border border-emerald-700 text-emerald-700 font-bold py-2 px-4 rounded-md transition-all duration-200 hover:bg-emerald-200"
    >
      <AutorenewIcon />
    </button>
  );
}

export default RefreshBtn;
