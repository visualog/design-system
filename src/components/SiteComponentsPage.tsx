import React from 'react';
import { ArrowLeft, Box } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import { getAllComponents } from '@/data/componentRegistry';

const SiteComponentsPage = () => {
    const components = getAllComponents();
    const [searchQuery, setSearchQuery] = React.useState('');
    const [selectedCategory, setSelectedCategory] = React.useState('All');

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
                    <Box className="w-8 h-8" />
                    Components
                </h1>
                <p className="text-lg text-muted-foreground mt-2">
                    Reusable UI components used throughout the Design System site.
                </p>

                {/* 검색 및 필터 컨트롤 */}
                <div className="flex flex-col md:flex-row gap-4 mt-8 items-start md:items-center justify-between">
                    {/* 카테고리 탭 */}
                    <div className="flex bg-muted/50 p-1 rounded-lg">
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`
                                    px-3 py-1.5 text-sm font-medium rounded-md transition-all
                                    ${selectedCategory === category
                                        ? 'bg-background text-foreground shadow-sm'
                                        : 'text-muted-foreground hover:text-foreground hover:bg-background/50'}
                                `}
                            >
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </button>
                        ))}
                    </div>

                    {/* 검색창 */}
                    <div className="relative w-full md:w-72">
                        <input
                            type="text"
                            placeholder="Search components..."
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
                </div>
            </div>

            <Separator />

            {/* 결과 목록 */}
            {filteredComponents.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredComponents.map((component) => (
                        <Link
                            key={component.name}
                            to={`/site-settings/components/${component.name}`}
                            className="block group"
                        >
                            <div className="rounded-xl border bg-card text-card-foreground p-6 flex flex-col gap-4 hover:border-primary/50 transition-colors h-full relative">
                                <div className="flex flex-col items-start gap-2 mb-1">
                                    <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
                                        {component.category}
                                    </span>
                                    <h3 className="font-bold text-xl group-hover:text-primary transition-colors">
                                        {component.displayName}
                                    </h3>
                                </div>
                                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 min-h-[40px]">
                                    {component.description}
                                </p>

                                <div className="mt-auto pt-4 border-t w-full">
                                    <div className="text-sm font-mono text-muted-foreground mb-3 truncate" title={component.filePath.split('/').pop()}>
                                        {component.filePath.split('/').pop()}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="inline-flex items-center justify-center rounded bg-secondary/50 px-2 py-1 text-xs font-medium text-muted-foreground">
                                            {component.props.length} props
                                        </span>
                                        <span className="text-muted-foreground/40">•</span>
                                        <span className="inline-flex items-center justify-center rounded bg-secondary/50 px-2 py-1 text-xs font-medium text-muted-foreground">
                                            {component.variants.length} variants
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 text-muted-foreground">
                    <p className="text-lg">No components found matching your criteria.</p>
                    <button
                        onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                        className="mt-4 text-primary hover:underline text-sm"
                    >
                        Clear filters
                    </button>
                </div>
            )}
        </div >
    );
};

export default SiteComponentsPage;
