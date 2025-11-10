import { CheckCircle, InsertDriveFile } from "@mui/icons-material";

export default function UploadedFileName({ fileName }) {
  if (!fileName) return null;

  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-md">
      <div className="flex items-center gap-2 flex-1">
        <CheckCircle className="text-emerald-600" fontSize="small" />
        <InsertDriveFile className="text-emerald-700" fontSize="small" />
        <span className="text-emerald-800 font-medium text-sm truncate max-w-xs">
          {fileName}
        </span>
      </div>
      
    </div>
  );
}