import React, { useState, useRef, forwardRef, useEffect } from "react";
import { cn } from "@/utils/utils";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "./Button";
import Cleave from "cleave.js/react";

const Input = React.memo(
  forwardRef(
    (
      {
        className,
        type,
        invalid,
        startAdornment,
        endAdornment,
        endAdornmentType = "button",
        borderedStartAdorment,
        borderedEndAdorment,
        options,
        handleEndAdornmentClick,
        value = "",
        numeral = true,
        onChange,
        bounceTime = 300,
        error,
        ...props
      },
      ref
    ) => {
      const Comp = type === "number" ? Cleave : "input";
      const hasAdornment =
        Boolean(startAdornment) ||
        Boolean(endAdornment || Boolean(type === "password"));
      const [internalValue, setInternalValue] = useState(value || "");
      const [inputVisibility, setInputVisibility] = useState(false);
      const labelRef = useRef(null);
      const timeoutRef = useRef(null);

      const renderIcon = () => {
        if (inputVisibility === false) {
          return <Eye />;
        } else {
          return <EyeOff />;
        }
      };

      const getType = () => {
        return type === "password" && inputVisibility ? "text" : type;
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
            event.target.rawValue = event.target.rawValue
              ? Number(event.target.rawValue)
              : null;
            onChange(event);
          }
        }, bounceTime);
      };

      useEffect(() => {
        setInternalValue(value);
      }, [value]);

      return (
        <>
          {hasAdornment || type === "file" ? (
            <div
              className={cn([
                "flex items-center justify-center h-10 rounded-md border border-input bg-transparent ring-offset-background focus-within:ring-1 focus-within:ring-primary data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-75 data-[disabled=true]:bg-disabled",
                !!error
                  ? "border-danger hover:border-danger focus-within:ring-danger"
                  : "border-input hover:border-primary focus-within:ring-primary",
                className,
              ])}
              data-disabled={props.disabled}
            >
              {startAdornment && (
                <div
                  className={cn([
                    "text-muted-foreground text-sm h-full flex pl-2.5 items-center justify-center",
                    borderedStartAdorment ? "border-r border-border pr-2.5" : "",
                  ])}
                >
                  {startAdornment}
                </div>
              )}
              <Comp
                {...props}
                ref={ref}
                type={type === "number" ? "text" : getType()}
                options={
                  options ?? type === "number"
                    ? {
                        numeral: true,
                        ...(numeral
                          ? {
                              numeralDecimalMark: ".",
                              delimiter: ",",
                              numeralIntegerScale: 17,
                              numeralDecimalScale: 2,
                            }
                          : {
                              numeralDecimalMark: "",
                              delimiter: "",
                              numeralIntegerScale: 17,
                              numeralDecimalScale: 0,
                            }),
                      }
                    : {}
                }
                className={cn(
                  "flex items-center h-full w-full rounded-md bg-transparent py-2 px-3.5 text-sm file:leading-none file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-muted-foreground file:pr-4 file:pl-0 placeholder:text-muted-foreground shadow-none outline-none border-none focus-visible:outline-none focus-visible:border-none focus-visible:shadow-none disabled:pointer-events-none",
                  !!error ? "field-error" : "",
                  type === "number" && "text-left",
                  className
                )}
                value={internalValue || ""}
                onKeyDown={props.onKeyDown}
                onChange={handleChange}
                onFocus={(e) => {
                  if (type === "number") {
                    const val = e.target.value;
                    e.target.setSelectionRange(val.length, val.length);
                  }
                }}
              />
              {(endAdornment || type === "password" || type === "file") && (
                <div
                  className={cn([
                    "text-muted-foreground text-sm h-full flex items-center justify-center",
                    borderedEndAdorment ? "border-l pl-2.5" : "",
                    endAdornment || type === "password"
                      ? "pr-1"
                      : type === "file"
                      ? ""
                      : "pr-2.5",
                  ])}
                >
                  {(endAdornment && endAdornmentType === "button") ||
                  type === "password" ? (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-small"
                      onClick={(e) => {
                        if (type === "password") {
                          setInputVisibility(!inputVisibility);
                        } else if (
                          typeof handleEndAdornmentClick === "function"
                        ) {
                          handleEndAdornmentClick(e);
                        }
                      }}
                    >
                      {endAdornment || renderIcon()}
                    </Button>
                  ) : (
                    endAdornment &&
                    endAdornmentType === "plain" && <>{endAdornment}</>
                  )}
                  {getType() === "file" && (
                    <>
                      <label ref={labelRef} htmlFor={props?.id}></label>
                      <Button
                        type="button"
                        className="rounded-l-none px-4"
                        onClick={() => {
                          labelRef?.current?.click();
                        }}
                      >
                        Browse
                      </Button>
                    </>
                  )}
                </div>
              )}
            </div>
          ) : (
            <Comp
              {...props}
              ref={ref}
              type={type === "number" ? "text" : getType()}
              options={
                options ?? type === "number"
                  ? {
                      numeral: true,
                      ...(numeral
                        ? {
                            numeralDecimalMark: ".",
                            delimiter: ",",
                            numeralIntegerScale: 17,
                            numeralDecimalScale: 2,
                          }
                        : {
                            numeralDecimalMark: "",
                            delimiter: "",
                            numeralIntegerScale: 17,
                            numeralDecimalScale: 0,
                          }),
                    }
                  : {}
              }
              className={cn(
                [
                  "flex h-10 w-full rounded-md border bg-card px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-muted-foreground file:pr-4 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 md:text-sm disabled:opacity-75 disabled:bg-disabled disabled:pointer-events-none read-only:opacity-75 read-only:bg-disabled read-only:pointer-events-none",
                  !!error
                    ? "field-error border-danger hover:border-danger focus-visible:ring-danger"
                    : "border-input hover:border-primary focus-visible:ring-primary",
                  type === "number" && "text-left",
                ],
                type === "number" && "text-left",
                className
              )}
              value={internalValue || ""}
              onKeyDown={props.onKeyDown}
              onChange={handleChange}
              onFocus={(e) => {
                if (type === "number") {
                  const val = e.target.value;
                  setTimeout(() => {
                    e.target.setSelectionRange(val.length, val.length);
                  }, 0);
                }
              }}
            />
          )}
        </>
      );
    }
  )
);
Input.displayName = "Input";

export { Input };
