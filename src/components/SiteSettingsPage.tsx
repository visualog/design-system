import React from 'react';
import { Settings, Palette, Layout, Type, Box } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';

const SiteSettingsPage = () => {
    return (
        <div className="flex flex-col gap-8 pb-20">
            <div>
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                    <Settings className="w-8 h-8" />
                    사이트 설정 (Site Settings)
                </h1>
                <p className="text-lg text-muted-foreground mt-2">
                    디자인 시스템 사이트의 환경 설정 및 UI 컴포넌트를 관리합니다.
                </p>
            </div>

            <Separator />

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Value Component for Theme Settings */}
                <SettingCard
                    icon={<Palette className="w-6 h-6" />}
                    title="테마 관리 (Theme Management)"
                    description="글로벌 색상, 폰트, 라디우스 등 사이트의 전반적인 테마를 설정합니다."
                    href="/site-settings/theme"
                />

                {/* Placeholder Component for Layout Settings */}
                <SettingCard
                    icon={<Layout className="w-6 h-6" />}
                    title="레이아웃 설정 (Layout Config)"
                    description="사이드바 너비, 내비게이션 구조 등 페이지 레이아웃을 조정합니다."
                    href="/site-settings/layout"
                />


                {/* Typography Settings */}
                <SettingCard
                    icon={<Type className="w-6 h-6" />}
                    title="타이포그래피 (Typography)"
                    description="폰트 패밀리, 기본 크기, 줄 높이, 굵기 등을 관리합니다."
                    href="/site-settings/typography"
                />

                {/* Placeholder Component for Components Settings */}
                <SettingCard
                    icon={<Box className="w-6 h-6" />}
                    title="컴포넌트 (Components)"
                    description="UI 컴포넌트의 스타일 프리셋과 상세 명세를 설정합니다."
                    href="/site-settings/components"
                />
            </div>
        </div>
    );
};

interface SettingCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    status?: string;
    href?: string;
}

const SettingCard = ({ icon, title, description, status, href }: SettingCardProps) => {
    const CardContent = (
        <div className={`rounded-xl border bg-card text-card-foreground p-6 flex flex-col gap-4 relative overflow-hidden transition-colors ${href ? 'hover:bg-accent/5' : ''}`}>
            <div className="flex items-center gap-4">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    {icon}
                </div>
                <h3 className="font-semibold text-lg">{title}</h3>
            </div>
            <p className="text-sm text-muted-foreground">
                {description}
            </p>
            {status && (
                <div className="mt-auto pt-4 flex justify-end">
                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                        {status}
                    </span>
                </div>
            )}
        </div>
    );

    if (href) {
        return <Link to={href} className="block group">{CardContent}</Link>;
    }

    return CardContent;
};

export default SiteSettingsPage;
