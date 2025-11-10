// TrimMarksPDFLib.jsx
import { PDFDocument, rgb } from 'pdf-lib';

export const addTrimMarksToPDF = async (pdfBytes) => {
  try {
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const pages = pdfDoc.getPages();

    pages.forEach((page) => {
      const { width, height } = page.getSize();
      
      // Add trim marks to each page
      addPageTrimMarks(page, width, height);
    });

    return await pdfDoc.save();
  } catch (error) {
    console.error('Error adding trim marks:', error);
    throw error;
  }
};

const addPageTrimMarks = (page, pageWidth, pageHeight) => {
  const markThickness = 0.5;
  const horizontalPadding = 15.255;
  const verticalPadding = 10.11;
  const couponWidth = 119.07;
  const couponHeight = 212.63;
  
  // Different lengths for horizontal and vertical crop marks
  const horizontalMarkLength = 10.11; // For vertical crop marks (top/bottom)
  const verticalMarkLength = 15.255;  // For horizontal crop marks (left/right)

  // Calculate number of coupons per row and column
  const couponsPerRow = Math.floor((pageWidth - (2 * horizontalPadding)) / couponWidth);
  const couponsPerColumn = Math.floor((pageHeight - (2 * verticalPadding)) / couponHeight);
  
  // Top and bottom vertical crop marks
  for (let i = 0; i <= couponsPerRow; i++) {
    const x = horizontalPadding + (i * couponWidth);
    
    // Draw vertical crop mark at top (using horizontalMarkLength)
    page.drawLine({
      start: { x: x, y: pageHeight },
      end: { x: x, y: pageHeight - horizontalMarkLength },
      thickness: markThickness,
      color: rgb(0, 0, 0),
    });

    // Draw vertical crop mark at bottom (using horizontalMarkLength)
    page.drawLine({
      start: { x: x, y: 0 },
      end: { x: x, y: horizontalMarkLength },
      thickness: markThickness,
      color: rgb(0, 0, 0),
    });
  }

  // Left and right horizontal crop marks
  for (let i = 0; i <= couponsPerColumn; i++) {
    const y = verticalPadding + (i * couponHeight);
    
    // Draw horizontal crop mark at left (using verticalMarkLength)
    page.drawLine({
      start: { x: 0, y: y },
      end: { x: verticalMarkLength, y: y },
      thickness: markThickness,
      color: rgb(0, 0, 0),
    });

    // Draw horizontal crop mark at right (using verticalMarkLength)
    page.drawLine({
      start: { x: pageWidth - verticalMarkLength, y: y },
      end: { x: pageWidth, y: y },
      thickness: markThickness,
      color: rgb(0, 0, 0),
    });
  }

  // Corner trim marks
  const corners = [
    // Top-left
    { x: 0, y: pageHeight },
    // Top-right
    { x: pageWidth, y: pageHeight },
    // Bottom-left
    { x: 0, y: 0 },
    // Bottom-right
    { x: pageWidth, y: 0 },
  ];

  // Draw corner marks
  corners.forEach((corner) => {
    // Horizontal marks (using verticalMarkLength)
    page.drawLine({
      start: { x: corner.x - verticalMarkLength, y: corner.y },
      end: { x: corner.x + verticalMarkLength, y: corner.y },
      thickness: markThickness,
      color: rgb(0, 0, 0),
    });

    // Vertical marks (using horizontalMarkLength)
    page.drawLine({
      start: { x: corner.x, y: corner.y - horizontalMarkLength },
      end: { x: corner.x, y: corner.y + horizontalMarkLength },
      thickness: markThickness,
      color: rgb(0, 0, 0),
    });
  });
};