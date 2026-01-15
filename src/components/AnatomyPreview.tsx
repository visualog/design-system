import React from 'react';
import { cn } from '@/lib/utils';

// Anatomy Label Component with connecting line
const AnatomyLabel = ({
    label,
    direction = 'top',
    length = 24,
    className
}: {
    label: string;
    direction?: 'top' | 'bottom' | 'left' | 'right';
    length?: number;
    className?: string;
}) => {
    const isVertical = direction === 'top' || direction === 'bottom';

    return (
        <div
            className={cn("absolute flex items-center justify-center z-20 pointer-events-none", className)}
            style={{
                [direction === 'top' ? 'bottom' : direction === 'bottom' ? 'top' : direction === 'left' ? 'right' : 'left']: '100%',
                // Center on the cross-axis
                ...(isVertical
                    ? { left: '50%', transform: 'translateX(-50%)' }
                    : { top: '50%', transform: 'translateY(-50%)' }
                ),
                flexDirection: isVertical ? 'column' : 'row',
                gap: 0
            }}
        >
            {/* The Line */}
            <div
                className="bg-blue-600/80"
                style={{
                    width: isVertical ? 1 : length,
                    height: isVertical ? length : 1,
                    order: direction === 'top' || direction === 'left' ? 2 : 0
                }}
            />

            {/* The Label Badge */}
            <div className={cn(
                "flex items-center justify-center px-2 py-1 rounded-md bg-blue-600 text-white text-[10px] font-bold z-10 whitespace-nowrap",
                direction === 'top' || direction === 'left' ? "order-1" : "order-1"
            )}>
                {label}
            </div>
        </div>
    );
};




const TabsAnatomy = () => {
    return (
        <div className="relative w-full max-w-[320px] mx-auto p-4 select-none flex flex-col gap-4">

            {/* Tabs List Area */}
            <div className="relative p-1 bg-muted rounded-lg">
                {/* 1. Tabs List Label */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2">
                    <AnatomyLabel label="Tabs List" direction="left" length={32} />
                </div>

                <div className="flex items-center gap-1">
                    {/* Trigger 1 (Active) */}
                    <div className="relative flex-1 flex items-center justify-center py-2 px-3 bg-background rounded-md shadow-sm border border-border text-sm font-medium text-foreground">
                        Tab 1
                        {/* 2. Trigger Label */}
                        <div className="absolute -bottom-0 left-1/2 -translate-x-1/2">
                            <AnatomyLabel label="Tabs Trigger" direction="bottom" length={24} />
                        </div>
                    </div>
                    {/* Trigger 2 (Inactive) */}
                    <div className="flex-1 flex items-center justify-center py-2 px-3 text-sm font-medium text-muted-foreground hover:bg-muted/50 rounded-md transition-colors">
                        Tab 2
                    </div>
                </div>
            </div>


        </div>
    );
};

const AnatomyPreview: React.FC<{ componentName: string }> = ({ componentName }) => {
    const name = componentName.toLowerCase();

    if (name === 'tabs') {
        return <TabsAnatomy />;
    }

    // Default fallback if no specific anatomy is defined
    return (
        <div className="flex flex-col items-center justify-center min-h-[300px] text-muted-foreground bg-muted/20 rounded-xl border-dashed border-2">
            <div className="mb-2">No anatomy diagram available</div>
            <div className="text-xs opacity-50">dev note: implement anatomy for {componentName}</div>
        </div>
    );
};

export default AnatomyPreview;
