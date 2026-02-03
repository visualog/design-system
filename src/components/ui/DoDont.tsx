import React from 'react';
import { cn } from '@/lib/utils';
import { Check, X } from 'lucide-react';

interface DoDontProps {
    type: 'do' | 'dont';
    title: string;
    description: string;
    children: React.ReactNode;
    className?: string;
}

export const DoDont: React.FC<DoDontProps> = ({ type, title, description, children, className }) => {
    const isDo = type === 'do';

    return (
        <div className={cn(
            "flex flex-col h-full rounded-xl overflow-hidden border",
            isDo ? "border-green-500/20 dark:border-green-500/30" : "border-red-500/20 dark:border-red-500/30",
            className
        )}>
            {/* Visual Area */}
            <div className={cn(
                "relative shrink-0 py-12 px-6 flex items-center justify-center",
                isDo ? "bg-green-50/50 dark:bg-green-950/20" : "bg-red-50/50 dark:bg-red-950/20"
            )}>
                {/* Status Indicator */}
                <div className={cn(
                    "absolute bottom-0 left-6 translate-y-1/2 h-8 w-8 rounded-full flex items-center justify-center shadow-sm z-10",
                    isDo ? "bg-green-500 text-white" : "bg-red-500 text-white"
                )}>
                    {isDo ? <Check size={18} strokeWidth={3} /> : <X size={18} strokeWidth={3} />}
                </div>

                {/* Content Preview */}
                <div className="w-full">
                    {children}
                </div>
            </div>

            {/* Text Content */}
            <div className="flex flex-col gap-1 px-6 pb-6 pt-8 bg-card flex-1">
                <h4 className={cn(
                    "font-bold text-sm tracking-wider",
                    isDo ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                )}>
                    {isDo ? "권장" : "주의"}
                </h4>
                <h5 className="font-semibold text-foreground">{title}</h5>
                <p className="text-sm text-muted-foreground leading-relaxed">
                    {description}
                </p>
            </div>
        </div>
    );
};

export const DoDontContainer: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => {
    return (
        <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 lg:gap-5", className)}>
            {children}
        </div>
    );
};
