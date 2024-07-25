// Tremor Raw Card [v0.0.1]

import React from "react"
import { Slot } from "@radix-ui/react-slot"

import { cx } from "../lib/utils"

const Card = React.forwardRef(
  ({ className, asChild, ...props }, forwardedRef) => {
    const Component = asChild ? Slot : "div"
    return (
      <Component
        ref={forwardedRef}
        className={cx(
          // base
          "relative w-full rounded-lg border p-6 text-left shadow-sm ",
          // background color
          "bg-white dark:bg-[#090E1A]",
          // border color
          "border-gray-200 dark:border-gray-900",
          // text color
          "text-black dark:text-white",
          className,
        )}
        {...props}
      />
    )
  },
)

Card.displayName = "Card"

export { Card }