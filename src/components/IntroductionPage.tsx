import React from 'react';
import { FoundationPageLayout } from './FoundationPageLayout';
import { PrinciplesSection, type PrincipleItem } from './ui/PrinciplesSection';
import { Sparkles, Zap, Layout, Accessibility } from 'lucide-react';
import { DoDont, DoDontContainer } from './ui/DoDont';
import { PageSection } from '@/components/ui/PageSection';

const IntroductionPage: React.FC = () => {
    const corePrinciples: PrincipleItem[] = [
        {
            icon: Sparkles,
            title: 'Clarity (명료함)',
            description: 'UI의 모든 요소는 사용자에게 명확한 의도를 전달해야 합니다. 불필요한 장식을 배제하고 핵심적인 정보와 액션에 집중합니다.'
        },
        {
            icon: Zap,
            title: 'Efficiency (효율성)',
            description: '재사용 가능한 컴포넌트와 표준화된 토큰을 통해 설계 및 개발 프로세스를 가속화하고 휴먼 에러를 최소화합니다.'
        },
        {
            icon: Layout,
            title: 'Consistency (일관성)',
            description: '플랫폼과 제품 전반에 걸쳐 시각적 언어와 인터랙션 모델을 통일하여 사용자에게 예측 가능하고 신뢰할 수 있는 경험을 제공합니다.'
        },
        {
            icon: Accessibility,
            title: 'Inclusivity (포용성)',
            description: '다양한 신체적 조건과 환경의 사용자를 고려하여 설계합니다. WCAG 2.1 접근성 가이드를 기본으로 준수합니다.'
        }
    ];

    return (
        <FoundationPageLayout
            title="Overview"
            description="디자인 시스템의 철학, 운영 목표, 핵심 원칙을 소개합니다. 디자인 원칙, 시스템 목표, 빠른 시작 가이드를 순서대로 확인합니다."
        >
            {/* Core Principles */}
            <PageSection
                title="디자인 원칙"
                description="우리의 모든 의사결정은 아래의 네 가지 핵심 원칙을 기반으로 이루어집니다."
            >
                <PrinciplesSection items={corePrinciples} className="md:grid-cols-1" />
            </PageSection>

            {/* System Goals */}
            <PageSection
                title="시스템 목표"
                description="디자인 시스템이 디자이너와 개발자의 업무 효율과 결과 품질을 어떻게 높이는지 설명합니다."
            >
                <div className="doc-content-stack-tight">
                    <section className="doc-subsection border-b pb-6">
                        <h3 className="text-doc-subsection-title">디자이너를 위한 목표</h3>
                        <ul className="flex flex-col gap-3 text-muted-foreground text-sm">
                            <li>반복적인 UI 설계 시간을 줄이고 사용자 경험 개선에 집중합니다.</li>
                            <li>컴포넌트 라이브러리와 가이드를 통해 설계 일관성을 유지합니다.</li>
                            <li>표준 토큰으로 개발자와의 핸드오프 정확도를 높입니다.</li>
                        </ul>
                    </section>

                    <section className="doc-subsection">
                        <h3 className="text-doc-subsection-title">개발자를 위한 목표</h3>
                        <ul className="flex flex-col gap-3 text-muted-foreground text-sm">
                            <li>문서화된 API와 Props로 구현 의사결정 부담을 줄입니다.</li>
                            <li>상태와 접근성이 반영된 컴포넌트를 즉시 재사용합니다.</li>
                            <li>테마 시스템으로 스타일 변경과 확장에 유연하게 대응합니다.</li>
                        </ul>
                    </section>
                </div>
            </PageSection>

            {/* Getting Started Brief */}
            <PageSection
                title="빠른 시작 가이드"
                className="mb-10"
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
            </PageSection>
        </FoundationPageLayout>
    );
};

export default IntroductionPage;
