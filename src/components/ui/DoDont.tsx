import React from 'react';
import { cn } from '@/lib/utils';
import { Check, X } from 'lucide-react';

interface DoDontProps {
    type: 'do' | 'dont';
    title: string;
    description: string;
    children: React.ReactNode;
    className?: string;
    withStage?: boolean;
    stageClassName?: string;
}

export const DoDont: React.FC<DoDontProps> = ({
    type,
    title,
    description,
    children,
    className,
    withStage = false,
    stageClassName
}) => {
    const isDo = type === 'do';

    return (
        <div className={cn(
            "flex flex-col h-full rounded-xl overflow-hidden border",
            isDo ? "border-green-500/20 dark:border-green-500/30" : "border-red-500/20 dark:border-red-500/30",
            className
        )}>
            {/* Visual Area */}
            <div className={cn(
                "relative shrink-0 h-44 px-6 flex items-center justify-center",
                isDo ? "bg-green-50/50 dark:bg-green-950/20" : "bg-red-50/50 dark:bg-red-950/20"
            )}>
                {/* Content Preview */}
                <div className="w-full h-full flex items-center justify-center overflow-hidden">
                    {withStage ? (
                        <div className={cn("w-full rounded-lg border bg-background p-4 shadow-sm", stageClassName)}>
                            {children}
                        </div>
                    ) : (
                        children
                    )}
                </div>
            </div>

            {/* Text Content */}
            <div className="flex flex-col px-6 pb-6 pt-6 bg-card flex-1">
                <div className="flex items-center gap-2">
                    <span className={cn(
                        "inline-flex h-5 w-5 items-center justify-center rounded-full shadow-sm",
                        isDo ? "bg-green-500 text-white" : "bg-red-500 text-white"
                    )}>
                        {isDo ? <Check size={14} strokeWidth={2.6} /> : <X size={14} strokeWidth={2.6} />}
                    </span>
                    <h4 className={cn(
                        "font-bold text-sm tracking-wider",
                        isDo ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                    )}>
                        {isDo ? "권장" : "주의"}
                    </h4>
                </div>
                <div className="mt-3 flex flex-col gap-1">
                    <h5 className="text-doc-subsection-title text-foreground">{title}</h5>
                    <p className="text-doc-body text-muted-foreground">
                        {description}
                    </p>
                </div>
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
