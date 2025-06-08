const config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-poppins)"],
      },
      fontSize: {
        "display-1": [
          "5.25rem",
          {
            lineHeight: "7.875rem",
          },
        ],
        "display-2": [
          "4.813rem",
          {
            lineHeight: "5.906rem",
          },
        ],
        "display-3": [
          "3.938rem",
          {
            lineHeight: "7.219rem",
          },
        ],
        "display-4": [
          "3.063rem",
          {
            lineHeight: "4.594rem",
          },
        ],
        h1: [
          "1.75rem",
          {
            lineHeight: "2.625rem",
          },
        ],
        h2: [
          "1.5rem",
          {
            lineHeight: "2.25rem",
          },
        ],
        h3: [
          "1.313rem",
          {
            lineHeight: "1.969rem",
          },
        ],
        h4: [
          "1.125rem",
          {
            lineHeight: "1.688rem",
          },
        ],
        h5: [
          "0.938rem",
          {
            lineHeight: "1.5rem",
          },
        ],
        h6: [
          "0.875rem",
          {
            lineHeight: "1.438rem",
          },
        ],
        sm: [
          "0.75rem",
          {
            lineHeight: "1.125rem",
          },
        ],
        base: [
          "0.875rem",
          {
            lineHeight: "1.313rem",
          },
        ],
        lg: [
          "1rem",
          {
            lineHeight: "1.5rem",
          },
        ],
      },
      colors: {
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        card: {
          DEFAULT: "hsl(var(--card) / <alpha-value>)",
          foreground: "hsl(var(--card-foreground) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "hsl(var(--popover) / <alpha-value>)",
          foreground: "hsl(var(--popover-foreground) / <alpha-value>)",
        },
        primary: {
          DEFAULT: "hsl(var(--primary) / <alpha-value>)",
          foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
          foreground: "hsl(var(--secondary-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted) / <alpha-value>)",
          foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "hsl(var(--accent) / <alpha-value>)",
          foreground: "hsl(var(--accent-foreground) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        success: {
          DEFAULT: "hsl(var(--success) / <alpha-value>)",
          foreground: "hsl(var(--success-foreground) / <alpha-value>)",
        },
        danger: {
          DEFAULT: "hsl(var(--danger) / <alpha-value>)",
          foreground: "hsl(var(--danger-foreground) / <alpha-value>)",
        },
        warning: {
          DEFAULT: "hsl(var(--warning) / <alpha-value>)",
          foreground: "hsl(var(--warning-foreground) / <alpha-value>)",
        },
        info: {
          DEFAULT: "hsl(var(--info) / <alpha-value>)",
          foreground: "hsl(var(--info-foreground) / <alpha-value>)",
        },
        dark: {
          DEFAULT: "hsl(var(--dark) / <alpha-value>)",
          foreground: "hsl(var(--dark-foreground) / <alpha-value>)",
        },
        light: {
          DEFAULT: "hsl(var(--light) / <alpha-value>)",
          foreground: "hsl(var(--light-foreground) / <alpha-value>)",
        },
        grey: {
          DEFAULT: "hsl(var(--grey) / <alpha-value>)",
          foreground: "hsl(var(--grey-foreground) / <alpha-value>)",
        },
        border: "hsl(var(--border) / <alpha-value>)",
        input: "hsl(var(--input) / <alpha-value>)",
        ring: "hsl(var(--ring) / <alpha-value>)",
        soft: "hsl(var(--soft) / <alpha-value>)",
        disabled: "hsl(var(--disabled) / <alpha-value>)",
        chart: {
          1: "hsl(var(--chart-1) / <alpha-value>)",
          2: "hsl(var(--chart-2) / <alpha-value>)",
          3: "hsl(var(--chart-3) / <alpha-value>)",
          4: "hsl(var(--chart-4) / <alpha-value>)",
          5: "hsl(var(--chart-5) / <alpha-value>)",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        panel: "0 4px 24px 0 rgb(0 0 0 / 0.12)",
        floating: "0 0 15px 0 rgb(0 0 0 / 0.05)",
        "button-primary": "0 4px 14px 0 hsl(var(--primary) / 0.38)",
        "button-secondary": "0 4px 14px 0 hsl(var(--secondary) / 0.38)",
        "button-accent": "0 4px 14px 0 hsl(var(--accent) / 0.38)",
        "button-success": "0 4px 14px 0 hsl(var(--success) / 0.38)",
        "button-danger": "0 4px 14px 0 hsl(var(--danger) / 0.38)",
        "button-warning": "0 4px 14px 0 hsl(var(--warning) / 0.38)",
        "button-info": "0 4px 14px 0 hsl(var(--info) / 0.38)",
        "button-dark": "0 4px 14px 0 hsl(var(--dark) / 0.38)",
        checkbox: "0 2px 4px 0 hsl(245 82% 67% / 0.38)",
        switch: "-1px 2px 3px 0 hsl(0 0% 0% / 0.2)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: ["@tailwindcss/postcss"],
};

export default config;
