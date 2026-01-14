import React, { useEffect, useState } from 'react';
import { ArrowLeft, Type, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';

const SiteTypographyPage = () => {
    const [baseFontSize, setBaseFontSize] = useState('16px');

    useEffect(() => {
        const root = document.documentElement;
        const computedStyle = getComputedStyle(root);
        const currentFontSize = computedStyle.fontSize;
        setBaseFontSize(currentFontSize);
    }, []);

    const updateBaseFontSize = (size: string) => {
        const root = document.documentElement;
        root.style.fontSize = size;
        setBaseFontSize(size);
    };

    const fontSizeOptions = [
        { value: '14px', label: 'Small (14px)' },
        { value: '16px', label: 'Medium (16px)' },
        { value: '18px', label: 'Large (18px)' },
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
                        Back to Settings
                    </Link>
                </div>
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                    <Type className="w-8 h-8" />
                    Typography
                </h1>
                <p className="text-lg text-muted-foreground mt-2">
                    Manage base font size and view the type scale.
                </p>
            </div>

            <Separator />

            <div className="grid gap-8 max-w-3xl">
                {/* Base Font Size Section */}
                <section className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-semibold">Base Font Size</h2>
                            <p className="text-muted-foreground">Adjust the root font size. This affects all REM-based spacing and text sizes.</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        {fontSizeOptions.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => updateBaseFontSize(option.value)}
                                className={`flex items-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${baseFontSize === option.value ? 'border-primary bg-accent' : 'border-muted hover:border-foreground/50'}`}
                            >
                                <span className="font-medium">{option.label}</span>
                                {baseFontSize === option.value && <Check className="w-4 h-4 text-primary" />}
                            </button>
                        ))}
                    </div>
                </section>

                <Separator />

                {/* Type Scale Preview */}
                <section className="space-y-6">
                    <h2 className="text-xl font-semibold">Type Scale Preview</h2>
                    <div className="space-y-6 p-6 border rounded-xl bg-card">
                        <div className="space-y-1">
                            <span className="text-xs text-muted-foreground font-mono">H1 / 4xl</span>
                            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">The quick brown fox jumps over the lazy dog</h1>
                        </div>
                        <div className="space-y-1">
                            <span className="text-xs text-muted-foreground font-mono">H2 / 3xl</span>
                            <h2 className="text-3xl font-semibold tracking-tight">The quick brown fox jumps over the lazy dog</h2>
                        </div>
                        <div className="space-y-1">
                            <span className="text-xs text-muted-foreground font-mono">H3 / 2xl</span>
                            <h3 className="text-2xl font-semibold tracking-tight">The quick brown fox jumps over the lazy dog</h3>
                        </div>
                        <div className="space-y-1">
                            <span className="text-xs text-muted-foreground font-mono">H4 / xl</span>
                            <h4 className="text-xl font-semibold tracking-tight">The quick brown fox jumps over the lazy dog</h4>
                        </div>
                        <div className="space-y-1">
                            <span className="text-xs text-muted-foreground font-mono">Body / base</span>
                            <p className="leading-7">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </p>
                        </div>
                        <div className="space-y-1">
                            <span className="text-xs text-muted-foreground font-mono">Small / sm</span>
                            <p className="text-sm text-muted-foreground font-medium">
                                Small text for captions, hints, or secondary information.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default SiteTypographyPage;
