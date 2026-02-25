import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Copy, Check, Ruler, Info, Palette } from 'lucide-react';
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
import { Badge } from '@/components/ui/badge';
import Breadcrumb from '@/components/ui/Breadcrumb';
import ColorSwatch from '@/components/ui/ColorSwatch';
import { DoDont } from '@/components/ui/DoDont';
import { PageSection } from '@/components/ui/PageSection';
import { PrinciplesSection } from '@/components/ui/PrinciplesSection';
import { TokenAnatomy } from '@/components/ui/TokenAnatomy';
import { SmartFilterDropdown } from '@/components/ui/SmartFilterDropdown';
import { HighlightText } from '@/components/ui/HighlightText';
import ProposalNotification from '@/components/ui/ProposalNotification';
import { ParticleBackground } from '@/components/ui/ParticleBackground';
import { ExperimentalToggle } from '@/components/ui/ExperimentalToggle';
import GuidelineItem from '@/components/ui/GuidelineItem';
import { getComponentMeta } from '@/data/componentRegistry';
import type { PropDefinition } from '@/data/componentRegistry';
import { AnimatedTabs, AnimatedTabsContent } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import AnatomyPreview from '@/components/AnatomyPreview';
import AnatomyInfoPanel from '@/components/AnatomyInfoPanel';
import MeasureOverlay from '@/components/ui/MeasureOverlay';
import { AccessibilitySection } from './ui/AccessibilitySection';
import { getAnatomyVariantOptions, type AnatomyVariantOption } from '@/components/anatomy-meta';

const releasePhaseLabels = {
    experimental: 'Experimental',
    beta: 'Beta',
    stable: 'Stable',
    deprecated: 'Deprecated'
} as const;

const atomicLevelLabels = {
    atom: 'Atom',
    molecule: 'Molecule',
    organism: 'Organism'
} as const;

const getReleasePhaseBadgeVariant = (phase?: string): 'experimental' | 'beta' | 'stable' | 'deprecated' => {
    switch (phase) {
        case 'experimental':
            return 'experimental';
        case 'beta':
            return 'beta';
        case 'stable':
            return 'stable';
        case 'deprecated':
            return 'deprecated';
        default:
            return 'deprecated';
    }
};

const TabsLivePreview: React.FC<{ variantName: string }> = ({ variantName }) => {
    const [activeTab, setActiveTab] = React.useState('tab1');
    const [patternTab, setPatternTab] = React.useState('account');

    if (variantName === 'Underline Tabs') {
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

    if (variantName === 'Pill Tabs') {
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
};

const AnimatedTabsLivePreview: React.FC = () => {
    const [activeTab, setActiveTab] = React.useState('tab1');
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
};

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

    if (name === 'badge') {
        if (variantName === 'Notification Badge') return <Badge variant="notification">1</Badge>;
        if (variantName === 'Status Badge') return <Badge variant="stable">Stable</Badge>;
        if (variantName === 'Category' || variantName === 'Category Badge') return <Badge variant="category">ui</Badge>;
        if (variantName === 'Release Stable') return <Badge variant="stable">Stable</Badge>;
        if (variantName === 'Tag') return <Badge variant="tag">action</Badge>;
        if (variantName === 'Meta Badge') return <Badge variant="meta">4 props</Badge>;
        return <Badge>Badge</Badge>;
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
        return <TabsLivePreview variantName={variantName} />;
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

    if (name === 'animated-tabs') {
        return <AnimatedTabsLivePreview />;
    }

    if (name === 'breadcrumb') {
        return (
            <div className="w-full max-w-md flex flex-col gap-4">
                <Breadcrumb />
            </div>
        );
    }

    if (name === 'highlight-text') {
        return (
            <div className="w-full max-w-md p-4 border rounded-lg bg-background text-sm">
                <HighlightText text="Search result text with highlighted keyword." highlight="highlighted" />
            </div>
        );
    }

    if (name === 'proposal-notification') {
        return (
            <div className="w-full max-w-md p-4 border rounded-lg bg-background flex justify-end">
                <ProposalNotification message="새로운 개선 제안이 있습니다." />
            </div>
        );
    }

    if (name === 'accessibility-section') {
        return (
            <div className="w-full max-w-2xl">
                <AccessibilitySection
                    data={{
                        role: 'button',
                        keyboard: [
                            { key: 'Enter', description: '컴포넌트를 활성화합니다.' },
                            { key: 'Space', description: '컴포넌트를 활성화합니다.' },
                        ],
                        attributes: [
                            { name: 'aria-label', description: '요소의 접근 가능한 이름을 제공합니다.' },
                        ],
                    }}
                />
            </div>
        );
    }

    if (name === 'color-swatch') {
        return (
            <div className="w-full max-w-md p-4 border rounded-lg bg-background flex items-center gap-3">
                <ColorSwatch colorValue="hsl(var(--primary))" size="xl" />
                <ColorSwatch colorValue="hsl(var(--foreground))" isTextColor size="lg" />
                <ColorSwatch colorValue="transparent" fallbackColor="#2563eb80" size="lg" />
            </div>
        );
    }

    if (name === 'do-dont') {
        return (
            <div className="w-full max-w-3xl grid md:grid-cols-2 gap-4">
                <DoDont type="do" title="명확한 레이블" description="액션 목적이 분명한 텍스트를 사용하세요.">
                    <Button className="w-full">저장하기</Button>
                </DoDont>
                <DoDont type="dont" title="모호한 레이블" description="의미를 추측해야 하는 텍스트는 피하세요.">
                    <Button variant="secondary" className="w-full">확인</Button>
                </DoDont>
            </div>
        );
    }

    if (name === 'experimental-toggle') {
        return <ExperimentalToggle />;
    }

    if (name === 'measure-overlay') {
        return (
            <div className="w-full max-w-md p-4 border rounded-lg bg-background text-sm text-muted-foreground">
                MeasureOverlay는 대상 요소(`targetRef`) 위에 패딩/크기/간격을 시각화하는 유틸리티 컴포넌트입니다.
            </div>
        );
    }

    if (name === 'page-section') {
        return (
            <div className="w-full max-w-2xl">
                <PageSection title="Section Title" description="섹션 설명 텍스트입니다.">
                    <div className="rounded-lg border bg-background p-4 text-sm">Section Content</div>
                </PageSection>
            </div>
        );
    }

    if (name === 'particle-background') {
        return (
            <div className="relative w-full max-w-xl h-48 border rounded-xl overflow-hidden bg-muted/40">
                <ParticleBackground focusState="none" className="opacity-70" />
                <div className="absolute bottom-3 left-3 text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded">
                    Interactive Particle Background
                </div>
            </div>
        );
    }

    if (name === 'principles-section') {
        return (
            <div className="w-full max-w-3xl">
                <PrinciplesSection
                    items={[
                        { icon: Copy, title: '일관성', description: '반복 가능한 패턴으로 사용자 학습 비용을 낮춥니다.' },
                        { icon: Palette, title: '명료성', description: '정보 계층을 명확하게 전달합니다.' },
                    ]}
                />
            </div>
        );
    }

    if (name === 'token-anatomy') {
        return (
            <div className="w-full max-w-2xl">
                <TokenAnatomy />
            </div>
        );
    }

    if (name === 'smart-filter-dropdown') {
        return (
            <div className="w-full max-w-md">
                <SmartFilterDropdown
                    triggerText="Category"
                    items={[
                        { value: 'ui', label: 'UI' },
                        { value: 'form', label: 'Form' },
                    ]}
                    selectedValues={['All']}
                    onSelectionChange={() => { }}
                    width="w-[180px]"
                    align="start"
                />
            </div>
        );
    }

    if (name === 'sidebar') {
        return (
            <div className="w-full max-w-md border rounded-xl bg-background overflow-hidden">
                <div className="px-4 py-3 border-b text-sm font-black">MDS</div>
                <div className="p-3 space-y-1">
                    <div className="h-9 rounded-lg bg-accent px-2 flex items-center text-sm text-primary">Colors</div>
                    <div className="h-9 rounded-lg px-2 flex items-center text-sm text-foreground">Typography</div>
                    <div className="h-9 rounded-lg px-2 flex items-center text-sm text-foreground">Components</div>
                </div>
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
    const resolveInitialAnatomyStyle = React.useCallback((name?: string) => {
        const options = getAnatomyVariantOptions(name || '');
        return options.length > 0 ? options[0].value : 'default';
    }, []);
    const [activeVariantIndex, setActiveVariantIndex] = React.useState(0);
    const [copiedCode, setCopiedCode] = React.useState<string | null>(null);
    const [isMeasureMode, setIsMeasureMode] = React.useState(false);
    const [isAnatomyMeasureMode, setIsAnatomyMeasureMode] = React.useState(false);
    const [showAnatomyLabels, setShowAnatomyLabels] = React.useState(true); // Default true for labels
    const [hoveredAnatomyPart, setHoveredAnatomyPart] = React.useState<string | null>(null);
    const [showColorInfo, setShowColorInfo] = React.useState(false);
    const [hoveredColorToken, setHoveredColorToken] = React.useState<string | null>(null);
    const [hoveredColorName, setHoveredColorName] = React.useState<string | undefined>(undefined);
    const [anatomyStyle, setAnatomyStyle] = React.useState(() => resolveInitialAnatomyStyle(componentName));
    const [isAnatomyTabAnimating, setIsAnatomyTabAnimating] = React.useState(false);
    const previewRef = React.useRef<HTMLDivElement>(null);

    const meta = componentName ? getComponentMeta(componentName) : undefined;
    const anatomyVariantOptions: AnatomyVariantOption[] = React.useMemo(
        () => getAnatomyVariantOptions(componentName || ''),
        [componentName]
    );

    // meta가 변경되면 variant 인덱스, 측정모드 초기화
    React.useEffect(() => {
        setActiveVariantIndex(0);
        setIsMeasureMode(false);
        // Reset anatomy style to first valid variant when component changes
        setAnatomyStyle(resolveInitialAnatomyStyle(componentName));
    }, [componentName, resolveInitialAnatomyStyle]);

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
        <div className="flex flex-col gap-16 pb-24 max-w-5xl mx-auto w-full">
            {/* 1. Header Section */}
            <div>
                <div className="flex items-start justify-between">
                    <div className="flex flex-col gap-3">
                        <h1 className="text-display-lg tracking-tight">
                            {meta.displayName}
                        </h1>
                        <p className="text-body-lg text-muted-foreground leading-relaxed max-w-2xl">{meta.description}</p>
                    </div>
                </div>
                <div className="flex flex-wrap items-center gap-1 mt-6">
                    <Badge variant="category" className="uppercase tracking-wide px-3 py-1">
                        {meta.category}
                    </Badge>
                    {meta.atomicLevel && (
                        <Badge variant="atomic" className="px-3 py-1">
                            {atomicLevelLabels[meta.atomicLevel]}
                        </Badge>
                    )}
                    {meta.releasePhase && (
                        <Badge variant={getReleasePhaseBadgeVariant(meta.releasePhase)} className="px-3 py-1">
                            {releasePhaseLabels[meta.releasePhase]}
                        </Badge>
                    )}
                    {meta.owner && (
                        <Badge variant="owner" className="px-3 py-1">
                            {meta.owner}
                        </Badge>
                    )}
                    {meta.since && (
                        <Badge variant="since" className="px-3 py-1">
                            since {meta.since}
                        </Badge>
                    )}
                    {(meta.tags || []).slice(0, 3).map((tag) => (
                        <Badge
                            key={`${meta.name}-${tag}`}
                            variant="tag"
                            className="px-3 py-1"
                        >
                            {tag}
                        </Badge>
                    ))}
                    <Badge variant="meta" className="px-2 py-1 rounded font-mono">
                        {meta.filePath}
                    </Badge>
                </div>
            </div>



            {/* 2. Anatomy Section */}
            {meta.anatomy && (
                <section className="scroll-mt-20 flex flex-col gap-8" id="anatomy">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-heading-xl tracking-tight">Anatomy</h2>
                    </div>
                    <div className="flex flex-col gap-8">
                        {/* Anatomy Image Area */}
                        <div className="bg-muted/30 border rounded-xl p-8 flex items-center justify-center min-h-[300px] relative overflow-hidden">
                            {/* Unified Toolbar - Split into Left and Right */}
                            <div className="absolute top-3 left-3 z-50">
                                {/* Component Variants Switcher */}
                                {anatomyVariantOptions.length > 1 && (
                                    <div className="flex gap-0.5 p-[2px] bg-muted rounded-[10px] h-8 items-center relative group">
                                        {anatomyVariantOptions.map((option) => (
                                            <button
                                                key={option.value}
                                                onClick={() => setAnatomyStyle(option.value)}
                                                className={cn(
                                                    "relative px-3 h-7 text-[11px] font-bold rounded-[8px] transition-colors flex items-center justify-center outline-none",
                                                    anatomyStyle === option.value ? "text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                                )}
                                            >
                                                {anatomyStyle === option.value && (
                                                    <motion.div
                                                        layoutId="anatomyStyleActive"
                                                        className={cn(
                                                            "absolute inset-0 bg-white rounded-[8px] transition-shadow",
                                                            isAnatomyTabAnimating ? "shadow-sm" : "shadow-none group-hover:shadow-sm"
                                                        )}
                                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                                        onLayoutAnimationStart={() => setIsAnatomyTabAnimating(true)}
                                                        onLayoutAnimationComplete={() => setIsAnatomyTabAnimating(false)}
                                                    />
                                                )}
                                                <span className="relative z-10">{option.label}</span>
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
                                    title={showAnatomyLabels ? "라벨 숨기기" : "라벨 보기"}
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
                                    title={showColorInfo ? "컬러 정보 숨기기" : "컬러 정보 보기"}
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
                                    title={isAnatomyMeasureMode ? "측정 모드 끄기" : "측정 모드 켜기"}
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
            <section className="scroll-mt-20 flex flex-col gap-8" id="properties">
                <div className="flex flex-col gap-2">
                    <h2 className="text-heading-xl tracking-tight">Properties</h2>
                </div>

                <div className="flex flex-col gap-10">
                    <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-8">
                        {/* Left: Preview & Code */}
                        <div className="flex flex-col gap-6">
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
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center justify-between px-1">
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
                        <div className="flex flex-col gap-8">
                            {/* Variants Control */}
                            {meta.variants.length > 0 && (
                                <div className="flex flex-col gap-4">
                                    <label className="text-label-sm tracking-wide text-foreground/90 uppercase font-bold">Variants</label>
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
                            <div className="pt-4 border-t flex flex-col gap-4">
                                <div className="flex items-center justify-between">
                                    <label className="text-label-sm tracking-wide text-foreground/90 uppercase font-bold">Props</label>
                                </div>
                                <div className="text-xs text-muted-foreground">
                                    이 컴포넌트가 지원하는 속성 목록입니다.
                                </div>
                                {(meta.states || meta.sizes) && (
                                    <div className="text-xs text-muted-foreground rounded-lg border bg-muted/20 px-3 py-2 flex flex-col gap-1">
                                        {meta.states && (
                                            <p>
                                                <span className="font-semibold text-foreground">지원 상태:</span> {meta.states.join(', ')}
                                            </p>
                                        )}
                                        {meta.sizes && (
                                            <p>
                                                <span className="font-semibold text-foreground">지원 크기:</span> {meta.sizes.map((size) => size.toUpperCase()).join(', ')}
                                            </p>
                                        )}
                                    </div>
                                )}
                                <PropsTable props={meta.props} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Accessibility Section (New) */}
            {meta.accessibility && (
                <section className="scroll-mt-20 flex flex-col gap-8" id="accessibility">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-heading-xl tracking-tight">Accessibility</h2>
                    </div>
                    <AccessibilitySection data={meta.accessibility} />
                </section>
            )}

            {/* 5. Guide Section (Usage) */}
            {(meta.guide || meta.usage) && (
                <section className="scroll-mt-20 flex flex-col gap-8" id="guide">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-heading-xl tracking-tight">Guide</h2>
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
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>이름</TableHead>
                    <TableHead>타입</TableHead>
                    <TableHead>기본값</TableHead>
                    <TableHead>설명</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {props.map((prop) => (
                    <TableRow key={prop.name}>
                        <TableCell>
                            <code className="text-sm font-mono text-primary">{prop.name}</code>
                            {prop.required && <span className="text-destructive ml-1">*</span>}
                        </TableCell>
                        <TableCell>
                            <code className="text-xs font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                                {prop.type}
                            </code>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                            {prop.defaultValue || '-'}
                        </TableCell>
                        <TableCell className="text-sm">{prop.description}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default ComponentDetailPage;
