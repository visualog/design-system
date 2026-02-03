import React, { useState, useMemo } from 'react';
import { toast } from "sonner";
import { designSystemData } from '../utils/dataLoader';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Type, Copy, MessageSquare } from "lucide-react";

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

const getCategoryDescription = (category: string) => {
    switch (category) {
        case 'Heading': return '서비스의 타이틀 및 핵심 정보를 강조하는 헤어라인입니다.';
        case 'Subtitle': return '콘텐츠 본문 내의 소제목 혹은 강조가 필요한 단락에 사용됩니다.';
        case 'Body': return '가독성을 최우선으로 고려한 기본 본문 텍스트 시스템입니다.';
        case 'Caption': return '부가 설명, 레이블 및 메타데이터 표현을 위한 부수적인 서체입니다.';
        default: return `${category} 레벨의 위계 및 콘텐츠 구조를 정의합니다.`;
    }
};

const TypographyNewDisplay: React.FC = () => {
    const { typography } = designSystemData;
    const [previewText, setPreviewText] = useState('The quick brown fox jumps over the lazy dog');

    const availableCategories = Object.keys(typography).filter(key => key !== 'font_family');

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.info(`Copied to clipboard`, {
            description: `Token: ${text}`,
            duration: 2000,
        });
    };

    const displayData = useMemo(() => {
        return availableCategories
            .reduce((acc: any, category) => {
                const styles = (typography as any)[category] || [];
                if (styles.length > 0) acc[category] = styles;
                return acc;
            }, {});
    }, [typography, availableCategories]);

    return (
        <div className="flex flex-col gap-16 max-w-7xl mx-auto py-12 font-pretendard">
            {/* HER0 - Geist Style */}
            <header className="flex flex-col gap-8 pb-12">
                <div className="flex flex-col gap-6">

                    <div className="flex flex-col gap-3">
                        <h1 className="text-5xl font-extrabold tracking-tighter text-foreground">Pretendard</h1>
                        <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
                            가독성과 시각적 균형을 최우선으로 설계된 현대적인 다중 플랫폼 가변 글꼴 시스템입니다.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-6">
                        <div className="flex items-center gap-2 text-sm bg-muted/50 px-3 py-1.5 rounded-full border border-border/50">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-muted-foreground">Variable Font</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MessageSquare className="w-4 h-4" />
                            <span>Pretendard JP/CN Support</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-end justify-between gap-8">
                    {/* Live Preview Tester */}
                    <div className="flex flex-col gap-3 w-full">

                        <div className="relative group">
                            <input
                                type="text"
                                value={previewText}
                                onChange={(e) => setPreviewText(e.target.value)}
                                className="w-full bg-background border border-border/60 hover:border-border rounded-xl px-5 py-4 text-sm focus:ring-4 focus:ring-primary/5 transition-all outline-none pr-12"
                                placeholder="Type to preview styles..."
                            />
                            <Type className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/30 group-focus-within:text-primary transition-colors" />
                        </div>
                    </div>


                </div>
            </header>

            {/* CONTENT SECTIONS */}
            <main className="flex flex-col gap-24 py-4">
                {Object.entries(displayData).map(([category, styles]: [string, any]) => (
                    <section key={category} className="flex flex-col gap-8 scroll-mt-32">
                        <div className="flex items-end justify-between">
                            <div className="flex flex-col gap-1">
                                <h2 className="text-3xl font-bold tracking-tight">{category}</h2>
                                <p className="text-sm text-muted-foreground">{getCategoryDescription(category)}</p>
                            </div>
                        </div>

                        <div className="overflow-x-auto rounded-xl">
                            <Table>
                                <TableHeader className="bg-transparent hover:bg-transparent">
                                    <TableRow className="border-none hover:bg-transparent">
                                        <TableHead className="w-[50%] h-12 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50 pl-0">Example</TableHead>
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
                                                                <div className="truncate max-w-[400px]">
                                                                    {previewText}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all transform translate-y-1 group-hover:translate-y-0 duration-300">
                                                            <span className="text-[9px] font-black uppercase tracking-tighter bg-primary text-primary-foreground px-1.5 py-0.5 rounded-sm">Current Sample View</span>
                                                        </div>
                                                    </div>
                                                </TableCell>

                                                {/* Token Name Cell */}
                                                <TableCell className="align-top py-10">
                                                    <div className="flex flex-col gap-2">
                                                        <div className="inline-flex items-center gap-2 text-sm font-mono font-bold text-foreground group-hover:text-primary transition-colors">
                                                            {style.style_name}
                                                            <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                        </div>
                                                    </div>
                                                </TableCell>

                                                {/* Specifications Cell */}
                                                <TableCell className="align-top py-10 text-right pr-0">
                                                    <div className="flex flex-col items-end gap-3 max-w-[240px] ml-auto">
                                                        <div className="flex flex-col items-end gap-1">
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
                            모든 서체 스타일은 미학적인 아름다움과 기능적인 완성도를 연결하며, 체계적이고 일관된 사용자 경험을 제공합니다.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { title: 'Readability First', desc: '정보 전달의 명확성을 위해 최적의 여백과 대비를 제공하여 사용자의 피로도를 낮춥니다.' },
                            { title: 'Visual Hierarchy', desc: '일관된 서체 두께와 크기 체계를 활용하여 사용자의 시선을 효과적으로 유도합니다.' },
                            { title: 'Accessibility', desc: '모든 사용자가 정보를 쉽고 정확하게 인지할 수 있도록 엄격한 타이포그래피 규칙을 준수합니다.' }
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
