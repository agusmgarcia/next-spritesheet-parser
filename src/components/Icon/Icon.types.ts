type IconProps = Pick<React.SVGProps<SVGSVGElement>, "className" | "style"> & {
  variant:
    | "arrowDown"
    | "arrowLeft"
    | "arrowRight"
    | "arrowUp"
    | "backward"
    | "close"
    | "downloadFile"
    | "error"
    | "forward"
    | "home"
    | "info"
    | "interrogation"
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
    | "success"
    | "trash"
    | "uploadFile"
    | "warning"
    | "zoomIn"
    | "zoomOut";
};

export default IconProps;
