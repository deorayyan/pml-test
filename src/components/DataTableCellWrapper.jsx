import React from "react";
import { Tooltip, TooltipTrigger, TooltipContent } from "./ui/Tooltip";

const DataTableCellWrapper = React.forwardRef(
  ({ className, children, maxWidth = 300, ...props }, ref) => {
    const innerRef = React.useRef(null);
    const [width, setWidth] = React.useState(0);
    const [textContent, setTextContent] = React.useState();

    React.useEffect(() => {
      setWidth(innerRef.current?.getBoundingClientRect()?.width || 0);
      setTextContent(innerRef.current?.textContent || "");
    }, []);

    return (
      <div {...props} ref={ref ?? innerRef} className="inline">
        {width > maxWidth ? (
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <div className="inline">{children}</div>
            </TooltipTrigger>
            <TooltipContent>{textContent}</TooltipContent>
          </Tooltip>
        ) : (
          <>{children}</>
        )}
      </div>
    );
  }
);

export default DataTableCellWrapper;
