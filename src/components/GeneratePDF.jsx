import { Document, Page, Font, pdf, View } from "@react-pdf/renderer";
import { generateQR } from "../utils/generateQR";
import { useState, useEffect } from "react";
import { addTrimMarksToPDF } from "./TrimMarksPDFLib";
import TokenTemplate from "./TokenTemplate";
import { useLayout } from "../context/LayoutProvider";
import mergePDFBuffers from "../utils/mergePDFBuffers";
import ProgressBar from "./ProgressBar";
import { useRefresh } from "../context/RefreshContext";

import { AnimatePresence, motion } from "framer-motion";

import montserratLight from "@fontsource/montserrat/files/montserrat-latin-300-normal.woff";
import montserratRegular from "@fontsource/montserrat/files/montserrat-latin-400-normal.woff";
import montserratSemiBold from "@fontsource/montserrat/files/montserrat-latin-600-normal.woff";
import montserratSemiBoldItalic from "@fontsource/montserrat/files/montserrat-latin-600-italic.woff";
import montserratBold from "@fontsource/montserrat/files/montserrat-latin-700-normal.woff";

// Register fonts
let fontsRegistered = false;
if (!fontsRegistered) {
  Font.register({
    family: "Montserrat",
    fonts: [
      { src: montserratLight, fontWeight: 300 },
      { src: montserratRegular, fontWeight: 400 },
      { src: montserratSemiBold, fontWeight: 600 },
      { src: montserratSemiBoldItalic, fontWeight: 600, fontStyle: "italic" },
      { src: montserratBold, fontWeight: 700 },
    ],
  });
  fontsRegistered = true;
}

const DownloadButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="w-48 h-8 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md text-white bg-denim-600 hover:bg-denim-700 active:scale-95"
  >
    Download
  </button>
);

// ----------------------------
// Auto Margin Logic
// ----------------------------
function computeAutoMargins(layout) {
  const {
    paperWidthPt,
    paperHeightPt,
    couponWidthPt,
    couponHeightPt,
  } = layout.values;

  if (!paperWidthPt || !paperHeightPt || !couponWidthPt || !couponHeightPt) return;

  const cols = Math.floor(paperWidthPt / couponWidthPt);
  const rows = Math.floor(paperHeightPt / couponHeightPt);

  const fullWidth = cols * couponWidthPt;
  const fullHeight = rows * couponHeightPt;

  let marginX = (paperWidthPt - fullWidth) / 2;
  let marginY = (paperHeightPt - fullHeight) / 2;

  marginX = Math.max(0, Math.round(marginX * 10) / 10);
  marginY = Math.max(0, Math.round(marginY * 10) / 10);

  marginX = 10;
  marginX = 15;
  
  layout.set.setLeftMargin(marginX);
  layout.set.setRightMargin(marginX);
  layout.set.setTopMargin(marginY);
  layout.set.setBottomMargin(marginY);
}

// ----------------------------
// ABSOLUTE GRID PDF RENDERER
// ----------------------------
const PDFDoc = ({ coupons, qrList, layout }) => {
  const { values } = layout;
  const {
    paperWidthPt,
    paperHeightPt,
    couponWidthPt,
    couponHeightPt,
    leftMargin,
    rightMargin,
    topMargin,
    bottomMargin,
    fontScale,
  } = values;

  const usableW = paperWidthPt - leftMargin - rightMargin;
  const usableH = paperHeightPt - topMargin - bottomMargin;

  const columns = Math.max(1, Math.floor(usableW / couponWidthPt));
  const rows = Math.max(1, Math.floor(usableH / couponHeightPt));
  const perPage = columns * rows;

  // Split pages
  const pages = [];
  for (let i = 0; i < coupons.length; i += perPage) {
    pages.push(coupons.slice(i, i + perPage));
  }

  return (
    <Document>
      {pages.map((pageCoupons, pIndex) => (
        <Page
          key={pIndex}
          size={{ width: paperWidthPt, height: paperHeightPt }}
          style={{
            position: "relative",
            width: paperWidthPt,
            height: paperHeightPt,

            // NO FLEX — PERFECT precision
            padding: 0,
            margin: 0,
          }}
        >

          {pageCoupons.map((coupon, i) => {
            const globalIndex = pIndex * perPage + i;

            const row = Math.floor(i / columns);
            const col = i % columns;

            const x = leftMargin + col * couponWidthPt;
            const y = topMargin + row * couponHeightPt;

            return (
              <View
                key={i}
                style={{
                  position: "absolute",
                  left: x,
                  top: y,
                  width: couponWidthPt,
                  height: couponHeightPt,
                }}
              >
                <TokenTemplate
                  coupon={coupon}
                  qrCode={qrList[globalIndex]}
                  couponWidthPt={couponWidthPt}
                  couponHeightPt={couponHeightPt}
                  fontSize={5 * fontScale}
                />
              </View>
            );
          })}

        </Page>
      ))}
    </Document>
  );
};

// ----------------------------
const split = (arr, size) => {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
};

const calculatePerPage = (layout) => {
  const {
    paperWidthPt,
    paperHeightPt,
    couponWidthPt,
    couponHeightPt,
    leftMargin,
    rightMargin,
    topMargin,
    bottomMargin,
  } = layout.values;

  const usableW = paperWidthPt - leftMargin - rightMargin;
  const usableH = paperHeightPt - topMargin - bottomMargin;

  const cols = Math.max(1, Math.floor(usableW / couponWidthPt));
  const rows = Math.max(1, Math.floor(usableH / couponHeightPt));

  return cols * rows;
};

// ----------------------------
// MAIN COMPONENT
// ----------------------------
export default function GeneratePDF({ coupons, error }) {
  const { resetSignal } = useRefresh();

  const [qrList, setQrList] = useState([]);
  const [pdfBlob, setPdfBlob] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("qr");

  const layout = useLayout();

  useEffect(() => {
    setProgress(0);
    setPhase("qr");
    setPdfBlob(null);
    setQrList([]);
    setIsReady(false);
    setIsGenerating(false);
  }, [resetSignal]);

  useEffect(() => {
    computeAutoMargins(layout);
  }, [
    layout.values.paperWidthPt,
    layout.values.paperHeightPt,
    layout.values.couponWidthPt,
    layout.values.couponHeightPt,
  ]);

  // QR GENERATION
  useEffect(() => {
    const generateQRs = async () => {
      if (coupons.length === 0) return;

      setProgress(0);
      setPhase("qr");

      const OUTER = 100;
      const YIELD = 10;

      const batches = split(coupons, OUTER);
      const temp = [];

      for (let b = 0; b < batches.length; b++) {
        const batch = batches[b];

        for (let i = 0; i < batch.length; i++) {
          const qr = await generateQR(JSON.stringify(batch[i] || {}));
          temp.push(qr);

          if (i % YIELD === 0) {
            const pct = Math.round((temp.length / coupons.length) * 50);
            setProgress(pct);
            await new Promise((r) => setTimeout(r, 0));
          }
        }
      }

      setQrList(temp);
      setProgress(50);
      setIsReady(true);
    };

    generateQRs();
  }, [coupons]);

  // PDF GENERATION
  useEffect(() => {
    const generatePDF = async () => {
      if (!isReady || qrList.length !== coupons.length) return;

      setIsGenerating(true);
      setPhase("pdf");

      const perPage = calculatePerPage(layout);
      const couponPages = split(coupons, perPage);
      const qrPages = split(qrList, perPage);

      const buffers = [];

      for (let i = 0; i < couponPages.length; i++) {
        const pct = 50 + Math.round(((i + 1) / couponPages.length) * 50);
        setProgress(pct);

        await new Promise((r) => setTimeout(r, 0));

        const blob = await pdf(
          <PDFDoc coupons={couponPages[i]} qrList={qrPages[i]} layout={layout} />
        ).toBlob();

        const raw = await blob.arrayBuffer();
        const trimmed = await addTrimMarksToPDF(raw, layout.values);

        buffers.push(trimmed);
      }

      const merged = await mergePDFBuffers(buffers);
      setPdfBlob(new Blob([merged], { type: "application/pdf" }));

      setIsGenerating(false);
      setProgress(100);
    };

    generatePDF();
  }, [isReady, qrList]);

  const handleDownload = () => {
    const url = URL.createObjectURL(pdfBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "coupons.pdf";
    a.click();
    URL.revokeObjectURL(url);
  };

  if (coupons.length === 0 || error) return null;

  return (
    <div className="w-full flex flex-col items-center gap-4">

      <AnimatePresence mode="wait">
        {(phase === "qr" || phase === "pdf") && (
          <ProgressBar key="loader" progress={progress} phase={phase} />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {pdfBlob && (
          <motion.div
            key="downloadBtn"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <DownloadButton onClick={handleDownload} />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}