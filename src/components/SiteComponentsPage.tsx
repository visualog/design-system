import React from 'react';
import { ArrowLeft, Box } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import { getAllComponents } from '@/data/componentRegistry';

const SiteComponentsPage = () => {
    const components = getAllComponents();

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
                    Reusable UI components used throughout the Design System site.
                </p>
            </div>

            <Separator />

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {components.map((component) => (
                    <Link
                        key={component.name}
                        to={`/site-settings/components/${component.name}`}
                        className="block group"
                    >
                        <div className="rounded-xl border bg-card text-card-foreground p-6 flex flex-col gap-3 hover:border-primary/50 hover:bg-accent/5 transition-colors h-full">
                            <div className="flex items-center justify-between">
                                <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                                    {component.displayName}
                                </h3>
                                <span className="inline-flex items-center rounded-md bg-secondary px-2 py-0.5 text-xs font-medium">
                                    {component.category}
                                </span>
                            </div>
                            <p className="text-sm text-muted-foreground flex-1">
                                {component.description}
                            </p>
                            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground pt-2 border-t">
                                <span className="font-mono truncate max-w-[120px]">{component.filePath.split('/').pop()}</span>
                                <span className="text-muted-foreground/50">•</span>
                                <span className="whitespace-nowrap">{component.props.length} props</span>
                                <span className="text-muted-foreground/50">•</span>
                                <span className="whitespace-nowrap">{component.variants.length} variants</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default SiteComponentsPage;
