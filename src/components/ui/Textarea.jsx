import * as React from "react";

import { cn } from "@/utils/utils";

const Textarea = React.forwardRef(
  (
    {
      className,
      invalid,
      value,
      onChange,
      row = 5,
      minRow,
      maxRow,
      bounceTime = 300,
      ...props
    },
    ref
  ) => {
    const innerRef = React.useRef(null);
    const timeoutRef = React.useRef(null);
    const [internalValue, setInternalValue] = React.useState(value || "");

    const adjustHeight = () => {
      const textarea = innerRef.current;
      const minHeight = (minRow ?? row) * 18 + 18;
      const maxHeight = (maxRow ?? row) * 18 + 18;

      if (textarea) {
        textarea.style.height = "auto"; // Reset height to calculate the new height
        const heightToApply = textarea.scrollHeight + 2;

        if (props.disabled) {
          if (heightToApply < minHeight) {
            textarea.style.height = `${minHeight}px`;
          } else {
            textarea.style.height = `${heightToApply}px`;
          }
        } else if (heightToApply >= minHeight && heightToApply <= maxHeight) {
          textarea.style.height = `${heightToApply}px`;
        } else if (heightToApply < minHeight) {
          textarea.style.height = `${minHeight}px`;
        } else if (heightToApply > maxHeight) {
          textarea.style.height = `${maxHeight}px`;
        }
      }
    };

    const handleChange = (e) => {
      const val = e.target.value;
      setInternalValue(val);

      // Reset debounce timer
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        if (onChange) {
          const event = e;
          onChange(event);
        }
      }, bounceTime);
    };

    React.useEffect(() => {
      setInternalValue(value || "");
      adjustHeight();
    }, [value]);

    return (
      <textarea
        {...props}
        value={internalValue || ""}
        className={cn(
          [
            "flex w-full rounded-md border border-input bg-card px-3 py-2 text-base ring-offset-card placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 disabled:bg-disabled disabled:opacity-75 md:text-sm disabled:pointer-events-none",
          ],
          invalid
            ? "field-error border-danger focus-visible:ring-danger"
            : "hover:border-primary focus-visible:ring-primary",
          className
        )}
        style={{
          height: (minRow ?? row) * 18 + 18,
        }}
        ref={innerRef ?? ref}
        onChange={handleChange}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
