import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/presentation/lib/utils"

const badgeVariants = cva(
    "inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
    {
        variants: {
            variant: {
                default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
                secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
                destructive:
                    "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
                outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    },
)

function Badge({
    className,
    variant,
    asChild = false,
    ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
    const Comp = asChild ? Slot : "span"

    return <Comp data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />
}

const badgeClasses = [
    "bg-gray-50 text-gray-600 inset-ring-gray-500/10",
    "bg-red-50 text-red-700 inset-ring-red-600/10",
    "bg-yellow-50 text-yellow-800 inset-ring-yellow-600/20",
    "bg-green-50 text-green-700 inset-ring-green-600/20",
    "bg-blue-50 text-blue-700 inset-ring-blue-700/10",
    "bg-indigo-50 text-indigo-700 inset-ring-indigo-700/10",
    "bg-purple-50 text-purple-700 inset-ring-purple-700/10",
    "bg-pink-50 text-pink-700 inset-ring-pink-700/10",
]

interface BadgeProps {
    index: number
    text: string
}

const BadgeIndexed: React.FC<BadgeProps> = ({ index, text }) => {
    const classes = badgeClasses[index % badgeClasses.length]

    return (
        <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium inset-ring ${classes}`}>
            {text}
        </span>
    )
}

export { Badge, BadgeIndexed, badgeVariants }
