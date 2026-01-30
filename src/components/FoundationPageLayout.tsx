import React, { useState } from 'react';
import { AnimatedTabs, AnimatedTabsContent } from "@/components/ui/tabs";

interface FoundationPageLayoutProps {
    title: string;
    description: string;
    children: React.ReactNode;
    actions?: React.ReactNode;
}

export const FoundationPageLayout: React.FC<FoundationPageLayoutProps> = ({
    title,
    description,
    children,
    actions
}) => {
    return (
        <div className="flex flex-col gap-16 pb-24">
            <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between gap-4">
                    <h1 className="text-heading-xl tracking-tight">{title}</h1>
                    {actions && <div className="flex-shrink-0">{actions}</div>}
                </div>
                <p className="text-body-sm text-muted-foreground max-w-3xl">
                    {description}
                </p>
            </div>
            <div className="flex flex-col gap-8">
                {children}
            </div>
        </div>
    );
};

interface FoundationTabItem {
    value: string;
    label: string;
    content: React.ReactNode;
}

interface FoundationPageTabsProps {
    items: FoundationTabItem[];
    defaultValue?: string;
}

export const FoundationPageTabs: React.FC<FoundationPageTabsProps> = ({
    items,
    defaultValue
}) => {
    const defaultVal = defaultValue || (items.length > 0 ? items[0].value : '');
    const [activeTab, setActiveTab] = useState(defaultVal);

    const tabHeaders = items.map(item => ({ name: item.label, value: item.value }));

    return (
        <AnimatedTabs
            tabs={tabHeaders}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
        >
            {items.map((item) => (
                <AnimatedTabsContent key={item.value} value={item.value} className="space-y-8">
                    {/* Hidden H2 for accessibility (document structure) */}
                    <h2 className="sr-only">{item.label}</h2>
                    {item.content}
                </AnimatedTabsContent>
            ))}
        </AnimatedTabs>
    );
};
