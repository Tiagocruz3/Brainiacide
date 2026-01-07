import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { classNames } from '~/utils/classNames';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50 disabled:pointer-events-none disabled:opacity-50 font-[Rajdhani] tracking-wide',
  {
    variants: {
      variant: {
        default: 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/25 hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(0,212,255,0.2)]',
        destructive: 'bg-red-500/15 text-red-400 border border-red-500/30 hover:bg-red-500/25 hover:border-red-500/50 hover:shadow-[0_0_15px_rgba(255,51,68,0.2)]',
        outline:
          'border border-cyan-500/30 bg-transparent hover:bg-cyan-500/10 hover:border-cyan-500/50 text-cyan-400 hover:text-cyan-300 hover:shadow-[0_0_10px_rgba(0,212,255,0.15)]',
        secondary:
          'bg-gray-800/50 text-cyan-400/80 border border-cyan-500/20 hover:bg-gray-800/70 hover:text-cyan-400 hover:border-cyan-500/40',
        ghost: 'hover:bg-cyan-500/10 hover:text-cyan-300 text-cyan-400/70',
        link: 'text-cyan-400 underline-offset-4 hover:underline hover:text-cyan-300',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  _asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, _asChild = false, ...props }, ref) => {
    return <button className={classNames(buttonVariants({ variant, size }), className)} ref={ref} {...props} />;
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
