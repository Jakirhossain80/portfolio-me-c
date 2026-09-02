import { ImageResponse } from "next/og";
import { profile } from "@/lib/data";
import { getInitials } from "@/lib/seo";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0B0F14",
          color: "#14B8A6",
          fontSize: 16,
          fontWeight: 700,
        }}
      >
        {getInitials(profile.name)}
      </div>
    ),
    { ...size }
  );
}
