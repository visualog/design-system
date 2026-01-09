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

    const currentToken = radiusTokens.find((t: any) => t.value === outerRadius);

    // Update padding state when index changes
    const currentPadding = spacingValues[paddingIndex];

    // Sync padding state for calculation (local variable used in render)
    // Refactor: use currentPadding directly instead of 'padding' state which might be redundant or desynced

    const innerRadius = Math.max(0, outerRadius - currentPadding);

    return (
        <section className="flex flex-col gap-6 font-pretendard">
            <div className="flex flex-col gap-2">
                <h2 className="text-xl font-bold">중첩 라디우스</h2>
                <p className="text-sm text-muted-foreground">
                    두 개의 라운드 박스가 중첩될 때, 내부 박스의 라디우스는 외부 라디우스에서 사이여백(Padding)을 뺀 값으로 설정해야 시각적으로 자연스럽습니다.
                </p>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Controls */}
                <div className="flex flex-col gap-6 w-full md:w-1/3 bg-secondary/30 p-6 rounded-xl border border-border">
                    <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-center">
                            <label htmlFor="outer-radius" className="text-sm font-medium">Outer Radius</label>
                            <span className="text-sm font-mono">
                                {outerRadius}px
                                {currentToken && <span className="ml-2 text-xs text-muted-foreground font-bold">({currentToken.name})</span>}
                            </span>
                        </div>
                        <input
                            id="outer-radius"
                            type="range"
                            min="0"
                            max="32"
                            step="1"
                            list="radius-markers"
                            value={outerRadius}
                            onChange={(e) => setOuterRadius(Number(e.target.value))}
                            className="w-full appearance-none bg-transparent focus:outline-none cursor-pointer
                            [&::-webkit-slider-runnable-track]:w-full [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:bg-muted [&::-webkit-slider-runnable-track]:rounded-lg
                            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:mt-[-4px] [&::-webkit-slider-thumb]:shadow-sm"
                        />
                        <datalist id="radius-markers">
                            {radiusTokens.map((t: any) => (
                                <option key={t.name} value={t.value} label={t.name}></option>
                            ))}
                        </datalist>
                        <div className="relative w-full h-6 mt-1">
                            {radiusTokens.map((t: any) => {
                                const ratio = t.value / 32;
                                return (
                                    <div
                                        key={t.name}
                                        className="absolute flex flex-col items-center cursor-pointer -translate-x-1/2"
                                        style={{ left: `calc(${ratio * 100}% + ${(0.5 - ratio) * 16}px)` }}
                                        onClick={() => setOuterRadius(t.value)}
                                    >
                                        <div className="w-0.5 h-1 bg-muted-foreground/50 mb-1"></div>
                                        <span className={`text-[10px] whitespace-nowrap ${outerRadius === t.value ? 'font-bold text-primary' : 'text-muted-foreground'}`}>{t.name}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-center">
                            <label htmlFor="padding" className="text-sm font-medium">Padding</label>
                            <span className="text-sm font-mono">{currentPadding}px</span>
                        </div>
                        <input
                            id="padding"
                            type="range"
                            min="0"
                            max={spacingValues.length - 1}
                            step="1"
                            value={paddingIndex}
                            onChange={(e) => setPaddingIndex(Number(e.target.value))}
                            className="w-full appearance-none bg-transparent focus:outline-none cursor-pointer
                            [&::-webkit-slider-runnable-track]:w-full [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:bg-muted [&::-webkit-slider-runnable-track]:rounded-lg
                            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:mt-[-4px] [&::-webkit-slider-thumb]:shadow-sm"
                        />
                        <div className="relative w-full h-6 mt-1">
                            {spacingValues.map((v: number, i: number) => {
                                // Show fewer labels for cleaner UI, but clickable areas could be improved or just visual ticks
                                if (i % 2 !== 0 && i !== spacingValues.length - 1) return null;

                                const ratio = i / (spacingValues.length - 1);
                                return (
                                    <div
                                        key={v}
                                        className="absolute flex flex-col items-center cursor-pointer -translate-x-1/2"
                                        style={{ left: `calc(${ratio * 100}% + ${(0.5 - ratio) * 16}px)` }}
                                        onClick={() => setPaddingIndex(spacingValues.indexOf(v))}
                                    >
                                        <div className="w-0.5 h-1 bg-muted-foreground/50 mb-1"></div>
                                        <span className={`text-[8px] ${currentPadding === v ? 'font-bold text-primary' : 'text-muted-foreground'}`}>{v}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-border flex flex-col gap-2">
                        <div className="flex justify-between items-center bg-background p-3 rounded-lg border border-border">
                            <span className="text-sm font-medium text-primary">Inner Radius</span>
                            <span className="text-base font-bold font-mono">{innerRadius}px</span>
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
