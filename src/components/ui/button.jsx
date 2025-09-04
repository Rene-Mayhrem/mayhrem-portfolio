import React from 'react';

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props}, ref) => {
    const Comp = asChilda ? Slot : 'button';
    return (
        <Comp
            className = {cn(buttonVariants({ variant, size, className }))}
            ref={ref}
            {...props}
        />
    );
});
Button.displayName = 'Button';

export { Button, buttonVariants };