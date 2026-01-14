import React, { useEffect, useState } from 'react';
import { ArrowLeft, Palette, Check, Monitor, Moon, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';

const SiteThemePage = () => {
    const [radius, setRadius] = useState('0.625rem');
    const [mode, setMode] = useState<'light' | 'dark'>('light');
    const [primary, setPrimary] = useState('Theme Blue');

    // Retrieve initial values from CSS variables on mount
    useEffect(() => {
        const root = document.documentElement;
        const computedStyle = getComputedStyle(root);

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
        { value: '0rem', label: '0' },
        { value: '0.3rem', label: '0.3' },
        { value: '0.5rem', label: '0.5' },
        { value: '0.625rem', label: 'Default' },
        { value: '1rem', label: '1.0' },
    ];

    const colorPresets = [
        {
            name: 'Theme Blue',
            values: {
                primary: '0.15 0.023 240', // oklch(0.15 0.023 240) -> dark blue
                primaryForeground: '0.98 0.003 240',
                ring: '0.45 0.021 240'
            },
            class: 'bg-blue-600'
        },
        {
            name: 'Violet',
            values: {
                primary: '0.45 0.25 290',
                primaryForeground: '0.98 0 0',
                ring: '0.45 0.25 290'
            },
            class: 'bg-violet-600'
        },
        {
            name: 'Pink',
            values: {
                primary: '0.55 0.25 340',
                primaryForeground: '0.98 0 0',
                ring: '0.55 0.25 340'
            },
            class: 'bg-pink-600'
        },
        {
            name: 'Orange',
            values: {
                primary: '0.6 0.2 40',
                primaryForeground: '0.98 0 0',
                ring: '0.6 0.2 40'
            },
            class: 'bg-orange-600'
        },
        {
            name: 'Green',
            values: {
                primary: '0.5 0.2 140',
                primaryForeground: '0.98 0 0',
                ring: '0.5 0.2 140'
            },
            class: 'bg-green-600'
        },
    ];

    return (
        <div className="flex flex-col gap-8 pb-20">
            <div>
                <div className="flex items-center gap-2 mb-4">
                    <Link
                        to="/site-settings"
                        className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 text-sm font-medium"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Settings (설정으로 돌아가기)
                    </Link>
                </div>
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                    <Palette className="w-8 h-8" />
                    테마 관리 (Theme Management)
                </h1>
                <p className="text-lg text-muted-foreground mt-2">
                    사이트의 전반적인 모양과 느낌을 사용자 정의합니다.
                </p>
            </div>

            <Separator />

            <div className="grid gap-8">
                {/* Mode Section */}
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold">모드 (Mode)</h2>
                    <p className="text-muted-foreground">사이트의 색상 모드를 선택합니다.</p>
                    <div className="grid grid-cols-3 gap-4 max-w-xl">
                        <button
                            onClick={() => toggleMode('light')}
                            className={`flex flex-col items-center justify-between rounded-xl border-2 p-4 hover:bg-accent/50 ${mode === 'light' ? 'border-primary bg-accent/20' : 'border-muted'}`}
                        >
                            <Sun className="h-6 w-6 mb-2" />
                            <span className="font-medium">Light</span>
                        </button>
                        <button
                            onClick={() => toggleMode('dark')}
                            className={`flex flex-col items-center justify-between rounded-xl border-2 p-4 hover:bg-accent/50 ${mode === 'dark' ? 'border-primary bg-accent/20' : 'border-muted'}`}
                        >
                            <Moon className="h-6 w-6 mb-2" />
                            <span className="font-medium">Dark</span>
                        </button>
                        {/* System placeholder if needed, for now just 2 modes */}
                    </div>
                </section>

                <Separator />

                {/* Radius Section */}
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold">반경 (Radius)</h2>
                    <p className="text-muted-foreground">UI 요소의 모서리 둥글기를 조정합니다.</p>
                    <div className="flex flex-wrap gap-4">
                        {radiusOptions.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => updateRadius(option.value)}
                                className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${radius === option.value ? 'border-primary bg-primary/10 text-primary' : 'border-muted hover:border-foreground/50'}`}
                            >
                                {option.label}
                                <br />
                                <span className="text-xs text-muted-foreground font-normal">{option.value}</span>
                            </button>
                        ))}
                    </div>

                    {/* Preview Area for Radius */}
                    <div className="p-6 border rounded-xl bg-card flex gap-4 items-center mt-4 max-w-md">
                        <div className="w-16 h-16 bg-primary rounded-md flex items-center justify-center text-primary-foreground font-bold">Box</div>
                        <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md font-medium">Button</button>
                        <input type="text" placeholder="Input" className="px-3 py-2 border rounded-md bg-transparent max-w-[120px]" />
                    </div>
                </section>

                <Separator />

                {/* Color Section */}
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold">기본 색상 (Primary Color)</h2>
                    <p className="text-muted-foreground">브랜드의 주요 색상을 선택합니다.</p>
                    <div className="flex flex-wrap gap-4">
                        {colorPresets.map((preset) => (
                            <button
                                key={preset.name}
                                onClick={() => updatePrimary(preset.name, preset.values)}
                                className={`relative flex items-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${primary === preset.name ? 'border-primary bg-accent' : 'border-muted hover:border-foreground/50'}`}
                            >
                                <span className={`w-6 h-6 rounded-full ${preset.class} shadow-sm border border-white/10`}></span>
                                <span className="font-medium">{preset.name}</span>
                                {primary === preset.name && <Check className="ml-auto w-4 h-4 text-primary" />}
                            </button>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default SiteThemePage;
