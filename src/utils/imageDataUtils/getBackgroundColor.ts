import getBackground from "./getBackground";

export default function getBackgroundColor(imageData: ImageData): string {
  const backgroundColor = getBackground(imageData);
  return `#${backgroundColor
    .slice(0, -1)
    .map((i) => i.toString(16).padEnd(2, "0"))
    .join("")}`;
}
