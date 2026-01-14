import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Copy, Check } from 'lucide-react';
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
import type { PropDefinition, ComponentVariant } from '@/data/componentRegistry';
import { AnimatedTabs, AnimatedTabsContent } from '@/components/ui/animated-tabs';

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

    // Tabs (Radix)
    if (name === 'tabs') {
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
        return <Clipboard text="Hello World" />;
    }

    // GuidelineItem
    if (name === 'guideline-item') {
        if (variantName === 'Do') return <GuidelineItem type="do">Use semantic colors</GuidelineItem>;
        if (variantName === "Don't") return <GuidelineItem type="dont">Don't use hardcoded colors</GuidelineItem>;
    }

    // Default fallback
    return (
        <div className="text-sm text-muted-foreground font-mono bg-background px-3 py-2 rounded border">
            {variantName} Preview
        </div>
    );
};

const ComponentDetailPage = () => {
    const { componentName } = useParams<{ componentName: string }>();
    const [activeTab, setActiveTab] = React.useState('preview');
    const [copiedCode, setCopiedCode] = React.useState<string | null>(null);

    const meta = componentName ? getComponentMeta(componentName) : undefined;

    const tabs = [
        { name: '미리보기', value: 'preview' },
        { name: '코드', value: 'code' },
        { name: 'Props', value: 'props' },
    ];

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

    return (
        <div className="flex flex-col gap-8 pb-20">
            {/* Header */}
            <div>
                <div className="flex items-center gap-2 mb-4">
                    <Link
                        to="/site-settings/components"
                        className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 text-sm font-medium"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Components
                    </Link>
                </div>
                <h1 className="text-3xl font-bold tracking-tight">{meta.displayName}</h1>
                <p className="text-lg text-muted-foreground mt-2">{meta.description}</p>
                <div className="flex items-center gap-2 mt-3">
                    <span className="inline-flex items-center rounded-md bg-secondary px-2.5 py-0.5 text-xs font-medium">
                        {meta.category}
                    </span>
                    <span className="text-xs text-muted-foreground font-mono">
                        {meta.filePath}
                    </span>
                </div>
            </div>

            <Separator />

            {/* Tabs */}
            <AnimatedTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab}>
                {/* Preview Tab */}
                <AnimatedTabsContent value="preview">
                    <div className="space-y-8">
                        <section>
                            <h2 className="text-xl font-semibold mb-4">변형 (Variants)</h2>
                            <div className="grid gap-6">
                                {meta.variants.map((variant, index) => (
                                    <VariantPreview
                                        key={index}
                                        variant={variant}
                                        componentName={componentName!}
                                        onCopy={copyToClipboard}
                                        copied={copiedCode === `variant-${index}`}
                                        copyId={`variant-${index}`}
                                    />
                                ))}
                            </div>
                        </section>
                    </div>
                </AnimatedTabsContent>

                {/* Code Tab */}
                <AnimatedTabsContent value="code">
                    <div className="space-y-6">
                        <section>
                            <h2 className="text-xl font-semibold mb-4">사용법 (Usage)</h2>
                            <CodeBlock
                                code={meta.usage}
                                onCopy={() => copyToClipboard(meta.usage, 'usage')}
                                copied={copiedCode === 'usage'}
                            />
                        </section>
                    </div>
                </AnimatedTabsContent>

                {/* Props Tab */}
                <AnimatedTabsContent value="props">
                    <div className="space-y-6">
                        <section>
                            <h2 className="text-xl font-semibold mb-4">속성 (Props)</h2>
                            <PropsTable props={meta.props} />
                        </section>
                    </div>
                </AnimatedTabsContent>
            </AnimatedTabs>
        </div>
    );
};

// 변형 미리보기 컴포넌트
interface VariantPreviewProps {
    variant: ComponentVariant;
    componentName: string;
    onCopy: (code: string, id: string) => void;
    copied: boolean;
    copyId: string;
}

const VariantPreview: React.FC<VariantPreviewProps> = ({ variant, componentName, onCopy, copied, copyId }) => {
    return (
        <div className="rounded-xl border overflow-hidden">
            <div className="p-4 bg-card border-b">
                <h3 className="font-medium">{variant.name}</h3>
                <p className="text-sm text-muted-foreground">{variant.description}</p>
            </div>
            <div className="p-6 bg-muted/30 flex items-center justify-center min-h-[100px]">
                <LivePreview componentName={componentName} variantName={variant.name} />
            </div>
            <div className="p-4 bg-zinc-950 relative">
                <button
                    onClick={() => onCopy(variant.code, copyId)}
                    className="absolute top-3 right-3 p-2 rounded-md hover:bg-zinc-800 transition-colors text-zinc-400 hover:text-white"
                >
                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </button>
                <pre className="text-sm text-zinc-300 overflow-x-auto">
                    <code>{variant.code}</code>
                </pre>
            </div>
        </div>
    );
};

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
