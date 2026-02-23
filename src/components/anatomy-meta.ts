export const colorTokenData: Record<string, { hex: string; rgb: string; hsl: string; usage: string; description?: string }> = {
    'bg-muted': { hex: '#F4F4F5', rgb: 'rgb(244, 244, 245)', hsl: 'var(--color-muted)', usage: '컨테이너 배경', description: '보조적인 배경색으로 사용되어 계층 구조를 구분합니다.' },
    'bg-background': { hex: '#FFFFFF', rgb: 'rgb(255, 255, 255)', hsl: 'var(--color-background)', usage: '활성 트리거 배경', description: '가장 기본적인 배경색으로, 콘텐츠를 올리는 캔버스 역할을 합니다.' },
    'bg-primary': { hex: '#18181B', rgb: 'rgb(24, 24, 27)', hsl: 'var(--color-primary)', usage: '주색상 배경', description: '브랜드의 주요 액션이나 강조하고 싶은 부분에 사용됩니다.' },
    'bg-secondary': { hex: '#F4F4F5', rgb: 'rgb(244, 244, 245)', hsl: 'var(--color-secondary)', usage: '보조 배경', description: '주요 액션보다 덜 중요한, 부차적인 배경 요소에 사용됩니다.' },
    'bg-accent': { hex: '#F4F4F5', rgb: 'rgb(244, 244, 245)', hsl: 'var(--color-accent)', usage: '강조 배경', description: '선택/호버 상태처럼 인터랙션 강조가 필요한 영역에 사용됩니다.' },
    'bg-destructive': { hex: '#EF4444', rgb: 'rgb(239, 68, 68)', hsl: 'var(--color-destructive)', usage: '파괴적 배경', description: '삭제, 오류 등 위험하거나 주의가 필요한 액션의 배경에 사용됩니다.' },
    'bg-transparent': { hex: 'transparent', rgb: 'transparent', hsl: 'transparent', usage: '투명 배경', description: '배경색 없이 콘텐츠만 강조하거나 다른 배경 위에 얹혀질 때 사용됩니다.' },

    'text-foreground': { hex: '#09090B', rgb: 'rgb(9, 9, 11)', hsl: 'var(--color-foreground)', usage: '기본 텍스트', description: '가독성이 가장 높은 기본 텍스트 색상입니다.' },
    'text-muted-foreground': { hex: '#71717A', rgb: 'rgb(113, 113, 122)', hsl: 'var(--color-muted-foreground)', usage: '보조 텍스트', description: '덜 중요한 정보나 비활성화된 상태를 나타낼 때 사용됩니다.' },
    'text-background': { hex: '#FFFFFF', rgb: 'rgb(255, 255, 255)', hsl: 'var(--color-background)', usage: '반전 텍스트', description: '어두운 배경 위에서 높은 가독성을 제공하는 텍스트 색상입니다.' },
    'text-primary': { hex: '#18181B', rgb: 'rgb(24, 24, 27)', hsl: 'var(--color-primary)', usage: '주색상 텍스트', description: '브랜드 컬러를 텍스트에 적용하여 강조할 때 사용됩니다.' },
    'text-primary-foreground': { hex: '#FAFAFA', rgb: 'rgb(250, 250, 250)', hsl: 'var(--color-primary-foreground)', usage: '주색상 위 텍스트', description: '주색상 배경 위에서 읽기 쉽도록 대비를 이룹니다.' },
    'text-secondary-foreground': { hex: '#18181B', rgb: 'rgb(24, 24, 27)', hsl: 'var(--color-secondary-foreground)', usage: '보조 배경 위 텍스트', description: '보조 배경 위에서 가독성을 확보하는 텍스트 색상입니다.' },
    'text-accent-foreground': { hex: '#18181B', rgb: 'rgb(24, 24, 27)', hsl: 'var(--color-accent-foreground)', usage: '강조 배경 위 텍스트', description: '호버 등 강조된 배경 위에서 사용되는 텍스트 색상입니다.' },
    'text-destructive-foreground': { hex: '#FAFAFA', rgb: 'rgb(250, 250, 250)', hsl: 'var(--color-destructive-foreground)', usage: '파괴적 배경 위 텍스트', description: '위험/경고 배경 위에서 높은 가독성을 제공합니다.' },

    'border-input': { hex: '#E4E4E7', rgb: 'rgb(228, 228, 231)', hsl: 'var(--color-input)', usage: '입력창 테두리', description: '인풋 컴포넌트나 카드 등의 경계를 구분하는 테두리 색상입니다.' },
    'border-border': { hex: '#E4E4E7', rgb: 'rgb(228, 228, 231)', hsl: 'var(--color-border)', usage: '컨테이너 보더', description: '컴포넌트의 경계를 구분하는 기본 보더 색상입니다.' },
    'menu-surface': { hex: '#FFFFFF', rgb: 'rgb(255, 255, 255)', hsl: 'var(--color-background)', usage: '메뉴 배경', description: '드롭다운 메뉴 패널의 표면 배경입니다.' },
    'filter-trigger-bg': { hex: '#FFFFFF', rgb: 'rgb(255, 255, 255)', hsl: 'var(--color-background)', usage: '필터 트리거 배경', description: '필터 버튼의 기본 배경입니다.' },
    'search-field-bg': { hex: '#FFFFFF', rgb: 'rgb(255, 255, 255)', hsl: 'var(--color-background)', usage: '검색 필드 배경', description: '검색 입력 영역의 기본 배경입니다.' },
    'input-field-bg': { hex: '#FFFFFF', rgb: 'rgb(255, 255, 255)', hsl: 'var(--color-background)', usage: '입력 필드 배경', description: '입력 컨트롤의 기본 표면 배경입니다.' },
};

export interface AnatomyVariantOption {
    value: string;
    label: string;
}

const anatomyVariantOptionsMap: Record<string, AnatomyVariantOption[]> = {
    tabs: [
        { value: 'segmented', label: 'Basic Tabs' },
        { value: 'pill', label: 'Animated Tabs (Basic)' },
        { value: 'line', label: 'Settings Pattern' },
    ],
    'animated-tabs': [
        { value: 'segmented', label: 'Default' },
    ],
    button: [
        { value: 'default', label: 'Default' },
        { value: 'secondary', label: 'Secondary' },
        { value: 'outline', label: 'Outline' },
        { value: 'ghost', label: 'Ghost' },
        { value: 'destructive', label: 'Destructive' },
    ],
    input: [
        { value: 'default', label: 'Default' },
        { value: 'disabled', label: 'Disabled' },
        { value: 'with-label', label: 'With Label' },
    ],
    separator: [
        { value: 'horizontal', label: 'Horizontal' },
        { value: 'vertical', label: 'Vertical' },
    ],
    sheet: [
        { value: 'right', label: 'Right' },
        { value: 'left', label: 'Left' },
    ],
    card: [
        { value: 'basic', label: 'Card with Header' },
        { value: 'with-footer', label: 'Card with Footer' },
    ],
    sidebar: [
        { value: 'expanded', label: 'Desktop Fixed' },
        { value: 'collapsed', label: 'Mobile Overlay' },
    ],
};

export const getAnatomyVariantOptions = (componentName: string): AnatomyVariantOption[] => {
    const name = componentName.toLowerCase();
    return anatomyVariantOptionsMap[name] ?? [];
};

export const getAnatomyVariants = (componentName: string): string[] => {
    return getAnatomyVariantOptions(componentName).map((option) => option.value);
};
