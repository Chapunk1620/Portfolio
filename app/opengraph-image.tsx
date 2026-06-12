import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Jhon Christian Solano - Full-Stack Developer";
export const size = { width: 1200, height: 630 };

export const contentType = "image/png";

export default async function Image() {
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
          background: "#0f0f1a",
          fontFamily: "Inter, system-ui",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div style={{ fontSize: 72, fontWeight: 700, color: "#e8e8e8", letterSpacing: "-2px" }}>
            <span style={{ color: "#e94560" }}>&lt;</span>
            {" "}Jhon Christian Solano{" "}
            <span style={{ color: "#e94560" }}>/&gt;</span>
          </div>
          <div style={{ fontSize: 32, color: "#888", fontFamily: "JetBrains Mono, monospace" }}>
            Full-Stack Developer
          </div>
          <div
            style={{
              marginTop: 24,
              display: "flex",
              gap: 40,
              fontSize: 20,
              color: "#666",
            }}
          >
            <span>React / Next.js</span>
            <span>Node.js / Laravel</span>
            <span>TypeScript / Python</span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
