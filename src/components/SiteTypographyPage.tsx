import { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const SiteTypographyPage = () => {
    const [fontFamily, setFontFamily] = useState('System (Apple)');
    const [baseFontSize, setBaseFontSize] = useState('16px');

    useEffect(() => {
        const body = document.body;
        const computedStyle = getComputedStyle(body);

        // Initial font size
        const currentFontSize = computedStyle.fontSize;
        if (currentFontSize) setBaseFontSize(currentFontSize);
    }, []);

    const updateFontFamily = (name: string, value: string) => {
        document.body.style.fontFamily = value;
        setFontFamily(name);
    };

    const updateBaseFontSize = (size: string) => {
        document.documentElement.style.fontSize = size;
        setBaseFontSize(size);
    };


    const fontFamilyOptions = [
        {
            name: 'System (Apple)',
            value: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            sample: 'The quick brown fox jumps (System)',
        },
        {
            name: 'Pretendard',
            value: '"Pretendard Variable", "Pretendard", -apple-system, BlinkMacSystemFont, sans-serif',
            sample: '가나다라마바사 ABCD 1234',
        },
        {
            name: 'Inter',
            value: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
            sample: 'The quick brown fox jumps',
        },
    ];

    const fontSizeOptions = [
        { value: '14px', label: '작게 (14px)' },
        { value: '15px', label: '보통 (15px)' },
        { value: '16px', label: '기본 (16px)' },
        { value: '17px', label: '크게 (17px)' },
        { value: '18px', label: '매우 크게 (18px)' },
    ];


    return (
        <div className="flex flex-col gap-8 pb-20">
            <div>

                <div className="flex flex-col gap-2">
                    <h1 className="flex items-center gap-3 text-3xl font-semibold tracking-tight">
                        Typography
                    </h1>
                    <p className="text-muted-foreground">
                        Apple-style typography system ensuring optimal readability and hierarchy.
                    </p>
                </div>
            </div>

            <div className="grid gap-8 max-w-4xl">
                {/* Font Family Section */}
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold tracking-tight">Font Family</h2>
                    <p className="text-muted-foreground">Default system font stack (San Francisco on Apple devices).</p>
                    <div className="grid gap-3">
                        {fontFamilyOptions.map((option) => (
                            <button
                                key={option.name}
                                onClick={() => updateFontFamily(option.name, option.value)}
                                className={`flex items-center justify-between px-4 py-3 rounded-lg border-2 transition-all text-left ${fontFamily === option.name ? 'border-primary bg-accent' : 'border-muted hover:bg-muted/50'}`}
                            >
                                <div>
                                    <span className="font-medium">{option.name}</span>
                                    <p className="text-sm text-muted-foreground mt-1" style={{ fontFamily: option.value }}>
                                        {option.sample}
                                    </p>
                                </div>
                                {fontFamily === option.name && <Check className="w-5 h-5 text-primary" />}
                            </button>
                        ))}
                    </div>
                </section>

                <Separator />

                {/* Base Font Size Section */}
                <section className="space-y-4">
                    <h2>Base Font Size (Root)</h2>
                    <p className="text-muted-foreground">Adjusting this scales all REM-based typography (1rem = 16px default).</p>
                    <div className="flex flex-wrap gap-3">
                        {fontSizeOptions.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => updateBaseFontSize(option.value)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${baseFontSize === option.value ? 'border-primary bg-primary/10 text-primary' : 'border-muted hover:bg-muted/50'}`}
                            >
                                {option.label}
                                {baseFontSize === option.value && <Check className="w-4 h-4" />}
                            </button>
                        ))}
                    </div>
                </section>

                <Separator />

                {/* Scale Section */}
                <section className="space-y-6">
                    <div className="space-y-2">
                        <h2 className="text-xl font-semibold tracking-tight">Type Scale</h2>
                        <p className="text-muted-foreground">
                            Based on Apple HIG iOS/macOS text styles.
                        </p>
                    </div>

                    <div className="rounded-xl border bg-card overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-muted/50 text-muted-foreground">
                                    <tr>
                                        <th className="px-4 py-3 font-medium">Token (Web)</th>
                                        <th className="px-4 py-3 font-medium">Size / Line-height</th>
                                        <th className="px-4 py-3 font-medium">Weight</th>
                                        <th className="px-4 py-3 font-medium">Preview / Usage</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {[
                                        { token: 'display-xl', size: '64px', lh: '1.1', weight: '600', usage: 'Landing Main Hero', class: 'text-display-xl' },
                                        { token: 'display-lg', size: '40px', lh: '1.2', weight: '600', usage: 'Section Main Title', class: 'text-display-lg' },
                                        { token: 'heading-xl', size: '32px', lh: '1.25', weight: '600', usage: 'Page Title', class: 'text-heading-xl' },
                                        { token: 'heading-lg', size: '28px', lh: '1.25', weight: '600', usage: 'Large Section Header', class: 'text-heading-lg' },
                                        { token: 'heading-md', size: '24px', lh: '1.3', weight: '600', usage: 'Section Header', class: 'text-heading-md' },
                                        { token: 'heading-sm', size: '20px', lh: '1.3', weight: '600', usage: 'Card Title', class: 'text-heading-sm' },
                                        { token: 'body-lg', size: '18px', lh: '1.6', weight: '400', usage: 'Body (Wide)', class: 'text-body-lg' },
                                        { token: 'body-md', size: '16px', lh: '1.6', weight: '400', usage: 'Body (Default)', class: 'text-body-md' },
                                        { token: 'body-sm', size: '14px', lh: '1.6', weight: '400', usage: 'Subtext', class: 'text-body-sm' },
                                        { token: 'label-md', size: '14px', lh: '1.4', weight: '600', usage: 'Button/Form Label', class: 'text-label-md' },
                                        { token: 'label-sm', size: '12px', lh: '1.4', weight: '600', usage: 'Badge/Table Header', class: 'text-label-sm' },
                                        { token: 'caption', size: '12px', lh: '1.4', weight: '400', usage: 'Meta Info', class: 'text-caption' },
                                        { token: 'micro', size: '11px', lh: '1.4', weight: '400', usage: 'Footnote', class: 'text-micro' },
                                    ].map((item) => (
                                        <tr key={item.token} className="hover:bg-muted/50 transition-colors">
                                            <td className="px-4 py-4 font-mono text-muted-foreground">{item.token}</td>
                                            <td className="px-4 py-4">
                                                <div className="flex flex-col">
                                                    <span>{item.size}</span>
                                                    <span className="text-muted-foreground text-xs">LH {item.lh}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4">{item.weight}</td>
                                            <td className="px-4 py-4">
                                                <div className="flex flex-col gap-1">
                                                    <p className={item.class}>The quick brown fox</p>
                                                    <span className="text-xs text-muted-foreground">{item.usage}</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
        </div >
    );
};

export default SiteTypographyPage;
