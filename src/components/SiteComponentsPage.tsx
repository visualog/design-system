import React from 'react';
import { Link } from 'react-router-dom';

import { AnimatedTabs } from '@/components/ui/animated-tabs';
import { getAllComponents } from '@/data/componentRegistry';
import { ExperimentalToggle } from './ui/ExperimentalToggle';
import { SearchBar } from './SearchBar';
import { SmartFilterDropdown } from '@/components/ui/SmartFilterDropdown';
import { Badge } from '@/components/ui/badge';

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

const atomicFilterItems = [
    { value: 'atom', label: 'Atom' },
    { value: 'molecule', label: 'Molecule' },
    { value: 'organism', label: 'Organism' }
];

const categoryTabOrder = ['layout', 'form', 'feedback', 'navigation', 'docs', 'utility'] as const;
const categoryTabLabels: Record<string, string> = {
    layout: 'Layout',
    form: 'Form',
    feedback: 'Feedback',
    navigation: 'Navigation',
    docs: 'Docs',
    utility: 'Utility'
};

const releasePhaseFilterItems = [
    { value: 'beta', label: 'Beta' },
    { value: 'stable', label: 'Stable' },
    { value: 'experimental', label: 'Experimental' },
    { value: 'deprecated', label: 'Deprecated' }
];

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

const resolveSingleSelectValue = <T extends string>(values: string[], fallback: T): T => {
    if (!values.length || values.includes('All')) {
        return fallback;
    }
    // SmartFilterDropdown can emit multi-select values; pick the latest one for single-select UX.
    return values[values.length - 1] as T;
};

const SiteComponentsPage = () => {
    const components = getAllComponents();
    const [searchQuery, setSearchQuery] = React.useState('');
    const [selectedCategory, setSelectedCategory] = React.useState('All');
    const [selectedAtomicLevel, setSelectedAtomicLevel] = React.useState<'all' | 'atom' | 'molecule' | 'organism'>('all');
    const [selectedReleasePhase, setSelectedReleasePhase] = React.useState<'all' | 'experimental' | 'beta' | 'stable' | 'deprecated'>('all');

    // 고유 카테고리 추출 + 탭 순서 정규화
    const uniqueCategories = new Set(components.map(c => c.category));
    const orderedCategories = [
        ...categoryTabOrder.filter((category) => uniqueCategories.has(category)),
        ...Array.from(uniqueCategories).filter((category) => !categoryTabOrder.includes(category as (typeof categoryTabOrder)[number])).sort()
    ];
    const categories = ['All', ...orderedCategories];

    // 필터링 로직
    const filteredComponents = components.filter(component => {
        const matchesSearch =
            component.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            component.description.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory = selectedCategory === 'All' || component.category === selectedCategory;
        const matchesAtomicLevel = selectedAtomicLevel === 'all' || component.atomicLevel === selectedAtomicLevel;
        const matchesReleasePhase = selectedReleasePhase === 'all' || component.releasePhase === selectedReleasePhase;

        return matchesSearch && matchesCategory && matchesAtomicLevel && matchesReleasePhase;
    });

    const tabs = categories.map(category => ({
        name: category === 'All' ? '전체' : (categoryTabLabels[category] || category),
        value: category
    }));

    const atomicFilterTriggerText = selectedAtomicLevel === 'all'
        ? 'Atomic: 전체'
        : `Atomic: ${atomicLevelLabels[selectedAtomicLevel]}`;

    const releaseFilterTriggerText = selectedReleasePhase === 'all'
        ? 'Release: 전체'
        : `Release: ${releasePhaseLabels[selectedReleasePhase]}`;

    return (
        <div className="flex flex-col gap-16 pb-24 w-full max-w-[1104px] mx-auto">
            <div>

                <div className="flex flex-col gap-3">
                    <h1 className="flex items-center gap-4 text-heading-xl tracking-tight">
                        Components
                        <ExperimentalToggle />
                    </h1>
                    <p className="text-body-sm text-muted-foreground">
                        디자인 시스템에서 제공하는 컴포넌트를 관리하고 설정합니다.
                    </p>
                </div>

                <div className="mt-8">
                    <AnimatedTabs tabs={tabs} activeTab={selectedCategory} setActiveTab={setSelectedCategory}>
                        <div className="flex flex-col gap-6 mt-6">
                            <div className="flex flex-wrap items-center gap-2">
                                <SmartFilterDropdown
                                    triggerText={atomicFilterTriggerText}
                                    items={atomicFilterItems}
                                    selectedValues={selectedAtomicLevel === 'all' ? ['All'] : [selectedAtomicLevel]}
                                    onSelectionChange={(values) => {
                                        const next = resolveSingleSelectValue<'all' | 'atom' | 'molecule' | 'organism'>(values, 'all');
                                        setSelectedAtomicLevel(next);
                                    }}
                                    width="w-[156px]"
                                    align="start"
                                />
                                <SmartFilterDropdown
                                    triggerText={releaseFilterTriggerText}
                                    items={releasePhaseFilterItems}
                                    selectedValues={selectedReleasePhase === 'all' ? ['All'] : [selectedReleasePhase]}
                                    onSelectionChange={(values) => {
                                        const next = resolveSingleSelectValue<'all' | 'experimental' | 'beta' | 'stable' | 'deprecated'>(values, 'all');
                                        setSelectedReleasePhase(next);
                                    }}
                                    width="w-[172px]"
                                    align="start"
                                />
                                <SearchBar
                                    containerClassName="min-w-[220px] flex-1 max-w-[420px]"
                                    placeholder={`${filteredComponents.length}개 컴포넌트 검색...`}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            {/* 결과 목록 */}
                            {filteredComponents.length > 0 ? (
                                <div className="grid gap-3 md:gap-4 lg:gap-5 md:grid-cols-2 lg:grid-cols-3">
                                    {filteredComponents.map((component) => (
                                        <Link
                                            key={component.name}
                                            to={`/site-settings/components/${component.name}`}
                                            className="block group"
                                        >
                                            <div className="rounded-xl border bg-card text-card-foreground p-6 flex flex-col gap-4 hover:bg-muted/50 transition-colors h-full relative">
                                                <div className="flex flex-wrap content-start items-start gap-1 min-h-[52px]">
                                                    <Badge variant="category" className="lowercase">
                                                        {component.category}
                                                    </Badge>
                                                    {component.atomicLevel && (
                                                        <Badge variant="atomic">
                                                            {atomicLevelLabels[component.atomicLevel]}
                                                        </Badge>
                                                    )}
                                                    {component.releasePhase && (
                                                        <Badge variant={getReleasePhaseBadgeVariant(component.releasePhase)}>
                                                            {releasePhaseLabels[component.releasePhase]}
                                                        </Badge>
                                                    )}
                                                </div>
                                                <div className="flex flex-col gap-0">
                                                    <h3 className="font-bold text-lg group-hover:text-primary transition-colors tracking-tight">
                                                        {component.displayName}
                                                    </h3>
                                                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 min-h-[40px] break-keep">
                                                        {component.description}
                                                    </p>
                                                </div>

                                                <div className="mt-auto w-full flex flex-wrap gap-1">
                                                    <Badge variant="meta" className="rounded truncate max-w-full px-2 py-1 font-mono" title={component.filePath.split('/').pop()}>
                                                        {component.filePath.split('/').pop()}
                                                    </Badge>
                                                    <Badge variant="meta" className="rounded px-2 py-1">
                                                        {component.props.length} props
                                                    </Badge>
                                                    <Badge variant="meta" className="rounded px-2 py-1">
                                                        {component.variants?.length || 0} variants
                                                    </Badge>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-20 text-muted-foreground">
                                    <p className="text-lg">일치하는 컴포넌트가 없습니다.</p>
                                    <button
                                        onClick={() => {
                                            setSearchQuery('');
                                            setSelectedCategory('All');
                                            setSelectedAtomicLevel('all');
                                            setSelectedReleasePhase('all');
                                        }}
                                        className="mt-4 text-primary hover:underline text-sm"
                                    >
                                        필터 초기화
                                    </button>
                                </div>
                            )}
                        </div>
                    </AnimatedTabs>
                </div>
            </div>
        </div >
    );
};

export default SiteComponentsPage;
