import React, { useState } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

interface Tab {
    name: string;
    value: string;
}

interface AnimatedTabsProps {
    tabs: Tab[];
    activeTab: string;
    setActiveTab: (value: string) => void;
    children?: React.ReactNode;
    className?: string;
}

const AnimatedTabsContext = React.createContext<{ activeTab: string }>({ activeTab: '' });

export const AnimatedTabs: React.FC<AnimatedTabsProps> = ({
    tabs,
    activeTab,
    setActiveTab,
    children,
    className
}) => {
    const [hoveredTab, setHoveredTab] = useState<string | null>(null);

    return (
        <AnimatedTabsContext.Provider value={{ activeTab }}>
            <div className={cn("w-full", className)}>
                <div className="flex flex-wrap items-center gap-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.value}
                            onClick={() => setActiveTab(tab.value)}
                            onMouseEnter={() => setHoveredTab(tab.value)}
                            onMouseLeave={() => setHoveredTab(null)}
                            className={cn(
                                "relative px-4 py-2 rounded-full text-sm font-medium transition-colors outline-none",
                                activeTab === tab.value
                                    ? "text-primary-foreground"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            {activeTab === tab.value && (
                                <motion.div
                                    layoutId="activeTabCategory"
                                    className="absolute inset-0 bg-primary rounded-full"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}

                            {/* Hover Effect (Optional, subtle background for non-active items) */}
                            {activeTab !== tab.value && hoveredTab === tab.value && (
                                <motion.div
                                    layoutId="hoverTabCategory"
                                    className="absolute inset-0 bg-secondary rounded-full -z-10"
                                    transition={{ duration: 0.2 }}
                                />
                            )}

                            <span className="relative z-10">{tab.name}</span>
                        </button>
                    ))}
                </div>

                {children}
            </div>
        </AnimatedTabsContext.Provider>
    );
};

export const AnimatedTabsContent: React.FC<{ value: string; children: React.ReactNode }> = ({ value, children }) => {
    const { activeTab } = React.useContext(AnimatedTabsContext);

    if (activeTab !== value) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
        >
            {children}
        </motion.div>
    );
};
