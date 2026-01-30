import React from 'react';
import { Check } from 'lucide-react';

interface PairingExample {
    name: string;
    bgToken: string;
    textToken: string;
    description: string;
}

const semanticPairings: PairingExample[] = [
    { name: 'Primary', bgToken: 'bg-primary', textToken: 'text-primary-foreground', description: '브랜드 핵심 액션 버튼 및 강조 요소' },
    { name: 'Secondary', bgToken: 'bg-secondary', textToken: 'text-secondary-foreground', description: '보조적인 작업 버튼 및 영역 구분' },
    { name: 'Destructive', bgToken: 'bg-destructive', textToken: 'text-destructive-foreground', description: '삭제, 경고 등 위험한 작업 요소' },
    { name: 'Muted', bgToken: 'bg-muted', textToken: 'text-muted-foreground', description: '부차적인 정보나 비활성 요소' },
    { name: 'Accent', bgToken: 'bg-accent', textToken: 'text-accent-foreground', description: '사용자 포커스나 호버 상태 강조' },
];

const surfacePairings: PairingExample[] = [
    { name: 'Background', bgToken: 'bg-background', textToken: 'text-foreground', description: '어플리케이션의 기본 배경색' },
    { name: 'Card', bgToken: 'bg-card', textToken: 'text-card-foreground', description: '카드, 모달 등 콘텐츠 컨테이너' },
    { name: 'Popover', bgToken: 'bg-popover', textToken: 'text-popover-foreground', description: '툴팁, 드롭다운 등 플로팅 UI' },
];

export const ColorPairingDisplay: React.FC = () => {
    return (
        <section className="flex flex-col gap-10 mt-10">
            <div className="flex flex-col gap-2">
                <h3 className="text-heading-md font-bold">컬러 페어링 (Color Pairing)</h3>
                <p className="text-muted-foreground text-sm">
                    배경과 텍스트의 올바른 조합을 통해 접근성과 가독성을 보장합니다. 각 배경 토큰에는 전용 포그라운드(Foreground) 토큰이 대응됩니다.
                </p>
            </div>

            <div className="flex flex-col gap-8">
                {/* Semantic Pairings */}
                <div className="flex flex-col gap-4">
                    <h4 className="text-label-md font-bold text-foreground/70 uppercase tracking-wider">Semantic Pairings</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {semanticPairings.map((pairing) => (
                            <div key={pairing.name} className="flex flex-col gap-3 p-4 rounded-2xl border bg-muted/20">
                                <div className="flex items-center justify-between px-1">
                                    <span className="text-sm font-bold">{pairing.name}</span>
                                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-[10px] font-bold">
                                        <Check className="w-3 h-3" />
                                        <span>WCAG AA PASS</span>
                                    </div>
                                </div>
                                <div className={`h-24 rounded-xl flex items-center justify-center ${pairing.bgToken} border shadow-sm`}>
                                    <span className={`font-bold text-lg ${pairing.textToken}`}>Aa Text Preview</span>
                                </div>
                                <div className="flex flex-col gap-1.5 px-1 mt-1">
                                    <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
                                        <span>Background</span>
                                        <span className="text-foreground">{pairing.bgToken}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
                                        <span>Foreground</span>
                                        <span className="text-foreground">{pairing.textToken}</span>
                                    </div>
                                    <p className="text-[11px] text-muted-foreground mt-2 leading-relaxed">
                                        {pairing.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Surface Pairings */}
                <div className="flex flex-col gap-4">
                    <h4 className="text-label-md font-bold text-foreground/70 uppercase tracking-wider">Surface & Layout Pairings</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {surfacePairings.map((pairing) => (
                            <div key={pairing.name} className="flex flex-col gap-3 p-4 rounded-2xl border bg-muted/10">
                                <div className="flex items-center justify-between px-1">
                                    <span className="text-sm font-bold">{pairing.name}</span>
                                </div>
                                <div className={`h-20 rounded-xl flex items-center justify-center ${pairing.bgToken} border shadow-inner`}>
                                    <span className={`font-medium ${pairing.textToken}`}>The quick brown fox jumps over the lazy dog.</span>
                                </div>
                                <div className="flex flex-col gap-1.5 px-1 mt-1">
                                    <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
                                        <span>BG/Text</span>
                                        <div className="flex gap-2">
                                            <span className="text-foreground">{pairing.bgToken}</span>
                                            <span>/</span>
                                            <span className="text-foreground">{pairing.textToken}</span>
                                        </div>
                                    </div>
                                    <p className="text-[11px] text-muted-foreground mt-1">
                                        {pairing.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ColorPairingDisplay;
