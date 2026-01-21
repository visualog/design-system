import { useEffect, useState } from 'react';
import { Check, Moon, Sun } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const SiteThemePage = () => {
    const [radius, setRadius] = useState('0.625rem');
    const [mode, setMode] = useState<'light' | 'dark'>('light');
    const [primary, setPrimary] = useState('Theme Blue');
    const [rootFontSize, setRootFontSize] = useState(16);

    // Retrieve initial values from CSS variables on mount
    useEffect(() => {
        const root = document.documentElement;
        const computedStyle = getComputedStyle(root);

        // Get Root Font Size for rem calculation
        const currentFontSize = parseFloat(computedStyle.fontSize);
        if (!isNaN(currentFontSize)) setRootFontSize(currentFontSize);

        // Initial Radius
        const currentRadius = computedStyle.getPropertyValue('--radius').trim();
        if (currentRadius) setRadius(currentRadius);

        // Initial Mode
        if (root.classList.contains('dark')) {
            setMode('dark');
        } else {
            setMode('light');
        }

        // We can't easily reverse-engineer the "Name" of the primary color from oklch values
        // so we'll just track it in local state for the UI highlights, 
        // assuming standard defaults or what the user clicks.
    }, []);

    const updateRadius = (newRadius: string) => {
        const root = document.documentElement;
        root.style.setProperty('--radius', newRadius);
        setRadius(newRadius);
    };

    const toggleMode = (newMode: 'light' | 'dark') => {
        const root = document.documentElement;
        if (newMode === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        setMode(newMode);
    };

    const updatePrimary = (colorName: string, colorValues: { primary: string, primaryForeground: string, ring: string }) => {
        const root = document.documentElement;
        root.style.setProperty('--primary', colorValues.primary);
        root.style.setProperty('--primary-foreground', colorValues.primaryForeground);
        root.style.setProperty('--ring', colorValues.ring);
        // Also update sidebar primary if needed, or keep it sync
        root.style.setProperty('--sidebar-primary', colorValues.primary);
        root.style.setProperty('--sidebar-primary-foreground', colorValues.primaryForeground);

        setPrimary(colorName);
    };

    const radiusOptions = [
        { value: '0rem', label: 'none' },
        { value: '0.3rem', label: 'xs' },
        { value: '0.5rem', label: 'sm' },
        { value: '0.625rem', label: 'md' },
        { value: '1rem', label: 'lg' },
    ];

    const colorPresets = [
        {
            name: 'Theme Blue',
            values: {
                primary: '221 83% 53%',
                primaryForeground: '0 0% 98%',
                ring: '221 83% 53%'
            },
            class: 'bg-blue-600'
        },
        {
            name: 'Violet',
            values: {
                primary: '262 83% 58%',
                primaryForeground: '0 0% 98%',
                ring: '262 83% 58%'
            },
            class: 'bg-violet-600'
        },
        {
            name: 'Pink',
            values: {
                primary: '332 73% 54%',
                primaryForeground: '0 0% 98%',
                ring: '332 73% 54%'
            },
            class: 'bg-pink-600'
        },
        {
            name: 'Orange',
            values: {
                primary: '21 90% 48%',
                primaryForeground: '0 0% 98%',
                ring: '21 90% 48%'
            },
            class: 'bg-orange-600'
        },
        {
            name: 'Green',
            values: {
                primary: '142 71% 45%',
                primaryForeground: '0 0% 98%',
                ring: '142 71% 45%'
            },
            class: 'bg-green-600'
        },
    ];

    return (
        <div className="flex flex-col gap-8 pb-20">
            <div>

                <div className="flex flex-col gap-2">
                    <h1 className="flex items-center gap-3 text-3xl font-semibold tracking-tight">
                        Theme
                    </h1>
                    <p className="text-muted-foreground">
                        Manage your site's visual theme, including colors, radius, and light/dark mode preferences.
                    </p>
                </div>
            </div>



            <div className="grid gap-8">
                {/* Color Section */}
                <section className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-xl font-semibold tracking-tight">Primary Color</h2>
                        <p className="text-muted-foreground">Choose the primary brand color.</p>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        {colorPresets.map((preset) => (
                            <button
                                key={preset.name}
                                onClick={() => updatePrimary(preset.name, preset.values)}
                                className={`relative flex items-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${primary === preset.name ? 'border-transparent bg-muted text-primary' : 'border-muted hover:bg-muted/50'}`}
                            >
                                <span className={`w-6 h-6 rounded-full ${preset.class} shadow-sm border border-white/10 flex items-center justify-center`}>
                                    {primary === preset.name && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
                                </span>
                                <span className="text-sm font-medium">{preset.name}</span>
                            </button>
                        ))}
                    </div>
                </section>

                <Separator className="bg-zinc-200 dark:bg-zinc-800" />

                {/* Radius Section */}
                <section className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-xl font-semibold tracking-tight">Radius</h2>
                        <p className="text-muted-foreground">Adjust the corner roundness of UI elements.</p>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        {radiusOptions.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => updateRadius(option.value)}
                                className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${radius === option.value ? 'border-transparent bg-muted text-primary' : 'border-muted hover:bg-muted/50'}`}
                            >
                                {option.label}
                                <br />
                                <span className="text-[10px] text-muted-foreground font-normal">
                                    {option.value} ({Math.round(parseFloat(option.value) * rootFontSize)}px)
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Preview Area for Radius */}
                    <div className="flex gap-4 items-center max-w-md">
                        <div className="w-16 h-16 bg-primary rounded-md flex items-center justify-center text-primary-foreground font-bold">Box</div>
                        <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md font-medium">Button</button>
                        <input type="text" placeholder="Input" className="px-3 py-2 border rounded-md bg-transparent max-w-[120px]" />
                    </div>
                </section>

                <Separator className="bg-zinc-200 dark:bg-zinc-800" />

                {/* Mode Section */}
                <section className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-xl font-semibold tracking-tight">Mode</h2>
                        <p className="text-muted-foreground">Select the site's color mode.</p>
                    </div>
                    <div className="grid grid-cols-3 gap-4 max-w-xl">
                        <button
                            onClick={() => toggleMode('light')}
                            className={`flex flex-col items-center justify-between rounded-xl border-2 p-4 transition-all ${mode === 'light' ? 'border-transparent bg-muted text-primary' : 'border-muted hover:bg-muted/50'}`}
                        >
                            <Sun className="h-6 w-6 mb-2" />
                            <span className="text-sm font-medium">Light</span>
                        </button>
                        <button
                            onClick={() => toggleMode('dark')}
                            className={`flex flex-col items-center justify-between rounded-xl border-2 p-4 transition-all ${mode === 'dark' ? 'border-transparent bg-muted text-primary' : 'border-muted hover:bg-muted/50'}`}
                        >
                            <Moon className="h-6 w-6 mb-2" />
                            <span className="text-sm font-medium">Dark</span>
                        </button>
                        {/* System placeholder if needed, for now just 2 modes */}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default SiteThemePage;
