// Component Registry - 컴포넌트 메타데이터 정의

export interface PropDefinition {
    name: string;
    type: string;
    defaultValue?: string;
    description: string;
    required?: boolean;
}

export interface ComponentVariant {
    name: string;
    description: string;
    code: string;
}

export interface KeyboardInteraction {
    key: string;
    description: string;
}

export interface AccessibilityMeta {
    role?: string;
    attributes?: { name: string; description: string }[];
    keyboard?: KeyboardInteraction[];
}

export type AtomicLevel = 'atom' | 'molecule' | 'organism';
export type ReleasePhase = 'experimental' | 'beta' | 'stable' | 'deprecated';

export interface ComponentMeta {
    name: string;
    displayName: string;
    description: string;
    category: 'layout' | 'form' | 'feedback' | 'navigation' | 'docs' | 'utility';
    filePath: string;
    props: PropDefinition[];
    variants: ComponentVariant[];
    usage: string;
    // New fields for restructured layout
    anatomy?: string;
    sizes?: string[]; // e.g. ['sm', 'md', 'lg']
    states?: string[]; // e.g. ['default', 'hover', 'active', 'disabled']
    accessibility?: AccessibilityMeta;
    guide?: string; // Markdown content for the Guide section
    // Phase 5 metadata fields
    atomicLevel?: AtomicLevel;
    releasePhase?: ReleasePhase;
    owner?: string;
    since?: string; // YYYY-MM-DD
    figmaUrl?: string;
    storybookUrl?: string;
    tags?: string[];
}

function getFallbackAnatomy(meta: ComponentMeta): string {
    switch (meta.category) {
        case 'form':
            return `
### 구조 (Anatomy)

- **Root**: 사용자 입력을 받는 기본 컨테이너입니다.
- **Control**: 실제 값 변경/선택이 일어나는 인터랙션 영역입니다.
- **State Layer**: 기본/포커스/비활성/에러 등 상태 표현 레이어입니다.
            `;
        case 'navigation':
            return `
### 구조 (Anatomy)

- **Container**: 내비게이션 아이템들을 그룹화하는 상위 영역입니다.
- **Item / Trigger**: 페이지 이동 또는 메뉴 확장을 담당하는 인터랙션 요소입니다.
- **Active Indicator**: 현재 위치/선택 상태를 시각적으로 표시하는 요소입니다.
            `;
        case 'feedback':
            return `
### 구조 (Anatomy)

- **Trigger**: 피드백 UI를 호출하는 시작 요소입니다.
- **Surface**: 메시지/상태/도움을 표시하는 본문 영역입니다.
- **Support Elements**: 아이콘, 액션, 보조 텍스트 등 맥락을 보완하는 요소입니다.
            `;
        case 'layout':
            return `
### 구조 (Anatomy)

- **Root**: 콘텐츠 배치 기준이 되는 상위 레이아웃 컨테이너입니다.
- **Region**: 헤더/본문/푸터 등 의미 단위로 분리된 영역입니다.
- **Spacing Rules**: 패딩/간격/정렬 기준으로 시각 리듬을 유지합니다.
            `;
        case 'docs':
        case 'utility':
        default:
            return `
### 구조 (Anatomy)

- **Root**: 컴포넌트의 최상위 래퍼입니다.
- **Content**: 사용자에게 노출되는 핵심 정보/요소 영역입니다.
- **Optional Slots**: 아이콘, 보조 텍스트, 액션 등 확장 가능한 슬롯입니다.
            `;
    }
}

// 컴포넌트 레지스트리
export const componentRegistry: Record<string, ComponentMeta> = {
    button: {
        name: 'button',
        displayName: 'Button',
        description: '클릭 가능한 버튼 컴포넌트. 다양한 변형과 크기를 지원합니다.',
        category: 'form',
        filePath: 'src/components/ui/button.tsx',
        atomicLevel: 'atom',
        releasePhase: 'stable',
        owner: 'design-system-core',
        since: '2026-02-20',
        tags: ['action', 'form', 'feedback'],
        props: [
            { name: 'variant', type: "'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'", defaultValue: 'default', description: '버튼의 시각적 스타일' },
            { name: 'size', type: "'default' | 'sm' | 'lg' | 'icon'", defaultValue: 'default', description: '버튼 크기' },
            { name: 'asChild', type: 'boolean', defaultValue: 'false', description: 'Slot으로 자식 요소 렌더링' },
            { name: 'disabled', type: 'boolean', defaultValue: 'false', description: '비활성화 상태' },
        ],
        variants: [
            { name: 'Default', description: '기본 버튼', code: '<Button>Button</Button>' },
            { name: 'Secondary', description: '보조 버튼', code: '<Button variant="secondary">Secondary</Button>' },
            { name: 'Outline', description: '외곽선 버튼', code: '<Button variant="outline">Outline</Button>' },
            { name: 'Ghost', description: '고스트 버튼', code: '<Button variant="ghost">Ghost</Button>' },
            { name: 'Destructive', description: '위험 액션 버튼', code: '<Button variant="destructive">Delete</Button>' },
        ],
        usage: `import { Button } from "@/components/ui/button"

export function Example() {
    return (
        <Button variant="default" size="default">
            Click me
        </Button>
    )
}`,
        anatomy: `
### 구조 (Anatomy)

- **Button Root**: 버튼의 최상위 컨테이너입니다.
- **Icon**: 레이블 전후에 표시되는 선택적 아이콘입니다.
- **Label**: 버튼의 주요 텍스트 내용입니다.
        `,
        sizes: ['sm', 'md', 'lg'],
        states: ['Default', 'Hover', 'Active', 'Focus', 'Disabled', 'Loading'],
        accessibility: {
            role: 'button',
            attributes: [
                { name: 'aria-disabled', description: '버튼이 비활성화된 경우 true로 설정됩니다.' },
                { name: 'aria-label', description: '아이콘만 있는 버튼의 경우 시각 장애인을 위한 텍스트 레이블을 제공합니다.' }
            ],
            keyboard: [
                { key: 'Enter', description: '버튼을 활성화합니다.' },
                { key: 'Space', description: '버튼을 활성화합니다.' }
            ]
        },
        guide: `
### 사용 가이드 (Usage)

- **명확한 레이블**: 버튼이 수행하는 동작을 명확하게 설명하는 텍스트를 사용하세요 (예: "저장하기", "삭제").
- **우선순위 구분**: 페이지 내에서 가장 중요한 작업에는 Primary(Default) 버튼을, 덜 중요한 작업에는 Secondary 또는 Ghost 버튼을 사용하여 시각적 계층을 만드세요.
- **일관성**: 버튼의 위치와 순서를 일관되게 유지하여 사용자가 예측 가능한 경험을 할 수 있도록 하세요.
        `
    },

    badge: {
        name: 'badge',
        displayName: 'Badge',
        description: '상태 배지, 분류 태그, 메타 배지를 일관된 규칙으로 표시하는 배지 컴포넌트.',
        category: 'feedback',
        filePath: 'src/components/ui/badge.tsx',
        atomicLevel: 'atom',
        releasePhase: 'stable',
        owner: 'design-system-core',
        since: '2026-02-23',
        tags: ['status', 'metadata', 'classification'],
        props: [
            { name: 'variant', type: "'default' | 'notification' | 'status' | 'tag' | 'meta' | 'category' | 'atomic' | 'stable' | 'beta' | 'experimental' | 'deprecated' | 'owner' | 'since'", defaultValue: 'default', description: '배지 시각 스타일' },
            { name: 'className', type: 'string', description: '추가 CSS 클래스' },
            { name: 'children', type: 'ReactNode', description: '배지 텍스트 또는 콘텐츠' },
        ],
        variants: [
            { name: 'Notification Badge', description: '알림 수량/카운트를 표시하는 배지', code: '<Badge variant="notification">1</Badge>' },
            { name: 'Status Badge', description: '릴리즈 단계(Stable/Beta/Experimental/Deprecated) 표시 배지', code: '<Badge variant="stable">Stable</Badge>' },
            { name: 'Tag', description: '주제/분류 표시용 태그 토큰', code: '<Badge variant="tag">ui</Badge>' },
            { name: 'Meta Badge', description: '파일/개수 등 보조 메타 정보 표시', code: '<Badge variant="meta">4 props</Badge>' },
        ],
        usage: `import { Badge } from "@/components/ui/badge"

export function Example() {
    return (
        <div className="flex items-center gap-2">
            <Badge variant="notification">1</Badge>
            <Badge variant="stable">Stable</Badge>
            <Badge variant="tag">ui</Badge>
            <Badge variant="meta">4 props</Badge>
        </div>
    )
}`,
        anatomy: `
### 구조 (Anatomy)

- **Badge Root**: 배지의 외형(배경, 모서리, 패딩)을 담당하는 컨테이너입니다.
- **Label**: 상태/분류/메타 정보를 전달하는 텍스트 콘텐츠입니다.
        
### 용어 기준 (Terminology)

- **Notification Badge**: 알림 개수/노티를 표시합니다.
- **Status Badge**: 상태/등급/단계를 표시합니다.
- **Tag**: 주제/카테고리 분류용 토큰입니다.
- **Meta Badge**: 파일명, props 수, variants 수 같은 보조 정보를 표시합니다.
- **Label**: 폼 컨트롤 이름 텍스트에만 사용합니다.
        `,
    },

    card: {
        name: 'card',
        displayName: 'Card',
        description: '콘텐츠를 그룹화하여 표시하는 카드 컴포넌트.',
        category: 'layout',
        filePath: 'src/components/ui/card.tsx',
        atomicLevel: 'molecule',
        releasePhase: 'stable',
        owner: 'design-system-core',
        since: '2026-02-20',
        tags: ['layout', 'container'],
        props: [
            { name: 'className', type: 'string', description: '추가 CSS 클래스' },
        ],
        variants: [
            {
                name: 'Card with Header', description: '헤더가 있는 카드', code: `<Card>
    <CardHeader>
        <CardTitle>Title</CardTitle>
        <CardDescription>Description</CardDescription>
    </CardHeader>
    <CardContent>Content</CardContent>
</Card>` },
        ],
        usage: `import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

export function Example() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card description</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Card content goes here.</p>
            </CardContent>
            <CardFooter>
                <Button>Action</Button>
            </CardFooter>
        </Card>
    )
}`,
        anatomy: `
### 구조 (Anatomy)

- **Card Root**: 카드 전체를 감싸는 컨테이너입니다.
- **Header**: 제목과 선택적 설명을 포함하는 영역입니다.
- **Content**: 카드의 주요 내용을 담는 본문 영역입니다.
- **Footer**: 작업 버튼이나 요약 정보를 위한 선택적 하단 영역입니다.
        `,
        guide: `
### 사용 가이드 (Usage)

- **그룹화**: 관련된 정보를 하나의 단위로 묶어서 표현할 때 사용하세요.
- **계층 구조**: 헤더, 본문, 푸터를 사용하여 정보의 계층을 명확히 하세요.
- **여백**: 카드 내부의 적절한 여백(Padding)을 유지하여 가독성을 높이세요.
        `
    },

    input: {
        name: 'input',
        displayName: 'Input',
        description: '텍스트 입력 필드 컴포넌트.',
        category: 'form',
        filePath: 'src/components/ui/input.tsx',
        atomicLevel: 'atom',
        releasePhase: 'stable',
        owner: 'design-system-core',
        since: '2026-02-20',
        tags: ['form', 'input'],
        props: [
            { name: 'type', type: 'string', defaultValue: 'text', description: '입력 타입 (text, email, password 등)' },
            { name: 'placeholder', type: 'string', description: '플레이스홀더 텍스트' },
            { name: 'disabled', type: 'boolean', defaultValue: 'false', description: '비활성화 상태' },
        ],
        variants: [
            { name: 'Default', description: '기본 입력 필드', code: '<Input placeholder="Enter text..." />' },
            { name: 'Disabled', description: '비활성화 입력 필드', code: '<Input disabled placeholder="Disabled" />' },
            {
                name: 'With Label', description: '라벨이 있는 입력 필드', code: `<div className="space-y-2">
    <Label htmlFor="email">Email</Label>
    <Input id="email" type="email" placeholder="email@example.com" />
</div>` },
        ],
        usage: `import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function Example() {
    return (
        <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Enter your name" />
        </div>
    )
}`,
        states: ['Default', 'Hover', 'Focus', 'Disabled', 'Error'],
        accessibility: {
            role: 'textbox',
            attributes: [
                { name: 'aria-invalid', description: '입력 값이 유효하지 않을 때 true로 설정됩니다.' },
                { name: 'aria-required', description: '필수 입력 필드인 경우 true로 설정됩니다.' }
            ],
            keyboard: [
                { key: 'Tab', description: '입력 필드로 포커스를 이동합니다.' }
            ]
        }
    },

    tooltip: {
        name: 'tooltip',
        displayName: 'Tooltip',
        description: '호버 시 추가 정보를 표시하는 툴팁 컴포넌트.',
        category: 'feedback',
        filePath: 'src/components/ui/tooltip.tsx',
        atomicLevel: 'molecule',
        releasePhase: 'stable',
        owner: 'design-system-core',
        since: '2026-02-20',
        tags: ['overlay', 'feedback'],
        props: [
            { name: 'side', type: "'top' | 'right' | 'bottom' | 'left'", defaultValue: 'top', description: '툴팁 표시 위치' },
            { name: 'sideOffset', type: 'number', defaultValue: '4', description: '트리거와의 간격' },
        ],
        variants: [
            {
                name: 'Default', description: '기본 툴팁', code: `<Tooltip>
    <TooltipTrigger>Hover me</TooltipTrigger>
    <TooltipContent>Tooltip text</TooltipContent>
</Tooltip>` },
        ],
        usage: `import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

export function Example() {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button variant="outline">Hover</Button>
            </TooltipTrigger>
            <TooltipContent>
                <p>Add to library</p>
            </TooltipContent>
        </Tooltip>
    )
}`,
    },

    separator: {
        name: 'separator',
        displayName: 'Separator',
        description: '콘텐츠를 시각적으로 구분하는 구분선 컴포넌트.',
        category: 'layout',
        filePath: 'src/components/ui/separator.tsx',
        atomicLevel: 'atom',
        releasePhase: 'stable',
        owner: 'design-system-core',
        since: '2026-02-20',
        tags: ['layout', 'divider'],
        props: [
            { name: 'orientation', type: "'horizontal' | 'vertical'", defaultValue: 'horizontal', description: '구분선 방향' },
            { name: 'decorative', type: 'boolean', defaultValue: 'true', description: '장식용 여부 (접근성)' },
        ],
        variants: [
            { name: 'Horizontal', description: '가로 구분선', code: '<Separator />' },
            { name: 'Vertical', description: '세로 구분선', code: '<Separator orientation="vertical" className="h-4" />' },
        ],
        usage: `import { Separator } from "@/components/ui/separator"

export function Example() {
    return (
        <div>
            <h4>Section 1</h4>
            <Separator className="my-4" />
            <h4>Section 2</h4>
        </div>
    )
}`,
    },

    popover: {
        name: 'popover',
        displayName: 'Popover',
        description: '트리거 요소 주변에 플로팅 콘텐츠를 표시하는 팝오버 컴포넌트.',
        category: 'feedback',
        filePath: 'src/components/ui/popover.tsx',
        atomicLevel: 'molecule',
        releasePhase: 'beta',
        owner: 'design-system-core',
        since: '2026-02-20',
        tags: ['overlay', 'interaction'],
        props: [
            { name: 'align', type: "'start' | 'center' | 'end'", defaultValue: 'center', description: '정렬 위치' },
            { name: 'sideOffset', type: 'number', defaultValue: '4', description: '트리거와의 간격' },
        ],
        variants: [
            {
                name: 'Default', description: '기본 팝오버', code: `<Popover>
    <PopoverTrigger asChild>
        <Button variant="outline">Open</Button>
    </PopoverTrigger>
    <PopoverContent>
        Popover content
    </PopoverContent>
</Popover>` },
        ],
        usage: `import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export function Example() {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline">Open popover</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <h4 className="font-medium">Dimensions</h4>
                <p className="text-sm text-muted-foreground">
                    Set the dimensions for the layer.
                </p>
            </PopoverContent>
        </Popover>
    )
}`,
    },

    sheet: {
        name: 'sheet',
        displayName: 'Sheet',
        description: '화면 가장자리에서 슬라이드되어 나오는 패널 컴포넌트.',
        category: 'feedback',
        filePath: 'src/components/ui/sheet.tsx',
        atomicLevel: 'organism',
        releasePhase: 'beta',
        owner: 'design-system-core',
        since: '2026-02-20',
        tags: ['overlay', 'panel', 'navigation'],
        props: [
            { name: 'side', type: "'top' | 'right' | 'bottom' | 'left'", defaultValue: 'right', description: '시트 표시 위치' },
        ],
        variants: [
            {
                name: 'Right', description: '오른쪽 시트', code: `<Sheet>
    <SheetTrigger asChild>
        <Button>Open</Button>
    </SheetTrigger>
    <SheetContent side="right">
        <SheetHeader>
            <SheetTitle>Title</SheetTitle>
        </SheetHeader>
        Content
    </SheetContent>
</Sheet>` },
        ],
        usage: `import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export function Example() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline">Open Sheet</Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Edit Profile</SheetTitle>
                </SheetHeader>
                <div className="py-4">
                    Sheet content goes here.
                </div>
            </SheetContent>
        </Sheet>
    )
}`,
    },

    breadcrumb: {
        name: 'breadcrumb',
        displayName: 'Breadcrumb',
        description: '현재 페이지의 위치를 계층 구조로 표시하는 탐색 컴포넌트.',
        category: 'navigation',
        filePath: 'src/components/ui/Breadcrumb.tsx',
        atomicLevel: 'molecule',
        releasePhase: 'stable',
        owner: 'design-system-core',
        since: '2026-02-20',
        tags: ['navigation', 'information-architecture'],
        props: [
            { name: 'separator', type: 'ReactNode', defaultValue: '/', description: '경로 구분자' },
        ],
        variants: [
            {
                name: 'Default', description: '기본 브레드크럼', code: `<Breadcrumb>
    <BreadcrumbList>
        <BreadcrumbItem>Home</BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>Products</BreadcrumbItem>
    </BreadcrumbList>
</Breadcrumb>` },
        ],
        usage: `import Breadcrumb from "@/components/ui/Breadcrumb"

export function Example() {
    return <Breadcrumb />
}`,
    },

    tabs: {
        name: 'tabs',
        displayName: 'Tabs',
        description: '탭 기반 콘텐츠 전환 컴포넌트.',
        category: 'navigation',
        filePath: 'src/components/ui/tabs.tsx',
        atomicLevel: 'organism',
        releasePhase: 'stable',
        owner: 'design-system-core',
        since: '2026-02-20',
        tags: ['navigation', 'content-switching'],
        props: [
            { name: 'defaultValue', type: 'string', description: '기본 활성 탭' },
            { name: 'value', type: 'string', description: '현재 활성 탭 (제어 모드)' },
            { name: 'onValueChange', type: '(value: string) => void', description: '탭 변경 핸들러' },
            { name: 'tabs', type: '{ name: string; value: string }[]', description: '탭 목록 (Animated Tabs 전용)' },
        ],
        variants: [
            {
                name: 'Segmented Tabs', description: '분할형(세그먼트) 탭 컴포넌트 (Radix UI 기반)', code: `<Tabs defaultValue="tab1">
    <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
    </TabsList>
    <TabsContent value="tab1">Content 1</TabsContent>
    <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>` },
            {
                name: 'Pill Tabs', description: '필(알약) 형태의 애니메이션 탭', code: `<AnimatedTabs 
    tabs={[
        { name: 'Tab 1', value: 'tab1' }, 
        { name: 'Tab 2', value: 'tab2' }
    ]} 
    activeTab="tab1" 
    setActiveTab={setTab}
>
    <div className="p-4 border rounded-md">
        <AnimatedTabsContent value="tab1">Tab 1 Content</AnimatedTabsContent>
        <AnimatedTabsContent value="tab2">Tab 2 Content</AnimatedTabsContent>
    </div>
</AnimatedTabs>` },
            {
                name: 'Underline Tabs', description: '언더라인/인디케이터 중심의 탭 패턴', code: `<AnimatedTabs 
    tabs={[
        { name: 'Account', value: 'account' }, 
        { name: 'Password', value: 'password' },
        { name: 'Settings', value: 'settings' }
    ]} 
    activeTab="account" 
    setActiveTab={setTab}
>
    <div className="mt-6 p-4 border rounded-lg bg-muted/10 min-h-[120px]">
        <AnimatedTabsContent value="account">
            <h4 className="font-medium">Account</h4>
            <p className="text-sm text-muted-foreground">Manage your account.</p>
        </AnimatedTabsContent>
        <AnimatedTabsContent value="password">
            <h4 className="font-medium">Password</h4>
            <p className="text-sm text-muted-foreground">Change password.</p>
        </AnimatedTabsContent>
    </div>
</AnimatedTabs>` },
        ],
        anatomy: `
### Anatomy

- **Container**: 탭 트리거들을 담는 컨테이너
- **Trigger**: 개별 탭 버튼
- **Label**: 탭의 텍스트 라벨
- **Animated Indicator**: 활성 탭 아래를 따라다니는 애니메이션 바 (Animated Tabs 전용)
        `,
        accessibility: {
            role: 'tablist',
            attributes: [
                { name: 'aria-selected', description: '현재 활성화된 탭 트리거에 true가 설정됩니다.' },
                { name: 'aria-controls', description: '탭 트리거가 제어하는 대응 탭 콘텐츠의 ID를 참조합니다.' }
            ],
            keyboard: [
                { key: 'Tab', description: '탭 목록으로 포커스를 이동하거나 다음 요소로 이동합니다.' },
                { key: 'ArrowLeft / ArrowRight', description: '탭 트리거 사이를 이동합니다.' },
                { key: 'Home / End', description: '첫 번째 또는 마지막 탭으로 이동합니다.' }
            ]
        },
        guide: `
### 사용 가이드 (Usage)

- 탭 레이블은 짧고 명확하게 작성하세요.
- 콘텐츠가 서로 연관되어 있지만 동시에 볼 필요는 없는 경우에 사용합니다.
- **Animated Tabs**는 사용자에게 시각적인 피드백을 더 강하게 주고 싶을 때 유용합니다.
        `,
        usage: `import { Tabs, TabsContent, TabsList, TabsTrigger, AnimatedTabs, AnimatedTabsContent } from "@/components/ui/tabs"


export function Example() {
    return (
        <Tabs defaultValue="account">
            <TabsList>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>
            <TabsContent value="account">Account settings</TabsContent>
            <TabsContent value="password">Password settings</TabsContent>
        </Tabs>
    )
}`,
    },

    'guideline-item': {
        name: 'guideline-item',
        displayName: 'GuidelineItem',
        description: 'Do/Don\'t 가이드라인을 표시하는 컴포넌트.',
        category: 'docs',
        filePath: 'src/components/ui/GuidelineItem.tsx',
        atomicLevel: 'molecule',
        releasePhase: 'beta',
        owner: 'design-system-docs',
        since: '2026-02-20',
        tags: ['docs', 'do-dont'],
        props: [
            { name: 'type', type: "'do' | 'dont'", required: true, description: '가이드라인 타입' },
            { name: 'title', type: 'string', description: '가이드라인 제목' },
            { name: 'children', type: 'ReactNode', description: '가이드라인 내용' },
        ],
        variants: [
            { name: 'Do', description: '권장 가이드', code: '<GuidelineItem type="do">Use semantic colors</GuidelineItem>' },
            { name: 'Don\'t', description: '비권장 가이드', code: '<GuidelineItem type="dont">Don\'t use hardcoded colors</GuidelineItem>' },
        ],
        usage: `import GuidelineItem from "@/components/ui/GuidelineItem"

export function Example() {
    return (
        <div className="grid md:grid-cols-2 gap-4">
            <GuidelineItem type="do">Use semantic color tokens</GuidelineItem>
            <GuidelineItem type="dont">Don't use hardcoded hex values</GuidelineItem>
        </div>
    )
}`,
    },

    'highlight-text': {
        name: 'highlight-text',
        displayName: 'HighlightText',
        description: '텍스트 내 특정 키워드를 하이라이트하는 컴포넌트.',
        category: 'docs',
        filePath: 'src/components/ui/HighlightText.tsx',
        atomicLevel: 'atom',
        releasePhase: 'beta',
        owner: 'design-system-docs',
        since: '2026-02-20',
        tags: ['docs', 'search'],
        props: [
            { name: 'text', type: 'string', required: true, description: '표시할 텍스트' },
            { name: 'highlight', type: 'string', description: '하이라이트할 키워드' },
        ],
        variants: [
            { name: 'Default', description: '기본 하이라이트', code: '<HighlightText text="Hello World" highlight="World" />' },
        ],
        usage: `import HighlightText from "@/components/ui/HighlightText"

export function Example() {
    return <HighlightText text="Search result text" highlight="result" />
}`,
    },

    'proposal-notification': {
        name: 'proposal-notification',
        displayName: 'ProposalNotification',
        description: '개선 제안 알림을 표시하는 사이트 운영용 컴포넌트. 애니메이션 버튼, 팝오버 목록, 시트 상세보기 제공.',
        category: 'feedback',
        filePath: 'src/components/ui/ProposalNotification.tsx',
        atomicLevel: 'organism',
        releasePhase: 'experimental',
        owner: 'design-system-docs',
        since: '2026-02-20',
        tags: ['docs', 'feedback', 'internal-tooling'],
        props: [
            { name: 'message', type: 'string', defaultValue: '개선 제안이 있습니다!', description: '알림 메시지' },
        ],
        variants: [
            { name: 'Default', description: '기본 알림', code: '<ProposalNotification />' },
            { name: 'Custom Message', description: '커스텀 메시지', code: '<ProposalNotification message="새로운 제안이 있습니다" />' },
        ],
        usage: `import ProposalNotification from "@/components/ui/ProposalNotification"

// MainContent.tsx에서 사용
export function Example() {
    return (
        <div className="flex items-center justify-between">
            <Breadcrumb />
            <ProposalNotification />
        </div>
    )
}`,
    },

    'accessibility-section': {
        name: 'accessibility-section',
        displayName: 'AccessibilitySection',
        description: '키보드 인터랙션과 ARIA 속성 정보를 표로 보여주는 접근성 문서 섹션 컴포넌트.',
        category: 'docs',
        filePath: 'src/components/ui/AccessibilitySection.tsx',
        atomicLevel: 'organism',
        releasePhase: 'beta',
        owner: 'design-system-docs',
        since: '2026-02-23',
        tags: ['docs', 'accessibility', 'table'],
        props: [
            { name: 'data', type: 'AccessibilityMeta', required: true, description: '키보드/ARIA 메타 정보' },
        ],
        variants: [
            { name: 'Default', description: '기본 접근성 정보 섹션', code: '<AccessibilitySection data={meta.accessibility} />' },
        ],
        usage: `import { AccessibilitySection } from "@/components/ui/AccessibilitySection"

export function Example({ accessibility }: { accessibility: AccessibilityMeta }) {
    return <AccessibilitySection data={accessibility} />
}`,
    },

    'color-swatch': {
        name: 'color-swatch',
        displayName: 'ColorSwatch',
        description: '컬러 토큰 시각화를 위한 컬러 스와치 컴포넌트.',
        category: 'docs',
        filePath: 'src/components/ui/ColorSwatch.tsx',
        atomicLevel: 'atom',
        releasePhase: 'stable',
        owner: 'design-system-docs',
        since: '2026-02-23',
        tags: ['color', 'token', 'docs'],
        props: [
            { name: 'colorValue', type: 'string', description: '주 색상 값(CSS 변수 또는 HSL/RGB)' },
            { name: 'fallbackColor', type: 'string', description: '보조 색상 값(Hex 등)' },
            { name: 'isTextColor', type: 'boolean', defaultValue: 'false', description: '텍스트용 컬러 표시 여부' },
            { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", defaultValue: 'sm', description: '스와치 크기' },
            { name: 'showCheckerboard', type: 'boolean', defaultValue: 'true', description: '투명도 체커보드 표시 여부' },
            { name: 'className', type: 'string', description: '추가 CSS 클래스' },
        ],
        variants: [
            { name: 'Default', description: '기본 스와치', code: '<ColorSwatch colorValue="hsl(var(--primary))" />' },
            { name: 'Text Color', description: '텍스트 컬러 표시', code: '<ColorSwatch colorValue="hsl(var(--foreground))" isTextColor />' },
        ],
        usage: `import ColorSwatch from "@/components/ui/ColorSwatch"

export function Example() {
    return <ColorSwatch colorValue="hsl(var(--primary))" fallbackColor="#2563eb" size="md" />
}`,
    },

    'do-dont': {
        name: 'do-dont',
        displayName: 'DoDont',
        description: '권장/주의 사례를 시각적으로 비교해 보여주는 가이드 카드 컴포넌트.',
        category: 'feedback',
        filePath: 'src/components/ui/DoDont.tsx',
        atomicLevel: 'molecule',
        releasePhase: 'beta',
        owner: 'design-system-docs',
        since: '2026-02-23',
        tags: ['docs', 'guideline', 'do-dont'],
        props: [
            { name: 'type', type: "'do' | 'dont'", required: true, description: '가이드 타입' },
            { name: 'title', type: 'string', required: true, description: '카드 제목' },
            { name: 'description', type: 'string', required: true, description: '설명 텍스트' },
            { name: 'children', type: 'ReactNode', required: true, description: '시각 예시 콘텐츠' },
            { name: 'className', type: 'string', description: '추가 CSS 클래스' },
        ],
        variants: [
            { name: 'Do', description: '권장 사례 카드', code: '<DoDont type="do" title="명확한 라벨" description="버튼 의미를 명확히 하세요">...</DoDont>' },
            { name: 'Dont', description: '주의 사례 카드', code: '<DoDont type="dont" title="모호한 라벨" description="의미가 불명확합니다">...</DoDont>' },
        ],
        usage: `import { DoDont, DoDontContainer } from "@/components/ui/DoDont"

export function Example() {
    return (
        <DoDontContainer>
            <DoDont type="do" title="명확한 피드백" description="사용자에게 즉시 결과를 알려주세요">...</DoDont>
            <DoDont type="dont" title="피드백 없음" description="성공/실패 상태를 숨기지 마세요">...</DoDont>
        </DoDontContainer>
    )
}`,
    },

    'experimental-toggle': {
        name: 'experimental-toggle',
        displayName: 'ExperimentalToggle',
        description: '문서 사이트의 실험 기능 표시/토글을 담당하는 헤더 액션 컴포넌트.',
        category: 'feedback',
        filePath: 'src/components/ui/ExperimentalToggle.tsx',
        atomicLevel: 'molecule',
        releasePhase: 'experimental',
        owner: 'design-system-docs',
        since: '2026-02-23',
        tags: ['docs', 'experimental', 'toggle'],
        props: [],
        variants: [
            { name: 'Default', description: '기본 실험 기능 토글', code: '<ExperimentalToggle />' },
        ],
        usage: `import { ExperimentalToggle } from "@/components/ui/ExperimentalToggle"

export function Example() {
    return <ExperimentalToggle />
}`,
    },

    'measure-overlay': {
        name: 'measure-overlay',
        displayName: 'MeasureOverlay',
        description: '요소의 박스 모델, 간격, 반경 정보를 시각적으로 오버레이하는 계측 컴포넌트.',
        category: 'layout',
        filePath: 'src/components/ui/MeasureOverlay.tsx',
        atomicLevel: 'organism',
        releasePhase: 'experimental',
        owner: 'design-system-docs',
        since: '2026-02-23',
        tags: ['docs', 'measurement', 'layout-inspector'],
        props: [
            { name: 'targetRef', type: 'React.RefObject<HTMLElement>', required: true, description: '측정 대상 루트 요소 ref' },
        ],
        variants: [
            { name: 'Default', description: '대상 요소 계측 오버레이', code: '<MeasureOverlay targetRef={previewRef} />' },
        ],
        usage: `import MeasureOverlay from "@/components/ui/MeasureOverlay"

export function Example({ previewRef }: { previewRef: React.RefObject<HTMLElement> }) {
    return <MeasureOverlay targetRef={previewRef} />
}`,
    },

    'page-section': {
        name: 'page-section',
        displayName: 'PageSection',
        description: '페이지 내 제목, 설명, 본문 콘텐츠를 일관된 구조로 묶는 섹션 래퍼 컴포넌트.',
        category: 'layout',
        filePath: 'src/components/ui/PageSection.tsx',
        atomicLevel: 'molecule',
        releasePhase: 'stable',
        owner: 'design-system-docs',
        since: '2026-02-23',
        tags: ['docs', 'layout', 'section'],
        props: [
            { name: 'title', type: 'string', required: true, description: '섹션 제목' },
            { name: 'description', type: 'ReactNode', description: '섹션 설명 텍스트' },
            { name: 'children', type: 'ReactNode', required: true, description: '섹션 본문 콘텐츠' },
            { name: 'className', type: 'string', description: '추가 CSS 클래스' },
        ],
        variants: [
            { name: 'Default', description: '기본 페이지 섹션', code: '<PageSection title="Typography" description="타이포그래피 규칙">...</PageSection>' },
        ],
        usage: `import { PageSection } from "@/components/ui/PageSection"

export function Example() {
    return (
        <PageSection title="Color Tokens" description="역할 기반 색상 토큰을 사용합니다.">
            <div>...</div>
        </PageSection>
    )
}`,
    },

    'particle-background': {
        name: 'particle-background',
        displayName: 'ParticleBackground',
        description: '포커스 상태에 따라 파티클 형태가 변하는 인터랙티브 배경 컴포넌트.',
        category: 'layout',
        filePath: 'src/components/ui/ParticleBackground.tsx',
        atomicLevel: 'organism',
        releasePhase: 'experimental',
        owner: 'design-system-docs',
        since: '2026-02-23',
        tags: ['visual', 'background', 'motion'],
        props: [
            { name: 'focusState', type: "'none' | 'id' | 'password'", required: true, description: '파티클 포메이션 상태' },
            { name: 'className', type: 'string', description: '추가 CSS 클래스' },
        ],
        variants: [
            { name: 'Idle', description: '기본 파티클 배경', code: '<ParticleBackground focusState="none" />' },
            { name: 'ID Focus', description: 'ID 입력 포커스 상태', code: '<ParticleBackground focusState="id" />' },
            { name: 'Password Focus', description: 'Password 입력 포커스 상태', code: '<ParticleBackground focusState="password" />' },
        ],
        usage: `import { ParticleBackground } from "@/components/ui/ParticleBackground"

export function Example() {
    return <ParticleBackground focusState="none" className="opacity-70" />
}`,
    },

    'principles-section': {
        name: 'principles-section',
        displayName: 'PrinciplesSection',
        description: '디자인 원칙 목록을 아이콘 카드 형태로 표시하는 섹션 컴포넌트.',
        category: 'layout',
        filePath: 'src/components/ui/PrinciplesSection.tsx',
        atomicLevel: 'organism',
        releasePhase: 'beta',
        owner: 'design-system-docs',
        since: '2026-02-23',
        tags: ['docs', 'principles', 'card-grid'],
        props: [
            { name: 'items', type: 'PrincipleItem[]', required: true, description: '원칙 카드 목록' },
            { name: 'className', type: 'string', description: '추가 CSS 클래스' },
        ],
        variants: [
            { name: 'Default', description: '기본 원칙 섹션', code: '<PrinciplesSection items={principles} />' },
        ],
        usage: `import { PrinciplesSection } from "@/components/ui/PrinciplesSection"

export function Example() {
    return <PrinciplesSection items={principles} />
}`,
    },

    'token-anatomy': {
        name: 'token-anatomy',
        displayName: 'TokenAnatomy',
        description: '토큰 네이밍 규칙(Property-Role-Variant-State)을 시각적으로 설명하는 컴포넌트.',
        category: 'docs',
        filePath: 'src/components/ui/TokenAnatomy.tsx',
        atomicLevel: 'molecule',
        releasePhase: 'beta',
        owner: 'design-system-docs',
        since: '2026-02-23',
        tags: ['token', 'naming', 'docs'],
        props: [
            { name: 'className', type: 'string', description: '추가 CSS 클래스' },
        ],
        variants: [
            { name: 'Default', description: '기본 토큰 아나토미 설명', code: '<TokenAnatomy />' },
        ],
        usage: `import { TokenAnatomy } from "@/components/ui/TokenAnatomy"

export function Example() {
    return <TokenAnatomy className="mt-6" />
}`,
    },

    'smart-filter-dropdown': {
        name: 'smart-filter-dropdown',
        displayName: 'SmartFilterDropdown',
        description: '단일/복수 선택 동작을 함께 제공하는 스마트 필터 드롭다운 컴포넌트.',
        category: 'navigation',
        filePath: 'src/components/ui/SmartFilterDropdown.tsx',
        atomicLevel: 'molecule',
        releasePhase: 'beta',
        owner: 'design-system-core',
        since: '2026-02-23',
        tags: ['filter', 'dropdown', 'search'],
        props: [
            { name: 'triggerText', type: 'string', required: true, description: '트리거 버튼 텍스트' },
            { name: 'items', type: '{ value: string; label: string }[]', required: true, description: '필터 항목 목록' },
            { name: 'selectedValues', type: 'string[]', required: true, description: '선택된 값 배열' },
            { name: 'onSelectionChange', type: '(values: string[]) => void', required: true, description: '선택 변경 핸들러' },
            { name: 'className', type: 'string', description: '추가 CSS 클래스' },
            { name: 'width', type: 'string', defaultValue: 'w-48', description: '트리거 폭 클래스' },
            { name: 'align', type: "'start' | 'center' | 'end'", defaultValue: 'start', description: '메뉴 정렬 방향' },
        ],
        variants: [
            { name: 'Default', description: '기본 필터 드롭다운', code: '<SmartFilterDropdown triggerText="상태" items={items} selectedValues={selected} onSelectionChange={setSelected} />' },
        ],
        usage: `import { SmartFilterDropdown } from "@/components/ui/SmartFilterDropdown"

export function Example() {
    return (
        <SmartFilterDropdown
            triggerText="Category"
            items={[{ value: "ui", label: "UI" }]}
            selectedValues={["All"]}
            onSelectionChange={() => {}}
        />
    )
}`,
    },

    'animated-tabs': {
        name: 'animated-tabs',
        displayName: 'AnimatedTabs',
        description: '활성 상태 전환 애니메이션이 적용된 탭 내비게이션 컴포넌트.',
        category: 'navigation',
        filePath: 'src/components/ui/animated-tabs.tsx',
        atomicLevel: 'molecule',
        releasePhase: 'beta',
        owner: 'design-system-core',
        since: '2026-02-23',
        tags: ['tabs', 'animation', 'navigation'],
        props: [
            { name: 'tabs', type: '{ name: string; value: string }[]', required: true, description: '탭 목록' },
            { name: 'activeTab', type: 'string', required: true, description: '현재 활성 탭 값' },
            { name: 'setActiveTab', type: '(value: string) => void', required: true, description: '활성 탭 변경 핸들러' },
            { name: 'children', type: 'ReactNode', description: '탭 콘텐츠' },
            { name: 'className', type: 'string', description: '추가 CSS 클래스' },
        ],
        variants: [
            { name: 'Default', description: '기본 애니메이션 탭', code: '<AnimatedTabs tabs={tabs} activeTab={tab} setActiveTab={setTab}>...</AnimatedTabs>' },
        ],
        usage: `import { AnimatedTabs, AnimatedTabsContent } from "@/components/ui/animated-tabs"

export function Example() {
    return (
        <AnimatedTabs tabs={[{ name: "UI", value: "ui" }]} activeTab="ui" setActiveTab={() => {}}>
            <AnimatedTabsContent value="ui">UI Content</AnimatedTabsContent>
        </AnimatedTabs>
    )
}`,
    },

    clipboard: {
        name: 'clipboard',
        displayName: 'Clipboard',
        description: '클립보드 복사 액션을 제공하는 아이콘 버튼 컴포넌트.',
        category: 'utility',
        filePath: 'src/components/ui/clipboard.tsx',
        atomicLevel: 'atom',
        releasePhase: 'stable',
        owner: 'design-system-core',
        since: '2026-02-23',
        tags: ['utility', 'copy', 'action'],
        props: [
            { name: 'value', type: 'string', required: true, description: '복사할 텍스트 값' },
            { name: 'className', type: 'string', description: '추가 CSS 클래스' },
        ],
        variants: [
            { name: 'Default', description: '기본 복사 버튼', code: '<Clipboard value="text-primary-brand" />' },
        ],
        usage: `import { Clipboard } from "@/components/ui/clipboard"

export function Example() {
    return <Clipboard value="color.token.primary" />
}`,
    },

    'dropdown-menu': {
        name: 'dropdown-menu',
        displayName: 'DropdownMenu',
        description: '컨텍스트 액션, 옵션 선택, 서브메뉴 구성을 위한 드롭다운 메뉴 컴포넌트 세트.',
        category: 'navigation',
        filePath: 'src/components/ui/dropdown-menu.tsx',
        atomicLevel: 'organism',
        releasePhase: 'stable',
        owner: 'design-system-core',
        since: '2026-02-23',
        tags: ['menu', 'overlay', 'navigation'],
        props: [
            { name: 'align', type: "'start' | 'center' | 'end'", defaultValue: 'start', description: '콘텐츠 정렬' },
            { name: 'sideOffset', type: 'number', defaultValue: '4', description: '트리거와 콘텐츠 간격' },
            { name: 'inset', type: 'boolean', defaultValue: 'false', description: '아이템 내부 들여쓰기 옵션' },
        ],
        variants: [
            {
                name: 'Default',
                description: '기본 드롭다운 메뉴',
                code: `<DropdownMenu>
    <DropdownMenuTrigger asChild><Button variant="outline">Open</Button></DropdownMenuTrigger>
    <DropdownMenuContent align="start">
        <DropdownMenuItem>Item</DropdownMenuItem>
    </DropdownMenuContent>
</DropdownMenu>`
            },
        ],
        usage: `import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function Example() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild><Button variant="outline">Open</Button></DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>Rename</DropdownMenuItem>
                <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}`,
    },

    switch: {
        name: 'switch',
        displayName: 'Switch',
        description: '켜짐/꺼짐 상태를 토글하는 스위치 컴포넌트.',
        category: 'form',
        filePath: 'src/components/ui/switch.tsx',
        atomicLevel: 'atom',
        releasePhase: 'stable',
        owner: 'design-system-core',
        since: '2026-02-23',
        tags: ['form', 'toggle', 'boolean'],
        props: [
            { name: 'checked', type: 'boolean', description: '현재 체크 상태' },
            { name: 'onCheckedChange', type: '(checked: boolean) => void', description: '체크 상태 변경 핸들러' },
            { name: 'disabled', type: 'boolean', defaultValue: 'false', description: '비활성화 여부' },
            { name: 'className', type: 'string', description: '추가 CSS 클래스' },
        ],
        variants: [
            { name: 'Default', description: '기본 스위치', code: '<Switch checked={enabled} onCheckedChange={setEnabled} />' },
        ],
        usage: `import { Switch } from "@/components/ui/switch"

export function Example() {
    return <Switch checked={true} onCheckedChange={() => {}} />
}`,
        states: ['Unchecked', 'Checked', 'Disabled'],
        accessibility: {
            role: 'switch',
            attributes: [
                { name: 'aria-checked', description: '스위치의 on/off 상태를 전달합니다.' },
            ],
            keyboard: [
                { key: 'Space', description: '스위치 상태를 토글합니다.' },
                { key: 'Enter', description: '스위치 상태를 토글합니다.' },
            ]
        }
    },

    table: {
        name: 'table',
        displayName: 'Table',
        description: '사이트 전역에서 사용하는 기본 데이터 테이블 컴포넌트 세트.',
        category: 'layout',
        filePath: 'src/components/ui/table.tsx',
        atomicLevel: 'organism',
        releasePhase: 'stable',
        owner: 'design-system-core',
        since: '2026-02-23',
        tags: ['data-display', 'table', 'layout'],
        props: [
            { name: 'className', type: 'string', description: '각 테이블 슬롯의 추가 CSS 클래스' },
        ],
        variants: [
            {
                name: 'Default',
                description: '기본 테이블',
                code: `<Table>
    <TableHeader>
        <TableRow><TableHead>이름</TableHead><TableHead>설명</TableHead></TableRow>
    </TableHeader>
    <TableBody>
        <TableRow><TableCell>variant</TableCell><TableCell>버튼 스타일</TableCell></TableRow>
    </TableBody>
</Table>`
            },
        ],
        usage: `import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function Example() {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Key</TableHead>
                    <TableHead>Description</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>variant</TableCell>
                    <TableCell>시각적 스타일</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}`,
    },

    sidebar: {
        name: 'sidebar',
        displayName: 'Sidebar',
        description: '파운데이션 탐색, 사이트 설정 탐색, 테마/그리드/로그아웃 액션을 제공하는 앱 셸 내비게이션 사이드바.',
        category: 'navigation',
        filePath: 'src/components/Sidebar.tsx',
        atomicLevel: 'organism',
        releasePhase: 'stable',
        owner: 'design-system-core',
        since: '2026-02-23',
        tags: ['navigation', 'app-shell', 'sidebar'],
        props: [
            { name: 'isOpen', type: 'boolean', required: true, description: '모바일 사이드바 열림 상태' },
            { name: 'toggleSidebar', type: '() => void', required: true, description: '모바일 사이드바 토글 핸들러' },
            { name: 'showGrid', type: 'boolean', required: true, description: '그리드 오버레이 표시 상태' },
            { name: 'toggleGrid', type: '() => void', required: true, description: '그리드 오버레이 토글 핸들러' },
        ],
        variants: [
            { name: 'Desktop Fixed', description: '데스크톱 고정 사이드바', code: '<Sidebar isOpen={true} toggleSidebar={() => {}} showGrid={false} toggleGrid={() => {}} />' },
            { name: 'Mobile Overlay', description: '모바일 오버레이 + 슬라이드 인', code: '<Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} showGrid={showGrid} toggleGrid={toggleGrid} />' },
        ],
        usage: `import Sidebar from "@/components/Sidebar"

export function Example() {
    return (
        <Sidebar
            isOpen={true}
            toggleSidebar={() => {}}
            showGrid={false}
            toggleGrid={() => {}}
        />
    )
}`,
    },
};

// 컴포넌트 이름으로 메타데이터 가져오기
export function getComponentMeta(name: string): ComponentMeta | undefined {
    const meta = componentRegistry[name.toLowerCase()];
    if (!meta) return undefined;

    return {
        ...meta,
        anatomy: meta.anatomy ?? getFallbackAnatomy(meta),
    };
}

// 모든 컴포넌트 목록 가져오기
export function getAllComponents(): ComponentMeta[] {
    return Object.values(componentRegistry);
}

// 카테고리별 컴포넌트 가져오기
export function getComponentsByCategory(category: ComponentMeta['category']): ComponentMeta[] {
    return Object.values(componentRegistry).filter(c => c.category === category);
}
