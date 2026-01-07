import React from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SearchBarProps extends React.ComponentProps<typeof Input> {
    containerClassName?: string;
}

export const SearchBar: React.FC<SearchBarProps & { children?: React.ReactNode }> = ({
    className,
    containerClassName,
    children,
    value,
    onChange,
    ...props
}) => {
    const handleClear = () => {
        if (onChange) {
            // Create a synthetic event to call onChange with empty string
            const syntheticEvent = {
                target: { value: '' },
                currentTarget: { value: '' },
            } as React.ChangeEvent<HTMLInputElement>;
            onChange(syntheticEvent);
        }
    };

    return (
        <div className={cn("relative w-80", containerClassName)}>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
                className={cn(
                    "pl-9 w-full shadow-none text-xs md:text-sm",
                    value && "pr-9", // Add padding when clear button is visible
                    className
                )}
                value={value}
                onChange={onChange}
                {...props}
            />
            {value && (
                <Button
                    variant="ghost"
                    size="icon"
                    type="button"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                    onClick={handleClear}
                >
                    <X className="h-4 w-4" />
                </Button>
            )}
            {children}
        </div>
    );
};
