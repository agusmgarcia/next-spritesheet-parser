type IconProps = Pick<React.SVGProps<SVGSVGElement>, "className"> & {
  variant:
    | "arrowLeft"
    | "arrowRight"
    | "backward"
    | "downloadFile"
    | "forward"
    | "home"
    | "minus"
    | "pause"
    | "play"
    | "plus"
    | "reset"
    | "roundedPlay"
    | "spinner"
    | "uploadFile"
    | "zoomIn"
    | "zoomOut";
};

export default IconProps;
