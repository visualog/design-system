import React from 'react';
import { Settings, Palette, Layout, Type, Box } from 'lucide-react';

import { Link } from 'react-router-dom';

const SiteSettingsPage = () => {
    return (
        <div className="flex flex-col gap-8 pb-20">
            <div>
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                    <Settings className="w-8 h-8" />
                    Site Settings
                </h1>
                <p className="text-lg text-muted-foreground mt-2">
                    Manage environment settings and UI components for the design system site.
                </p>
            </div>



            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Value Component for Theme Settings */}
                <SettingCard
                    icon={<Palette className="w-6 h-6" />}
                    title="Theme Management"
                    description="Configure global colors, fonts, radius, and overall site theme."
                    href="/site-settings/theme"
                />

                {/* Placeholder Component for Layout Settings */}
                <SettingCard
                    icon={<Layout className="w-6 h-6" />}
                    title="Layout Config"
                    description="Adjust sidebar width, navigation structure, and page layouts."
                    href="/site-settings/layout"
                />


                {/* Typography Settings */}
                <SettingCard
                    icon={<Type className="w-6 h-6" />}
                    title="Typography"
                    description="Manage font families, base sizes, line heights, and weights."
                    href="/site-settings/typography"
                />

                {/* Placeholder Component for Components Settings */}
                <SettingCard
                    icon={<Box className="w-6 h-6" />}
                    title="Components"
                    description="Set style presets and detailed specifications for UI components."
                    href="/site-settings/components"
                />
            </div>
        </div>
    );
};

interface SettingCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    status?: string;
    href?: string;
}

const SettingCard = ({ icon, title, description, status, href }: SettingCardProps) => {
    const CardContent = (
        <div className={`rounded-xl border bg-card text-card-foreground p-6 flex flex-col gap-4 relative overflow-hidden transition-colors ${href ? 'hover:bg-accent/5' : ''}`}>
            <div className="flex items-center gap-4">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    {icon}
                </div>
                <h3 className="font-semibold text-lg">{title}</h3>
            </div>
            <p className="text-sm text-muted-foreground">
                {description}
            </p>
            {status && (
                <div className="mt-auto pt-4 flex justify-end">
                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                        {status}
                    </span>
                </div>
            )}
        </div>
    );

    if (href) {
        return <Link to={href} className="block group">{CardContent}</Link>;
    }

    return CardContent;
};

export default SiteSettingsPage;
