"use client";

"use client";

import { useEffect, useMemo, useState } from "react";
import { useTheme } from "next-themes";
import { Cloud, ICloud } from "react-icon-cloud";

export const cloudProps: Omit<ICloud, "children"> = {
  containerProps: {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
    },
  },
  options: {
    reverse: true,
    depth: 1,
    wheelZoom: false,
    imageScale: 2,
    activeCursor: "default",
    tooltip: "native",
    initial: [0.1, -0.1],
    clickToFront: 500,
    tooltipDelay: 0,
    outlineColour: "#0000",
    maxSpeed: 0.04,
    minSpeed: 0.02,
  },
};

export const renderCustomImage = (image: ImageItem, theme: string) => {
  return (
    <a
      href={image.link}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.preventDefault()}
    >
      <img
        src={image.src}
        alt={image.alt}
        width={image.width || 72}
        height={image.height || 72}
        style={{
          filter: theme === "dark" ? "brightness(1.2)" : "none",
        }}
      />
    </a>
  );
};

export type ImageItem = {
  src: string;
  alt: string;
  link?: string;
  width?: number;
  height?: number;
};

export type DynamicCloudProps = {
  images: ImageItem[];
};

export default function ImageCloud({ images }: DynamicCloudProps) {
  const { theme } = useTheme();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const renderedImages = useMemo(() => {
    return images.map((image) => 
      renderCustomImage(image, theme || 'light')
    );
  }, [images, theme]);

  if (!isClient) {
    return null; // or a loading state
  }

  return (
    // @ts-expect-error - Cloud is not typed
    <Cloud {...cloudProps}>
      <>{renderedImages}</>
    </Cloud>
  );
}