import React from 'react';
import { designSystemData } from '../utils/dataLoader';
import { Clipboard } from './ui/clipboard';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const SpacingDisplay: React.FC = () => {
    const { spacing } = designSystemData;

    return (
        <div className="flex flex-col gap-12">
            {/* Interactive Visualizer */}
            <section className="flex flex-col gap-6">
                <h2 className="text-xl font-bold">Interactive Visualizer</h2>
                <div className="bg-secondary/10 border border-border rounded-xl p-8 flex flex-col md:flex-row gap-8 items-center justify-center min-h-[300px]">
                    <div className="flex flex-col items-center gap-4 w-full max-w-md">
                        <div className="flex items-center gap-0 w-full justify-center">
                            <div className="w-24 h-24 bg-primary/20 border-2 border-primary rounded-lg flex items-center justify-center text-primary font-bold">Box A</div>
                            <div id="spacing-gap" className="h-24 bg-red-500/20 flex items-center justify-center relative transition-all duration-300" style={{ width: '16px' }}>
                                <span className="text-[10px] font-mono absolute -top-6 text-muted-foreground whitespace-nowrap" id="spacing-label">16px (spacing-4)</span>
                                <div className="w-full h-[1px] bg-red-500 absolute top-1/2 left-0 -translate-y-1/2"></div>
                            </div>
                            <div className="w-24 h-24 bg-primary/20 border-2 border-primary rounded-lg flex items-center justify-center text-primary font-bold">Box B</div>
                        </div>

                        <div className="flex flex-wrap gap-2 justify-center mt-6">
                            {[0, 1, 2, 4, 6, 8, 12, 16, 24].map((space) => (
                                <button
                                    key={space}
                                    onClick={() => {
                                        const gap = document.getElementById('spacing-gap');
                                        const label = document.getElementById('spacing-label');
                                        if (gap && label) {
                                            const pixels = space * 4;
                                            gap.style.width = `${pixels}px`;
                                            label.innerText = `${pixels}px (spacing-${space})`;
                                        }
                                    }}
                                    className="px-3 py-1.5 text-xs font-medium rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
                                >
                                    spacing-{space}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="bg-card border border-border p-4 rounded-lg text-sm text-muted-foreground max-w-xs">
                        <p>
                            <strong>Spacing System</strong><br />
                            4px 그리드 시스템을 사용하여 요소 간의 일관된 간격을 유지합니다.
                            <code className="text-xs bg-muted px-1 py-0.5 rounded mx-1">spacing-1</code>은 4px에 해당합니다.
                        </p>
                    </div>
                </div>
            </section>

            {/* Spacing System Table */}
            <section className="flex flex-col gap-4">
                <h2 className="text-xl font-bold">토큰</h2>
                <div className="overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-1/3 px-4 text-xs h-auto">토큰명</TableHead>
                                <TableHead className="w-1/3 px-4 text-xs h-auto">값</TableHead>
                                <TableHead className="w-1/3 px-4 text-xs h-auto">예시</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {spacing.spacing_values.map((s: any, index: number) => (
                                <TableRow key={index}>
                                    <TableCell className="font-mono text-sm font-medium">
                                        <div className="flex items-center gap-2">
                                            <span className="text-primary">{s.variable}</span>
                                            <Clipboard value={s.variable} />
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground font-mono text-xs">
                                        {s.px}px
                                    </TableCell>
                                    <TableCell>
                                        <div className="bg-blue-200" style={{ height: '24px', width: `${s.px}px` }}></div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </section>
        </div>
    );
};

export default SpacingDisplay;
