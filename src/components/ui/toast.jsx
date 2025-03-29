import React from 'react';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';

const Toast = React.forwardRef(({ className, variant = 'default', ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all',
        variant === 'destructive'
          ? 'border-destructive bg-destructive text-destructive-foreground'
          : 'border bg-background text-foreground',
        className
      )}
      {...props}
    />
  );
});
Toast.displayName = 'Toast';

const ToastClose = React.forwardRef(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      'absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100',
      className
    )}
    {...props}
  >
    <X className="h-4 w-4" />
  </button>
));
ToastClose.displayName = 'ToastClose';

const ToastTitle = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('text-sm font-semibold', className)} {...props} />
));
ToastTitle.displayName = 'ToastTitle';

const ToastDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('text-sm opacity-90', className)} {...props} />
));
ToastDescription.displayName = 'ToastDescription';

export { Toast, ToastTitle, ToastDescription, ToastClose };
