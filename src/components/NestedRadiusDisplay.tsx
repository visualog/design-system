import React, { useState } from 'react';
import { designSystemData } from '../utils/dataLoader';

const { radius, spacing } = designSystemData;

const NestedRadiusDisplay: React.FC = () => {
    const [outerRadius, setOuterRadius] = useState(32);

    // Closest value logic for better slider UX (optional, but input range handles steps well if we strict them)
    // Actually for UX, better to map slider index to array index to ensure every step is a valid value.
    // Use spacing.spacing_values directly
    const spacingValues = spacing.spacing_values
        .filter((s: any) => s.px <= 64) // Limit to reasonable padding for demo
        .map((s: any) => s.px);

    const [paddingIndex, setPaddingIndex] = useState(spacingValues.findIndex((v: number) => v === 24));

    const radiusTokens = radius.radius_tokens
        .filter((t: any) => t.token !== 'rounded_full' && t.token !== 'rounded_none')
        .map((t: any) => ({
            name: t.token.replace('rounded_', ''),
            value: parseInt(t.value)
        }));

    // Update padding state when index changes
    const currentPadding = spacingValues[paddingIndex];

    const innerRadius = Math.max(0, outerRadius - currentPadding);

    return (
        <section className="flex flex-col gap-6 font-pretendard">
            <div className="flex flex-col gap-2">
                <h2 className="text-xl font-bold">중첩 라디우스</h2>
                <div className="flex items-start gap-3 p-4 bg-primary/5 rounded-xl border border-primary/10">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mt-0.5">
                        <circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" />
                    </svg>
                    <p className="text-body-sm text-foreground/80 leading-relaxed">
                        두 개의 라운드 박스가 중첩될 때, 내부 박스의 라디우스는 <span className="font-bold text-primary">외부 라디우스에서 사이여백(Padding)을 뺀 값</span>으로 설정해야 시각적으로 자연스럽습니다.
                    </p>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Controls */}
                <div className="flex flex-col gap-10 w-full md:w-1/3 p-6 rounded-2xl border border-border bg-card shadow-sm">
                    {/* Outer Radius Selection */}
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-bold text-foreground">Outer Radius</label>
                            <p className="text-[11px] text-muted-foreground">외부 요소의 둥글기를 선택합니다.</p>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            {radiusTokens.map((t: any) => {
                                const isActive = outerRadius === t.value;
                                return (
                                    <button
                                        key={t.name}
                                        onClick={() => setOuterRadius(t.value)}
                                        className={`flex flex-col items-center justify-center py-2.5 px-3 rounded-xl border-2 transition-all outline-none ${isActive ? 'border-transparent bg-muted text-primary' : 'border-muted hover:bg-muted/50 text-muted-foreground'}`}
                                    >
                                        <span className={`text-[10px] font-bold uppercase tracking-wider mb-0.5 ${isActive ? 'text-primary' : 'text-muted-foreground/60'}`}>
                                            {t.name}
                                        </span>
                                        <span className="text-sm font-bold font-mono">
                                            {t.value}px
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Padding Selection */}
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-bold text-foreground">Padding (Gap)</label>
                            <p className="text-[11px] text-muted-foreground">내외부 요소 사이의 간격을 선택합니다.</p>
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                            {[0, 4, 8, 12, 16, 24, 32, 48].map((v) => {
                                const isActive = currentPadding === v;
                                return (
                                    <button
                                        key={v}
                                        onClick={() => {
                                            const idx = spacingValues.indexOf(v);
                                            if (idx !== -1) setPaddingIndex(idx);
                                        }}
                                        className={`flex flex-col items-center justify-center py-2 rounded-lg border-2 transition-all outline-none ${isActive ? 'border-transparent bg-muted text-primary' : 'border-muted hover:bg-muted/50 text-muted-foreground'}`}
                                    >
                                        <span className="text-xs font-bold font-mono">
                                            {v}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Result Info */}
                    <div className="mt-2 pt-6 border-t border-border flex flex-col gap-3">
                        <div className="flex justify-between items-center bg-primary/5 p-4 rounded-xl border border-primary/10">
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-primary uppercase tracking-wider">Inner Radius</span>
                                <span className="text-base font-bold font-mono text-foreground leading-none mt-1">
                                    {outerRadius} - {currentPadding} = {innerRadius}px
                                </span>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <div className="w-4 h-4 border-2 border-primary rounded-sm opacity-60" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Visualization */}
                <div className="flex-1 min-h-[300px] bg-secondary/50 rounded-xl border border-border flex items-center justify-center p-8 overflow-hidden">
                    <div
                        className="bg-[#C1E1C1] dark:bg-[#43a047] transition-all duration-300 ease-out flex items-center justify-center relative text-primary-foreground"
                        style={{
                            width: '240px',
                            height: '240px',
                            borderRadius: `${outerRadius}px`,
                            padding: `${currentPadding}px`
                        }}
                    >
                        <span className="absolute top-2 left-1/2 -translate-x-1/2 text-[10px] text-green-900 dark:text-green-50 font-mono font-bold">Outer: {outerRadius}px</span>

                        <div
                            className="w-full h-full bg-background shadow-sm transition-all duration-300 ease-out flex items-center justify-center relative border border-border/10"
                            style={{
                                borderRadius: `${innerRadius}px`
                            }}
                        >
                            <span className="text-xs font-medium text-muted-foreground font-mono">Inner: {innerRadius}px</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NestedRadiusDisplay;
