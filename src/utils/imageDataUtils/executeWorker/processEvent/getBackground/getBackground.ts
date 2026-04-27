import { type Input, type Output } from "./getBackground.types";

export default function getBackground(...[imageData]: Input): Output {
  return [
    imageData.data[0],
    imageData.data[1],
    imageData.data[2],
    imageData.data[3],
  ];
}
