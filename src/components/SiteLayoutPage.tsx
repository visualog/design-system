import React, { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';

const SiteLayoutPage = () => {
    // Current logical width in pixels (e.g., 240)
    const [sidebarWidth, setSidebarWidth] = useState(240);

    useEffect(() => {
        const root = document.documentElement;
        const computedStyle = getComputedStyle(root);
        const currentWidth = computedStyle.getPropertyValue('--sidebar-width').trim();

        // Convert "240px" -> 240
        const numericWidth = parseInt(currentWidth, 10);
        if (!isNaN(numericWidth)) {
            setSidebarWidth(numericWidth);
        }
    }, []);

    const updateSidebarWidth = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newWidth = parseInt(e.target.value, 10);
        setSidebarWidth(newWidth);

        const root = document.documentElement;
        root.style.setProperty('--sidebar-width', `${newWidth}px`);
    };

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
                <div className="flex flex-col gap-2">
                    <h1 className="flex items-center gap-3 text-3xl font-semibold tracking-tight">
                        Layout
                    </h1>
                    <p className="text-muted-foreground">
                        Configure the global layout settings for your documentation site.
                    </p>
                </div>
            </div>



            <div className="grid gap-8 max-w-2xl">
                {/* Sidebar Width Section */}
                <section className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-semibold tracking-tight">Sidebar Width</h2>
                            <p className="text-muted-foreground">Set the width of the navigation sidebar.</p>
                        </div>
                        <span className="font-mono text-sm bg-muted px-2 py-1 rounded">
                            {sidebarWidth}px
                        </span>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-medium text-muted-foreground w-12">200px</span>
                            <input
                                type="range"
                                min="200"
                                max="320"
                                step="4"
                                value={sidebarWidth}
                                onChange={updateSidebarWidth}
                                className="flex-1 h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                            />
                            <span className="text-sm font-medium text-muted-foreground w-12 text-right">320px</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Default width is 240px. Drag the slider to adjust in real-time.
                        </p>
                    </div>
                </section>

                <Separator />

                {/* Future placeholders */}
                <section className="opacity-50 pointer-events-none">
                    <h2 className="mb-2 text-xl font-semibold tracking-tight">Content Width (Coming Soon)</h2>
                    <p className="text-muted-foreground mb-4">Limit the maximum width of the main content area.</p>
                    <div className="h-2 bg-muted rounded w-full"></div>
                </section>
            </div>
        </div>
    );
};

export default SiteLayoutPage;
