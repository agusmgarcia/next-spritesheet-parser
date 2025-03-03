type IconProps = Pick<React.SVGProps<SVGSVGElement>, "className"> & {
  variant: "play" | "spinner" | "uploadFile";
};

export default IconProps;
