type IconProps = Pick<React.SVGProps<SVGSVGElement>, "className"> & {
  variant: "spinner" | "uploadFile";
};

export default IconProps;
