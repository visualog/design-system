import React, { useState } from 'react';
import { AnimatedTabs, AnimatedTabsContent } from "@/components/ui/tabs";

interface FoundationPageLayoutProps {
    title: string;
    description: string;
    children: React.ReactNode;
}

export const FoundationPageLayout: React.FC<FoundationPageLayoutProps> = ({
    title,
    description,
    children
}) => {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-heading-xl tracking-tight">{title}</h1>
                <p className="text-body-sm text-muted-foreground">
                    {description}
                </p>
            </div>
            {children}
            <div className="h-12" /> {/* Bottom spacer */}
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
