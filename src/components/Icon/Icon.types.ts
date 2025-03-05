type IconProps = Pick<React.SVGProps<SVGSVGElement>, "className"> & {
  variant:
    | "backward"
    | "downloadFile"
    | "forward"
    | "pause"
    | "play"
    | "reset"
    | "roundedPlay"
    | "spinner"
    | "uploadFile"
    | "zoomIn"
    | "zoomOut";
};

export default IconProps;
