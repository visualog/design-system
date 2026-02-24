import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ColorPaletteDisplay from './ColorPaletteDisplay';
import ThemeColorMappingDisplay from './ThemeColorMappingDisplay';
import SemanticColorMappingDisplay from './SemanticColorMappingDisplay';
import SemanticGroupingDisplay from './SemanticGroupingDisplay';
import ColorUsage from './ColorUsage';
import { FoundationPageLayout, FoundationPageTabs } from './FoundationPageLayout';
import { PrinciplesSection, type PrincipleItem } from './ui/PrinciplesSection';
import { TokenAnatomy } from './ui/TokenAnatomy';
import { DoDont, DoDontContainer } from './ui/DoDont';
import { DocSection } from './ui/DocLayout';
import { Eye, Type, Palette } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ColorsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const tabFromUrl = searchParams.get('tab');
  const [viewMode, setViewMode] = useState<'legacy' | 'new'>('new');


  /* New Page Data */
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

  /* Legacy Tabs */
  const legacyTabs = [
    {
      value: 'scale',
      label: '스케일',
      content: (
        <div className="mt-6">
          <ColorPaletteDisplay view="grid" />
        </div>
      )
    },
    {
      value: 'raw',
      label: '원시 컬러',
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
      content: <SemanticColorMappingDisplay />
    },
    {
      value: 'usage',
      label: '사용 가이드',
      content: (
        <div className="mt-6">
          <ColorUsage />
        </div>
      )
    }
  ];

  /* New Tabs */
  const newTabs = [
    {
      value: 'overview',
      label: '개요',
      content: (
        <div className="doc-content-stack mt-6">
          <DocSection
            title="컬러 원칙"
            description="접근성, 의미론, 확장성을 기준으로 컬러 시스템의 핵심 원칙을 정의합니다."
          >
            <PrinciplesSection items={colorPrinciples} />
          </DocSection>

          <DocSection
            title="컬러 스케일"
            description="원시 컬러 스케일을 통해 토큰 전개 범위를 확인합니다."
          >
            <ColorPaletteDisplay view="grid" />
          </DocSection>

          <DocSection
            title="토큰 네이밍 규칙"
            description="토큰은 속성(Property)-역할(Role)-변형(Variant)-상태(State) 규칙으로 작성합니다."
          >
            <TokenAnatomy showHeading={false} />
          </DocSection>

          <DocSection
            title="사용 가이드"
            description="시맨틱 토큰을 사용해 테마 전환과 확장에 대응합니다."
            contentClassName="doc-content-stack-tight"
          >

            <div className="doc-content-stack-tight">
              <DoDontContainer>
                <DoDont
                  type="do"
                  title="의미론적 이름 사용하기"
                  description="색상의 시각적 이름(Blue, Red) 대신 역할(Primary, Error)을 나타내는 시맨틱 토큰을 사용하세요."
                >
                  <div className="flex items-center gap-4 p-4 bg-white dark:bg-zinc-900 rounded-lg border shadow-sm">
                    <div className="flex flex-col gap-1">
                      <div className="text-xs text-muted-foreground font-mono">bg-primary</div>
                      <div className="h-10 w-24 bg-primary rounded-md"></div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="text-xs text-muted-foreground font-mono">text-destructive</div>
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
          </DocSection>
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
      title="Colors"
      description="컬러 시스템은 접근성과 일관성을 기준으로 색상 역할을 정의합니다. 컬러 원칙, 스케일, 네이밍 규칙, 사용 가이드를 순서대로 확인합니다."
      actions={
        <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as 'legacy' | 'new')} className="w-auto">
          <TabsList>
            <TabsTrigger value="new">New System</TabsTrigger>
            <TabsTrigger value="legacy">Legacy</TabsTrigger>
          </TabsList>
        </Tabs>
      }
    >
      <FoundationPageTabs
        key={viewMode}
        items={viewMode === 'new' ? newTabs : legacyTabs}
        defaultValue={tabFromUrl || (viewMode === 'new' ? 'overview' : 'scale')}
      />
    </FoundationPageLayout>
  );
};

export default ColorsPage;
