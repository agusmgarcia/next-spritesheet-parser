import { type Tuple } from "@agusmgarcia/react-essentials-utils";

export default function getBackground(imageData: ImageData): Tuple<number, 4> {
  return [
    imageData.data[0],
    imageData.data[1],
    imageData.data[2],
    imageData.data[3],
  ];
}
