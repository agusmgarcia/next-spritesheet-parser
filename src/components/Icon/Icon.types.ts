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
    | "merge"
    | "minus"
    | "pause"
    | "play"
    | "plus"
    | "refresh"
    | "reset"
    | "roundedPlay"
    | "spinner"
    | "stack"
    | "trash"
    | "uploadFile"
    | "zoomIn"
    | "zoomOut";
};

export default IconProps;
