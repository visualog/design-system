import React from 'react';
import { Palette, Layout, Type, Box } from 'lucide-react';

import { Link } from 'react-router-dom';

const SiteSettingsPage = () => {
    return (
        <div className="flex flex-col gap-8 pb-20">
            <div>
                <div className="flex flex-col gap-2">
                    <h1 className="flex items-center gap-3 text-3xl font-semibold tracking-tight">
                        Site Settings
                    </h1>
                    <p className="text-muted-foreground">
                        Manage your documentation site's appearance, navigation, and components.
                    </p>
                </div>
            </div>



            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Value Component for Theme Settings */}
                <SettingCard
                    icon={<Palette className="w-6 h-6" />}
                    title="Theme"
                    description="Configure global colors, fonts, radius, and overall site theme."
                    href="/site-settings/theme"
                />

                {/* Placeholder Component for Layout Settings */}
                <SettingCard
                    icon={<Layout className="w-6 h-6" />}
                    title="Layout"
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
        <div className={`rounded-xl border bg-card text-card-foreground p-6 flex flex-col gap-4 relative overflow-hidden transition-colors ${href ? 'hover:bg-muted/50' : ''}`}>
            <div className="flex items-center gap-4">
                <div className="p-2 bg-primary rounded-lg text-primary-foreground">
                    {icon}
                </div>
                <h3 className="font-semibold text-lg tracking-tight group-hover:text-primary transition-colors">{title}</h3>
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
