type IconProps = Pick<React.SVGProps<SVGSVGElement>, "className"> & {
  variant: "play" | "roundedPlay" | "spinner" | "uploadFile";
};

export default IconProps;
