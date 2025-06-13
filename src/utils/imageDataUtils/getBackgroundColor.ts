import getBackground from "./getBackground";

export default function getBackgroundColor(imageData: ImageData): string {
  const backgroundColor = getBackground(imageData);
  return `#${backgroundColor[0].toString(16).padEnd(2, "0")}${backgroundColor[1].toString(16).padEnd(2, "0")}${backgroundColor[2].toString(16).padEnd(2, "0")}`;
}
