import React from 'react';
import { ArrowLeft, Box } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';

const componentsList = [
    'Breadcrumb',
    'GuidelineItem',
    'HighlightText',
    'AnimatedTabs',
    'Button',
    'Card',
    'Clipboard',
    'DropdownMenu',
    'Input',
    'Popover',
    'Separator',
    'Sheet',
    'Switch',
    'Table',
    'Tabs',
    'Tooltip',
];

const SiteComponentsPage = () => {
    return (
        <div className="flex flex-col gap-8 pb-20">
            <div>
                <div className="flex items-center gap-2 mb-4">
                    <Link
                        to="/site-settings"
                        className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 text-sm font-medium"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Settings
                    </Link>
                </div>
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                    <Box className="w-8 h-8" />
                    Components
                </h1>
                <p className="text-lg text-muted-foreground mt-2">
                    List of reusable UI components used throughout the Design System site.
                </p>
            </div>

            <Separator />

            <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
                {componentsList.map((component) => (
                    <div
                        key={component}
                        className="rounded-xl border bg-card text-card-foreground p-6 flex flex-col gap-4 hover:border-primary/50 transition-colors"
                    >
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-lg">{component}</h3>
                        </div>
                        <div className="mt-auto pt-4 flex gap-2">
                            <span className="inline-flex items-center rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground ring-1 ring-inset ring-gray-500/10">
                                {component}.tsx
                            </span>
                        </div>
                        {/* Placeholder for future actions */}
                        <div className="grid grid-cols-1 gap-2 mt-2">
                            <button
                                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
                                disabled
                            >
                                View Code (Coming Soon)
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SiteComponentsPage;
