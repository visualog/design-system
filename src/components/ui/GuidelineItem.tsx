import React from 'react';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GuidelineItemProps {
    type: 'do' | 'dont' | 'caution';
    title: string;
    description: string;
    children: React.ReactNode;
    className?: string;
}

const GuidelineItem: React.FC<GuidelineItemProps> = ({
    type,
    title,
    description,
    children,
    className,
}) => {
    const isDo = type === 'do';
    const isCaution = type === 'caution';
    const isDont = type === 'dont';

    return (
        <div className={cn("flex flex-col gap-4 p-0", className)}>
            <div className={cn(
                "rounded-lg overflow-hidden border flex items-center justify-center p-8 min-h-[200px]",
                isDo ? "border-green-100 bg-green-50/30" : isCaution ? "border-yellow-100 bg-yellow-50/30" : "border-red-100 bg-red-50/30"
            )}>
                {children}
            </div>
            <div className="flex flex-col gap-1">
                <h4 className={cn(
                    "flex items-center gap-2 font-bold text-base",
                    isDo ? "text-green-700" : isCaution ? "text-yellow-700" : "text-red-700"
                )}>
                    {isDo && <CheckCircle2 className="w-5 h-5" />}
                    {isCaution && <AlertCircle className="w-5 h-5" />}
                    {isDont && <XCircle className="w-5 h-5" />}
                    {title}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                    {description}
                </p>
            </div>
        </div>
    );
};

export default GuidelineItem;
