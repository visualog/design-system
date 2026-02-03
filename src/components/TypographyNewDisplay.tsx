import React, { useState, useMemo } from 'react';
import { toast } from "sonner";
import { HighlightText } from './ui/HighlightText';
import { SearchBar } from './SearchBar';
import { designSystemData } from '../utils/dataLoader';
import { SmartFilterDropdown } from "./ui/SmartFilterDropdown";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Type, Info, Copy, Globe, MessageSquare } from "lucide-react";

/**
 * Geist-inspired Typography Page
 * Mirrored from https://vercel.com/geist/typography
 */

// Helper to get font weight from JSON string (e.g., "Bold/700")
const getWeight = (weightStr: string) => {
    const parts = weightStr.split('/');
    return {
        label: parts[0].trim(),
        value: parseInt(parts[1]) || 400
    };
};

// Usage tooltips/descriptions (Inferred based on Geist style)
const getUsage = (styleName: string) => {
    const name = styleName.toLowerCase();
    if (name.includes('h1')) return { en: 'Primary page headers', ko: '메인 페이지 대제목 및 최상위 헤더용' };
    if (name.includes('h2')) return { en: 'Secondary section titles', ko: '섹션 구분용 제목 및 주요 소제목용' };
    if (name.includes('h3')) return { en: 'Tertiary group headers', ko: '그룹 내 강조 및 중소형 타이틀용' };
    if (name.includes('subtitle')) return { en: 'Emphasized content or sub-headers', ko: '본문 내 강조 텍스트 또는 보조 소제목용' };
    if (name.includes('body_1')) return { en: 'Primary content paragraphs', ko: '기본 가독성을 위한 메인 본문 텍스트용' };
    if (name.includes('body_2')) return { en: 'Secondary descriptive text', ko: '상세 정보나 긴 호흡의 보조 본문용' };
    if (name.includes('body_3')) return { ko: '사이드바나 리스트 내 부가 설명용', en: 'Dense UI elements' };
    if (name.includes('caption')) return { en: 'Labels and metadata', ko: '캡션, 레이블 및 부가 설명용 데이터용' };
    return { en: 'Standard interface typography', ko: '일반적인 인터페이스 요소의 텍스트용' };
};

const TypographyNewDisplay: React.FC = () => {
    const { typography } = designSystemData;
    const [searchQuery, setSearchQuery] = useState('');
    const [previewText, setPreviewText] = useState('The quick brown fox jumps over the lazy dog');
    const [selectedCategories, setSelectedCategories] = useState<string[]>(['All']);

    const availableCategories = Object.keys(typography).filter(key => key !== 'font_family');

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.info(`Copied to clipboard`, {
            description: `Token: ${text}`,
            duration: 2000,
        });
    };

    const filteredData = useMemo(() => {
        return availableCategories
            .filter(cat => selectedCategories.includes('All') || selectedCategories.includes(cat))
            .reduce((acc: any, category) => {
                const styles = (typography as any)[category] || [];
                const filtered = styles.filter((s: any) =>
                    s.style_name.toLowerCase().includes(searchQuery.toLowerCase())
                );
                if (filtered.length > 0) acc[category] = filtered;
                return acc;
            }, {});
    }, [typography, searchQuery, selectedCategories, availableCategories]);

    return (
        <div className="flex flex-col gap-12 font-pretendard">
            {/* HER0 - Geist Style */}
            <header className="flex flex-col gap-6 border-b pb-12">
                <div className="flex items-center gap-2.5 text-primary">
                    <div className="p-2 bg-primary/10 rounded-lg">
                        <Globe className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold tracking-widest uppercase">Typography Foundation</span>
                </div>
                <div className="flex flex-col gap-3">
                    <h1 className="text-5xl font-extrabold tracking-tighter text-foreground">Pretendard</h1>
                    <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
                        A modern multi-platform variable font system optimized for deep readability and visual balance.
                        Designed to maintain clarity across all digital environments.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-6 mt-4">
                    <div className="flex items-center gap-2 text-sm bg-muted/50 px-3 py-1.5 rounded-full border border-border/50">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-muted-foreground">Variable Font</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MessageSquare className="w-4 h-4" />
                        <span>Pretendard JP/CN Support</span>
                    </div>
                </div>

                {/* Live Preview Tester */}
                <div className="mt-8 flex flex-col gap-3 max-w-xl">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] ml-1">Live Type Tester</label>
                    <div className="relative group">
                        <input
                            type="text"
                            value={previewText}
                            onChange={(e) => setPreviewText(e.target.value)}
                            className="w-full bg-background border border-border/60 hover:border-border rounded-xl px-5 py-4 text-sm focus:ring-4 focus:ring-primary/5 transition-all outline-none pr-12 shadow-sm"
                            placeholder="Type to see all styles..."
                        />
                        <Type className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/30 group-focus-within:text-primary transition-colors" />
                    </div>
                </div>
            </header>

            {/* TOOLBAR - Sticky Filter Panel */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between sticky top-0 z-40 bg-background/90 backdrop-blur-xl py-5 border-b border-border/40">
                <div className="flex gap-3 items-center w-full md:w-auto">
                    <SmartFilterDropdown
                        triggerText={selectedCategories.includes('All') ? '전체 카테고리' : `${selectedCategories.length}개 선택됨`}
                        items={availableCategories.map(c => ({ value: c, label: c }))}
                        selectedValues={selectedCategories}
                        onSelectionChange={setSelectedCategories}
                        width="w-52"
                    />
                    <div className="flex-1 w-full max-w-sm">
                        <SearchBar
                            placeholder="스타일 검색 (예: heading, regular)..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            width="100%"
                        />
                    </div>
                </div>
                <div className="flex items-center gap-2.5 text-[11px] font-medium text-muted-foreground/80 bg-secondary/30 px-4 py-2 rounded-full border border-border/10">
                    <Info className="w-3.5 h-3.5" />
                    행을 클릭하면 토큰 이름이 복사됩니다.
                </div>
            </div>

            {/* CONTENT SECTIONS */}
            <main className="flex flex-col gap-24 py-8">
                {Object.entries(filteredData).map(([category, styles]: [string, any]) => (
                    <section key={category} className="flex flex-col gap-8 scroll-mt-32">
                        <div className="flex items-end justify-between border-b border-border/60 pb-4">
                            <div className="flex flex-col gap-1">
                                <h2 className="text-3xl font-bold tracking-tight">{category}</h2>
                                <p className="text-sm text-muted-foreground capitalize">{category.toLowerCase()} level hierarchy and content structure.</p>
                            </div>
                            <span className="text-xs font-mono text-muted-foreground/60 mb-1">{styles.length} Styles</span>
                        </div>

                        <div className="overflow-x-auto rounded-xl">
                            <Table>
                                <TableHeader className="bg-transparent hover:bg-transparent">
                                    <TableRow className="border-none hover:bg-transparent">
                                        <TableHead className="w-[50%] h-12 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50 pl-0">Aa Example</TableHead>
                                        <TableHead className="w-[20%] h-12 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">Token Name</TableHead>
                                        <TableHead className="w-[30%] h-12 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50 text-right pr-0">Specs & Usage</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {styles.map((style: any) => {
                                        const weight = getWeight(style.weight);
                                        const usage = getUsage(style.style_name);

                                        return (
                                            <TableRow
                                                key={style.style_name}
                                                onClick={() => copyToClipboard(style.style_name)}
                                                className="group cursor-pointer hover:bg-secondary/20 transition-all duration-200 border-b border-border/30 last:border-none"
                                            >
                                                {/* Visual Preview Cell */}
                                                <TableCell className="py-10 pl-0 align-top">
                                                    <div className="flex flex-col gap-4">
                                                        <div
                                                            className="flex flex-col leading-tight"
                                                            style={{
                                                                fontSize: `${style.size}px`,
                                                                lineHeight: `${style.line_height}px`,
                                                                fontWeight: weight.value,
                                                                fontFamily: 'Pretendard, var(--font-sans)',
                                                                textDecoration: style.style_name.includes('underline') ? 'underline' : 'none'
                                                            }}
                                                        >
                                                            <div className="flex items-baseline gap-4">
                                                                <span className="text-muted-foreground/20 font-light select-none group-hover:text-primary/30 transition-colors">Aa</span>
                                                                <div className="truncate max-w-[400px]">
                                                                    {previewText}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all transform translate-y-1 group-hover:translate-y-0 duration-300 ml-10">
                                                            <span className="text-[9px] font-black uppercase tracking-tighter bg-primary text-primary-foreground px-1.5 py-0.5 rounded-sm">Current Sample View</span>
                                                        </div>
                                                    </div>
                                                </TableCell>

                                                {/* Token Name Cell */}
                                                <TableCell className="align-top py-10">
                                                    <div className="flex flex-col gap-2">
                                                        <div className="inline-flex items-center gap-2 text-sm font-mono font-bold text-foreground group-hover:text-primary transition-colors">
                                                            <HighlightText text={style.style_name} highlight={searchQuery} />
                                                            <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                        </div>
                                                        <span className="text-[10px] text-muted-foreground/40 font-mono uppercase tracking-[0.2em]">Token Identifier</span>
                                                    </div>
                                                </TableCell>

                                                {/* Specifications Cell */}
                                                <TableCell className="align-top py-10 text-right pr-0">
                                                    <div className="flex flex-col items-end gap-3 max-w-[240px] ml-auto">
                                                        <div className="flex flex-col items-end gap-1">
                                                            <span className="text-xs font-semibold text-foreground/80">{usage.en}</span>
                                                            <span className="text-[11px] text-muted-foreground leading-tight">{usage.ko}</span>
                                                        </div>
                                                        <div className="flex items-center justify-end gap-2 font-mono text-[9px] font-bold">
                                                            <span className="bg-secondary/50 text-secondary-foreground px-2 py-1 rounded border border-border/20">{style.size}px</span>
                                                            <span className="bg-secondary/50 text-secondary-foreground px-2 py-1 rounded border border-border/20">{style.line_height}lh</span>
                                                            <span className="bg-secondary/50 text-secondary-foreground px-2 py-1 rounded border border-border/20">{weight.label}</span>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </div>
                    </section>
                ))}
            </main>

            {/* FOOTER PRINCIPLES */}
            <footer className="mt-12 bg-secondary/10 rounded-3xl p-10 sm:p-16 border border-border/60 overflow-hidden relative group">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors duration-1000" />
                <div className="relative z-10 flex flex-col gap-12">
                    <div className="flex flex-col gap-3">
                        <Tag label="Principles" />
                        <h2 className="text-4xl font-black tracking-tighter">Typography Core Philosophy</h2>
                        <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
                            Every font style is crafted to ensure a cohesive and structured experience, bridging the gap between aesthetics and function.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { title: 'Readability First', desc: 'Prioritize contrast and whitespace to reduce cognitive load during reading.' },
                            { title: 'Visual Hierarchy', desc: 'Use consistent weights and scales to guide users through the information flow.' },
                            { title: 'Accessibility', desc: 'Guarantee legibility for all users by adhering to strict vertical rhythm and sizing.' }
                        ].map(p => (
                            <div key={p.title} className="flex flex-col gap-4">
                                <div className="w-10 h-1 stroke-primary bg-primary rounded-full transition-all group-hover:w-20" />
                                <h3 className="text-xl font-bold">{p.title}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </footer>
        </div>
    );
};

const Tag = ({ label }: { label: string }) => (
    <div className="inline-flex h-6 items-center px-3 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/20 w-fit">
        {label}
    </div>
);

export default TypographyNewDisplay;
