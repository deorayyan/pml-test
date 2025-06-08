import * as React from "react";
import { ChevronDown, LoaderCircle } from "lucide-react";
import { cn } from "@/utils/utils";
import { Button } from "@/components/ui/Button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandLoading,
} from "@/components/ui/Command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";

const Combobox = React.forwardRef(
  (
    {
      icon = ChevronDown,
      options = [],
      onValueChange,
      onSearch,
      placeholder = "Select...",
      invalid,
      isAsync,
      defaultValue,
      loading,
      objectValue = false,
      multiple = false,
      hideSearch = false,
      readOnly = false,
      fixedPopoverWidth,
      ...props
    },
    ref
  ) => {
    const [container, setContainer] = React.useState(null);
    const [initialized, setInitialized] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(defaultValue);
    const [search, setSearch] = React.useState("");
    const [selectedLabel, setSelectedLabel] = React.useState("");
    const innerRef = React.useRef(null);
    const [popoverWidth, setPopoverWidth] = React.useState();

    React.useEffect(() => {
      const debounceTime = 300;
      const handler = setTimeout(() => {
        if (onSearch) {
          onSearch(search);
        }
      }, debounceTime);

      return () => {
        clearTimeout(handler);
      };
    }, [search]);

    React.useEffect(() => {
      setSelectedLabel(
        (
          options.find((option) => {
            return typeof option === "object"
              ? option?.value?.toString()?.trim()?.toLowerCase() ===
                  value?.toString()?.trim()?.toLowerCase()
              : option?.toString()?.trim()?.toLowerCase() ===
                  value?.toString()?.trim()?.toLowerCase();
          })
        )?.label ?? `${value}`
      );
      if (onValueChange) {
        if (objectValue) {
          const optionValue = options.find((option) =>
            typeof option === "object"
              ? option?.value?.toString()?.trim()?.toLowerCase() ===
                value?.toString()?.trim()?.toLowerCase()
              : option?.toString()?.trim()?.toLowerCase() ===
                value?.toString()?.trim()?.toLowerCase()
          );
          if (optionValue) {
            onValueChange(optionValue);
          } else {
            onValueChange(undefined);
          }
        } else {
          onValueChange(value);
        }
      }
    }, [value]);

    React.useEffect(() => {
      setValue(defaultValue);
    }, [defaultValue]);

    React.useEffect(() => {
      setPopoverWidth(
        fixedPopoverWidth ?? innerRef.current?.getBoundingClientRect()?.width
      );
    }, []);

    React.useEffect(() => {
      if (options.length && value && !initialized) {
        setSelectedLabel(
          (
            options.find((option) =>
              typeof option === "object"
                ? option?.value?.toString()?.trim()?.toLowerCase() ===
                  value?.toString()?.trim()?.toLowerCase()
                : option?.toString()?.trim()?.toLowerCase() ===
                  value?.toString()?.trim()?.toLowerCase()
            )
          )?.label ?? `${value}`
        );
        setInitialized(true);
      }
    }, [options]);

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          {!readOnly ? (
            <Button
              ref={ref ?? innerRef}
              variant="input"
              role="combobox"
              aria-expanded={open}
              className={`w-full bg-white shrink truncate justify-between text-muted-foreground font-normal 
                ${props.className}
                ${
                  icon === ChevronDown
                    ? "[&[data-state=open]>svg]:rotate-180"
                    : ""
                } ${value ? "text-foreground" : ""} ${
                invalid &&
                "field-error border-danger focus:ring-danger focus:ring-1 hover:border-danger"
              }`}
              disabled={props.disabled || (!open && loading) || readOnly}
              onClick={(e) => {
                setPopoverWidth(
                  fixedPopoverWidth ??
                    innerRef.current?.getBoundingClientRect()?.width
                );

                // fix combobox inside modal
                const target = e.target;
                const isInModal = target.closest('[role="dialog"]') !== null;

                if (isInModal) {
                  setContainer(target.closest('[role="dialog"]'));
                }
              }}
            >
              {!open && loading ? (
                <>
                  <span>Loading options...</span>
                  <LoaderCircle className="animate-spin text-muted-foreground" />
                </>
              ) : (
                <>
                  <span className="overflow-ellipsis overflow-hidden">
                    {value ? selectedLabel : props.disabled ? "" : placeholder}
                  </span>
                  {icon &&
                    React.createElement(icon, {
                      className: "opacity-50",
                    })}
                </>
              )}
            </Button>
          ) : (
            <div className="h-10 p-2 bg-dark/5 rounded border border-transparent pointer-events-none">
              {selectedLabel}
            </div>
          )}
        </PopoverTrigger>
        <PopoverContent
          className="p-0"
          style={{
            width: popoverWidth,
          }}
          container={container}
          onWheel={(e) => {
            e.stopPropagation();
          }}
        >
          <Command
            filter={(value, search) => {
              // force return 1 if async
              if (isAsync) {
                return 1;
              } else {
                const currentOption = options.find((option) => {
                  const optionValue =
                    typeof option === "string" || typeof option === "number"
                      ? option
                      : option?.value;
                  return `${optionValue}` === `${value}`;
                });
                const currentOptionLabel =
                  typeof currentOption === "string" ||
                  typeof currentOption === "number"
                    ? currentOption
                    : currentOption?.label;

                return currentOptionLabel
                  ?.toString()
                  .toLowerCase()
                  .includes(search.toString().toLowerCase())
                  ? 1
                  : 0;
              }
            }}
            className="w-full"
          >
            {!hideSearch && (
              <CommandInput
                placeholder="Search..."
                value={search}
                onValueChange={setSearch}
              />
            )}
            <CommandList>
              {loading ? (
                <CommandLoading className="text-muted-foreground text-center py-4">
                  Loading options...
                </CommandLoading>
              ) : (
                <CommandEmpty className="text-muted-foreground text-center py-4">
                  Nothing to show.
                </CommandEmpty>
              )}
              <CommandGroup>
                {options.map((option, index) => {
                  const optionLabel =
                    typeof option === "string"
                      ? option?.toString()?.trim()
                      : option?.label?.toString()?.trim();
                  const optionValue =
                    typeof option === "string"
                      ? option
                      : option?.value?.toString();
                  const isActive = Boolean(
                    value?.toString()?.trim()?.toLowerCase() ===
                      optionValue?.toString()?.trim()?.toLowerCase()
                  );
                  return (
                    <CommandItem
                      key={`${optionValue}-${index}`}
                      value={`${optionValue}`}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue);
                        setOpen(false);
                      }}
                      className={cn(
                        isActive
                          ? "bg-primary text-primary-foreground data-[selected='true']:bg-primary data-[selected='true']:text-primary-foreground"
                          : ""
                      )}
                      disabled={Boolean((option)?.disabled)}
                    >
                      {(option)?.customLabel ?? optionLabel}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }
);

export default Combobox;
