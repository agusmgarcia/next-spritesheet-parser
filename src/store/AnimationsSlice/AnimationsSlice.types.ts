export type Animations = {
  color: string;
  fps: number;
  id: string;
  name: string;
  onion: boolean;
  playing: boolean;
  sprites: {
    center: {
      initialOffsetX: number;
      initialOffsetY: number;
      offsetX: number;
      offsetY: number;
    };
    id: string;
  }[];
}[];
