import { Document, Page, Font, pdf, View } from "@react-pdf/renderer";
import { generateQR } from "../utils/generateQR";
import { useState, useEffect } from "react";
import { addTrimMarksToPDF } from "../utils/TrimMarksPDFLib";
import TokenTemplate from "../utils/TokenTemplate";
import { useLayout } from "../context/LayoutProvider";
import mergePDFBuffers from "../utils/mergePDFBuffers";
import ProgressBar from "../utils/ProgressBar";
import { useRefresh } from "../context/RefreshContext";
import Toast from "../utils/Toast";

import { AnimatePresence, motion } from "framer-motion";

import montserratLight from "@fontsource/montserrat/files/montserrat-latin-300-normal.woff";
import montserratRegular from "@fontsource/montserrat/files/montserrat-latin-400-normal.woff";
import montserratSemiBold from "@fontsource/montserrat/files/montserrat-latin-600-normal.woff";
import montserratSemiBoldItalic from "@fontsource/montserrat/files/montserrat-latin-600-italic.woff";
import montserratBold from "@fontsource/montserrat/files/montserrat-latin-700-normal.woff";

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

  const usedW = cols * couponWidthPt;
  const usedH = rows * couponHeightPt;

  let marginX = Math.max(0, (paperWidthPt - usedW) / 2);
  let marginY = Math.max(0, (paperHeightPt - usedH) / 2);

  marginX -= paperWidthPt * 0.00008;
  marginY -= paperHeightPt * 0.00008;

  if (!layout.values.userMarginOverride) {
    layout.set.setLeftMargin(marginX);
    layout.set.setRightMargin(marginX);
    layout.set.setTopMargin(marginY);
    layout.set.setBottomMargin(marginY);
  }
}

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
          style={{ position: "relative" }}
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

  const cols = Math.floor(usableW / couponWidthPt);
  const rows = Math.floor(usableH / couponHeightPt);

  return cols * rows;
};

export default function GeneratePDF({ coupons, error }) {
  const { resetSignal } = useRefresh();

  const [qrList, setQrList] = useState([]);
  const [pdfBlob, setPdfBlob] = useState(null);

  const [isReady, setIsReady] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);

  const [phase, setPhase] = useState("qr");

  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

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
    layout.values.userMarginOverride,
  ]);

  // QR GENERATION
  useEffect(() => {
    const run = async () => {
      if (!coupons.length) return;

      setProgress(0);
      setPhase("qr");

      const batches = split(coupons, 100);
      const temp = [];

      for (let b of batches) {
        for (let coupon of b) {
          const qr = await generateQR(JSON.stringify(coupon || {}));
          temp.push(qr);

          setProgress(Math.round((temp.length / coupons.length) * 50));
          await new Promise((r) => setTimeout(r, 0));
        }
      }

      setQrList(temp);
      setProgress(50);
      setIsReady(true);
    };

    run();
  }, [coupons]);

  // PAGE GENERATION + MERGING
  useEffect(() => {
    const run = async () => {
      if (!isReady || qrList.length !== coupons.length) return;

      setIsGenerating(true);
      setPhase("pdf");

      const perPage = calculatePerPage(layout);
      const couponPages = split(coupons, perPage);
      const qrPages = split(qrList, perPage);

      const buffers = [];

      for (let i = 0; i < couponPages.length; i++) {
        setProgress(50 + Math.round(((i + 1) / couponPages.length) * 40));

        const blob = await pdf(
          <PDFDoc coupons={couponPages[i]} qrList={qrPages[i]} layout={layout} />
        ).toBlob();

        const raw = await blob.arrayBuffer();
        const trimmed = await addTrimMarksToPDF(raw, layout.values);
        buffers.push(trimmed);
      }

      // MERGING STEP (shown only in ProgressBar)
      setPhase("merge");
      setProgress(95);

      const merged = await mergePDFBuffers(buffers);
      setPdfBlob(new Blob([merged], { type: "application/pdf" }));

      setProgress(100);
      setIsGenerating(false);

      setToastMsg("PDF Generated!");
      setShowToast(true);
    };

    run();
  }, [isReady, qrList]);

  if (!coupons.length || error) return null;

  return (
    <div className="w-full flex flex-col items-center gap-4">
      {/* PROGRESS BAR */}
      <AnimatePresence mode="wait">
        {(phase === "qr" || phase === "pdf" || phase === "merge") && (
          <ProgressBar progress={progress} phase={phase} />
        )}
      </AnimatePresence>

      {/* DOWNLOAD BUTTON (simple, no spinner) */}
      <AnimatePresence>
        {pdfBlob && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <button
              className="w-48 h-8 flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md text-white bg-denim-600 hover:bg-denim-700 active:scale-95 transition-all"
              onClick={() => {
                const url = URL.createObjectURL(pdfBlob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "coupons.pdf";
                a.click();
                URL.revokeObjectURL(url);
              }}
            >
              Download
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <Toast
        message={toastMsg}
        show={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}