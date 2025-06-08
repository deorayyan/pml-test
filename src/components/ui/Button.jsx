import * as React from "react";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { LoaderCircle } from "lucide-react";
import { cn } from "@/utils/utils";

const buttonVariants = cva(
  "inline-flex relative cursor-pointer overflow-hidden items-center justify-center gap-1.5 whitespace-nowrap rounded-md font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-65 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/85 hover:shadow-button-primary",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/85",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/85 hover:shadow-button-secondary",
        ghost: "hover:bg-grey",
        link: "text-primary underline-offset-4 !p-0 hover:underline",
        accent:
          "bg-accent text-accent-foreground hover:bg-accent/85 hover:shadow-button-accent",
        success:
          "bg-success text-success-foreground hover:bg-success/85 hover:shadow-button-success",
        danger:
          "bg-danger text-danger-foreground hover:bg-danger/85 hover:shadow-button-danger",
        warning:
          "bg-warning text-warning-foreground hover:bg-warning/85 hover:shadow-button-warning",
        info: "bg-info text-info-foreground hover:bg-info/85 hover:shadow-button-info",
        dark: "bg-dark text-dark-foreground hover:bg-dark/85 hover:shadow-button-dark",
        light:
          "bg-light text-light-foreground hover:bg-light/85 hover:shadow-button-light",
        grey: "bg-grey text-primary hover:bg-primary/85 hover:text-primary-foreground",
        input:
          "border justify-between text-left border-input bg-transparent text-foreground hover:border-primary disabled:bg-disabled disabled:pointer-events-none text-base",
        outline:
          "text-primary border border-primary bg-primary bg-opacity-0 hover:bg-opacity-5 hover:text-primary active:bg-opacity-15",
        "outline-secondary":
          "text-secondary border border-secondary bg-secondary bg-opacity-0 hover:bg-opacity-5 hover:text-secondary active:bg-opacity-15",
        "outline-accent":
          "text-accent border border-accent bg-accent bg-opacity-0 hover:bg-opacity-5 hover:text-accent active:bg-opacity-15",
        "outline-success":
          "text-success border border-success bg-success bg-opacity-0 hover:bg-opacity-5 hover:text-success active:bg-opacity-15",
        "outline-danger":
          "text-danger border border-danger bg-danger bg-opacity-0 hover:bg-opacity-5 hover:text-danger active:bg-opacity-15",
        "outline-warning":
          "text-warning border border-warning bg-warning bg-opacity-0 hover:bg-opacity-5 hover:text-warning active:bg-opacity-15",
        "outline-info":
          "text-info border border-info bg-info bg-opacity-0 hover:bg-opacity-5 hover:text-info active:bg-opacity-15",
        "outline-dark":
          "text-dark border border-dark bg-dark bg-opacity-0 hover:bg-opacity-5 hover:text-dark active:bg-opacity-15",
        "outline-light":
          "text-light-foreground border border-light bg-light bg-opacity-0 hover:bg-opacity-5 hover:text-light-foreground active:bg-opacity-15",
        "outline-grey":
          "text-grey border border-grey bg-grey bg-opacity-0 hover:bg-opacity-5 hover:text-grey active:bg-opacity-15",
        "outline-input":
          "text-input border border-input bg-input bg-opacity-0 hover:bg-opacity-5 hover:text-input active:bg-opacity-15",
      },
      size: {
        default: "h-10 px-3 py-2 text-sm",
        xs: "h-6 rounded px-2 text-xs [&_svg]:size-2.5 font-medium gap-0.5",
        sm: "h-9 rounded-md px-3 text-xs",
        lg: "h-11 rounded-md px-8 [&_svg]:size-5",
        icon: "h-10 w-10 rounded-full text-sm",
        "icon-rounded": "h-10 w-10 rounded text-sm",
        "icon-small": "h-8 w-8 rounded-full text-sm",
        "icon-xs": "h-5 w-5 rounded-full text-xs [&_svg]:size-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const rippleVariants = cva("waves-ripple", {
  variants: {
    variant: {
      default: "bg-white/20",
      destructive: "bg-white/20",
      secondary: "bg-white/20",
      ghost: "bg-dark/20",
      link: "bg-white/20",
      accent: "bg-white/20",
      success: "bg-white/20",
      danger: "bg-white/20",
      warning: "bg-white/20",
      info: "bg-white/20",
      dark: "bg-white/20",
      grey: "bg-white/20",
      input: "bg-primary/20",
      outline: "bg-primary/20",
      "outline-secondary": "bg-secondary/20",
      "outline-accent": "bg-accent/20",
      "outline-success": "bg-success/20",
      "outline-danger": "bg-danger/20",
      "outline-warning": "bg-warning/20",
      "outline-info": "bg-info/20",
      "outline-dark": "bg-dark/20",
      light: "bg-white/20",
      "outline-light": "bg-light/20",
      "outline-grey": "bg-grey/20",
      "outline-input": "bg-input/20",
    },
  },
});

const Button = React.forwardRef(
  (
    {
      className,
      variant = "default",
      size,
      asChild = false,
      loading = false,
      loadingText = "Loading...",
      onClick,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    const [mounted, setMounted] = React.useState(false);
    const [isRippling, setIsRippling] = React.useState(false);
    const [coords, setCoords] = React.useState({ x: -1, y: -1 });

    // ** Toggle mounted on mount & unmount
    React.useEffect(() => {
      setMounted(true);
      return () => setMounted(false);
    }, []);

    // ** Check for coords and set ripple
    React.useEffect(() => {
      if (mounted) {
        if (coords.x !== -1 && coords.y !== -1) {
          setIsRippling(true);
          setTimeout(() => setIsRippling(false), 500);
        } else {
          setIsRippling(false);
        }
      }
    }, [coords]);

    // ** Reset Coords on ripple end
    React.useEffect(() => {
      if (mounted) {
        if (!isRippling) setCoords({ x: -1, y: -1 });
      }
    }, [isRippling]);
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        onClick={(e) => {
          const rect = e.target.getBoundingClientRect();
          setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
          if (onClick) {
            onClick(e);
          }
        }}
        disabled={loading || props.disabled}
        {...props}
      >
        <Slottable>
          {loading ? (
            <>
              <LoaderCircle className="animate-spin" />
              {loadingText}
            </>
          ) : (
            props.children
          )}
        </Slottable>

        {isRippling && variant !== "input" && variant !== "link" && (
          <span
            className={cn(rippleVariants({ variant }))}
            style={{
              left: coords.x,
              top: coords.y,
            }}
          ></span>
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
