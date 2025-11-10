import { Document, Page, View, Text, PDFDownloadLink, Image, Font, StyleSheet } from "@react-pdf/renderer";
import { generateQR } from "../utils/generateQR";
import { useState, useEffect, useRef } from "react";
import logo from "../assets/brand-logo.jpg";
import staticQr from "../assets/static-qr.png";

// Import font files from npm package
import montserratLight from "@fontsource/montserrat/files/montserrat-latin-300-normal.woff";
import montserratRegular from "@fontsource/montserrat/files/montserrat-latin-400-normal.woff";
import montserratSemiBold from "@fontsource/montserrat/files/montserrat-latin-600-normal.woff";
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

export default function GeneratePDF({ coupons }) {
  const [qrList, setQrList] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const prevCouponsRef = useRef([]);

  console.log(coupons);

  // Generate QR for ALL coupons so indexing matches across pages
  useEffect(() => {
    const loadQR = async () => {
      // Only regenerate if coupons actually changed
      if (JSON.stringify(coupons) === JSON.stringify(prevCouponsRef.current)) {
        return;
      }

      setIsReady(false);
      try {
        const qrs = await Promise.all(coupons.map((c) => generateQR(JSON.stringify(c || {}))));
        setQrList(qrs);
        prevCouponsRef.current = coupons;
        // Small delay to ensure fonts are properly loaded
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

  // Reset when coupons become empty
  useEffect(() => {
    if (coupons.length === 0) {
      setQrList([]);
      setIsReady(false);
      prevCouponsRef.current = [];
    }
  }, [coupons.length]);

  if (!isReady || !qrList.length || qrList.length !== coupons.length) {
    return <p className="text-gray-500">Preparing PDF...</p>;
  }

  const pages = chunk(coupons, 42);

  const PDFDoc = () => (
    <Document>
      {pages.map((pageCoupons, pageIndex) => (
        <Page
          key={pageIndex}
          size={{ width: 864, height: 1296 }}
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            paddingHorizontal: 15.255,
            paddingTop: 10.11,
            paddingBottom: 10.11,
            fontFamily: "Montserrat", // Apply font to entire page
          }}
        >
          {pageCoupons.map((c, i) => {
            const globalIndex = pageIndex * 42 + i;
            return (
              <View
                key={globalIndex}
                style={{
                  width: 119.07, // 42 mm
                  height: 212.63, // 75 mm
                  padding: 5, // you can convert this too if needed
                  alignItems: "center",
                  justifyContent: "flex-start",
                  borderWidth: 1,

                  // Borders only top and bottom
                  borderTopWidth: 4,
                  borderBottomWidth: 4,
                  borderColor: "#000",
                }}
              >
                {/* ✅ Crop Marks */}
                {/* Top-left */}
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: 10,
                    height: 0.5,
                    backgroundColor: "#000",
                  }}
                />
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: 0.5,
                    height: 10,
                    backgroundColor: "#000",
                  }}
                />

                {/* Top-right */}
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: 10,
                    height: 0.5,
                    backgroundColor: "#000",
                  }}
                />
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: 0.5,
                    height: 10,
                    backgroundColor: "#000",
                  }}
                />

                {/* Bottom-left */}
                <View
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: 10,
                    height: 0.5,
                    backgroundColor: "#000",
                  }}
                />
                <View
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: 0.5,
                    height: 10,
                    backgroundColor: "#000",
                  }}
                />

                {/* Bottom-right */}
                <View
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    width: 10,
                    height: 0.5,
                    backgroundColor: "#000",
                  }}
                />
                <View
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    width: 0.5,
                    height: 10,
                    backgroundColor: "#000",
                  }}
                />
                {/* Logo */}
                <Image src={logo} style={{ height: 20, marginBottom: 4 }} />

                {/* Instruction Text */}
                <Text
                  style={{
                    fontFamily: "Montserrat",
                    fontWeight: 600, // This will use Montserrat Semibold
                    fontSize: 6,
                    marginBottom: 6,
                    textAlign: "left",
                    width: "100%",
                  }}
                >
                  Scratch and scan for cashback
                </Text>

                {/* QR Code Section */}
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  {/* QR Code */}
                  {qrList[globalIndex] && (
                    <Image
                      src={qrList[globalIndex]}
                      style={{
                        width: "94%",
                        margin: 0,
                        padding: 0,
                      }}
                    />
                  )}

                  {/* Rotated Text */}
                  <Text
                    wrap={false}
                    style={{
                      fontFamily: "Montserrat",
                      fontWeight: 300, // This will use Montserrat Light
                      fontSize: 4.5,
                      position: "absolute",
                      textAlign: "center",
                      left: "55.5%",
                      transform: "rotate(-90deg)",
                      width: 94,
                    }}
                  >
                    *For Technician use only
                  </Text>
                </View>

                {/* Internal Use Text */}
                <Text
                  style={{
                    fontFamily: "Montserrat",
                    fontWeight: 300, // This will use Montserrat Light
                    fontSize: 4.5,
                    marginTop: 4,
                    textAlign: "left",
                    width: "100%",
                  }}
                >
                  *For Internal use only
                </Text>

                {/* Product Info Section */}
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    marginTop: 2,
                    gap: 5,
                  }}
                >
                  <Image src={staticQr} style={{ width: "50%" }} />
                  <View
                    style={{
                      width: "50%",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ fontFamily: "Montserrat", fontWeight: 700, fontSize: 4.5 }}>
                      <Text style={{ fontFamily: "Montserrat", fontWeight: 400, fontSize: 4.5 }}>Sku Code: </Text>
                      {"\n"}
                      <Text>{c?.["SKU Code"] || "NA"}</Text>
                    </Text>

                    <Text style={{ fontFamily: "Montserrat", fontWeight: 700, fontSize: 4.5 }}>
                      <Text style={{ fontFamily: "Montserrat", fontWeight: 400, fontSize: 4.5 }}>Sku Name: </Text>
                      {"\n"}
                      <Text>{c?.["SKU Name"] || "NA"}</Text>
                    </Text>

                    <Text style={{ fontFamily: "Montserrat", fontWeight: 700, fontSize: 4.5 }}>
                      <Text style={{ fontFamily: "Montserrat", fontWeight: 400, fontSize: 4.5 }}>Internal Code: </Text>
                      {"\n"}
                      <Text>{c?.["Internal Code"] || "NA"}</Text>
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
        </Page>
      ))}
    </Document>
  );

  return (
    <PDFDownloadLink
      document={<PDFDoc />}
      fileName="coupons.pdf"
      className="w-50 h-10 flex items-center justify-center px-4 py-2 bg-emerald-600 text-white text-sm rounded-md hover:bg-emerald-700 transition"
    >
      {({ loading }) => (loading ? "Generating PDF..." : "Download PDF")}
    </PDFDownloadLink>
  );
}
