import React from 'react';
import { cn } from '@/lib/utils';

interface PageSectionProps {
    title: string;
    description?: React.ReactNode;
    children: React.ReactNode;
    className?: string;
}

export const PageSection: React.FC<PageSectionProps> = ({ title, description, children, className }) => {
    return (
        <section className={cn("flex flex-col gap-6", className)}>
            <div className="flex flex-col gap-1">
                <h2 className="text-heading-md tracking-tight text-foreground">{title}</h2>
                {description && (
                    <div className="text-muted-foreground max-w-2xl">
                        {description}
                    </div>
                )}
            </div>
            {children}
        </section>
    );
};
