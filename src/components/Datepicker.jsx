import { cn } from "@/utils/utils";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/Popover";
import { Button } from "./ui/button";
import { CalendarIcon, X } from "lucide-react";
import { Calendar } from "./ui/Calendar";
import { format } from "date-fns";

const DatePicker = React.forwardRef(
  (
    {
      className,
      invalid,
      placeholder = "",
      mode = "single",
      value,
      dateFormat = "dd MMM yyyy",
      onDateChange,
      calendarProps,
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);
    const [selected, setSelected] = React.useState(value);

    React.useEffect(() => {
      if (onDateChange) {
        onDateChange(selected ?? null);
      }
    }, [selected]);

    React.useEffect(() => {
      setSelected(value);
    }, [value]);

    return (
      <Popover open={open} {...props} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={"input"}
            disabled={props.disabled}
            className={cn(
              "w-full md:w-auto md:min-w-[240px] justify-between text-left font-normal relative group",
              !selected && "text-muted-foreground",
              invalid && "field-error border-danger hover:border-danger",
              className
            )}
          >
            {mode === "range" ? (
              selected?.from ? (
                selected?.to ? (
                  <>
                    {format(selected.from, dateFormat)} -{" "}
                    {format(selected.to, dateFormat)}
                  </>
                ) : (
                  format(selected.from, dateFormat)
                )
              ) : (
                <span>{placeholder}</span>
              )
            ) : selected ? (
              format(selected, dateFormat)
            ) : (
              <span>{placeholder}</span>
            )}
            {value && !props.disabled && !props.readOnly && (
              <span
                className="opacity-50 group-hover:opacity-100 absolute right-10 top-0 h-10 flex items-center content-center px-2 z-[1] hover:text-danger cursor-pointer"
                title="Clear"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelected(null);
                }}
              >
                <X />
              </span>
            )}
            <p className="border-l border-border pl-3 flex h-10 items-center">
              <CalendarIcon />
            </p>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          {mode === "range" ? (
            <Calendar
              {...calendarProps}
              mode="range"
              selected={selected}
              onSelect={(date) => setSelected(date)}
              numberOfMonths={2}
            />
          ) : (
            <Calendar
              {...calendarProps}
              mode="single"
              selected={selected}
              onSelect={(date) => {
                setSelected(date);
                setOpen(false);
              }}
              numberOfMonths={1}
            />
          )}
        </PopoverContent>
      </Popover>
    );
  }
);
export default DatePicker;
