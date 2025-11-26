// components/TokenTemplate.jsx
import { View, Text, Image } from "@react-pdf/renderer";
import logo from "../assets/brand-logo.jpg";
import staticQr from "../assets/static-qr.png";
import TopLine from "../assets/Top-line.png";

const TokenTemplate = ({ coupon, qrCode, couponWidthPt, couponHeightPt }) => (
    <View
        style={{
            width: couponWidthPt,
            height: couponHeightPt,
            // height: 119.05511811059999,
            // width: 212.5984251975,
            // width: 119.05511811059999,
            // height: 212.5984251975,
            // width: 119.07, // 42 mm
            // height: 212.63, // 75 mm
            padding: 5,
            paddingTop: 6,
            paddingBottom: 8,
            alignItems: "center",
            justifyContent: "flex-start",
            borderWidth: 0.75,
            borderTopWidth: 0,
            borderBottomWidth: 0,
            borderColor: "#000",
            display: "flex",
        }}
    >
        <Image src={TopLine} style={{ width: 119.07, position: "absolute", top: 0 }} />
        <Image src={logo} style={{ height: 20, marginBottom: 4 }} />

        <Text
            style={{
                fontFamily: "Montserrat",
                fontWeight: 600,
                fontSize: 6.3,
                marginBottom: 4,
                textAlign: "left",
                width: "100%",
            }}
        >
            Scratch and scan for cashback
        </Text>

        <View
            style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
            }}
        >
            {qrCode && (
                <Image
                    src={qrCode}
                    style={{
                        width: "92%",
                        margin: 0,
                        padding: 0,
                    }}
                />
            )}

            <Text
                wrap={false}
                style={{
                    fontFamily: "Montserrat",
                    fontWeight: 600,
                    fontSize: 5,
                    position: "absolute",
                    textAlign: "center",
                    left: "54.5%",
                    transform: "rotate(-90deg)",
                    width: 94,
                }}
            >
                *For Technician use only
            </Text>
        </View>

        <View
            style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "center",
                marginTop: 4,
                flex: 1,
            }}
        >
            {/* LEFT PART */}
            <View
                style={{
                    width: "50%",
                    height: "100%",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingRight: 5,
                    gap: 1,
                }}
            >
                <Text
                    style={{
                        fontFamily: "Montserrat",
                        fontWeight: 600,
                        fontSize: 4.4,
                    }}
                >
                    *For Internal use only
                </Text>

                <Image src={staticQr} style={{ width: "100%" }} />
            </View>

            {/* RIGHT PART */}
            <View
                style={{
                    width: "50%",
                    height: "100%",
                    paddingLeft: 4,
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                }}
            >
                {/* SKU Code */}
                <Text style={{ fontFamily: "Montserrat", fontWeight: 700, fontSize: 4.5 }}>
                    <Text style={{ fontFamily: "Montserrat", fontWeight: 600, fontStyle: "italic", fontSize: 4.5 }}>
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
                <Text style={{ fontFamily: "Montserrat", fontWeight: 700, fontSize: 4.5 }}>
                    <Text style={{ fontFamily: "Montserrat", fontWeight: 600, fontStyle: "italic", fontSize: 4.5 }}>
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
                <Text style={{ fontFamily: "Montserrat", fontWeight: 700, fontSize: 4.5 }}>
                    <Text style={{ fontFamily: "Montserrat", fontWeight: 600, fontStyle: "italic", fontSize: 4.5 }}>
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

        <Image src={TopLine} style={{ width: 119.07, position: "absolute", bottom: 0 }} />
    </View>
);

export default TokenTemplate;
