import { type Tuple } from "@agusmgarcia/react-core";

export default function getBackground(imageData: ImageData): Tuple<number, 3> {
  return [imageData.data[0], imageData.data[1], imageData.data[2]];
}
