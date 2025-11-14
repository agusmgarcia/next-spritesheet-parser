export type State = {
  color: string;
  fps: number;
  grid: boolean;
  id: string;
  index: number;
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
};
