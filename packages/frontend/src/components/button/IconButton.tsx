import * as React from 'react';
import { Button } from '@/components/shadcn/button';
import { VariantProps } from 'class-variance-authority';
import { buttonVariants } from '@/components/shadcn/button';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IconButtonProps extends React.ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
  icon: LucideIcon;
  iconSize?: string;
  asChild?: boolean;
}

export function IconButton({
  icon: Icon,
  iconSize = 'h-5 w-5',
  className,
  size = 'icon',
  variant = 'ghost',
  asChild,
  ...props
}: IconButtonProps) {
  return (
    <Button
      size={size}
      variant={variant}
      className={cn('transition-colors duration-200', className)}
      asChild={asChild}
      {...props}
    >
      <Icon className={iconSize} />
    </Button>
  );
}
