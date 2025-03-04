type IconProps = Pick<React.SVGProps<SVGSVGElement>, "className"> & {
  variant: "roundedPlay" | "spinner" | "uploadFile";
};

export default IconProps;
