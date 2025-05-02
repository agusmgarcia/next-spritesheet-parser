type IconProps = Pick<React.SVGProps<SVGSVGElement>, "className"> & {
  variant:
    | "arrowDown"
    | "arrowLeft"
    | "arrowRight"
    | "arrowUp"
    | "backward"
    | "downloadFile"
    | "error"
    | "forward"
    | "home"
    | "info"
    | "merge"
    | "minus"
    | "pause"
    | "play"
    | "plus"
    | "refresh"
    | "reset"
    | "roundedPlay"
    | "spinner"
    | "split"
    | "stack"
    | "trash"
    | "uploadFile"
    | "zoomIn"
    | "zoomOut";
};

export default IconProps;
