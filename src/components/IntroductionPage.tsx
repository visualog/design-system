import React, { useEffect, useState } from 'react';
import { BookOpen, ChevronDown } from 'lucide-react';
import { FoundationPageLayout } from './FoundationPageLayout';
import { PrinciplesSection, type PrincipleItem } from './ui/PrinciplesSection';
import { DoDont, DoDontContainer } from './ui/DoDont';
import { DocSection } from './ui/DocLayout';

const IntroductionPage: React.FC = () => {
    const [isWcagNoteOpen, setIsWcagNoteOpen] = useState(false);

    useEffect(() => {
        if (window.location.hash === '#wcag-2-1-note') {
            setIsWcagNoteOpen(true);
        }

        const handleHashChange = () => {
            if (window.location.hash === '#wcag-2-1-note') {
                setIsWcagNoteOpen(true);
            }
        };

        window.addEventListener('hashchange', handleHashChange);
        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, []);

    const corePrinciples: PrincipleItem[] = [
        {
            title: 'Clarity (명료함)',
            description: 'UI의 모든 요소는 사용자에게 명확한 의도를 전달해야 합니다. 불필요한 장식을 배제하고 핵심적인 정보와 액션에 집중합니다.'
        },
        {
            title: 'Efficiency (효율성)',
            description: '재사용 가능한 컴포넌트와 표준화된 토큰을 통해 설계 및 개발 프로세스를 가속화하고 휴먼 에러를 최소화합니다.'
        },
        {
            title: 'Consistency (일관성)',
            description: '플랫폼과 제품 전반에 걸쳐 시각적 언어와 인터랙션 모델을 통일하여 사용자에게 예측 가능하고 신뢰할 수 있는 경험을 제공합니다.'
        },
        {
            title: 'Accessibility (접근성)',
            description: (
                <>
                    다양한 신체적 조건과 환경의 사용자를 고려하여 설계합니다.{' '}
                    <a
                        href="#wcag-2-1-note"
                        onClick={() => setIsWcagNoteOpen(true)}
                        className="font-medium text-foreground underline underline-offset-2"
                    >
                        WCAG 2.1
                    </a>{' '}
                    접근성 가이드를 기본으로 준수합니다.
                </>
            )
        }
    ];

    return (
        <FoundationPageLayout
            title="Overview"
            description="디자인 시스템의 철학, 운영 목표, 핵심 원칙을 소개합니다. 디자인 원칙, 시스템 목표, 빠른 시작 가이드를 순서대로 확인합니다."
        >
            {/* Core Principles */}
            <DocSection
                id="design-principles"
                title="디자인 원칙"
                description="우리의 모든 의사결정은 아래의 네 가지 핵심 원칙을 기반으로 이루어집니다."
            >
                <PrinciplesSection items={corePrinciples} variant="list" />
            </DocSection>

            {/* System Goals */}
            <DocSection
                title="시스템 목표"
                description="디자인 시스템이 디자이너와 개발자의 업무 효율과 결과 품질을 어떻게 높이는지 설명합니다."
            >
                <div className="flex flex-col gap-4">
                    <section className="flex flex-col gap-2">
                        <h3 className="text-doc-subsection-title pl-5">디자이너를 위한 목표</h3>
                        <ul className="ml-5 list-disc pl-5 flex flex-col gap-1 text-doc-body text-muted-foreground">
                            <li>반복적인 UI 설계 시간을 줄이고 사용자 경험 개선에 집중합니다.</li>
                            <li>컴포넌트 라이브러리와 가이드를 통해 설계 일관성을 유지합니다.</li>
                            <li>표준 토큰으로 개발자와의 핸드오프 정확도를 높입니다.</li>
                        </ul>
                    </section>

                    <section className="flex flex-col gap-2">
                        <h3 className="text-doc-subsection-title pl-5">개발자를 위한 목표</h3>
                        <ul className="ml-5 list-disc pl-5 flex flex-col gap-1 text-doc-body text-muted-foreground">
                            <li>문서화된 API와 Props로 구현 의사결정 부담을 줄입니다.</li>
                            <li>상태와 접근성이 반영된 컴포넌트를 즉시 재사용합니다.</li>
                            <li>테마 시스템으로 스타일 변경과 확장에 유연하게 대응합니다.</li>
                        </ul>
                    </section>
                </div>
            </DocSection>

            {/* Getting Started Brief */}
            <DocSection
                title="빠른 시작 가이드"
            >
                <DoDontContainer>
                    <DoDont
                        type="do"
                        title="시스템 토큰 사용 생활화"
                        description="모든 크기, 간격, 컬러는 정의된 토큰을 사용하여 일관성을 유지하세요."
                    >
                        <div className="text-xs bg-primary/10 p-2 rounded text-primary border border-primary/20 font-mono">
                            hsl(var(--primary))
                        </div>
                    </DoDont>
                    <DoDont
                        type="dont"
                        title="독자적인 컴포넌트 생성 지양"
                        description="비슷한 기능이 시스템에 이미 존재한다면 가급적 기존 컴포넌트를 확장하여 사용하세요."
                    >
                        <div className="text-xs bg-destructive/10 p-2 rounded text-destructive border border-destructive/20 font-mono line-through">
                            color: '#ff0000'
                        </div>
                    </DoDont>
                </DoDontContainer>
            </DocSection>

            <section id="wcag-2-1-note" className="doc-section mt-8 border-t border-border/40 pt-8">
                <div className="doc-section-content flex flex-col gap-4">
                    <div className="w-full rounded-xl border bg-card overflow-hidden">
                        <button
                            type="button"
                            aria-expanded={isWcagNoteOpen}
                            aria-controls="wcag-2-1-note-content"
                            onClick={() => setIsWcagNoteOpen((prev) => !prev)}
                            className="w-full px-4 py-4 text-left transition-colors hover:bg-muted/40"
                        >
                            <div className="flex items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                                        <BookOpen className="h-5 w-5" />
                                    </span>
                                    <span className="flex flex-col gap-0">
                                        <span className="text-base font-semibold text-foreground">WCAG 2.1 핵심 요약</span>
                                        <span className="text-[12px] leading-4 text-muted-foreground">핵심 원칙, 준수 난이도, AA 체크리스트</span>
                                    </span>
                                </div>
                                <ChevronDown
                                    className={`h-5 w-5 text-muted-foreground transition-transform duration-300 ${
                                        isWcagNoteOpen ? 'rotate-180' : 'rotate-0'
                                    }`}
                                />
                            </div>
                        </button>

                        <div
                            id="wcag-2-1-note-content"
                            aria-hidden={!isWcagNoteOpen}
                            className={`grid bg-muted/40 transition-[grid-template-rows,opacity] duration-300 ease-out ${
                                isWcagNoteOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                            }`}
                        >
                            <div className="overflow-hidden">
                                <div className="px-4 pb-5 pt-3">
                                    <div className="pl-[52px] flex flex-col gap-4">
                                    <section className="flex flex-col gap-2">
                                        <h3 className="text-[12px] leading-4 font-semibold text-foreground">핵심 원칙 (POUR)</h3>
                                        <ul className="list-disc pl-5 flex flex-col gap-1 text-[12px] leading-4 text-muted-foreground">
                                            <li><span className="font-medium text-foreground">Perceivable (인지 가능)</span>: 콘텐츠를 인식할 수 있어야 합니다.</li>
                                            <li><span className="font-medium text-foreground">Operable (운용 가능)</span>: 키보드 포함 다양한 방식으로 조작할 수 있어야 합니다.</li>
                                            <li><span className="font-medium text-foreground">Understandable (이해 가능)</span>: 정보와 인터랙션이 명확하고 예측 가능해야 합니다.</li>
                                            <li><span className="font-medium text-foreground">Robust (견고성)</span>: 다양한 브라우저·보조기기에서 안정적으로 해석되어야 합니다.</li>
                                        </ul>
                                    </section>

                                    <section className="flex flex-col gap-2">
                                        <h3 className="text-[12px] leading-4 font-semibold text-foreground">준수 난이도</h3>
                                        <ul className="list-disc pl-5 flex flex-col gap-1 text-[12px] leading-4 text-muted-foreground">
                                            <li><span className="font-medium text-foreground">A</span>: 최소 기준</li>
                                            <li><span className="font-medium text-foreground">AA</span>: 실무 표준 목표</li>
                                            <li><span className="font-medium text-foreground">AAA</span>: 최고 기준(전면 적용은 난이도 높음)</li>
                                        </ul>
                                    </section>

                                    <section className="flex flex-col gap-2">
                                        <h3 className="text-[12px] leading-4 font-semibold text-foreground">AA 체크리스트</h3>
                                        <ul className="list-disc pl-5 flex flex-col gap-1 text-[12px] leading-4 text-muted-foreground">
                                            <li>텍스트 대비: 일반 텍스트 4.5:1 이상, 큰 텍스트 3:1 이상</li>
                                            <li>키보드 조작 가능 및 포커스 표시 유지</li>
                                            <li>폼 라벨/오류 메시지/수정 방법 텍스트 제공</li>
                                            <li>의미 있는 이미지에는 대체 텍스트 제공</li>
                                            <li>시맨틱 마크업(제목, 목록, 버튼, 링크) 사용</li>
                                            <li>200% 확대 및 작은 화면에서도 정보 손실 없이 사용 가능</li>
                                        </ul>
                                    </section>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </FoundationPageLayout>
    );
};

export default IntroductionPage;
