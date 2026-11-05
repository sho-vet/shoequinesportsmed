import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const logoBase64 = readFileSync(join(process.cwd(), "public/brand/logo-mark.png")).toString("base64");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ffffff",
          color: "#0B1F3A",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`data:image/png;base64,${logoBase64}`} width={140} height={140} alt="" />
        <div style={{ fontSize: 48, fontWeight: 700, marginTop: 24, letterSpacing: 1 }}>
          SHO Equine Sports Medicine
        </div>
        <div style={{ fontSize: 24, letterSpacing: 6, textTransform: "uppercase", marginTop: 14, color: "#C17A56" }}>
          Medicina Deportiva Equina
        </div>
      </div>
    ),
    { ...size }
  );
}
