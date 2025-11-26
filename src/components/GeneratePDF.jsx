import { Document, Page, Font, pdf } from "@react-pdf/renderer";
import { generateQR } from "../utils/generateQR";
import { useState, useEffect, useRef } from "react";
import { addTrimMarksToPDF } from "./TrimMarksPDFLib";
import TokenTemplate from "./TokenTemplate";
import { useLayout } from "../context/LayoutProvider"

// Import font files from npm package
import montserratLight from "@fontsource/montserrat/files/montserrat-latin-300-normal.woff";
import montserratRegular from "@fontsource/montserrat/files/montserrat-latin-400-normal.woff";
import montserratSemiBold from "@fontsource/montserrat/files/montserrat-latin-600-normal.woff";
import montserratSemiBoldItalic from "@fontsource/montserrat/files/montserrat-latin-600-italic.woff";
import montserratBold from "@fontsource/montserrat/files/montserrat-latin-700-normal.woff";

// Register Montserrat font with React PDF - only once
let fontsRegistered = false;
if (!fontsRegistered) {
  Font.register({
    family: "Montserrat",
    fonts: [
      {
        src: montserratLight,
        fontWeight: 300, // Light
      },
      {
        src: montserratRegular,
        fontWeight: 400, // Regular
      },
      {
        src: montserratSemiBold,
        fontWeight: 600, // Semi-bold
      },
      {
        src: montserratSemiBoldItalic,
        fontWeight: 600, // Semi-bold Italic
        fontStyle: "italic",
      },
      {
        src: montserratBold,
        fontWeight: 700, // Bold
      },
    ],
  });
  fontsRegistered = true;
}

// Utility function to chunk array
const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) => arr.slice(i * size, i * size + size));

const LoadingSpinner = ({ message, className = "" }) => (
  <button
    disabled
    className={`w-48 h-8 flex items-center justify-center gap-2 bg-gray-400 text-white text-sm font-medium rounded-md cursor-not-allowed ${className}`}
  >
    <span className="inline-block w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
    <span>{message}</span>
  </button>
);

const DownloadButton = ({ onClick, disabled, isLoading }) => {
  if (isLoading) {
    return (
      <button
        disabled
        className="w-48 h-8 flex items-center justify-center gap-2 bg-gray-400 text-white text-sm font-medium rounded-md cursor-not-allowed"
      >
        <span className="inline-block w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
        <span>Generating PDF...</span>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-48 h-8 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md text-white transition-all
        ${disabled ? "bg-gray-400 cursor-not-allowed" : "bg-denim-600 hover:bg-denim-700 active:scale-95"}`}
    >
      Download
    </button>
  );
};

const PDFDoc = ({ coupons, qrList, layout }) => {
  const { paperWidthPt, paperHeightPt, couponWidthPt, couponHeightPt } = layout;

  console.log(`paper width: ${paperWidthPt}, paper height: ${paperHeightPt}, coupon width: ${couponWidthPt}, coupon height:${couponHeightPt}`);

  return (
    <Document>
      {chunk(coupons, 42).map((pageCoupons, pageIndex) => (
        <Page
          key={pageIndex}
          size={{ width: paperWidthPt, height: paperHeightPt }} // 12 x 18 in (for testing)
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            paddingHorizontal: 15.255,
            paddingTop: 10.11,
            paddingBottom: 10.11,
            fontFamily: "Montserrat",
          }}
        >
          {pageCoupons.map((coupon, index) => {
            const globalIndex = pageIndex * 42 + index;

            return (
              <TokenTemplate
                key={globalIndex}
                coupon={coupon}
                qrCode={qrList[globalIndex]}
                couponWidthPt={couponWidthPt}
                couponHeightPt={couponHeightPt}
                globalIndex={globalIndex}
              />
            );
          })}
        </Page>
      ))}
    </Document>
  );
};

export default function GeneratePDF({ coupons, error }) {
  const [qrList, setQrList] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [pdfBlob, setPdfBlob] = useState(null);
  const prevCouponsRef = useRef([]);

  let layout = useLayout()
  // console.log(coupons); --> For testing of coupon data

  // Generate QR for ALL coupons so indexing matches across pages
  useEffect(() => {
    if (coupons.length === 0) {
      prevCouponsRef.current = [];   // reset internal cache
    }
  }, [coupons]);

  useEffect(() => {
    const loadQR = async () => {
      setIsReady(false);

      try {
        const qrs = await Promise.all(
          coupons.map(c => generateQR(JSON.stringify(c || {})))
        );

        setQrList(qrs);
        prevCouponsRef.current = coupons;

        setTimeout(() => setIsReady(true), 100);
      } catch (error) {
        console.error("Error generating QR codes:", error);
        setIsReady(true);
      }
    };

    if (coupons.length > 0) {
      loadQR();
    } else {
      setQrList([]);
      setIsReady(false);
    }
  }, [coupons]);


  // Generate PDF when ready
  useEffect(() => {
    const generatePDFWhenReady = async () => {
      if (isReady && qrList.length === coupons.length && coupons.length > 0) {
        setIsGenerating(true);
        try {
          const blob = await pdf(<PDFDoc coupons={coupons} qrList={qrList} layout={layout} />).toBlob();
          const arrayBuffer = await blob.arrayBuffer();
          const pdfWithTrimMarks = await addTrimMarksToPDF(arrayBuffer);
          setPdfBlob(new Blob([pdfWithTrimMarks], { type: "application/pdf" }));
        } catch (error) {
          console.error("Error pre-generating PDF:", error);
        } finally {
          setIsGenerating(false);
        }
      } else {
        setPdfBlob(null);
      }
    };

    generatePDFWhenReady();
  }, [isReady, qrList, coupons]);

  const handleDownload = () => {
    if (!pdfBlob) return;

    const url = URL.createObjectURL(pdfBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "coupons.pdf";
    link.click();
    URL.revokeObjectURL(url);
  };

  // Before uploading Excel (coupons empty)
  if (coupons.length === 0 || error) {
    return <DownloadButton onClick={handleDownload} disabled={true} isLoading={false} />;
  }

  // QRs not ready yet → show spinner
  if (!isReady || qrList.length !== coupons.length) {
    return <LoadingSpinner message="Generating QR..." />;
  }

  // PDF is generating → spinner inside button
  if (isGenerating) {
    return <DownloadButton onClick={handleDownload} disabled={!pdfBlob} isLoading={true} />;
  }

  // Final normal state
  return <DownloadButton onClick={handleDownload} disabled={!pdfBlob} isLoading={false} />;

}
