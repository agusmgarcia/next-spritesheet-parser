// eslint-disable-next-line project-structure/independent-modules
import { getBackground } from "../getBackground";
import { type Input, type Output } from "./getBackgroundColor.types";

export default function getBackgroundColor(...[imageData]: Input): Output {
  const backgroundColor = getBackground(imageData);
  return `#${backgroundColor
    .slice(0, -1)
    .map((i: number) => i.toString(16).padEnd(2, "0"))
    .join("")}`;
}
