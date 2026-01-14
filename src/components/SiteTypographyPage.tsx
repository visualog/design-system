import { useEffect, useState } from 'react';
import { ArrowLeft, Type, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';

const SiteTypographyPage = () => {
    const [fontFamily, setFontFamily] = useState('Pretendard');
    const [baseFontSize, setBaseFontSize] = useState('16px');
    const [lineHeight, setLineHeight] = useState('1.5');
    const [fontWeight, setFontWeight] = useState('400');

    useEffect(() => {
        const body = document.body;
        const computedStyle = getComputedStyle(body);

        // Initial font size
        const currentFontSize = computedStyle.fontSize;
        if (currentFontSize) setBaseFontSize(currentFontSize);

        // Initial line height
        const currentLineHeight = computedStyle.lineHeight;
        if (currentLineHeight && currentLineHeight !== 'normal') {
            const fontSizePx = parseFloat(currentFontSize);
            const lineHeightPx = parseFloat(currentLineHeight);
            if (!isNaN(fontSizePx) && !isNaN(lineHeightPx)) {
                setLineHeight((lineHeightPx / fontSizePx).toFixed(1));
            }
        }
    }, []);

    const updateFontFamily = (name: string, value: string) => {
        document.body.style.fontFamily = value;
        setFontFamily(name);
    };

    const updateBaseFontSize = (size: string) => {
        document.documentElement.style.fontSize = size;
        setBaseFontSize(size);
    };

    const updateLineHeight = (height: string) => {
        document.body.style.lineHeight = height;
        setLineHeight(height);
    };

    const updateFontWeight = (weight: string) => {
        document.body.style.fontWeight = weight;
        setFontWeight(weight);
    };

    const fontFamilyOptions = [
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
        {
            name: 'Noto Sans KR',
            value: '"Noto Sans KR", -apple-system, BlinkMacSystemFont, sans-serif',
            sample: '가나다라마바사 ABCD 1234',
        },
        {
            name: 'System',
            value: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            sample: 'System Default Font',
        },
    ];

    const fontSizeOptions = [
        { value: '14px', label: '작게 (14px)' },
        { value: '15px', label: '보통 (15px)' },
        { value: '16px', label: '기본 (16px)' },
        { value: '17px', label: '크게 (17px)' },
        { value: '18px', label: '매우 크게 (18px)' },
    ];

    const lineHeightOptions = [
        { value: '1.4', label: '좁게 (1.4)' },
        { value: '1.5', label: '기본 (1.5)' },
        { value: '1.6', label: '보통 (1.6)' },
        { value: '1.75', label: '넓게 (1.75)' },
        { value: '2.0', label: '매우 넓게 (2.0)' },
    ];

    const fontWeightOptions = [
        { value: '300', label: 'Light' },
        { value: '400', label: 'Regular' },
        { value: '500', label: 'Medium' },
        { value: '600', label: 'Semibold' },
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
                    Typography Settings
                </h1>
                <p className="text-lg text-muted-foreground mt-2">
                    Customize the site's font family, size, line height, and weight.
                </p>
            </div>



            <div className="grid gap-8 max-w-3xl">
                {/* Font Family Section */}
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold">Font Family</h2>
                    <p className="text-muted-foreground">Select the default font family.</p>
                    <div className="grid gap-3">
                        {fontFamilyOptions.map((option) => (
                            <button
                                key={option.name}
                                onClick={() => updateFontFamily(option.name, option.value)}
                                className={`flex items-center justify-between px-4 py-3 rounded-lg border-2 transition-all text-left ${fontFamily === option.name ? 'border-primary bg-accent' : 'border-muted hover:border-foreground/50'}`}
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
                    <h2 className="text-xl font-semibold">Base Font Size</h2>
                    <p className="text-muted-foreground">Adjust root font size. This affects all REM-based spacing.</p>
                    <div className="flex flex-wrap gap-3">
                        {fontSizeOptions.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => updateBaseFontSize(option.value)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${baseFontSize === option.value ? 'border-primary bg-primary/10 text-primary' : 'border-muted hover:border-foreground/50'}`}
                            >
                                {option.label}
                                {baseFontSize === option.value && <Check className="w-4 h-4" />}
                            </button>
                        ))}
                    </div>
                </section>

                <Separator />

                {/* Line Height Section */}
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold">Line Height</h2>
                    <p className="text-muted-foreground">Control text line spacing.</p>
                    <div className="flex flex-wrap gap-3">
                        {lineHeightOptions.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => updateLineHeight(option.value)}
                                className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${lineHeight === option.value ? 'border-primary bg-primary/10 text-primary' : 'border-muted hover:border-foreground/50'}`}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>

                    {/* Preview */}
                    <div className="p-6 border rounded-xl bg-card mt-4">
                        <p style={{ lineHeight: lineHeight }}>
                            Design systems are built to provide a consistent user experience.
                            systematically defining everything from basic elements like typography, color, and spacing to components.
                            This is a sample paragraph to preview the line height setting.
                        </p>
                    </div>
                </section>

                <Separator />

                {/* Font Weight Section */}
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold">Default Font Weight</h2>
                    <p className="text-muted-foreground">Set the default weight for body text.</p>
                    <div className="flex flex-wrap gap-3">
                        {fontWeightOptions.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => updateFontWeight(option.value)}
                                className={`px-4 py-2 rounded-lg border-2 text-sm transition-all ${fontWeight === option.value ? 'border-primary bg-primary/10 text-primary' : 'border-muted hover:border-foreground/50'}`}
                                style={{ fontWeight: option.value }}
                            >
                                {option.label} ({option.value})
                            </button>
                        ))}
                    </div>
                </section>

                <Separator />

                {/* Type Scale Preview */}
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold">Type Scale Preview</h2>
                    <div className="space-y-6 p-6 border rounded-xl bg-card">
                        <div className="space-y-1">
                            <span className="text-xs text-muted-foreground font-mono">H1 / 4xl</span>
                            <h1 className="text-4xl font-extrabold tracking-tight">The quick brown fox jumps</h1>
                        </div>
                        <div className="space-y-1">
                            <span className="text-xs text-muted-foreground font-mono">H2 / 3xl</span>
                            <h2 className="text-3xl font-semibold tracking-tight">The quick brown fox jumps</h2>
                        </div>
                        <div className="space-y-1">
                            <span className="text-xs text-muted-foreground font-mono">H3 / 2xl</span>
                            <h3 className="text-2xl font-semibold tracking-tight">The quick brown fox jumps</h3>
                        </div>
                        <div className="space-y-1">
                            <span className="text-xs text-muted-foreground font-mono">H4 / xl</span>
                            <h4 className="text-xl font-semibold tracking-tight">The quick brown fox jumps</h4>
                        </div>
                        <div className="space-y-1">
                            <span className="text-xs text-muted-foreground font-mono">Body / base</span>
                            <p className="leading-7">
                                Design systems provide a consistent user experience.
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            </p>
                            <span className="text-xs text-muted-foreground font-mono">Small / sm</span>
                            <p className="text-sm text-muted-foreground">
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
