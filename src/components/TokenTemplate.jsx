// components/TokenTemplate.jsx
import { View, Text, Image } from "@react-pdf/renderer";
import logo from "../assets/brand-logo.jpg";
import staticQr from "../assets/static-qr.png";
import TechUseTxt from "../assets/tech-use.png";

const TokenTemplate = ({ coupon, qrCode, couponWidthPt, couponHeightPt, fontSize, }) => {
  // Safe scaling multipliers
  const headingSize = fontSize * 1.27;
  const smallText = fontSize * 0.89;
  // const labelSize = fontSize * 1.05;
  const italicLabel = fontSize * 0.91;
  const valueSize = fontSize * 0.91;

  return (
    <View
      wrap={false}
      style={{
        width: couponWidthPt,
        height: couponHeightPt,
        padding: 5,
        paddingTop: 6,
        paddingBottom: 8,
        alignItems: "center",
        justifyContent: "flex-start",
        borderWidth: 0.75,
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderColor: "#000",
        display: "flex",
      }}
    >
      {/* Logo */}
      <Image src={logo} style={{ height: 20, marginBottom: 4 }} />

      {/* Heading */}
      <Text
        style={{ fontFamily: "Montserrat", fontWeight: 600, fontSize: headingSize, marginBottom: 4, textAlign: "left", width: "100%", }}>
        Scratch and scan for cashback
      </Text>

      {/* QR + Tech Label */}
      <View
        style={{ width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "center", }}>
        {/* QR Area */}
        <View
          style={{ width: "92%", height: "100%", alignItems: "center", justifyContent: "center", }}>
          {qrCode && (
            <Image src={qrCode} style={{ width: "100%", margin: 0, padding: 0 }} />
          )}
        </View>

        {/* Tech Label Image */}
        <View
          style={{ width: "8%", height: "100%", display: "flex", justifyContent: "center", alignItems: "flex-end", }}>
          <Image src={TechUseTxt} style={{ width: "60%", margin: 0, padding: 0 }} />
        </View>
      </View>

      {/* Bottom */}
      <View
        style={{ width: "100%", flexDirection: "row", alignItems: "flex-start", justifyContent: "center", marginTop: 4, flex: 1, }}>
        {/* LEFT */}
        <View
          style={{ width: "50%", height: "100%", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingRight: 5, gap: 1, }}>
          <Text
            style={{ fontFamily: "Montserrat", fontWeight: 600, fontSize: smallText, }} >
            *For Internal use only
          </Text>

          <Image src={staticQr} style={{ width: "100%" }} />
        </View>

        {/* RIGHT */}
        <View
          style={{ width: "50%", height: "100%", paddingLeft: 4, flexDirection: "column", alignItems: "flex-start", justifyContent: "space-between", }}>
          {/* SKU Code */}
          <Text
            style={{ fontFamily: "Montserrat", fontWeight: 700, fontSize: valueSize, }}>
            <Text
              style={{ fontFamily: "Montserrat", fontWeight: 600, fontStyle: "italic", fontSize: italicLabel, }}>
              SKU Code
            </Text>
            {"\n"}
            <Text>
              {(coupon?.["Product Code"] || "").slice(0, 8)}
              {"\n"}
              {(coupon?.["Product Code"] || "").slice(8)}
            </Text>
          </Text>

          {/* SKU Name */}
          <Text
            style={{ fontFamily: "Montserrat", fontWeight: 700, fontSize: valueSize, }}>
            <Text
              style={{ fontFamily: "Montserrat", fontWeight: 600, fontStyle: "italic", fontSize: italicLabel, }}>
              SKU Name
            </Text>
            {"\n"}
            <Text>
              {(coupon?.["Product Description"] || "").slice(0, 12)}
              {"\n"}
              {(coupon?.["Product Description"] || "").slice(13)}
            </Text>
          </Text>

          {/* Internal Code */}
          <Text
            style={{ fontFamily: "Montserrat", fontWeight: 700, fontSize: valueSize, }}>
            <Text
              style={{ fontFamily: "Montserrat", fontWeight: 600, fontStyle: "italic", fontSize: italicLabel, }}>
              Internal Code
            </Text>
            {"\n"}
            <Text>
              {(coupon?.["Internal Code"] || "").slice(0, 13)}
              {"\n"}
              {(coupon?.["Internal Code"] || "").slice(13)}
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default TokenTemplate;
