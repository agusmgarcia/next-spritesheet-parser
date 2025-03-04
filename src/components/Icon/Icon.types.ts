type IconProps = Pick<React.SVGProps<SVGSVGElement>, "className"> & {
  variant:
    | "backward"
    | "pause"
    | "play"
    | "roundedPlay"
    | "spinner"
    | "uploadFile";
};

export default IconProps;
