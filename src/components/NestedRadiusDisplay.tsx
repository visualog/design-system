import React, { useState } from 'react';
import { designSystemData } from '../utils/dataLoader';

const { spacing } = designSystemData;

const NestedRadiusDisplay: React.FC = () => {
    const sliderValues = spacing.spacing_values
        .filter((s: any) => s.px <= 64) // Limit to reasonable padding for demo
        .map((s: any) => s.px);

    const defaultOuterIndex = sliderValues.findIndex((v: number) => v === 32);
    const defaultGapIndex = sliderValues.findIndex((v: number) => v === 24);
    const [outerRadiusIndex, setOuterRadiusIndex] = useState(defaultOuterIndex === -1 ? sliderValues.length - 1 : defaultOuterIndex);
    const [paddingIndex, setPaddingIndex] = useState(defaultGapIndex === -1 ? 0 : defaultGapIndex);
    const outerRadius = sliderValues[outerRadiusIndex] ?? 0;
    const currentPadding = sliderValues[paddingIndex] ?? 0;

    const innerRadius = Math.max(0, outerRadius - currentPadding);

    return (
        <section className="doc-subsection font-pretendard">
            <h2 className="text-doc-section-title">중첩 라디우스</h2>

            <div className="bg-secondary/50 rounded-xl border border-border p-6 md:p-8 overflow-hidden">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10 md:items-center">
                    <div className="md:col-span-2 flex items-center justify-center">
                        <div
                            className="bg-[#C1E1C1] dark:bg-[#43a047] transition-all duration-300 ease-out flex items-center justify-center relative text-primary-foreground"
                            style={{
                                width: '240px',
                                height: '240px',
                                borderRadius: `${outerRadius}px`,
                                padding: `${currentPadding}px`
                            }}
                        >
                            <span className="absolute top-2 left-1/2 -translate-x-1/2 text-[10px] text-green-900 dark:text-green-50 font-mono font-bold">
                                Outer: {outerRadius}px
                            </span>
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

                    <div className="md:col-span-1 w-full">
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center justify-between">
                                    <label className="text-sm font-semibold text-foreground">Radius</label>
                                    <span className="text-xs font-mono text-muted-foreground">{outerRadius}px</span>
                                </div>
                                <input
                                    type="range"
                                    min={0}
                                    max={sliderValues.length - 1}
                                    step={1}
                                    value={outerRadiusIndex}
                                    onChange={(event) => setOuterRadiusIndex(Number(event.target.value))}
                                    className="w-full accent-primary"
                                    aria-label="Outer radius slider"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <div className="flex items-center justify-between">
                                    <label className="text-sm font-semibold text-foreground">Gap</label>
                                    <span className="text-xs font-mono text-muted-foreground">{currentPadding}px</span>
                                </div>
                                <input
                                    type="range"
                                    min={0}
                                    max={sliderValues.length - 1}
                                    step={1}
                                    value={paddingIndex}
                                    onChange={(event) => setPaddingIndex(Number(event.target.value))}
                                    className="w-full accent-primary"
                                    aria-label="Gap slider"
                                />
                            </div>

                            <div className="flex items-center justify-between rounded-lg border border-primary/15 bg-primary/5 px-3 py-2.5">
                                <span className="text-xs font-semibold text-primary uppercase tracking-wide">Inner Radius</span>
                                <span className="text-sm font-bold font-mono text-foreground">
                                    {outerRadius} - {currentPadding} = {innerRadius}px
                                </span>
                            </div>

                            <p className="text-body-sm text-foreground/80">
                                두 개의 라운드 박스가 중첩될 때, 내부 박스의 라디우스는 <span className="font-semibold text-foreground">외부 라디우스에서 사이여백(Padding)을 뺀 값</span>으로 설정해야 시각적으로 자연스럽습니다.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NestedRadiusDisplay;
