import React, { useState, useMemo } from 'react';
import { toast } from "sonner";
import { designSystemData } from '../utils/dataLoader';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Type, Copy, MessageSquare } from "lucide-react";
import { DocSubsection } from './ui/DocLayout';

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

interface TypographyToken {
    text_style: string;
    style_name: string;
    size: string;
    line_height: string;
    weight: string;
}

type TypographySource = Record<string, string | TypographyToken[]>;

const TypographyNewDisplay: React.FC = () => {
    const { typography } = designSystemData;
    const typographyData = typography as TypographySource;
    const [previewText, setPreviewText] = useState('The quick brown fox jumps over the lazy dog');

    const availableCategories = useMemo(
        () => Object.keys(typographyData).filter((key) => key !== 'font_family' && Array.isArray(typographyData[key])),
        [typographyData]
    );

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.info(`Copied to clipboard`, {
            description: `Token: ${text}`,
            duration: 2000,
        });
    };

    const displayData = useMemo(() => {
        return availableCategories
            .map((category) => {
                const styles = typographyData[category];
                if (!Array.isArray(styles) || styles.length === 0) {
                    return null;
                }

                return { category, styles };
            })
            .filter((item): item is { category: string; styles: TypographyToken[] } => item !== null);
    }, [availableCategories, typographyData]);

    return (
        <div className="font-pretendard doc-content-stack">
            <DocSubsection
                title="타이포그래피 기초"
                description="가독성과 시각적 균형을 최우선으로 설계된 Pretendard 기반 타이포그래피 시스템입니다."
            >
                <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2 text-sm bg-muted/50 px-3 py-1.5 rounded-full border border-border/50">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-muted-foreground">Variable Font</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MessageSquare className="w-4 h-4" />
                        <span>Pretendard JP/CN Support</span>
                    </div>
                </div>
            </DocSubsection>

            <DocSubsection
                title="라이브 타입 테스터"
                description="프리뷰 문장을 직접 입력해 각 토큰의 실제 읽기감을 확인합니다."
            >
                <div className="relative group max-w-3xl">
                    <input
                        type="text"
                        value={previewText}
                        onChange={(e) => setPreviewText(e.target.value)}
                        className="w-full bg-background border border-input hover:border-border rounded-xl px-4 py-3 text-sm focus:ring-4 focus:ring-primary/5 transition-all outline-none pr-12"
                        placeholder="Type to preview styles..."
                    />
                    <Type className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/30 group-focus-within:text-primary transition-colors" />
                </div>
            </DocSubsection>

            <div className="doc-content-stack">
                {displayData.map(({ category, styles }) => (
                    <DocSubsection
                        key={category}
                        title={category}
                        description={getCategoryDescription(category)}
                        className="scroll-mt-32"
                    >
                        <div className="overflow-x-auto rounded-xl">
                            <Table>
                                <TableHeader className="bg-transparent hover:bg-transparent">
                                    <TableRow className="border-none hover:bg-transparent">
                                        <TableHead className="w-[50%] h-12 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">Example</TableHead>
                                        <TableHead className="w-[20%] h-12 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">Token Name</TableHead>
                                        <TableHead className="w-[30%] h-12 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50 text-right">스펙 및 용도</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {styles.map((style) => {
                                        const weight = getWeight(style.weight);
                                        const usage = getUsage(style.style_name);

                                        return (
                                            <TableRow
                                                key={style.style_name}
                                                onClick={() => copyToClipboard(style.style_name)}
                                                className="group cursor-pointer hover:bg-secondary/20 transition-all duration-200 border-b border-border/30 last:border-none"
                                            >
                                                {/* Visual Preview Cell */}
                                                <TableCell className="py-6 align-top">
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
                                                    </div>
                                                </TableCell>

                                                {/* Token Name Cell */}
                                                <TableCell className="align-top py-6">
                                                    <div className="flex flex-col gap-2">
                                                        <div className="inline-flex items-center gap-2 text-sm font-mono font-bold text-foreground group-hover:text-primary transition-colors">
                                                            {style.style_name}
                                                            <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                        </div>
                                                    </div>
                                                </TableCell>

                                                {/* Specifications Cell */}
                                                <TableCell className="align-top py-6 text-right">
                                                    <div className="flex flex-col items-end gap-2 max-w-[240px] ml-auto">
                                                        <div className="flex flex-col items-end gap-1">
                                                            <span className="text-[11px] text-muted-foreground leading-tight">{usage.ko}</span>
                                                        </div>
                                                        <div className="flex items-center justify-end gap-2 font-mono text-[9px] font-bold">
                                                            <span className="bg-secondary/50 text-secondary-foreground px-2 py-0.5 rounded ring-1 ring-inset ring-border/20">{style.size}px</span>
                                                            <span className="bg-secondary/50 text-secondary-foreground px-2 py-0.5 rounded ring-1 ring-inset ring-border/20">{style.line_height}lh</span>
                                                            <span className="bg-secondary/50 text-secondary-foreground px-2 py-0.5 rounded ring-1 ring-inset ring-border/20">{weight.label}</span>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </div>
                    </DocSubsection>
                ))}
            </div>

            <DocSubsection
                title="타이포그래피 설계 원칙"
                description="모든 서체 스타일은 미학적 완성도와 기능적 명확성을 동시에 만족하도록 설계합니다."
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                        { title: 'Readability First', desc: '정보 전달의 명확성을 위해 최적의 여백과 대비를 제공하여 사용자의 피로도를 낮춥니다.' },
                        { title: 'Visual Hierarchy', desc: '일관된 서체 두께와 크기 체계를 활용하여 사용자의 시선을 효과적으로 유도합니다.' },
                        { title: 'Accessibility', desc: '모든 사용자가 정보를 쉽고 정확하게 인지할 수 있도록 엄격한 타이포그래피 규칙을 준수합니다.' }
                    ].map((principle) => (
                        <div key={principle.title} className="flex flex-col gap-2 rounded-xl border bg-card p-4">
                            <h3 className="text-base font-bold">{principle.title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">{principle.desc}</p>
                        </div>
                    ))}
                </div>
            </DocSubsection>
        </div>
    );
};

export default TypographyNewDisplay;
