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

export interface ComponentMeta {
    name: string;
    displayName: string;
    description: string;
    category: 'ui' | 'layout' | 'form' | 'feedback' | 'navigation';
    filePath: string;
    props: PropDefinition[];
    variants: ComponentVariant[];
    usage: string;
    // New fields for restructured layout
    anatomy?: string;
    sizes?: string[]; // e.g. ['sm', 'md', 'lg']
    states?: string[]; // e.g. ['default', 'hover', 'active', 'disabled']
    guide?: string; // Markdown content for the Guide section
}

// 컴포넌트 레지스트리
export const componentRegistry: Record<string, ComponentMeta> = {
    button: {
        name: 'button',
        displayName: 'Button',
        description: '클릭 가능한 버튼 컴포넌트. 다양한 변형과 크기를 지원합니다.',
        category: 'ui',
        filePath: 'src/components/ui/button.tsx',
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
        guide: `
### 사용 가이드 (Usage)

- **명확한 레이블**: 버튼이 수행하는 동작을 명확하게 설명하는 텍스트를 사용하세요 (예: "저장하기", "삭제").
- **우선순위 구분**: 페이지 내에서 가장 중요한 작업에는 Primary(Default) 버튼을, 덜 중요한 작업에는 Secondary 또는 Ghost 버튼을 사용하여 시각적 계층을 만드세요.
- **일관성**: 버튼의 위치와 순서를 일관되게 유지하여 사용자가 예측 가능한 경험을 할 수 있도록 하세요.
        `
    },

    card: {
        name: 'card',
        displayName: 'Card',
        description: '콘텐츠를 그룹화하여 표시하는 카드 컴포넌트.',
        category: 'layout',
        filePath: 'src/components/ui/card.tsx',
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
    },

    tooltip: {
        name: 'tooltip',
        displayName: 'Tooltip',
        description: '호버 시 추가 정보를 표시하는 툴팁 컴포넌트.',
        category: 'feedback',
        filePath: 'src/components/ui/tooltip.tsx',
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
        props: [
            { name: 'defaultValue', type: 'string', description: '기본 활성 탭' },
            { name: 'value', type: 'string', description: '현재 활성 탭 (제어 모드)' },
            { name: 'onValueChange', type: '(value: string) => void', description: '탭 변경 핸들러' },
            { name: 'tabs', type: '{ name: string; value: string }[]', description: '탭 목록 (Animated Tabs 전용)' },
        ],
        variants: [
            {
                name: 'Basic Tabs', description: '기본적인 탭 컴포넌트 (Radix UI 기반)', code: `<Tabs defaultValue="tab1">
    <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
    </TabsList>
    <TabsContent value="tab1">Content 1</TabsContent>
    <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>` },
            {
                name: 'Animated Tabs (Basic)', description: '애니메이션이 적용된 기본 탭', code: `<AnimatedTabs 
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
                name: 'Settings Pattern', description: '설정 페이지 등에서 사용되는 고도화된 패턴', code: `<AnimatedTabs 
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
        category: 'ui',
        filePath: 'src/components/ui/GuidelineItem.tsx',
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
        category: 'ui',
        filePath: 'src/components/ui/HighlightText.tsx',
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
};

// 컴포넌트 이름으로 메타데이터 가져오기
export function getComponentMeta(name: string): ComponentMeta | undefined {
    return componentRegistry[name.toLowerCase()];
}

// 모든 컴포넌트 목록 가져오기
export function getAllComponents(): ComponentMeta[] {
    return Object.values(componentRegistry);
}

// 카테고리별 컴포넌트 가져오기
export function getComponentsByCategory(category: ComponentMeta['category']): ComponentMeta[] {
    return Object.values(componentRegistry).filter(c => c.category === category);
}
