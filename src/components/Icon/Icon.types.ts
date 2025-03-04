type IconProps = Pick<React.SVGProps<SVGSVGElement>, "className"> & {
  variant:
    | "backward"
    | "forward"
    | "pause"
    | "play"
    | "roundedPlay"
    | "spinner"
    | "uploadFile";
};

export default IconProps;
