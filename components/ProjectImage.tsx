"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useState } from "react";

type ProjectImageProps = Omit<ImageProps, "src" | "alt" | "onError"> & {
  src: string;
  alt: string;
};

/** Keeps missing project screenshots from rendering a broken-image state. */
export default function ProjectImage({ src, alt, className, ...props }: ProjectImageProps) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  if (failed) {
    return (
      <div
        className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br from-dark-mid via-dark-surface to-accent-red/20 ${className ?? ""}`}
        role="img"
        aria-label={`${alt} unavailable`}
      >
        <div className="px-4 text-center">
          <span className="mb-2 block text-2xl text-accent-red" aria-hidden="true">⌁</span>
          <span className="text-xs font-mono uppercase tracking-wider text-text-muted">Preview unavailable</span>
        </div>
      </div>
    );
  }

  return <Image src={src} alt={alt} className={className} onError={() => setFailed(true)} {...props} />;
}
