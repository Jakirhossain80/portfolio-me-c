import { ImageResponse } from "next/og";
import { profile } from "@/lib/data";
import { getInitials } from "@/lib/seo";

export const alt = `${profile.name} — ${profile.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadManrope(weight: 500 | 800, text: string) {
  const css = await (
    await fetch(
      `https://fonts.googleapis.com/css2?family=Manrope:wght@${weight}&text=${encodeURIComponent(text)}`
    )
  ).text();
  const match = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/);
  if (!match) throw new Error("Could not resolve Manrope font URL");
  const res = await fetch(match[1]);
  return res.arrayBuffer();
}

export default async function Image() {
  const initials = getInitials(profile.name);
  const [manropeBold, manropeMedium] = await Promise.all([
    loadManrope(800, `${initials}${profile.name}`),
    loadManrope(500, profile.title),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0B0F14",
          padding: "72px 88px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 60,
              height: 60,
              borderRadius: 16,
              backgroundColor: "#14B8A6",
              color: "#0B0F14",
              fontSize: 26,
              fontFamily: "Manrope",
              fontWeight: 800,
            }}
          >
            {initials}
          </div>
          <div
            style={{
              fontSize: 22,
              color: "#8B96A5",
              letterSpacing: 3,
              textTransform: "uppercase",
            }}
          >
            Portfolio
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 68,
              fontFamily: "Manrope",
              fontWeight: 800,
              color: "#EDEFF2",
              lineHeight: 1.15,
            }}
          >
            {profile.name}
          </div>
          <div
            style={{
              marginTop: 20,
              fontSize: 34,
              fontFamily: "Manrope",
              fontWeight: 500,
              color: "#14B8A6",
            }}
          >
            {profile.title}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 44, height: 4, borderRadius: 2, backgroundColor: "#14B8A6" }} />
          <div style={{ fontSize: 20, color: "#8B96A5" }}>{profile.location}</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Manrope", data: manropeBold, weight: 800, style: "normal" },
        { name: "Manrope", data: manropeMedium, weight: 500, style: "normal" },
      ],
    }
  );
}
