export type Animations = {
  color: string;
  fps: number;
  id: string;
  name: string;
  onion: boolean;
  playing: boolean;
  sprites: {
    boundingBoxes: {
      color: string;
      height: number;
      id: string;
      offsetX: number;
      offsetY: number;
      visible: boolean;
      width: number;
    }[];
    center: {
      initialOffsetX: number;
      initialOffsetY: number;
      offsetX: number;
      offsetY: number;
      visible: boolean;
    };
    id: string;
  }[];
}[];
