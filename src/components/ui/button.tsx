import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-300 ease-out disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50",
  {
    variants: {
      variant: {
        default:
          "bg-accent text-black hover:brightness-110 hover:-translate-y-0.5 hover:shadow-[0_10px_20px_rgba(26,255,103,0.2)]",
        outline:
          "border border-white/20 text-white hover:bg-white/5 hover:border-white",
        secondary:
          "bg-white/10 text-foreground hover:bg-white/15",
        ghost:
          "text-foreground hover:bg-white/5",
        dark:
          "bg-neutral-700 text-white hover:bg-neutral-600",
        link:
          "text-accent underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 px-8 rounded-full text-lg",
        sm: "h-10 px-5 rounded-full text-sm",
        lg: "h-14 px-10 rounded-full text-xl",
        icon: "h-11 w-11 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
