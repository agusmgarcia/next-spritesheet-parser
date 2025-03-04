type IconProps = Pick<React.SVGProps<SVGSVGElement>, "className"> & {
  variant: "pause" | "play" | "roundedPlay" | "spinner" | "uploadFile";
};

export default IconProps;
