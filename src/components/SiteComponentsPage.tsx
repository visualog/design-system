import React from 'react';
import { Link } from 'react-router-dom';

import { AnimatedTabs } from '@/components/ui/animated-tabs';
import { getAllComponents } from '@/data/componentRegistry';

const SiteComponentsPage = () => {
    const components = getAllComponents();
    const [searchQuery, setSearchQuery] = React.useState('');
    const [selectedCategory, setSelectedCategory] = React.useState('All');

    // 고유 카테고리 추출
    // 고유 카테고리 추출
    const categories = ['All', ...new Set(components.map(c => c.category))];

    // 필터링 로직
    const filteredComponents = components.filter(component => {
        const matchesSearch =
            component.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            component.description.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory = selectedCategory === 'All' || component.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    const tabs = categories.map(category => ({
        name: category === 'All' ? '전체' : category.charAt(0).toUpperCase() + category.slice(1),
        value: category
    }));

    return (
        <div className="flex flex-col gap-8 pb-20">
            <div>

                <div className="flex flex-col gap-2">
                    <h1 className="flex items-center gap-3 text-3xl font-semibold tracking-tight">
                        Components
                    </h1>
                    <p className="text-muted-foreground">
                        Manage and configure the components available in your design system.
                    </p>
                </div>

                <div className="mt-8">
                    <AnimatedTabs tabs={tabs} activeTab={selectedCategory} setActiveTab={setSelectedCategory}>
                        <div className="flex flex-col gap-6 mt-6">
                            {/* 검색창 */}
                            <div className="relative w-full md:w-72 self-start">
                                <input
                                    type="text"
                                    placeholder={`${selectedCategory === 'All' ? components.length : components.filter(c => c.category === selectedCategory).length}개 컴포넌트 검색...`}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full h-10 px-3 pl-10 rounded-md border bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                />
                                <div className="absolute left-3 top-2.5 text-muted-foreground">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="11" cy="11" r="8"></circle>
                                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                    </svg>
                                </div>
                            </div>



                            {/* 결과 목록 */}
                            {filteredComponents.length > 0 ? (
                                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    {filteredComponents.map((component) => (
                                        <Link
                                            key={component.name}
                                            to={`/site-settings/components/${component.name}`}
                                            className="block group"
                                        >
                                            <div className="rounded-xl border bg-card text-card-foreground p-6 flex flex-col gap-4 hover:bg-muted/50 transition-colors h-full relative">
                                                <div className="flex flex-col items-start">
                                                    <span className="inline-flex items-center rounded-full bg-primary px-2.5 py-0.5 text-xs font-medium text-primary-foreground">
                                                        {component.category}
                                                    </span>
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
                                                    <div className="inline-flex items-center rounded bg-secondary/50 px-2 py-1 text-xs font-medium text-muted-foreground font-mono truncate max-w-full" title={component.filePath.split('/').pop()}>
                                                        {component.filePath.split('/').pop()}
                                                    </div>
                                                    <span className="inline-flex items-center justify-center rounded bg-secondary/50 px-2 py-1 text-xs font-medium text-muted-foreground">
                                                        {component.props.length} props
                                                    </span>
                                                    <span className="inline-flex items-center justify-center rounded bg-secondary/50 px-2 py-1 text-xs font-medium text-muted-foreground">
                                                        {component.variants.length} variants
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-20 text-muted-foreground">
                                    <p className="text-lg">일치하는 컴포넌트가 없습니다.</p>
                                    <button
                                        onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
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
