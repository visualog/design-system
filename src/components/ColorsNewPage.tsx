import React from 'react';
import { useSearchParams } from 'react-router-dom';
import ColorPaletteDisplay from './ColorPaletteDisplay';
import ThemeColorMappingDisplay from './ThemeColorMappingDisplay';
import SemanticGroupingDisplay from './SemanticGroupingDisplay';
import ColorUsage from './ColorUsage';
import { FoundationPageLayout, FoundationPageTabs } from './FoundationPageLayout';
import { PrinciplesSection, type PrincipleItem } from './ui/PrinciplesSection';
import { Eye, Type, Palette } from 'lucide-react';
import { TokenAnatomy } from './ui/TokenAnatomy';
import { DoDont, DoDontContainer } from './ui/DoDont';

const ColorsNewPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const tabFromUrl = searchParams.get('tab');

    const colorPrinciples: PrincipleItem[] = [
        {
            icon: Eye,
            title: '접근성 우선 (Accessibility First)',
            description: '모든 텍스트와 배경 색상은 WCAG 2.1 AA/AAA 기준을 준수하여, 저시력자를 포함한 모든 사용자에게 최적의 가독성을 보장합니다.'
        },
        {
            icon: Type,
            title: '의미론적 명명 (Semantic Naming)',
            description: 'Blue-500과 같은 물리적 색상명이 아닌, Brand-Primary, Status-Error와 같이 UI 내에서의 역할과 의도를 명확히 전달하는 이름을 사용합니다.'
        },
        {
            icon: Palette,
            title: '시스템 자동화 (Systematic Theme)',
            description: '라이트 모드와 다크 모드, 그리고 다양한 브랜드 테마에 유연하게 대응할 수 있도록 토큰 기반의 자동화된 컬러 매핑을 제공합니다.'
        }
    ];

    // Unified tab structure: Overview includes Scale and Usage
    const tabs = [
        {
            value: 'overview',
            label: '개요',
            content: (
                <div className="flex flex-col gap-10 mt-6">
                    <PrinciplesSection items={colorPrinciples} />

                    <section>
                        <h3 className="text-heading-md font-bold mb-4">Color Scale</h3>
                        <ColorPaletteDisplay view="grid" />
                    </section>


                    <TokenAnatomy />

                    <section>
                        <h3 className="text-heading-md font-bold mb-6">Usage Guide</h3>

                        <div className="flex flex-col gap-8">
                            <DoDontContainer>
                                <DoDont
                                    type="do"
                                    title="의미론적 이름 사용하기"
                                    description="색상의 시각적 이름(Blue, Red) 대신 역할(Primary, Error)을 나타내는 Semantic Token을 사용하세요."
                                >
                                    <div className="flex items-center gap-4 p-4 bg-white dark:bg-zinc-900 rounded-lg border shadow-sm">
                                        <div className="flex flex-col gap-1">
                                            <div className="text-xs text-muted-foreground font-mono">bg-primary</div>
                                            <div className="h-10 w-24 bg-primary rounded-md"></div>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <div className="text-xs text-muted-foreground font-mono">text-error</div>
                                            <div className="text-destructive font-bold">Error Message</div>
                                        </div>
                                    </div>
                                </DoDont>
                                <DoDont
                                    type="dont"
                                    title="하드코딩된 값 사용하지 않기"
                                    description="Hex 코드나 원시 색상(Raw Color)을 직접 사용하면 테마 변경 시 대응할 수 없습니다."
                                >
                                    <div className="flex items-center gap-4 p-4 bg-white dark:bg-zinc-900 rounded-lg border shadow-sm">
                                        <div className="flex flex-col gap-1">
                                            <div className="text-xs text-muted-foreground font-mono line-through">#3B82F6</div>
                                            <div className="h-10 w-24 bg-[#3B82F6] rounded-md"></div>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <div className="text-xs text-muted-foreground font-mono line-through">text-red-500</div>
                                            <div className="text-red-500 font-bold">Error Message</div>
                                        </div>
                                    </div>
                                </DoDont>
                            </DoDontContainer>

                            <ColorUsage />
                        </div>
                    </section>
                </div>
            )
        },
        {
            value: 'raw',
            label: '전체 목록',
            content: <ColorPaletteDisplay view="table" />
        },
        {
            value: 'theme',
            label: '테마 컬러',
            content: <ThemeColorMappingDisplay />
        },
        {
            value: 'semantic',
            label: '시맨틱 컬러',
            content: <SemanticGroupingDisplay />
        }
    ];

    return (
        <FoundationPageLayout
            title="Colors (New)"
            description="개선된 컬러 시스템 문서입니다. 접근성과 일관성을 고려하여 설계된 전체 컬러 팔레트와 테마/시맨틱 컬러를 한눈에 확인할 수 있습니다."
        >
            <FoundationPageTabs
                items={tabs}
                defaultValue={tabFromUrl || 'overview'}
            />
        </FoundationPageLayout>
    );
};

export default ColorsNewPage;
