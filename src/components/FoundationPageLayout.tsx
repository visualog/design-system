import React, { useState } from 'react';
import { AnimatedTabs, AnimatedTabsContent } from "@/components/ui/tabs";
import { ExperimentalToggle } from './ui/ExperimentalToggle';
import { DocPageFrame, DocPageHeader } from './ui/DocLayout';

interface FoundationPageLayoutProps {
    title: string;
    description: string;
    children: React.ReactNode;
    actions?: React.ReactNode;
    showExperimental?: boolean;
}

export const FoundationPageLayout: React.FC<FoundationPageLayoutProps> = ({
    title,
    description,
    children,
    actions,
    showExperimental = false
}) => {
    return (
        <DocPageFrame className="foundation-doc-page">
            <DocPageHeader
                title={title}
                description={description}
                actions={actions}
                titleAddon={showExperimental ? <ExperimentalToggle /> : undefined}
            />
            <div className="doc-page-content">
                {children}
            </div>
        </DocPageFrame>
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
    floatingAction?: React.ReactNode | ((activeTab: string) => React.ReactNode);
}

export const FoundationPageTabs: React.FC<FoundationPageTabsProps> = ({
    items,
    defaultValue,
    floatingAction
}) => {
    const defaultVal = defaultValue || (items.length > 0 ? items[0].value : '');
    const [activeTab, setActiveTab] = useState(defaultVal);

    const tabHeaders = items.map(item => ({ name: item.label, value: item.value }));
    const floatingActionNode = typeof floatingAction === 'function' ? floatingAction(activeTab) : floatingAction;

    return (
        <AnimatedTabs
            tabs={tabHeaders}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            floatingAction={floatingActionNode}
        >
            {items.map((item) => (
                <AnimatedTabsContent key={item.value} value={item.value} className="doc-tab-panel">
                    {/* Hidden H2 for accessibility (document structure) */}
                    <h2 className="sr-only">{item.label}</h2>
                    {item.content}
                </AnimatedTabsContent>
            ))}
        </AnimatedTabs>
    );
};
