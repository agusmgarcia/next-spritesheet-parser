type IconProps = Pick<React.SVGProps<SVGSVGElement>, "className"> & {
  variant:
    | "arrowDown"
    | "arrowLeft"
    | "arrowRight"
    | "arrowUp"
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
