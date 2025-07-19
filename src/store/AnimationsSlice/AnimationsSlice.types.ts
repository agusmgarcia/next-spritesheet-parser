export type Animations = {
  color: string;
  fps: number;
  id: string;
  name: string;
  onion: boolean;
  playing: boolean;
  sprites: {
    id: string;
    offset: {
      initialX: number;
      initialY: number;
      x: number;
      y: number;
    };
  }[];
}[];
