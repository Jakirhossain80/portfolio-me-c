"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";
import { getInitials } from "@/lib/seo";

type ImageWithFallbackProps = ImageProps & {
  alt: string;
};

/** Renders `next/image`, falling back to an accent-colored initials monogram
 * (derived from `alt`) if the source fails to load — e.g. a moved/deleted
 * file — instead of a broken-image icon. Reusable for any future image
 * (project screenshots, etc.), not just the Hero photo. */
export default function ImageWithFallback({
  alt,
  className,
  width,
  height,
  onError,
  ...rest
}: ImageWithFallbackProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={[
          "flex items-center justify-center bg-surface font-heading font-bold text-accent",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        style={{ width, height }}
      >
        {getInitials(alt)}
      </div>
    );
  }

  return (
    <Image
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={(event) => {
        setFailed(true);
        onError?.(event);
      }}
      {...rest}
    />
  );
}
