import { useState, useCallback, useRef, useEffect } from "react";
import { CloudUpload } from "@mui/icons-material";
import ExcelJS from "exceljs";
import GeneratePDF from "./GeneratePDF";
import ErrorBoundary from "./ErrorBoundary";

export default function UploadExcel({ resetSignal, setCoupons, hasCoupons, couponsLength, coupons }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const parseExcelFile = useCallback(async (file) => {
    try {
      const workbook = new ExcelJS.Workbook();
      const buffer = await readFileAsArrayBuffer(file);
      await workbook.xlsx.load(buffer);

      const worksheet = workbook.worksheets[0];
      if (!worksheet) {
        throw new Error("No worksheets found in the Excel file");
      }

      const headers = [];
      const firstRow = worksheet.getRow(1);

      // Extract headers
      firstRow.eachCell((cell, colNumber) => {
        headers[colNumber] = cell.value?.toString().trim() || `Column${colNumber}`;
      });

      // Extract data rows
      const data = [];
      for (let rowNumber = 2; rowNumber <= worksheet.rowCount; rowNumber++) {
        const row = worksheet.getRow(rowNumber);
        const rowData = {};

        let hasData = false;
        row.eachCell((cell, colNumber) => {
          if (cell.value != null) {
            rowData[headers[colNumber]] = cell.value;
            hasData = true;
          }
        });

        if (hasData) {
          data.push(rowData);
        }
      }

      return data;
    } catch (err) {
      throw new Error(`Failed to parse Excel file: ${err.message}`);
    }
  }, []);

  const readFileAsArrayBuffer = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsArrayBuffer(file);
    });
  };

  const handleFile = useCallback(async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.name.match(/\.(xlsx|xls)$/i)) {
      setError("Pls upload a valid file (.xlsx)");

      setCoupons([]);

      // Clear the invalid file
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await parseExcelFile(file);
      setCoupons(data);
    } catch (err) {
      setError(err.message);
      setCoupons([]); // <--- important
      console.error("Error processing Excel file:", err);

      // Only clear if error
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

    } finally {
      setIsLoading(false);
    }

  }, [parseExcelFile, setCoupons]);

  useEffect(() => {
    if (resetSignal && fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [resetSignal]);


  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full p-3 pb-1 flex flex-col justify-center items-center gap-1">

        {/* it is recommended to gernerate 100 pages which is 4200 coupons at a time */}
        <input
          ref={fileInputRef}
          className="w-full h-12 p-2 flex items-center cursor-pointer bg-nero-800 border border-default-medium text-heading text-sm rounded-md focus:ring-brand focus:border-brand placeholder:text-body"
          id="file_input"
          onChange={handleFile}
          accept=".xlsx,.xls"
          disabled={isLoading}
          type="file"
        />

        {/* Shows a count of the number of coupons */}
        {!error && hasCoupons && (
          <div className="w-full flex justify-start items-center px-2">
            <h1 className="text-[14px] text-nero-300">
              {couponsLength} Coupon{couponsLength !== 1 ? "s" : ""}
            </h1>
          </div>
        )}

        {/* Error message (If something goes wrong*/}
        {error && (
          <div className="w-[90%] text-red-200 text-sm text-center py-0 px-2 rounded-md border border-red-200">
            {error}
          </div>
        )}
      </div>

      <ErrorBoundary>
        <GeneratePDF coupons={coupons} errror={error} />
      </ErrorBoundary>
    </div>
  );
}