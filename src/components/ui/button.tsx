import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
    'inline-flex items-center justify-center box-border font-notoSansKr whitespace-nowrap text-base radius transition-colors disabled:pointer-events-none disabled:opacity-50 active:scale-95 transition-transform duration-150',
    {
        variants: {
            variant: {
                default:
                    'bg-gradient-to-r from-[#FF8087] to-[#FFAD6E] text-white',
                outline:
                    'border border-primary-foreground bg-background text-black box-border hover:bg-accent hover:text-accent-foreground',
                checked: 'bg-primary-foreground text-black',
                linkToList:
                    'bg-gradient-to-r from-[#FF8087] to-[#FFAD6E] text-white',
                linkToOrder:
                    'bg-gradient-to-r from-[#65C09B] to-[#65C9D2] text-white',
            },
            size: {
                default: 'max-w-default w-full h-default',
                fixed: 'max-w-default w-default h-default',
                lg: 'max-w-default w-full h-[68px]',
                md: 'w-40 h-default',
                sm: 'w-sm h-12',
                xs: 'w-[60px] h-[60px]',
            },
            radius: {
                default: 'rounded-default',
                lg: 'rounded-[34px]',
                md: 'rounded-m',
                sm: 'rounded-3xl',
            },
            fontSize: {
                default: 'text-base',
                lg: 'text-[32px]',
                md: 'text-[26px]',
                sm: 'text-sm',
            },
            fontWeight: {
                default: 'font-bold',
                sm: 'font-medium',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
            radius: 'default',
            fontSize: 'default',
            fontWeight: 'default',
        },
    },
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant,
            size,
            fontSize,
            fontWeight,
            radius,
            asChild = false,
            ...props
        },
        ref,
    ) => {
        const Comp = asChild ? Slot : 'button';
        return (
            <Comp
                className={cn(
                    buttonVariants({
                        variant,
                        size,
                        fontSize,
                        fontWeight,
                        radius,
                        className,
                    }),
                )}
                ref={ref}
                {...props}
            />
        );
    },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
