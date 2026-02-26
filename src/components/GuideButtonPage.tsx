import React from 'react';
import { Loader2, Plus } from 'lucide-react';
import { FoundationPageLayout } from './FoundationPageLayout';
import { DocSection } from './ui/DocLayout';
import { DoDont, DoDontContainer } from './ui/DoDont';
import { Button as DsButton } from './ui/button';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { getComponentMeta } from '@/data/componentRegistry';

const buttonMeta = getComponentMeta('button');
const guideButtonThemeVars: React.CSSProperties = {
    // DS Brand scale (Blue): primary=Blue/60, secondary=Blue/10, secondary text=Blue/70
    ['--primary' as string]: '215 92% 58%',
    ['--primary-foreground' as string]: '0 0% 98%',
    ['--secondary' as string]: '211 100% 95%',
    ['--secondary-foreground' as string]: '217 78% 48%',
    ['--ring' as string]: '215 92% 58%',
    // Tailwind theme utilities read these variables directly.
    ['--color-primary' as string]: 'hsl(215 92% 58%)',
    ['--color-primary-foreground' as string]: 'hsl(0 0% 98%)',
    ['--color-secondary' as string]: 'hsl(211 100% 95%)',
    ['--color-secondary-foreground' as string]: 'hsl(217 78% 48%)',
    ['--color-ring' as string]: 'hsl(215 92% 58%)'
};

const GuideButtonPage: React.FC = () => {
    return (
        <FoundationPageLayout
            title="Button"
            description="버튼은 사용자가 행동을 실행하거나 선택을 확정할 때 사용하는 핵심 컴포넌트입니다. 아래 가이드를 기준으로 변형, 상태, 크기, 사용 원칙을 일관되게 적용하세요."
            actions={
                <Badge variant="since" className="px-2.5 py-1">
                    마지막 업데이트: {buttonMeta?.since || '2026-02-20'}
                </Badge>
            }
        >
            <div style={guideButtonThemeVars}>
            <DocSection
                title="구조 (Anatomy)"
                description="Button은 컨테이너, 레이블, 선택적 아이콘으로 구성됩니다."
            >
                <div className="relative overflow-hidden rounded-xl border border-border/80 bg-muted/30 p-8 md:p-10 min-h-[280px] flex items-center justify-center">
                    <div className="pointer-events-none absolute inset-0 opacity-40 dark:opacity-10 bg-[radial-gradient(hsl(var(--border))_1px,transparent_1px)] [background-size:20px_20px]" />
                    <div className="relative">
                        <DsButton className="gap-2">
                            <Plus className="h-4 w-4" />
                            버튼 라벨
                        </DsButton>

                        <div className="absolute -left-24 -top-10 flex items-center gap-2">
                            <span className="text-[11px] md:text-xs font-mono text-muted-foreground">Container</span>
                            <span className="h-px w-16 bg-primary/60 rotate-[35deg]" />
                        </div>
                        <div className="absolute left-5 -bottom-12 flex flex-col items-center gap-1">
                            <span className="h-8 w-px bg-primary/60" />
                            <span className="text-[11px] md:text-xs font-mono text-muted-foreground">Icon (Optional)</span>
                        </div>
                        <div className="absolute right-4 -top-12 flex flex-col items-center gap-1">
                            <span className="text-[11px] md:text-xs font-mono text-muted-foreground">Label</span>
                            <span className="h-8 w-px bg-primary/60" />
                        </div>
                        <div className="absolute -right-24 top-1/2 -translate-y-1/2 flex items-center gap-2">
                            <span className="h-px w-12 bg-primary/60" />
                            <span className="text-[11px] md:text-xs font-mono text-muted-foreground">Padding</span>
                        </div>
                    </div>
                </div>
            </DocSection>

            <DocSection
                title="변형 및 상태 (Variants & States)"
                description="주요 변형별 기본/비활성/로딩 상태 예시입니다."
            >
                <div className="overflow-hidden rounded-xl border border-border/80">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/40">
                                <TableHead>Variant</TableHead>
                                <TableHead>기본</TableHead>
                                <TableHead>비활성</TableHead>
                                <TableHead>로딩</TableHead>
                                <TableHead>사용 맥락</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-semibold">Primary</TableCell>
                                <TableCell><DsButton>버튼</DsButton></TableCell>
                                <TableCell><DsButton disabled>버튼</DsButton></TableCell>
                                <TableCell>
                                    <DsButton disabled className="gap-2 opacity-80">
                                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                        로딩
                                    </DsButton>
                                </TableCell>
                                <TableCell className="text-muted-foreground">페이지 내 최우선 액션</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-semibold">Secondary</TableCell>
                                <TableCell><DsButton variant="secondary">버튼</DsButton></TableCell>
                                <TableCell><DsButton variant="secondary" disabled>버튼</DsButton></TableCell>
                                <TableCell>
                                    <DsButton variant="secondary" disabled className="gap-2 opacity-80">
                                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                        로딩
                                    </DsButton>
                                </TableCell>
                                <TableCell className="text-muted-foreground">보조 액션</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-semibold">Outline</TableCell>
                                <TableCell><DsButton variant="outline">버튼</DsButton></TableCell>
                                <TableCell><DsButton variant="outline" disabled>버튼</DsButton></TableCell>
                                <TableCell>
                                    <DsButton variant="outline" disabled className="gap-2 opacity-80">
                                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                        로딩
                                    </DsButton>
                                </TableCell>
                                <TableCell className="text-muted-foreground">중립 선택 또는 도구성 액션</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-semibold">Ghost</TableCell>
                                <TableCell><DsButton variant="ghost">버튼</DsButton></TableCell>
                                <TableCell><DsButton variant="ghost" disabled>버튼</DsButton></TableCell>
                                <TableCell>
                                    <DsButton variant="ghost" disabled className="gap-2 opacity-80">
                                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                        로딩
                                    </DsButton>
                                </TableCell>
                                <TableCell className="text-muted-foreground">저강도 보조 액션</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-semibold">Destructive</TableCell>
                                <TableCell><DsButton variant="destructive">삭제</DsButton></TableCell>
                                <TableCell><DsButton variant="destructive" disabled>삭제</DsButton></TableCell>
                                <TableCell>
                                    <DsButton variant="destructive" disabled className="gap-2 opacity-80">
                                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                        로딩
                                    </DsButton>
                                </TableCell>
                                <TableCell className="text-muted-foreground">삭제/해제 등 위험 액션</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </DocSection>

            <DocSection
                title="크기 (Sizing)"
                description="기본적으로 `default`를 사용하고, 밀도나 강조 맥락에 따라 `sm`, `lg`를 선택합니다."
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                    <div className="rounded-xl border border-border/80 bg-card p-6 flex flex-col items-center gap-4">
                        <DsButton size="sm">Button</DsButton>
                        <div className="w-full border-t border-border/70 pt-3 text-center flex flex-col gap-1">
                            <h3 className="text-doc-subsection-title">Small</h3>
                            <p className="text-doc-caption text-muted-foreground font-mono">size="sm"</p>
                        </div>
                    </div>
                    <div className="rounded-xl border border-border/80 bg-card p-6 flex flex-col items-center gap-4">
                        <DsButton>Button</DsButton>
                        <div className="w-full border-t border-border/70 pt-3 text-center flex flex-col gap-1">
                            <h3 className="text-doc-subsection-title">Default</h3>
                            <p className="text-doc-caption text-muted-foreground font-mono">size="default"</p>
                        </div>
                    </div>
                    <div className="rounded-xl border border-border/80 bg-card p-6 flex flex-col items-center gap-4">
                        <DsButton size="lg">Button</DsButton>
                        <div className="w-full border-t border-border/70 pt-3 text-center flex flex-col gap-1">
                            <h3 className="text-doc-subsection-title">Large</h3>
                            <p className="text-doc-caption text-muted-foreground font-mono">size="lg"</p>
                        </div>
                    </div>
                </div>
            </DocSection>

            <DocSection
                title="사용 가이드 (Usage Guidelines)"
                description="주요 액션 위계와 시각적 우선순위를 분명하게 유지하세요."
            >
                <DoDontContainer className="gap-4 md:gap-6">
                    <DoDont
                        type="do"
                        title="주요 액션 위계 유지"
                        description="한 영역에서는 Primary 버튼을 1개만 두고, 보조 액션은 Secondary 또는 Ghost로 구분합니다."
                    >
                        <div className="flex items-center gap-3">
                            <DsButton>저장</DsButton>
                            <DsButton variant="ghost">취소</DsButton>
                        </div>
                    </DoDont>
                    <DoDont
                        type="dont"
                        title="동일 강도 액션 중복 지양"
                        description="한 화면에서 Primary 버튼을 여러 개 배치하면 우선순위가 흐려집니다."
                    >
                        <div className="flex items-center gap-3">
                            <DsButton>저장</DsButton>
                            <DsButton>취소</DsButton>
                        </div>
                    </DoDont>
                </DoDontContainer>
            </DocSection>

            <DocSection
                title="기술 사양 (Technical Specs)"
                description="Button 컴포넌트가 지원하는 핵심 props입니다."
            >
                <div className="overflow-hidden rounded-xl border border-border/80">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/40">
                                <TableHead>Prop</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Default</TableHead>
                                <TableHead>Description</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {(buttonMeta?.props || []).map((prop) => (
                                <TableRow key={prop.name}>
                                    <TableCell className="font-mono text-primary">{prop.name}</TableCell>
                                    <TableCell className="text-muted-foreground">{prop.type}</TableCell>
                                    <TableCell className="text-muted-foreground">{prop.defaultValue || '-'}</TableCell>
                                    <TableCell className="text-muted-foreground">{prop.description}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </DocSection>
            </div>
        </FoundationPageLayout>
    );
};

export default GuideButtonPage;
