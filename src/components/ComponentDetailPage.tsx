import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Copy, Check, Ruler, Info, Palette } from 'lucide-react';
import { motion } from 'motion/react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Clipboard } from '@/components/ui/clipboard';
import GuidelineItem from '@/components/ui/GuidelineItem';
import { getComponentMeta } from '@/data/componentRegistry';
import type { PropDefinition } from '@/data/componentRegistry';
import { AnimatedTabs, AnimatedTabsContent } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import AnatomyPreview, { getAnatomyVariants } from '@/components/AnatomyPreview';
import AnatomyInfoPanel from '@/components/AnatomyInfoPanel';
import MeasureOverlay from '@/components/ui/MeasureOverlay';

// 컴포넌트별 라이브 프리뷰 렌더링
const LivePreview: React.FC<{ componentName: string; variantName: string }> = ({ componentName, variantName }) => {
    const name = componentName.toLowerCase();

    // Button
    if (name === 'button') {
        if (variantName === 'Default') return <Button>Button</Button>;
        if (variantName === 'Secondary') return <Button variant="secondary">Secondary</Button>;
        if (variantName === 'Outline') return <Button variant="outline">Outline</Button>;
        if (variantName === 'Ghost') return <Button variant="ghost">Ghost</Button>;
        if (variantName === 'Destructive') return <Button variant="destructive">Delete</Button>;
    }

    // Card
    if (name === 'card') {
        return (
            <Card className="w-[300px]">
                <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>Card description text</CardDescription>
                </CardHeader>
                <CardContent>Card content goes here.</CardContent>
            </Card>
        );
    }

    // Input
    if (name === 'input') {
        if (variantName === 'Default') return <Input placeholder="Enter text..." className="max-w-[250px]" />;
        if (variantName === 'Disabled') return <Input disabled placeholder="Disabled" className="max-w-[250px]" />;
        if (variantName === 'With Label') {
            return (
                <div className="space-y-2 max-w-[250px]">
                    <label className="text-sm font-medium">Email</label>
                    <Input type="email" placeholder="email@example.com" />
                </div>
            );
        }
    }

    // Tooltip
    if (name === 'tooltip') {
        return (
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="outline">Hover me</Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Tooltip text</p>
                </TooltipContent>
            </Tooltip>
        );
    }

    // Separator
    if (name === 'separator') {
        if (variantName === 'Horizontal') return <Separator className="w-[200px]" />;
        if (variantName === 'Vertical') return <Separator orientation="vertical" className="h-8" />;
    }

    // Popover
    if (name === 'popover') {
        return (
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline">Open Popover</Button>
                </PopoverTrigger>
                <PopoverContent className="w-60">
                    <p className="text-sm">Popover content appears here.</p>
                </PopoverContent>
            </Popover>
        );
    }

    // Sheet
    if (name === 'sheet') {
        return (
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline">Open Sheet</Button>
                </SheetTrigger>
                <SheetContent side="right">
                    <SheetHeader>
                        <SheetTitle>Sheet Title</SheetTitle>
                    </SheetHeader>
                    <p className="mt-4 text-sm text-muted-foreground">Sheet content here.</p>
                </SheetContent>
            </Sheet>
        );
    }

    // Switch
    if (name === 'switch') {
        if (variantName === 'Default') return <Switch />;
        if (variantName === 'With Label') {
            return (
                <div className="flex items-center gap-2">
                    <Switch id="demo" />
                    <label htmlFor="demo" className="text-sm">Airplane Mode</label>
                </div>
            );
        }
    }

    // Table
    if (name === 'table') {
        return (
            <Table className="w-[300px]">
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>Item 1</TableCell>
                        <TableCell>Active</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Item 2</TableCell>
                        <TableCell>Pending</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        );
    }

    // Tabs
    if (name === 'tabs') {
        const [activeTab, setActiveTab] = React.useState('tab1');
        const [patternTab, setPatternTab] = React.useState('account');

        if (variantName === 'Settings Pattern') {
            const tabs = [
                { name: 'Account', value: 'account' },
                { name: 'Password', value: 'password' },
                { name: 'Settings', value: 'settings' },
            ];

            return (
                <div className="w-full max-w-[400px] p-6 border rounded-xl bg-background shadow-sm">
                    <AnimatedTabs tabs={tabs} activeTab={patternTab} setActiveTab={setPatternTab}>
                        <div className="mt-6 p-4 border rounded-lg bg-muted/10 min-h-[120px]">
                            <AnimatedTabsContent value="account">
                                <h4 className="font-medium">Account</h4>
                                <p className="text-sm text-muted-foreground">Manage your account settings here.</p>
                            </AnimatedTabsContent>
                            <AnimatedTabsContent value="password">
                                <h4 className="font-medium">Password</h4>
                                <p className="text-sm text-muted-foreground">Change your password securely.</p>
                            </AnimatedTabsContent>
                            <AnimatedTabsContent value="settings">
                                <h4 className="font-medium">Settings</h4>
                                <p className="text-sm text-muted-foreground">Adjust your preferences.</p>
                            </AnimatedTabsContent>
                        </div>
                    </AnimatedTabs>
                </div>
            );
        }

        if (variantName === 'Animated Tabs (Basic)') {
            const tabs = [
                { name: 'Tab 1', value: 'tab1' },
                { name: 'Tab 2', value: 'tab2' },
            ];
            return (
                <div className="w-full max-w-[400px] p-6 border rounded-xl bg-background shadow-sm">
                    <AnimatedTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab}>
                        <div className="p-4 border rounded-md mt-4">
                            <AnimatedTabsContent value="tab1">Tab 1 Content</AnimatedTabsContent>
                            <AnimatedTabsContent value="tab2">Tab 2 Content</AnimatedTabsContent>
                        </div>
                    </AnimatedTabs>
                </div>
            );
        }

        // Basic Tabs fallback
        return (
            <Tabs defaultValue="tab1" className="w-[300px]">
                <TabsList>
                    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                </TabsList>
                <TabsContent value="tab1" className="p-4">Content 1</TabsContent>
                <TabsContent value="tab2" className="p-4">Content 2</TabsContent>
            </Tabs>
        );
    }

    // Dropdown Menu
    if (name === 'dropdown-menu') {
        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">Open Menu</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        );
    }

    // Clipboard
    if (name === 'clipboard') {
        return <Clipboard value="Hello World" />;
    }

    // GuidelineItem
    if (name === 'guideline-item') {
        if (variantName === 'Do') return (
            <div className="w-full max-w-md">
                <GuidelineItem
                    type="do"
                    title="Use Semantic Colors"
                    description="Always use semantic color tokens instead of hardcoded hex values."
                >
                    <div className="flex items-center gap-2 p-4 border rounded bg-background">
                        <div className="h-8 w-8 rounded bg-primary" />
                        <span className="text-sm font-medium">Primary Color</span>
                    </div>
                </GuidelineItem>
            </div>
        );
        if (variantName === "Don't") return (
            <div className="w-full max-w-md">
                <GuidelineItem
                    type="dont"
                    title="Avoid Hardcoded Values"
                    description="Do not use hex codes like #EF4444 directly in your components."
                >
                    <div className="flex items-center gap-2 p-4 border rounded bg-background">
                        <div className="h-8 w-8 rounded bg-[#EF4444]" />
                        <span className="text-sm font-medium">Hardcoded Hex</span>
                    </div>
                </GuidelineItem>
            </div>
        );
    }

    // Default fallback
    return (
        <div className="text-sm text-muted-foreground font-mono bg-background px-3 py-2 rounded border">
            {variantName} Preview
        </div>
    );
};

// Markdown 렌더러 (간단한 구현)
const MarkdownRenderer: React.FC<{ content: string; className?: string }> = ({ content, className }) => {
    if (!content) return null;

    // 줄바꿈으로 분리
    const lines = content.split('\n');

    return (
        <div className={cn("space-y-2", className)}>
            {lines.map((line, i) => {
                const trimmed = line.trim();
                if (trimmed.startsWith('### ')) {
                    return <h3 key={i} className="text-xl font-semibold mt-6 mb-2">{trimmed.replace('### ', '')}</h3>;
                }
                if (trimmed.startsWith('- ')) {
                    return (
                        <div key={i} className="flex gap-2">
                            <span className="text-primary mt-1.5">•</span>
                            <span className="text-muted-foreground">{parseBold(trimmed.replace('- ', ''))}</span>
                        </div>
                    );
                }
                if (trimmed === '') return <div key={i} className="h-2" />;

                return <p key={i} className="text-muted-foreground leading-relaxed">{parseBold(trimmed)}</p>;
            })}
        </div>
    );
};

// **Bold** 파싱 헬퍼
const parseBold = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/);
    return parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={index} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>;
        }
        return part;
    });
};

const ComponentDetailPage = () => {
    const { componentName } = useParams<{ componentName: string }>();
    const [activeVariantIndex, setActiveVariantIndex] = React.useState(0);
    const [copiedCode, setCopiedCode] = React.useState<string | null>(null);
    const [isMeasureMode, setIsMeasureMode] = React.useState(false);
    const [isAnatomyMeasureMode, setIsAnatomyMeasureMode] = React.useState(false);
    const [showAnatomyLabels, setShowAnatomyLabels] = React.useState(true); // Default true for labels
    const [hoveredAnatomyPart, setHoveredAnatomyPart] = React.useState<string | null>(null);
    const [showColorInfo, setShowColorInfo] = React.useState(false);
    const [hoveredColorToken, setHoveredColorToken] = React.useState<string | null>(null);
    const [hoveredColorName, setHoveredColorName] = React.useState<string | undefined>(undefined);
    const [anatomyStyle, setAnatomyStyle] = React.useState('segmented');
    const previewRef = React.useRef<HTMLDivElement>(null);

    const meta = componentName ? getComponentMeta(componentName) : undefined;

    // meta가 변경되면 variant 인덱스, 측정모드 초기화
    React.useEffect(() => {
        setActiveVariantIndex(0);
        setIsMeasureMode(false);
    }, [componentName]);

    const copyToClipboard = (code: string, id: string) => {
        navigator.clipboard.writeText(code);
        setCopiedCode(id);
        setTimeout(() => setCopiedCode(null), 2000);
    };

    if (!meta) {
        return (
            <div className="flex flex-col gap-8 pb-20">
                <div className="text-center py-12">
                    <h1 className="text-2xl font-bold">컴포넌트를 찾을 수 없습니다</h1>
                    <p className="text-muted-foreground mt-2">
                        요청하신 "{componentName}" 컴포넌트가 존재하지 않습니다.
                    </p>
                    <Link to="/site-settings/components" className="mt-4 inline-block">
                        <Button variant="outline">컴포넌트 목록으로 돌아가기</Button>
                    </Link>
                </div>
            </div>
        );
    }

    const activeVariant = meta.variants[activeVariantIndex] || meta.variants[0];

    return (
        <div className="flex flex-col pb-20 max-w-5xl mx-auto w-full">
            {/* 1. Header Section */}
            <div className="mb-12">
                <div className="flex items-center gap-2 mb-6">
                    <Link
                        to="/site-settings/components"
                        className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 text-sm font-medium"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        컴포넌트 목록으로
                    </Link>
                </div>
                <div className="flex items-start justify-between">
                    <div>
                        <h1 className="text-4xl font-extrabold tracking-tight mb-3">{meta.displayName}</h1>
                        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">{meta.description}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 mt-6">
                    <span className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs font-medium uppercase tracking-wide">
                        {meta.category}
                    </span>
                    <span className="text-xs text-muted-foreground font-mono bg-muted/50 px-2 py-1 rounded">
                        {meta.filePath}
                    </span>
                </div>
            </div>



            {/* 2. Anatomy Section */}
            {meta.anatomy && (
                <section className="mb-16 scroll-mt-20" id="anatomy">
                    <div className="flex items-center gap-2 mb-6">
                        <h2 className="text-2xl font-bold tracking-tight">Anatomy</h2>
                    </div>
                    <div className="flex flex-col gap-8">
                        {/* Anatomy Image Area */}
                        <div className="bg-muted/30 border rounded-xl p-8 flex items-center justify-center min-h-[300px] relative overflow-hidden">
                            {/* Unified Toolbar - Split into Left and Right */}
                            <div className="absolute top-3 left-3 z-50">
                                {/* Component Variants Switcher */}
                                {getAnatomyVariants(componentName || '').length > 0 && (
                                    <div className="flex gap-0.5 p-[2px] bg-muted rounded-[10px] h-8 items-center relative">
                                        {getAnatomyVariants(componentName || '').map((s) => (
                                            <button
                                                key={s}
                                                onClick={() => setAnatomyStyle(s)}
                                                className={cn(
                                                    "relative px-3 h-7 text-[11px] font-bold rounded-[8px] transition-colors flex items-center justify-center outline-none",
                                                    anatomyStyle === s ? "text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                                )}
                                            >
                                                {anatomyStyle === s && (
                                                    <motion.div
                                                        layoutId="anatomyStyleActive"
                                                        className="absolute inset-0 bg-white rounded-[8px] shadow-sm hover:shadow-md transition-shadow"
                                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                                    />
                                                )}
                                                <span className="relative z-10">{s.charAt(0).toUpperCase() + s.slice(1)}</span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="absolute top-3 right-3 z-50 flex items-center gap-1">
                                {/* View Controls */}
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => {
                                        setShowAnatomyLabels(!showAnatomyLabels);
                                        setShowColorInfo(false);
                                        setIsAnatomyMeasureMode(false);
                                    }}
                                    className={cn(
                                        "h-8 w-8 transition-colors",
                                        showAnatomyLabels ? "bg-primary/10 text-primary hover:bg-primary/20" : "text-muted-foreground hover:bg-muted"
                                    )}
                                    title={showAnatomyLabels ? "Hide labels" : "Show labels"}
                                >
                                    <Info className="w-4 h-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => {
                                        setShowColorInfo(!showColorInfo);
                                        setShowAnatomyLabels(false);
                                        setIsAnatomyMeasureMode(false);
                                    }}
                                    className={cn(
                                        "h-8 w-8 transition-colors",
                                        showColorInfo ? "bg-primary/10 text-primary hover:bg-primary/20" : "text-muted-foreground hover:bg-muted"
                                    )}
                                    title={showColorInfo ? "Hide color info" : "Show color info"}
                                >
                                    <Palette className="w-4 h-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => {
                                        setIsAnatomyMeasureMode(!isAnatomyMeasureMode);
                                        setShowAnatomyLabels(false);
                                        setShowColorInfo(false);
                                    }}
                                    className={cn(
                                        "h-8 w-8 transition-colors",
                                        isAnatomyMeasureMode ? "bg-primary/10 text-primary hover:bg-primary/20" : "text-muted-foreground hover:bg-muted"
                                    )}
                                    title={isAnatomyMeasureMode ? "Turn off measure mode" : "Turn on measure mode"}
                                >
                                    <Ruler className="w-4 h-4" />
                                </Button>
                            </div>

                            <AnatomyPreview
                                componentName={componentName || ''}
                                isMeasureMode={isAnatomyMeasureMode}
                                showLabels={showAnatomyLabels}
                                showColorInfo={showColorInfo}
                                style={anatomyStyle}
                                onHoverChange={setHoveredAnatomyPart}
                                onColorHoverChange={(color: string | null, name?: string) => {
                                    setHoveredColorToken(color);
                                    setHoveredColorName(name);
                                }}
                            />

                            <AnatomyInfoPanel
                                hoveredAnatomyPart={hoveredAnatomyPart}
                                hoveredColorToken={hoveredColorToken}
                                customColorName={hoveredColorName}
                                showColorInfo={showColorInfo}
                            />
                        </div>

                        {/* Anatomy Legend/Description Removed as per user request */}
                    </div>
                </section>
            )}

            {/* 3. Properties Section (Interactive Playground) */}
            <section className="mb-16 scroll-mt-20" id="properties">
                <div className="flex items-center gap-2 mb-6">
                    <h2 className="text-2xl font-bold tracking-tight">Properties</h2>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-8">
                    {/* Left: Preview & Code */}
                    <div className="space-y-6">
                        {/* Preview Area */}
                        <div className="rounded-xl border bg-muted/30 overflow-hidden relative group">
                            <div className="absolute top-3 left-3 z-10 flex gap-2">
                                <span className="text-xs font-medium text-muted-foreground bg-background/80 backdrop-blur-sm px-2 py-1 rounded border">
                                    미리보기
                                </span>
                            </div>

                            {/* Measure Mode Toggle */}
                            <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => setIsMeasureMode(!isMeasureMode)}
                                    className={cn(
                                        "p-2 rounded-md border transition-colors",
                                        isMeasureMode ? "bg-primary text-primary-foreground" : "bg-background/80 hover:bg-background text-muted-foreground"
                                    )}
                                    title={isMeasureMode ? "측정 모드 끄기" : "측정 모드 켜기"}
                                >
                                    <Ruler className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="p-10 flex items-center justify-center min-h-[320px] relative">
                                <div ref={previewRef} className="relative inline-block">
                                    <LivePreview componentName={componentName!} variantName={activeVariant.name} />
                                    {isMeasureMode && <MeasureOverlay targetRef={previewRef as React.RefObject<HTMLElement>} />}
                                </div>
                            </div>
                        </div>

                        {/* Code Block */}
                        <div>
                            <div className="flex items-center justify-between mb-2 px-1">
                                <span className="text-sm font-medium text-muted-foreground">코드</span>
                            </div>
                            <CodeBlock
                                code={activeVariant.code}
                                onCopy={() => copyToClipboard(activeVariant.code, 'code-view')}
                                copied={copiedCode === 'code-view'}
                            />
                        </div>
                    </div>

                    {/* Right: Controls */}
                    <div className="space-y-8">
                        {/* Variants Control */}
                        {meta.variants.length > 0 && (
                            <div className="space-y-4">
                                <label className="text-sm font-semibold tracking-wide text-foreground/90 uppercase">Variants</label>
                                <div className="flex flex-col gap-2">
                                    {meta.variants.map((variant, index) => (
                                        <button
                                            key={variant.name}
                                            onClick={() => setActiveVariantIndex(index)}
                                            className={cn(
                                                "group flex items-start gap-3 p-3 rounded-lg border text-left transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-primary",
                                                activeVariantIndex === index
                                                    ? "border-primary bg-primary/5"
                                                    : "bg-background hover:bg-muted/50 hover:border-muted-foreground/30"
                                            )}
                                        >
                                            <div className={cn(
                                                "mt-1 w-3 h-3 rounded-full border flex flex-col items-center justify-center transition-colors",
                                                activeVariantIndex === index ? "border-primary bg-primary" : "border-muted-foreground/30 group-hover:border-primary/50"
                                            )}>
                                                {activeVariantIndex === index && <div className="w-1 h-1 rounded-full bg-white" />}
                                            </div>
                                            <div className="flex-1">
                                                <div className={cn("font-medium text-sm transition-colors", activeVariantIndex === index ? "text-primary" : "text-foreground")}>
                                                    {variant.name}
                                                </div>
                                                <div className="text-xs text-muted-foreground mt-0.5 leading-snug">
                                                    {variant.description}
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Props Table (Compact Version?) or just standard */}
                        <div className="pt-4 border-t">
                            <div className="flex items-center justify-between mb-4">
                                <label className="text-sm font-semibold tracking-wide text-foreground/90 uppercase">Props</label>
                            </div>
                            <div className="text-xs text-muted-foreground mb-4">
                                이 컴포넌트가 지원하는 속성 목록입니다.
                            </div>
                            <PropsTable props={meta.props} />
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Guide Section (Usage) */}
            {(meta.guide || meta.usage) && (
                <section className="mb-12 scroll-mt-20" id="guide">
                    <div className="flex items-center gap-2 mb-6">
                        <h2 className="text-2xl font-bold tracking-tight">Guide</h2>
                    </div>

                    <div className="grid gap-6">
                        <div className="prose dark:prose-invert max-w-none">
                            {/* 우선 guide 필드 사용하고, 없으면 usage 사용 */}
                            <MarkdownRenderer content={meta.guide || meta.usage} />
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

// ... existing helper components (CodeBlock, PropsTable, various Preview helpers) ... Note: VariantPreview is removed/unused




// 코드 블록 컴포넌트
interface CodeBlockProps {
    code: string;
    onCopy: () => void;
    copied: boolean;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, onCopy, copied }) => {
    return (
        <div className="rounded-xl border overflow-hidden bg-zinc-950 relative">
            <button
                onClick={onCopy}
                className="absolute top-3 right-3 p-2 rounded-md hover:bg-zinc-800 transition-colors text-zinc-400 hover:text-white"
            >
                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            </button>
            <pre className="p-4 text-sm text-zinc-300 overflow-x-auto">
                <code>{code}</code>
            </pre>
        </div>
    );
};

// Props 테이블 컴포넌트
interface PropsTableProps {
    props: PropDefinition[];
}

const PropsTable: React.FC<PropsTableProps> = ({ props }) => {
    if (props.length === 0) {
        return (
            <p className="text-muted-foreground">이 컴포넌트에는 문서화된 props가 없습니다.</p>
        );
    }

    return (
        <div className="rounded-xl border overflow-hidden">
            <table className="w-full">
                <thead className="bg-muted/50">
                    <tr className="border-b">
                        <th className="text-left p-3 font-medium text-sm">이름</th>
                        <th className="text-left p-3 font-medium text-sm">타입</th>
                        <th className="text-left p-3 font-medium text-sm">기본값</th>
                        <th className="text-left p-3 font-medium text-sm">설명</th>
                    </tr>
                </thead>
                <tbody>
                    {props.map((prop, index) => (
                        <tr key={prop.name} className={index !== props.length - 1 ? 'border-b' : ''}>
                            <td className="p-3">
                                <code className="text-sm font-mono text-primary">{prop.name}</code>
                                {prop.required && <span className="text-destructive ml-1">*</span>}
                            </td>
                            <td className="p-3">
                                <code className="text-xs font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                                    {prop.type}
                                </code>
                            </td>
                            <td className="p-3 text-sm text-muted-foreground">
                                {prop.defaultValue || '-'}
                            </td>
                            <td className="p-3 text-sm">{prop.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ComponentDetailPage;
