import { PDFDocument, rgb } from "pdf-lib";

/**
 * pdfBytes: original PDF buffer
 * layout: layout.values passed from React
 */
export const addTrimMarksToPDF = async (pdfBytes, layout) => {
  try {
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const pages = pdfDoc.getPages();

    const {
      paperWidthPt,
      paperHeightPt,
      couponWidthPt,
      couponHeightPt,
      leftMargin,
      rightMargin,
      topMargin,
      bottomMargin,
    } = layout;

    pages.forEach((page) => {
      addDynamicTrimMarks(
        page,
        paperWidthPt,
        paperHeightPt,
        couponWidthPt,
        couponHeightPt,
        leftMargin,
        rightMargin,
        topMargin,
        bottomMargin
      );
    });

    return await pdfDoc.save();
  } catch (err) {
    console.error("Trim mark error:", err);
    throw err;
  }
};

const addDynamicTrimMarks = (
  page,
  pageWidth,
  pageHeight,
  couponWidth,
  couponHeight,
  leftMargin,
  rightMargin,
  topMargin,
  bottomMargin
) => {
  const thickness = 0.7;
  const len = 12; // trim mark length

  const usableWidth = pageWidth - leftMargin - rightMargin;
  const usableHeight = pageHeight - topMargin - bottomMargin;

  const columns = Math.floor(usableWidth / couponWidth);
  const rows = Math.floor(usableHeight / couponHeight);

  // ---------------------------------------------------------
  // VERTICAL trim marks beside coupon columns
  // ---------------------------------------------------------
  for (let c = 0; c <= columns; c++) {
    const x = leftMargin + c * couponWidth;

    // Upper small mark near the coupon top
    page.drawLine({
      start: { x, y: topMargin - len },
      end: { x, y: topMargin },
      thickness,
      color: rgb(0, 0, 0),
    });

    // Lower small mark near the coupon bottom
    const yBottom = topMargin + rows * couponHeight;
    page.drawLine({
      start: { x, y: yBottom },
      end: { x, y: yBottom + len },
      thickness,
      color: rgb(0, 0, 0),
    });
  }

  // ---------------------------------------------------------
  // HORIZONTAL trim marks beside coupon rows
  // ---------------------------------------------------------
  for (let r = 0; r <= rows; r++) {
    const y = topMargin + r * couponHeight;

    // Left side mark (near coupons)
    page.drawLine({
      start: { x: leftMargin - len, y },
      end: { x: leftMargin, y },
      thickness,
      color: rgb(0, 0, 0),
    });

    // Right side mark
    const xRight = leftMargin + columns * couponWidth;
    page.drawLine({
      start: { x: xRight, y },
      end: { x: xRight + len, y },
      thickness,
      color: rgb(0, 0, 0),
    });
  }
};
